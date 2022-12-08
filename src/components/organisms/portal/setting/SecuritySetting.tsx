import type { FC } from "react";
import { Divider, Skeleton, Stack, Typography } from "@mui/material";
import { DorsaSwitch } from "src/components/atoms/DorsaSwitch";
import { toast } from "react-toastify";
import PageLoading from "src/components/atoms/PageLoading";
import { useGetUserV2PortalProfileGetNotificationStatusQuery } from "src/app/services/api";
import {
  usePutUserV2PortalProfileEditEmailNotificationMutation,
  usePutUserV2PortalProfileEditPhoneNotificationMutation,
} from "src/app/services/api.generated";

export const SecuritySetting: FC = () => {
  const { data: notifyData, isLoading } = useGetUserV2PortalProfileGetNotificationStatusQuery();

  const [editPhoneNotify, { isLoading: loadingPhone }] = usePutUserV2PortalProfileEditPhoneNotificationMutation();
  const submitPhone = () => {
    if (notifyData?.phoneNotify === undefined) return;
    editPhoneNotify({
      editPhoneNotifyModel: { phoneNotify: !notifyData.phoneNotify },
    }).then(() => toast.success("بروزرسانی پیامک انجام شد"));
  };

  const [editEmailNotify, { isLoading: loadingEmail }] = usePutUserV2PortalProfileEditEmailNotificationMutation();
  const submitEmail = () => {
    if (notifyData?.emailNotify === undefined) return;
    editEmailNotify({
      editEmailNotifyModel: { emailNotify: !notifyData.emailNotify },
    }).then(() => toast.success("بروزرسانی ایمیل انجام شد"));
  };

  return (
    <>
      {(loadingPhone || loadingEmail) && <PageLoading />}
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
        <Stack spacing={3}>
          <Stack direction="row" justifyContent="space-between">
            <Stack spacing={1}>
              <Typography variant="text1" fontWeight="bold">
                اطلاع رسانی پیامک
              </Typography>
              <Typography variant="text15" color="secondary">
                اطلاع رسانی پیام ها و ایونت‌های ابر درسا از طریق پیامک
              </Typography>
            </Stack>
            {isLoading ? (
              <Stack direction="row" spacing={1} sx={{ mx: { xs: 0, md: 2 } }}>
                <Skeleton variant="circular" width={10} height={10} />
                <Skeleton variant="circular" width={10} height={10} />
                <Skeleton variant="circular" width={10} height={10} />
              </Stack>
            ) : (
              <DorsaSwitch
                checked={notifyData?.phoneNotify}
                onChange={submitPhone}
                sx={{ mx: { xs: 0, md: 2 } }}
              />
            )}
          </Stack>
          <Divider variant="middle" />
          <Stack direction="row" justifyContent="space-between">
            <Stack spacing={1}>
              <Typography variant="text1" fontWeight="bold">
                اطلاع رسانی ایمیل
              </Typography>
              <Typography variant="text15" color="secondary">
                اطلاع رسانی پیام ها و ایونت‌های ابر درسا از طریق ایمیل
              </Typography>
            </Stack>
            {isLoading ? (
              <Stack direction="row" spacing={1} sx={{ mx: { xs: 0, md: 2 } }}>
                <Skeleton variant="circular" width={10} height={10} />
                <Skeleton variant="circular" width={10} height={10} />
                <Skeleton variant="circular" width={10} height={10} />
              </Stack>
            ) : (
              <DorsaSwitch
                checked={notifyData?.emailNotify}
                onChange={submitEmail}
                sx={{ mx: { xs: 0, md: 2 } }}
              />
            )}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
