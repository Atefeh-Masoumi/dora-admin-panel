import { FC } from "react";
import { Stack } from "@mui/material";
import { InviteCode } from "src/components/organisms/portal/account/referral/InviteCode";
import { ReferralCode } from "src/components/organisms/portal/account/referral/ReferralCode";
import { InviteList } from "src/components/organisms/portal/account/referral/InviteList";
import { useGetApiMyPortalReferralGetQuery } from "src/app/services/api.generated";

const Referral: FC = () => {
  const { data: referral } = useGetApiMyPortalReferralGetQuery();
  return (
    <Stack direction="column" rowGap={3}>
      <InviteCode />
      {referral?.isJoined === false && <ReferralCode />}
      <InviteList />
    </Stack>
  );
};

export default Referral;
