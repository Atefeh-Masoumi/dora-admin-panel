import type { FC } from "react";
import { Divider, Stack, Typography } from "@mui/material";
import { useGetApiMyPortalCommissionListQuery } from "src/app/services/api.generated";
import { BaseTable } from "../../../tables/BaseTable";
import { ReferralTableRow } from "./tables/ReferralTableRow";
import { referralTableStruct } from "./tables/struct";
import { BORDER_RADIUS_1 } from "src/configs/theme";

export const InviteList: FC = () => {
  const { data: billList, isLoading } = useGetApiMyPortalCommissionListQuery();

  return (
    <Stack
      borderRadius={BORDER_RADIUS_1}
      bgcolor="white"
      p={{ xs: 1.8, lg: 3 }}
    >
      <Typography variant="text1" color="secondary">
        لیست درآمدهای شما از معرفی
      </Typography>
      <Divider variant="middle" sx={{ my: 2 }} />
      <Stack>
        <BaseTable
          struct={referralTableStruct}
          RowComponent={ReferralTableRow}
          rows={billList || ([] as any)}
          text="در حال حاضر درآمدی وجود ندارد"
          isLoading={isLoading}
          initialOrder={0}
        />
      </Stack>
    </Stack>
  );
};
