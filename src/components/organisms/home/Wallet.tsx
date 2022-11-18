import { FC } from "react";
import { Grid } from "@mui/material";
import { Balance } from "./wallet/Balance";
import { Analytics } from "./wallet/Analytics";

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
