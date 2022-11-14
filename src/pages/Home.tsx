import type { FC } from "react";
import { Services } from "src/components/organisms/home/Services";
import { Wallet } from "src/components/organisms/home/Wallet";
import { ShortUserBill } from "src/components/organisms/home/ShortUserBill";
import { Stack } from "@mui/material";
import { Tickets } from "src/components/organisms/home/Tickets";

const Home: FC = () => {
  return (
    <>
      <Services />
      <Wallet />
      <Stack
        direction={{ xs: "column", md: "row" }}
        py={0.2}
        alignItems="start"
        rowGap={2}
        columnGap={3}
        justifyContent="space-between"
      >
        <ShortUserBill />
        <Tickets />
      </Stack>
    </>
  );
};

export default Home;
