import { FC, useEffect, useState } from "react";
import {
  Button,
  Divider,
  LinearProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { baseUrl } from "src/app/services/baseQuery";
import { useAppSelector } from "src/app/hooks";
import { customerProductsTableStruct } from "src/components/organisms/portal/financial/tables/billTableStruct";
import { priceToPersian } from "src/utils/priceToPersian";
import BillProductsTableRow from "src/components/organisms/portal/financial/tables/BillProductsTableRow";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { ConvertToJalali } from "src/utils/convertToJalali";
import { useGetApiMyPortalCustomerBillGetByIdQuery } from "src/app/services/api.generated";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import axios from "axios";

const Bill: FC = () => {
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("customer-bill-id");
  const navigate = useNavigate();

  const { data: bill, isLoading } = useGetApiMyPortalCustomerBillGetByIdQuery({
    id: parseInt(id as string),
  });

  const productList = bill?.customerProductBills || [];
  const token = useAppSelector((state) => state.auth?.accessToken);

  const payBill = [
    { label: "جمع کل", value: bill?.netPrice },
    { label: "مالیات بر ارزش افزوده", value: bill?.vat },
  ];

  const [date, setDate] = useState("");
  useEffect(() => {
    if (!bill || !bill.billDate) return;
    setDate(ConvertToJalali(String(bill?.billDate)));
  }, [bill]);

  const downloadBtnOnClick = () => {
    setLoading(true);
    axios
      .get(`${baseUrl}/api/my/portal/customer-bill/download/${bill?.id}`, {
        headers: { authorization: `Bearer ${token}` },
        responseType: "blob",
      })
      .then((response) => {
        const url = URL.createObjectURL(response.data);
        const a = document.createElement("a");
        a.href = url;
        a.target = "_blank";
        a.download = "export.xlsx" || "";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Stack direction="row" justifyContent="start">
        <Button variant="text">
          <ArrowForwardIosIcon sx={{ fontSize: 15 }} />
          <Typography
            onClick={() => navigate("/portal/financial?tab=customer-bill")}
          >
            بازگشت به لیست محاسبات
          </Typography>
        </Button>
      </Stack>
      <Stack spacing={2}>
        <Stack
          borderRadius={BORDER_RADIUS_1}
          spacing={3}
          bgcolor="white"
          p={{ xs: 1.8, lg: 3 }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" spacing={2} alignItems="center" width="100%">
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
              >
                {isLoading ? (
                  <Stack width={100}>
                    <LinearProgress />
                  </Stack>
                ) : (
                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    alignItems={{ xs: "start", md: "center" }}
                    spacing={{ xs: 0, md: 2 }}
                  >
                    <Typography
                      fontWeight={700}
                      variant="text1"
                      color="secondary"
                      whiteSpace="nowrap"
                    >
                      گزارش شماره {bill?.id}
                    </Typography>
                    <LoadingButton
                      loading={loading}
                      sx={{ color: "primary.main" }}
                      onClick={downloadBtnOnClick}
                    >
                      دانلود گزارش
                    </LoadingButton>
                  </Stack>
                )}
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  alignItems="center"
                  spacing={{ xs: 1, md: 2 }}
                >
                  {isLoading ? (
                    <Stack width={120} py={1}>
                      <LinearProgress />
                    </Stack>
                  ) : (
                    <Typography variant="text9">
                      خریدار: {bill?.name}
                    </Typography>
                  )}
                  {isLoading ? (
                    <Stack width={120} py={1}>
                      <LinearProgress />
                    </Stack>
                  ) : (
                    <Typography variant="text9">تاریخ: {date}</Typography>
                  )}
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Divider sx={{ my: 2 }} />
          <Stack>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {customerProductsTableStruct.map((item, index) => {
                      return (
                        <TableCell align="center" key={index}>
                          {item.label}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productList.map((product, index) => (
                    <BillProductsTableRow
                      rowBgColor={
                        (index + 1) % 2 === 0 ? "" : "rgba(240, 247, 255, 1)"
                      }
                      key={index}
                      rowData={product}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </Stack>

        <Stack direction="row" justifyContent="end">
          <Stack
            borderRadius={BORDER_RADIUS_1}
            bgcolor="white"
            p={1.5}
            width="100%"
            maxWidth={500}
          >
            <Stack direction="column" spacing={1.5}>
              <Stack direction="column">
                {payBill.map((bill, index) => (
                  <Stack
                    key={index}
                    borderRadius={1}
                    direction="row"
                    justifyContent="space-between"
                    p={2}
                    bgcolor={index === 1 ? "white" : "#F0F7FF"}
                    fontSize={14}
                    color="#6E768A"
                  >
                    <Typography>{bill.label}</Typography>
                    <Typography>
                      {priceToPersian(Number(bill.value))} ریال
                    </Typography>
                  </Stack>
                ))}
              </Stack>
              <Divider
                sx={{ borderColor: "rgba(91, 104, 119, 0.1)", mb: 1.3 }}
              />

              <Stack
                borderRadius={1}
                direction="row"
                justifyContent="space-between"
                p={2}
                color="#6E768A"
              >
                <Typography fontWeight={700} fontSize={16}>
                  جمع مبالغ
                </Typography>
                <Typography fontWeight={700} fontSize={16}>
                  {priceToPersian(Number(bill?.totalPrice))} ریال
                </Typography>
              </Stack>
              {/* <Button fullWidth size="large" variant="contained" sx={{ py: 1.5 }}>
              پرداخت آنلاین فاکتور
            </Button> */}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default Bill;
