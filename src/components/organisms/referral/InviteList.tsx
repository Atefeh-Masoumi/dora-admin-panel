import type { FC } from "react";
import { Divider, Stack, Typography } from "@mui/material";
import { useGetApiV2PortalCommissionListQuery } from "src/app/services/api.generated";
import { BaseTable } from "../tables/BaseTable";
import { ReferralTableRow } from "../tables/referral/ReferralTableRow";
import { referralTableStruct } from "../tables/referral/struct";

export const InviteList: FC = () => {
  const { data: billList, isLoading } = useGetApiV2PortalCommissionListQuery();

  return (
    <Stack borderRadius={2} bgcolor="white" p={{ xs: 1.8, lg: 3 }}>
      <Typography variant="text1" color="secondary">
        لیست افراد دعوت شده
      </Typography>
      <Divider variant="middle" sx={{ my: 2 }} />
      <Stack>
        <BaseTable
          struct={referralTableStruct}
          RowComponent={ReferralTableRow}
          rows={billList || ([] as any)}
          text="در حال حاضر کاربری وجود ندارد"
          isLoading={isLoading}
          initialOrder={0}
        />
      </Stack>
    </Stack>
  );
};
