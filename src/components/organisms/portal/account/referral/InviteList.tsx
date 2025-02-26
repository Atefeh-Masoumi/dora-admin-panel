import { Divider, Stack, Typography } from "@mui/material";
import { useEffect, useState, type FC } from "react";
import { useLazyGetApiMyPortalReferralListByReferralIdQuery } from "src/app/services/api";
import { useGetApiMyPortalReferralGetQuery } from "src/app/services/api.generated";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { BaseTable } from "../../../tables/BaseTable";
import ReferralTableRow from "./tables/ReferralTableRow";
import { referralTableStruct } from "./tables/struct";

export const InviteList: FC = () => {
  const [customerReferralList, setCustomerReferralList] = useState<any>([]);
  const { data: referralData } =
    useGetApiMyPortalReferralGetQuery();

  const [callCustomerReferralList, { isLoading: customerReferralListLoaidng }] =
    useLazyGetApiMyPortalReferralListByReferralIdQuery();

  useEffect(() => {
    if (referralData?.id) {
      callCustomerReferralList({
        referralId: Number(referralData?.id),
      })
        .then((res: any) => setCustomerReferralList(res.data))
        .catch((err: any) => {});
    }
  }, [referralData]);

  return (
    <Stack
      borderRadius={BORDER_RADIUS_1}
      bgcolor="white"
      p={{ xs: 1.8, lg: 3 }}
      width={"100%"}
      sx={{ height: "100% !important" }}
    >
      <Typography variant="text1" color="secondary">
        لیست کاربران دعوت شده
      </Typography>
      <Divider variant="middle" sx={{ my: 2 }} />
      <Stack>
        <BaseTable
          struct={referralTableStruct}
          RowComponent={ReferralTableRow}
          rows={customerReferralList || ([] as any)}
          text="در حال حاضر کاربری با لینک شما عضو نشده است"
          isLoading={customerReferralListLoaidng}
          initialOrder={0}
        />
      </Stack>
    </Stack>
  );
};
