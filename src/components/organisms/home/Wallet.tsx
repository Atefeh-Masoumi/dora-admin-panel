import { FC } from "react";
import { Grid2 } from "@mui/material";
import { Balance } from "./Balance";
import { Analytics } from "./Analytics";
import { GiftAndReferral } from "./GiftAndReferral";

export const Wallet: FC = () => {
  return (
    <Grid2
      container
      justifyContent="space-between"
      rowGap={2}
      columnGap={2}
      sx={{ mb: { xs: 2, md: 3 } }}
    >
      <GiftAndReferral />
      <Balance />
      <Analytics />
    </Grid2>
  );
};
