import { FC, useState } from "react";
import { Divider, Stack, Typography } from "@mui/material";
import moment from "jalali-moment";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { SearchBox } from "src/components/molecules/SearchBox";
import { CustomDatePicker } from "src/components/organisms/calender/CustomDatePicker";
import { paymentTableStruct } from "src/components/organisms/portal/financial/payment/tables/struct";
import PaymentTableRow from "src/components/organisms/portal/financial/payment/tables/PaymentTableRow";
import {
  useGetApiMyPortalPaymentListQuery,
  PaymentListResponse,
} from "src/app/services/api.generated";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { LoadingButton } from "@mui/lab";
import { useAppSelector } from "src/app/hooks";
import axios from "axios";
import { baseUrl } from "src/app/services/baseQuery";

const Payments: FC = () => {
  const { data: payments, isLoading } = useGetApiMyPortalPaymentListQuery();

  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const token = useAppSelector((store) => store.auth?.accessToken);

  const downloadBtnOnClick = () => {
    setLoading(true);
    axios
      .get(`${baseUrl}/api/my/portal/payment/download`, {
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

  const timeStringToDate = (time: string) =>
    moment.from(time, "fa", "YYYY/MM/DD HH:mm:ss").startOf("day").toDate();

  const filteredList =
    payments?.filter(
      (payment: PaymentListResponse) =>
        payment.id?.toString().includes(search) &&
        (!dateFrom ||
          (payment.transactionDate &&
            timeStringToDate(payment.transactionDate) > dateFrom)) &&
        (!dateTo ||
          (payment.transactionDate &&
            timeStringToDate(payment.transactionDate) < dateTo))
    ) || [];

  return (
    <Stack
      borderRadius={BORDER_RADIUS_1}
      bgcolor="white"
      p={{ xs: 1.8, lg: 3 }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems={{ xs: "start", md: "center" }}
        justifyContent="space-between"
        spacing={2}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems={{ xs: "start", md: "center" }}
          width="100%"
        >
          <Typography variant="text1" color="secondary" whiteSpace="nowrap">
            لیست پرداخت ها
          </Typography>
          <Stack display={{ xs: "flex", md: "none" }} width="100%">
            <SearchBox
              placeholder="جستجو"
              onChange={(text) => setSearch(text)}
              fullWidth
            />
          </Stack>
          <Stack display={{ xs: "none", md: "flex" }}>
            <SearchBox
              placeholder="جستجو"
              onChange={(text) => setSearch(text)}
            />
          </Stack>
        </Stack>
        <Stack direction="row" justifyContent="end" sx={{ width: "100%" }}>
          <LoadingButton
            loading={loading}
            sx={{ color: "primary.main" }}
            onClick={downloadBtnOnClick}
          >
            دانلود گزارش
          </LoadingButton>
        </Stack>
        {/* <Stack direction="row" spacing={2} alignItems="center">
          <CustomDatePicker
            placeholder="از تاریخ"
            value={dateFrom}
            setValue={setDateFrom}
          />
          <CustomDatePicker
            placeholder="از تاریخ"
            value={dateTo}
            setValue={setDateTo}
          />
        </Stack> */}
      </Stack>
      <Divider variant="middle" sx={{ my: 2 }} />
      <Stack>
        <BaseTable
          struct={paymentTableStruct}
          RowComponent={PaymentTableRow}
          rows={filteredList}
          text="در حال حاضر گزارش ندارید"
          isLoading={isLoading}
          initialOrder={1}
        />
      </Stack>
    </Stack>
  );
};

export default Payments;
