import { createContext, type FC } from "react";
import { Divider, Skeleton, Stack, Typography } from "@mui/material";
import { DorsaSwitch } from "src/components/atoms/DorsaSwitch";
import { toast } from "react-toastify";
import PageLoading from "src/components/atoms/PageLoading";
import {
  useGetApiMyPortalProfileGetNotificationStatusQuery,
  usePutApiMyPortalProfileEditEmailNotificationMutation,
  usePutApiMyPortalProfileEditPhoneNotificationMutation,
} from "src/app/services/api.generated";

// Define the type for your context value
type DataContextValueType = {
  refetchOnClick: () => any;
};

// Create the context
export const DataContext = createContext<DataContextValueType>({
  refetchOnClick: () => null,
});

export const NotificationSetting: FC = () => {
  const { data, refetch, isLoading } =
    useGetApiMyPortalProfileGetNotificationStatusQuery();

  const refetchOnClick = () => refetch();

  const [editPhoneNotify, { isLoading: loadingPhone }] =
    usePutApiMyPortalProfileEditPhoneNotificationMutation();

  const submitPhone = () => {
    if (data?.phoneNotify === undefined) return;

    editPhoneNotify({
      editPhoneNotifyModel: { phoneNotify: !data.phoneNotify },
    }).then(() => toast.success("بروزرسانی پیامک انجام شد"));
  };

  const [editEmailNotify, { isLoading: loadingEmail }] =
    usePutApiMyPortalProfileEditEmailNotificationMutation();

  const submitEmail = () => {
    if (data?.emailNotify === undefined) return;

    editEmailNotify({
      editEmailNotifyModel: { emailNotify: !data.emailNotify },
    }).then(() => toast.success("بروزرسانی ایمیل انجام شد"));
  };

  return (
    <DataContext.Provider value={{ refetchOnClick }}>
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
                checked={data?.phoneNotify}
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
                checked={data?.emailNotify}
                onChange={submitEmail}
                sx={{ mx: { xs: 0, md: 2 } }}
              />
            )}
          </Stack>
        </Stack>
      </Stack>
    </DataContext.Provider>
  );
};
