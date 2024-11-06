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
  onRefetchCaptcha?: (refetch: () => void) => void; // New prop
};

export const Captcha: FC<CaptchaPropsType> = memo(
  ({ setCaptchaKey, error, touched, onRefetchCaptcha }) => {
    const {
      data: captchaData,
      isLoading: getCaptchaLoading,
      isFetching: getCaptchaFetching,
      refetch: refetchCaptchaData,
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

    useEffect(() => {
      if (onRefetchCaptcha) {
        onRefetchCaptcha(refetchCaptchaData); // Pass the refetch function to the parent
      }
    }, [refetchCaptchaData, onRefetchCaptcha]);

    const isLoading = useMemo(
      () => getCaptchaFetching || getCaptchaLoading,
      [getCaptchaFetching, getCaptchaLoading]
    );

    return (
      <Stack direction="column" rowGap={2} width="100%">
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
              onClick={refetchCaptchaData}
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
      </Stack>
    );
  }
);
