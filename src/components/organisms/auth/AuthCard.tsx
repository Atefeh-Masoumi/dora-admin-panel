import type { FC } from "react";
import { Stack, Typography } from "@mui/material";
import { AuthSvg } from "src/components/atoms/svg/AuthSvg";

export const AuthCard: FC = () => {
  return (
    <Stack
      bgcolor="primary.main"
      alignItems="center"
      justifyContent="center"
      borderRadius={3}
      spacing={3}
      height="100%"
    >
      <Stack borderRadius="100%" border="18px solid rgba(255, 255, 255, 0.12)">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{
            width: "300px",
            height: "300px",
            borderRadius: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.24)",
          }}
          p={5}
        >
          <AuthSvg sx={{ width: "100%", height: "100%" }} />
        </Stack>
      </Stack>
      <Stack justifyContent="center" alignItems="center" spacing={1}>
        <Typography color="white" fontSize="23px">
          یک جایگزین ساده برای تمام خدمات
        </Typography>
        <Typography
          fontSize="36px"
          color="white"
          maxWidth="60%"
          textAlign="center"
        >
          از اعتبار شما در ارائه خدمات آنلاین حفاظت میکنیم.
        </Typography>
      </Stack>
    </Stack>
  );
};
