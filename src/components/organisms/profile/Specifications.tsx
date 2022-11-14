import type { FC } from "react";
import { Chip, Divider, Skeleton, Stack, Typography } from "@mui/material";
import { RealPersonality } from "./Real";
import { useGetApiV2PortalProfileGetQuery } from "src/app/services/api.generated";

export const Specifications: FC = () => {
  const { data: userInformation, isLoading: loadingData } =
    useGetApiV2PortalProfileGetQuery();

  return (
    <Stack
      sx={{
        width: "100%",
        p: { xs: 1.8, lg: 2 },
        borderRadius: 2,
        backgroundColor: "white",
      }}
      height="100%"
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
      <Stack py={2.5}>
        <Divider variant="middle" />
      </Stack>
      {loadingData ? (
        <Stack
          rowGap={{ xs: 1, md: 1.5, lg: 1.8 }}
          justifyContent="space-between"
          px={1}
          pt={3}
        >
          <Stack spacing={2} p={1}>
            <Stack direction="row" spacing={1}>
              <Stack width="50%">
                <Skeleton
                  variant="rectangular"
                  height={45}
                  sx={{ bgcolor: "secondary.light", borderRadius: 2 }}
                />
              </Stack>
              <Stack width="50%">
                <Skeleton
                  variant="rectangular"
                  height={45}
                  sx={{ bgcolor: "secondary.light", borderRadius: 2 }}
                />
              </Stack>
            </Stack>
            {[...Array(2)].map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                height={45}
                sx={{ bgcolor: "secondary.light", borderRadius: 2 }}
              />
            ))}
            <Skeleton
              variant="rectangular"
              height={60}
              sx={{ bgcolor: "secondary.light", borderRadius: 2 }}
            />
          </Stack>
        </Stack>
      ) : (
        <RealPersonality data={userInformation as {}} />
      )}
    </Stack>
  );
};
