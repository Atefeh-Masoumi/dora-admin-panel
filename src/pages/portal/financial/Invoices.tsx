import { FC, useState } from "react";
import { Divider, Stack, Typography } from "@mui/material";
import { invoicesTableStruct } from "src/components/organisms/portal/financial/invoices/tables/struct";
import InvoicesTableRow from "src/components/organisms/portal/financial/invoices/tables/InvoicesTableRow";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { SearchBox } from "src/components/molecules/SearchBox";
import {
  InvoiceListResponse,
  useGetApiMyPortalInvoiceListQuery,
} from "src/app/services/api.generated";
import moment from "jalali-moment";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { LoadingButton } from "@mui/lab";
import { useAppSelector } from "src/app/hooks";
import axios from "axios";
import { baseUrl } from "src/app/services/baseQuery";
import { useSearchParams } from "react-router-dom";
import Invoice from "./Invoice";

const Invoices: FC = () => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [dateFrom] = useState<Date | null>(null);
  const [dateTo] = useState<Date | null>(null);

  const token = useAppSelector((store) => store.auth?.accessToken);
  const { data: invoices, isLoading } = useGetApiMyPortalInvoiceListQuery();

  const [searchParams] = useSearchParams();
  const customerInvoiceId = searchParams.get("invoice-id");

  const timeStringToDate = (time: string) =>
    moment.from(time, "fa", "YYYY/MM/DD HH:mm:ss").startOf("day").toDate();

  const downloadBtnOnClick = () => {
    setLoading(true);
    axios
      .get(`${baseUrl}/api/my/portal/invoice/download`, {
        headers: { authorization: `Bearer ${token}` },
        responseType: "blob",
      })
      .then((response) => {
        const url = URL.createObjectURL(response.data);
        const a = document.createElement("a");
        a.href = url;
        a.target = "_blank";
        a.download = "export.xlsx";
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
    <>
      {customerInvoiceId ? (
        <Invoice />
      ) : (
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
      )}
    </>
  );
};

export default Invoices;
