import type { FC } from "react";
import { Chip, Divider, Stack, Typography } from "@mui/material";
import { RealPersonality } from "./RealPersonality";
import { useGetApiMyAccountProfileGetQuery } from "src/app/services/api.generated";
import { BORDER_RADIUS_1 } from "src/configs/theme";

export const Specifications: FC = () => {
  const { data: userInformation } = useGetApiMyAccountProfileGetQuery();

  return (
    <Stack
      sx={{
        width: "100%",
        p: { xs: 1.8, lg: 2 },
        borderRadius: BORDER_RADIUS_1,
        backgroundColor: "white",
      }}
      height="100%"
      justifyContent="space-between"
      rowGap={{ xs: 2, md: 0 }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="text1" color="secondary" sx={{ p: 1 }}>
          مشخصات کاربری
        </Typography>
        {userInformation?.idConfirmed ? (
          <Chip
            label="تایید شده"
            sx={{
              color: "rgba(13, 191, 102, 1)",
              backgroundColor: "rgba(218, 246, 232, 1)",
              borderRadius: 1,
              fontSize: "14px",
              p: 0.5,
            }}
          />
        ) : (
          <Chip
            label="احراز هویت نشده"
            sx={{
              color: "rgba(244, 95, 80, 1)",
              backgroundColor: "rgba(244, 95, 80, 0.12)",
              borderRadius: 1,
              fontSize: "14px",
              p: 0.5,
            }}
          />
        )}
      </Stack>
      <Divider variant="middle" />
      <RealPersonality />
    </Stack>
  );
};
