import { Divider, Skeleton, Stack, Typography } from "@mui/material";
import { FC, Fragment } from "react";
import { toast } from "react-toastify";
import {
  usePutApiV2CdnZoneChangeHstsMutation,
  usePutApiV2CdnZoneChangeRedirectMutation,
} from "src/app/services/api.generated";
import { DorsaSwitch } from "src/components/atoms/DorsaSwitch";
import PageLoading from "src/components/atoms/PageLoading";

type SwitchHttpSettingPropsType = {
  id: number;
  isHSTS: boolean | undefined;
  isRedirect: boolean | undefined;
  loading: boolean;
};
export const SwitchHttpSetting: FC<SwitchHttpSettingPropsType> = ({
  id,
  isHSTS,
  isRedirect,
  loading,
}) => {
  const [changeRedirect, { isLoading: loadingRedirect }] =
    usePutApiV2CdnZoneChangeRedirectMutation();
  const onChangeRedirect = () => {
    if (isRedirect === undefined) return;
    changeRedirect({
      changeRedirectModel: { id, isRedirect: !isRedirect },
    }).then(() => toast.success("وضعیت تبدیل لینک آپدیت شد"));
  };

  const [changeHSTS, { isLoading: loadingHSTS }] =
    usePutApiV2CdnZoneChangeHstsMutation();
  const onChangeHSTS = () => {
    if (isHSTS === undefined) return;
    changeHSTS({ changeHstsModel: { id, isHsts: !isHSTS } }).then(() => {
      toast.success("وضعیت  HSTS آپدیت شد");
    });
  };

  const items = [
    {
      title: "فعالسازی HSTS",
      text: "HTTP Strict Transport Security (HSTS) Enforce web security policy for your website Policy: Max-Age: 30 days, Include subdomains: On, Preload: On",
      data: isHSTS,
      action: onChangeHSTS,
    },
    {
      title: "فعالسازی تبدیل لینک های Http به Https",
      text: "Automatic HTTPS Rewrites helps fix mixed content by changing “http”  to “https” for all resources or links on your web site that can be  served with HTTPS.",
      data: isRedirect,
      action: onChangeRedirect,
    },
  ];

  return (
    <>
      {(loadingRedirect || loadingHSTS) && <PageLoading />}
      <Stack bgcolor="white" py={2} px={3} borderRadius={3}>
        <Stack spacing={2} display={{ xs: "none", md: "flex" }}>
          {items.map(({ title, text, data, action }, index) => (
            <Fragment key={index}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack spacing={1}>
                  <Typography variant="text1" fontWeight="bold">
                    {title}
                  </Typography>
                  <Typography variant="text4" color="secondary">
                    {text}
                  </Typography>
                </Stack>
                <Stack>
                  {loading ? (
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ mx: { xs: 0, md: 2 } }}
                    >
                      <Skeleton variant="circular" width={10} height={10} />
                      <Skeleton variant="circular" width={10} height={10} />
                      <Skeleton variant="circular" width={10} height={10} />
                    </Stack>
                  ) : (
                    <DorsaSwitch
                      onChange={action}
                      checked={data}
                      sx={{ mx: { xs: 0, md: 2 } }}
                    />
                  )}
                </Stack>
              </Stack>
              {index === 0 && (
                <Divider sx={{ borderColor: "secondary.light" }} />
              )}
            </Fragment>
          ))}
        </Stack>
        <Stack spacing={2} display={{ xs: "flex", md: "none" }}>
          {items.map(({ title, text, data, action }, index) => (
            <Fragment key={index}>
              <Stack spacing={1}>
                <Stack
                  spacing={1}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="text1" fontWeight="bold">
                    {title}
                  </Typography>
                  <Stack>
                    {loading ? (
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ mx: { xs: 0, md: 2 } }}
                      >
                        <Skeleton variant="circular" width={10} height={10} />
                        <Skeleton variant="circular" width={10} height={10} />
                        <Skeleton variant="circular" width={10} height={10} />
                      </Stack>
                    ) : (
                      <DorsaSwitch
                        onChange={action}
                        checked={data}
                        sx={{ mx: { xs: 0, md: 2 } }}
                      />
                    )}
                  </Stack>
                </Stack>
                <Typography variant="text4" color="secondary">
                  {text}
                </Typography>
              </Stack>
              {index === 0 && (
                <Divider sx={{ borderColor: "secondary.light" }} />
              )}
            </Fragment>
          ))}
        </Stack>
      </Stack>
    </>
  );
};
