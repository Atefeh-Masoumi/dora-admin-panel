import { Grid } from "@mui/material";
import { FC } from "react";
import { InviteCode } from "src/components/organisms/portal/account/referral/InviteCode";
import { InviteList } from "src/components/organisms/portal/account/referral/InviteList";

const Referral: FC = () => {
  return (
    <Grid container justifyContent={"space-between"} columnSpacing={1}>
      <Grid item xs={12} md={4}>
        <InviteCode />
      </Grid>
      <Grid item xs={12} md={8}>
        <InviteList />
      </Grid>
    </Grid>
  );
};

export default Referral;
