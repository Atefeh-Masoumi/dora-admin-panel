import { Divider, Skeleton, Stack, Typography } from "@mui/material";
import { FC, Fragment } from "react";
import { toast } from "react-toastify";
import { DorsaSwitch } from "src/components/atoms/DorsaSwitch";
import PageLoading from "src/components/atoms/PageLoading";
import {
  usePutApiMyDnsCdnHostChangeHstsMutation,
  usePutApiMyDnsCdnHostChangeHttpsRedirectMutation,
  usePutApiMyDnsCdnHostChangeNonWwwRedirectMutation,
} from "src/app/services/api.generated";
import { BORDER_RADIUS_1 } from "src/configs/theme";

type CdnSecuritySettingPropsType = {
  dnsId: number;
  isHSTS: boolean | undefined;
  isHttpsRedirect: boolean | undefined;
  isNonWwwRedirect: boolean | undefined;
  loading: boolean;
};
export const CdnSecuritySetting: FC<CdnSecuritySettingPropsType> = ({
  dnsId,
  isHSTS,
  isHttpsRedirect,
  isNonWwwRedirect,
  loading,
}) => {
  const [changeHttpsRedirect, { isLoading: loadingRedirect }] =
    usePutApiMyDnsCdnHostChangeHttpsRedirectMutation();

  const onChangeHttpsRedirect = () => {
    if (isHttpsRedirect === undefined) return;
    changeHttpsRedirect({
      changeHttpsRedirectModel: {
        id: dnsId,
        isHttpsRedirect: !isHttpsRedirect,
      },
    }).then(() => toast.success("وضعیت تبدیل لینک بروز رسانی شد"));
  };

  const [changeNonWwwRedirect, { isLoading: loadingNonWwwRedirect }] =
    usePutApiMyDnsCdnHostChangeNonWwwRedirectMutation();

  const onChangeNonWwwRedirect = () => {
    if (isNonWwwRedirect === undefined) return;
    changeNonWwwRedirect({
      changeNonWwwRedirectModel: {
        id: dnsId,
        isNonWwwRedirect: !isNonWwwRedirect,
      },
    }).then(() => toast.success("وضعیت تبدیل لینک بروز رسانی شد"));
  };

  const [changeHSTS, { isLoading: loadingHSTS }] =
    usePutApiMyDnsCdnHostChangeHstsMutation();

  const onChangeHSTS = () => {
    if (isHSTS === undefined) return;
    changeHSTS({
      changeHstsModel: {
        id: dnsId,
        isHsts: !isHSTS,
      },
    }).then(() => {
      toast.success("وضعیت HSTS بروز رسانی شد");
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
      text: "Automatic HTTPS Rewrites helps fix mixed content by changing “http”  to “https” for all resources or links on your web site that can be  served with HTTPS",
      data: isHttpsRedirect,
      action: onChangeHttpsRedirect,
    },
    {
      title: "فعالسازی تبدیل لینک با www به بدون www",
      text: "Automatic Rewrites Domain URL to non-www. If you use a www URL, redirecting it to non-www ",
      data: isNonWwwRedirect,
      action: onChangeNonWwwRedirect,
    },
  ];

  return (
    <>
      {(loadingRedirect || loadingNonWwwRedirect || loadingHSTS) && (
        <PageLoading />
      )}
      <Typography fontSize={20} color="secondary" fontWeight="bold">
        تنظیمات دامنه
      </Typography>
      <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
      <Stack bgcolor="white" py={2} px={3} borderRadius={BORDER_RADIUS_1}>
        <Stack spacing={2} display={{ xs: "none", md: "flex" }}>
          {items.map(({ title, text, data, action }, index) => (
            <Fragment key={index}>
              <Stack direction="row" justifyContent="space-between">
                <Stack spacing={1}>
                  <Typography variant="text1" fontWeight="bold">
                    {title}
                  </Typography>
                  <Typography variant="text4" color="secondary" paragraph>
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
              {/* {(index === 0 || index === 1) && (
                <Divider sx={{ borderColor: "secondary.light" }} />
              )} */}
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
              {/* {(index === 0 || index === 1) && (
                <Divider sx={{ borderColor: "secondary.light" }} />
              )} */}
            </Fragment>
          ))}
        </Stack>
      </Stack>
    </>
  );
};
