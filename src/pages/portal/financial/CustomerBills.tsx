import { FC, useState } from "react";
import { Divider, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import moment from "jalali-moment";
import { SearchBox } from "src/components/molecules/SearchBox";
import { CustomDatePicker } from "src/components/organisms/calender/CustomDatePicker";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { BillsTableRow } from "src/components/organisms/portal/financial/tables/BillsTableRow";
import { billsTableStruct } from "src/components/organisms/portal/financial/tables/billsTableStruct";
import {
  useGetApiMyPortalCustomerBillListQuery,
  CustomerBillListResponse,
} from "src/app/services/api.generated";
import { BORDER_RADIUS_1 } from "src/configs/theme";

const CustomerBills: FC = () => {
  const { data: customerBill, isLoading } =
    useGetApiMyPortalCustomerBillListQuery();

  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);

  const timeStringToDate = (time: string) =>
    moment.from(time, "fa", "YYYY/MM/DD HH:mm:ss").startOf("day").toDate();

  const filteredList =
    customerBill?.filter(
      (bill: CustomerBillListResponse) =>
        bill.id?.toString().includes(search) &&
        (!dateFrom ||
          (bill.billDate && timeStringToDate(bill.billDate) > dateFrom)) &&
        (!dateTo || (bill.billDate && timeStringToDate(bill.billDate) < dateTo))
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
            لیست محاسبات
          </Typography>
          <Stack display={{ xs: "flex", md: "none" }} width="100%">
            <SearchBox
              placeholder="جستجو در شماره گزارش"
              onChange={(text) => setSearch(text)}
              fullWidth
            />
          </Stack>
          <Stack display={{ xs: "none", md: "flex" }}>
            <SearchBox
              placeholder="جستجو در شماره گزارش"
              onChange={(text) => setSearch(text)}
            />
          </Stack>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
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
        </Stack>
      </Stack>
      <Divider variant="middle" sx={{ my: 2 }} />
      <Stack>
        <BaseTable
          struct={billsTableStruct}
          RowComponent={BillsTableRow}
          rows={filteredList}
          text="در حال حاضر گزارش ندارید"
          isLoading={isLoading}
          initialOrder={1}
        />
      </Stack>
    </Stack>
  );
};

export default CustomerBills;
