import { FC } from "react";
import { Stack } from "@mui/material";
import { InviteCode } from "src/components/organisms/portal/referral/InviteCode";
import { ReferralCode } from "src/components/organisms/portal/referral/ReferralCode";
import { InviteList } from "src/components/organisms/portal/referral/InviteList";
import { useGetApiV2PortalReferralGetQuery } from "src/app/services/api.generated";

const Referral: FC = () => {
  const { data: referral } = useGetApiV2PortalReferralGetQuery();
  return (
    <Stack direction="column" rowGap={3}>
      <InviteCode />
      {referral?.isJoined === false && <ReferralCode />}
      <InviteList />
    </Stack>
  );
};

export default Referral;
