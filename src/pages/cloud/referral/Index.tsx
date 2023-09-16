import { FC } from "react";
import { Stack } from "@mui/material";
import { InviteCode } from "src/components/organisms/cloud/referral/InviteCode";
import { ReferralCode } from "src/components/organisms/cloud/referral/ReferralCode";
import { InviteList } from "src/components/organisms/cloud/referral/InviteList";
import { useGetApiAccountReferralGetQuery } from "src/app/services/api.generated";

const Referral: FC = () => {
  const { data: referral } = useGetApiAccountReferralGetQuery();
  return (
    <Stack direction="column" rowGap={3}>
      <InviteCode />
      {referral?.isJoined === false && <ReferralCode />}
      <InviteList />
    </Stack>
  );
};

export default Referral;
