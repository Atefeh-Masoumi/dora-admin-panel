import { RefreshOutlined } from "@mui/icons-material";
import {
  CircularProgress,
  Divider,
  IconButton,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormikContext } from "formik";
import { Dispatch, FC, SetStateAction, memo, useEffect, useMemo } from "react";
import { useGetApiMyAccountCaptchaQuery } from "src/app/services/api.generated";

type CaptchaPropsType = {
  setCaptchaKey: Dispatch<SetStateAction<string>>;
  error?: string;
  touched?: boolean;
};

export const Captcha: FC<CaptchaPropsType> = memo(
  ({ setCaptchaKey, error, touched }) => {
    const {
      data: captchaData,
      isLoading: getCaptchaLoading,
      isFetching: getCaptchaFetching,
      refetch,
    } = useGetApiMyAccountCaptchaQuery(undefined, {
      pollingInterval: 2 * 60 * 1000,
    });

    const { getFieldProps } = useFormikContext();

    useEffect(() => {
      if (
        !captchaData ||
        !captchaData.captchaKey ||
        !captchaData.base64CaptchaImage
      )
        return;

      setCaptchaKey(captchaData.captchaKey);
    }, [captchaData, setCaptchaKey]);

    const isLoading = useMemo(
      () => getCaptchaFetching || getCaptchaLoading,
      [getCaptchaFetching, getCaptchaLoading]
    );

    return (
      <Stack direction="column" rowGap={2} width="100%">
        <Divider flexItem />
        <Typography color="text.light">
          لطفاً برای ادامه فرآیند ورود، کد امنیتی نمایش داده شده را در بخش مورد
          نظر وارد کنید
        </Typography>
        <Stack
          direction={{ xs: "column", md: "row-reverse" }}
          width="100%"
          alignItems="center"
          justifyContent="space-between"
          rowGap={2}
        >
          <Stack
            direction="row-reverse"
            alignItems="center"
            columnGap={{ xs: 1.5, md: 0 }}
          >
            <IconButton
              disabled={isLoading}
              onClick={refetch}
              sx={{ width: 51, height: 51 }}
            >
              {isLoading ? (
                <CircularProgress size={16} />
              ) : (
                <RefreshOutlined fontSize="large" />
              )}
            </IconButton>
            {isLoading ? (
              <Skeleton variant="rectangular" width={180} height={50} />
            ) : (
              <img
                src={`data:image/jpeg;base64,${captchaData?.base64CaptchaImage}`}
                alt="captcha_image"
              />
            )}
          </Stack>
          <TextField
            {...getFieldProps("captchaCode")}
            className="rtlPlaceHolder"
            size="small"
            label="کد امنیتی"
            fullWidth
            sx={{ width: { xs: "100%", md: 150 }, direction: "ltr" }}
            error={Boolean(error && touched)}
            helperText={touched && error}
          />
        </Stack>
        <Divider flexItem />
      </Stack>
    );
  }
);
