import { useMemo, type FC } from "react";
import { Divider, Stack, Typography } from "@mui/material";
import { DorsaSwitch } from "src/components/atoms/DorsaSwitch";
import { useAppSelector } from "src/app/hooks";
import {
  usePutApiMyPortalProfileEnableTwoFactorMutation,
  usePutApiMyPortalProfileDisableTwoFactorMutation,
} from "src/app/services/api.generated";
import { toast } from "react-toastify";

export const SecuritySetting: FC = () => {
  const twoFactor = useAppSelector((state) => state.auth?.twoFactor);

  const [enableTwoFactor, { isLoading: enableTwoFactorLoading }] =
    usePutApiMyPortalProfileEnableTwoFactorMutation();
  const [disableTwoFactor, { isLoading: disableTwoFactorLoading }] =
    usePutApiMyPortalProfileDisableTwoFactorMutation();

  const changeLoading = useMemo(
    () => enableTwoFactorLoading || disableTwoFactorLoading,
    [disableTwoFactorLoading, enableTwoFactorLoading]
  );

  const twoFactorToggleButtonOnClick = () => {
    (twoFactor ? disableTwoFactor() : enableTwoFactor()).unwrap().then(() => {
      toast.success(`تایید دو مرحله‌ای شما ${twoFactor ? "" : ""}`);
    });
  };

  return (
    <Stack
      sx={{
        width: { xs: "100%" },
        px: { xs: 1.8, lg: 3 },
        py: { xs: 1.8, lg: 2.25 },
        backgroundColor: "white",
        borderRadius: 2,
      }}
    >
      <Typography variant="text1" color="secondary" sx={{ pt: 1.1 }}>
        تنظیمات امنیتی
      </Typography>
      <Divider variant="middle" sx={{ my: 3 }} />
      <Stack direction="row" justifyContent="space-between">
        <Stack spacing={1}>
          <Typography variant="text1" fontWeight="bold">
            تایید هویت دو مرحله‌ای
          </Typography>
          <Typography variant="text15" color="secondary">
            ورود به اپلیکیشن از طریق تایید هویت دو مرحله‌ای و ارسال پیامک
          </Typography>
        </Stack>
        <DorsaSwitch
          disabled={changeLoading}
          checked={!!twoFactor}
          onChange={twoFactorToggleButtonOnClick}
          sx={{ mx: { xs: 0, md: 2 } }}
        />
      </Stack>
    </Stack>
  );
};
