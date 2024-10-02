import { Divider, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { FC, useState } from "react";
import { useGetApiMyPortalCommissionListQuery } from "src/app/services/api.generated";
import { SearchBox } from "src/components/molecules/SearchBox";
import CommissionTableRow from "src/components/organisms/portal/financial/commission/tables/CommissionTableRow";
import { commissionTableStruct } from "src/components/organisms/portal/financial/commission/tables/struct";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { BORDER_RADIUS_1 } from "src/configs/theme";

const Commission: FC = () => {
  const { data: commissionList, isLoading: commissionListLoading } =
    useGetApiMyPortalCommissionListQuery();

  const [search, setSearch] = useState("");

  const filteredList =
    commissionList?.filter((commission: any) =>
      commission.id?.toString().includes(search)
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
            لیست کمیسیون
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
      </Stack>
      <Divider variant="middle" sx={{ my: 2 }} />
      <Stack>
        <BaseTable
          struct={commissionTableStruct}
          RowComponent={CommissionTableRow}
          rows={filteredList}
          text="در حال حاضر کمیسیون ندارید"
          isLoading={commissionListLoading}
          initialOrder={1}
        />
      </Stack>
    </Stack>
  );
};

export default Commission;
