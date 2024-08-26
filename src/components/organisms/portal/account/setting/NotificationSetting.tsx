import { type FC } from "react";
import { Divider, Stack, Typography } from "@mui/material";
import { DorsaSwitch } from "src/components/atoms/DorsaSwitch";
import { toast } from "react-toastify";
import {
  useGetApiMyAccountProfileGetNotificationStatusQuery,
  usePutApiMyAccountProfileEditEmailNotificationMutation,
  usePutApiMyAccountProfileEditPhoneNotificationMutation,
} from "src/app/services/api.generated";
import PageLoading from "src/components/atoms/PageLoading";

export const NotificationSetting: FC = () => {
  const { data, isLoading: getDataLoading } =
    useGetApiMyAccountProfileGetNotificationStatusQuery();
  const [editPhoneNotify, { isLoading: editPhoneLoading }] =
    usePutApiMyAccountProfileEditPhoneNotificationMutation();
  const [editEmailNotify, { isLoading: editEmailLoading }] =
    usePutApiMyAccountProfileEditEmailNotificationMutation();

  const submitPhone = () => {
    if (data?.phoneNotify === undefined) return;

    editPhoneNotify({
      editPhoneNotifyModel: { phoneNotify: !data.phoneNotify },
    })
      .unwrap()
      .then(() => toast.success("بروزرسانی پیامک انجام شد"));
  };

  const submitEmail = () => {
    if (data?.emailNotify === undefined) return;

    editEmailNotify({
      editEmailNotifyModel: { emailNotify: !data.emailNotify },
    })
      .unwrap()
      .then(() => toast.success("بروزرسانی ایمیل انجام شد"));
  };

  return (
    <>
      {(getDataLoading || editPhoneLoading || editEmailLoading) && (
        <PageLoading />
      )}
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
          تنظیمات اعلان‌ها
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
            <DorsaSwitch
              disabled={editPhoneLoading || getDataLoading}
              checked={data?.phoneNotify || false}
              onChange={submitPhone}
              sx={{ mx: { xs: 0, md: 2 } }}
            />
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
            <DorsaSwitch
              disabled={editEmailLoading || getDataLoading}
              checked={data?.emailNotify || false}
              onChange={submitEmail}
              sx={{ mx: { xs: 0, md: 2 } }}
            />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
