import type { FC } from "react";
import { Products } from "src/components/organisms/home/Products";
import { Wallet } from "src/components/organisms/home/Wallet";
import { ShortUserBill } from "src/components/organisms/home/ShortUserBill";
import { Stack } from "@mui/material";
import { ShortTickets } from "src/components/organisms/home/ShortTickets";

const Home: FC = () => {
  return (
    <>
      <Products />
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
        <ShortTickets />
      </Stack>
    </>
  );
};

export default Home;
