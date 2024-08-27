import { FC, useState } from "react";
import { Divider, Stack, Typography } from "@mui/material";
import { invoicesTableStruct } from "src/components/organisms/portal/financial/invoices/tables/struct";
import  InvoicesTableRow  from "src/components/organisms/portal/financial/invoices/tables/InvoicesTableRow";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { SearchBox } from "src/components/molecules/SearchBox";
import {
  InvoiceListResponse,
  useGetApiMyPortalInvoiceListQuery,
} from "src/app/services/api.generated";
import { CustomDatePicker } from "src/components/organisms/calender/CustomDatePicker";
import moment from "jalali-moment";
import { BORDER_RADIUS_1 } from "src/configs/theme";

const Invoices: FC = () => {
  const { data: invoices, isLoading } = useGetApiMyPortalInvoiceListQuery();

  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);

  const timeStringToDate = (time: string) =>
    moment.from(time, "fa", "YYYY/MM/DD HH:mm:ss").startOf("day").toDate();

  const filteredList =
    invoices?.filter(
      (invoice: InvoiceListResponse) =>
        invoice.id?.toString().includes(search) &&
        (!dateFrom ||
          (invoice.invoiceDate &&
            timeStringToDate(invoice.invoiceDate) > dateFrom)) &&
        (!dateTo ||
          (invoice.invoiceDate &&
            timeStringToDate(invoice.invoiceDate) < dateTo))
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
            لیست فاکتور ها
          </Typography>
          <Stack display={{ xs: "flex", md: "none" }} width="100%">
            <SearchBox
              placeholder="جستجو در شماره فاکتور"
              onChange={(text) => setSearch(text)}
              fullWidth
            />
          </Stack>
          <Stack display={{ xs: "none", md: "flex" }}>
            <SearchBox
              placeholder="جستجو در شماره فاکتور"
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
            placeholder="تا تاریخ"
            value={dateTo}
            setValue={setDateTo}
          />
        </Stack>
      </Stack>
      <Divider variant="middle" sx={{ my: 2 }} />
      <Stack>
        <BaseTable
          struct={invoicesTableStruct}
          RowComponent={InvoicesTableRow}
          rows={filteredList}
          text="در حال حاضر فاکتور ندارید"
          isLoading={isLoading}
          initialOrder={1}
        />
      </Stack>
    </Stack>
  );
};
export default Invoices;
