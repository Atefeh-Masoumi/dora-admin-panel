import { FC, useState } from "react";
import { Divider, Stack, Typography } from "@mui/material";
import moment from "jalali-moment";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { SearchBox } from "src/components/molecules/SearchBox";
import { CustomDatePicker } from "src/components/organisms/calender/CustomDatePicker";
import { walletTableStruct } from "src/components/organisms/cloud/walletTransaction/tables/struct";
import { WalletTableRow } from "src/components/organisms/cloud/walletTransaction/tables/WalletTableRow";
import {
  useGetApiCloudWalletListQuery,
  WalletTransactionListResponse,
} from "src/app/services/api.generated";

const Wallet: FC = () => {
  const { data: walletList, isLoading } = useGetApiCloudWalletListQuery();

  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);

  const timeStringToDate = (time: string) =>
    moment.from(time, "fa", "YYYY/MM/DD HH:mm:ss").startOf("day").toDate();

  const filteredList =
    walletList?.filter(
      (report: WalletTransactionListResponse) =>
        report.id?.toString().includes(search) &&
        (!dateFrom ||
          (report.transactionDate &&
            timeStringToDate(report.transactionDate) > dateFrom)) &&
        (!dateTo ||
          (report.transactionDate &&
            timeStringToDate(report.transactionDate) < dateTo))
    ) || [];

  return (
    <Stack borderRadius={2} bgcolor="white" p={{ xs: 1.8, lg: 3 }}>
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
            لیست گزارش ها
          </Typography>
          <Stack display={{ xs: "flex", md: "none" }} width="100%">
            <SearchBox
              placeholder="جستجو در شماره تراکنش"
              onChange={(text) => setSearch(text)}
              fullWidth
            />
          </Stack>
          <Stack display={{ xs: "none", md: "flex" }}>
            <SearchBox
              placeholder="جستجو در شماره تراکنش"
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
          struct={walletTableStruct}
          RowComponent={WalletTableRow}
          rows={filteredList || []}
          text="در حال حاضر تراکنشی ندارید"
          isLoading={isLoading}
          initialOrder={1}
        />
      </Stack>
    </Stack>
  );
};

export default Wallet;
