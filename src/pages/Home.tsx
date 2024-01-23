import type { FC } from "react";
import { Products } from "src/components/organisms/home/Products";
import { Wallet } from "src/components/organisms/home/Wallet";
import { ShortUserBill } from "src/components/organisms/home/BillShortList";
import { Button, Stack, Typography } from "@mui/material";
import { ShortTickets } from "src/components/organisms/home/SupportShortList";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { useNavigate } from "react-router";
import { useAppSelector } from "src/app/hooks";

const Home: FC = () => {
  const navigate = useNavigate();

  const profileCompleted = useAppSelector(
    (state) => state.auth?.profileCompleted
  );

  const goToProfilePage = () => {
    navigate("/portal/profile");
  };

  return (
    <>
      {!profileCompleted && (
        <Stack
          p={3}
          mb={3}
          bgcolor="warning.main"
          direction="row"
          gap={1}
          borderRadius={2}
          width="100%"
          color="white"
          alignItems={{ xs: "start", md: "center" }}
        >
          <ErrorOutlineOutlinedIcon />
          <Typography>
            توجه: حساب کاربری شما به علت عدم احراز هویت، در وضعیت غیرفعال قرار
            دارد.
          </Typography>
          <Button
            onClick={goToProfilePage}
            variant="outlined"
            sx={{ ml: "auto", borderColor: "white", color: "white" }}
          >
            احراز هویت
          </Button>
        </Stack>
      )}
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
