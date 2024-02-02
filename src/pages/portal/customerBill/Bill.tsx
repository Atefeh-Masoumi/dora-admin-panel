import { FC, useEffect, useState } from "react";
import { Divider, LinearProgress, Stack, Typography } from "@mui/material";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { useParams } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { baseUrl } from "src/app/services/baseQuery";
import { useAppSelector } from "src/app/hooks";
import moment from "jalali-moment";
import { billTableStruct } from "src/components/organisms/portal/customerBill/tables/billTableStruct";
import { BillTableRow } from "src/components/organisms/portal/customerBill/tables/BillTableRow";
import { priceToPersian } from "src/utils/priceToPersian";
import { useGetApiMyPortalCustomerBillGetByIdQuery } from "src/app/services/api.generated";

const downloadFileUrl = baseUrl + "/api/portal/bill/download/";

const Bill: FC = () => {
  const [downloadFileLoading, setDownloadFileLoading] = useState(false);

  const { id } = useParams();

  const { data: bill, isLoading } = useGetApiMyPortalCustomerBillGetByIdQuery({
    id: parseInt(id as string),
  });

  const token = useAppSelector((state) => state.auth?.accessToken);

  const payBill = [
    { label: "جمع کل", value: bill?.netPrice },
    { label: "مالیات بر ارزش افزوده", value: bill?.vat },
  ];

  const [date, setDate] = useState("");
  useEffect(() => {
    if (!bill || !bill.billDate) return;
    const m = moment
      .from(bill.billDate, "fa", "YYYY/MM/DD HH:mm:ss")
      .locale("fa")
      .format("YYYY/MM/DD");
    setDate(m);
  }, [bill]);

  const downloadHandler = () => {
    if (!id || isNaN(Number(id))) return;
    let headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);
    setDownloadFileLoading(true);
    fetch(downloadFileUrl + Number(id), {
      headers,
    })
      .then((response) => (response as any).blob())
      .then((blobby) => {
        let anchor = document.createElement("a");
        document.body.appendChild(anchor);

        let objectUrl = window.URL.createObjectURL(blobby);

        anchor.href = objectUrl;
        anchor.download = "Customer_Product_Bill_Report_" + id;
        anchor.click();

        window.URL.revokeObjectURL(objectUrl);
      })
      .finally(() => setDownloadFileLoading(false));
  };

  return (
    <Stack spacing={2}>
      <Stack
        borderRadius={2}
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
                    loading={downloadFileLoading}
                    sx={{ color: "primary.main" }}
                    onClick={downloadHandler}
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
                  <Typography variant="text9">خریدار: {bill?.name}</Typography>
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
          <BaseTable
            struct={billTableStruct}
            RowComponent={BillTableRow}
            rows={bill?.customerProductBills || []}
            text="گزارش موجود نیست"
            isLoading={isLoading}
          />
        </Stack>
      </Stack>

      <Stack direction="row" justifyContent="end">
        <Stack
          borderRadius={2}
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
            <Divider sx={{ borderColor: "rgba(91, 104, 119, 0.1)", mb: 1.3 }} />

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
  );
};

export default Bill;
