import { FC } from "react";
import { Grid } from "@mui/material";
import { Balance } from "./Wallet/Balance";
import { Analytics } from "./Wallet/Analytics";

export const Wallet: FC = () => {
  return (
    <Grid
      container
      justifyContent="space-between"
      rowGap={2}
      columnGap={3}
      sx={{ mb: { xs: 2, md: 3 } }}
    >
      <Balance />
      <Analytics />
    </Grid>
  );
};
