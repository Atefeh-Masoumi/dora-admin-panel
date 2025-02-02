import { RefreshOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FC, useEffect, useMemo, useState } from "react";
import Countdown from "react-countdown";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useAppSelector } from "src/app/hooks";
import { setForgetPasswordConfirmCodeAction } from "src/app/slice/forgetPasswordSlice";
import { CodeField } from "src/components/atoms/CodeField";
import { AuthTemplate } from "src/components/templates/AuthTemplate";
import * as Yup from "yup";
import {
  useGetApiMyAccountCaptchaQuery,
  usePostApiMyAccountForgotMutation,
} from "src/app/services/api.generated";

type ForgetPassConfirmCodePropsType = {
  goNext: () => void;
  setCode: (code: string) => void;
};

const validationSchema = Yup.object({
  captchaCode: Yup.string()
    .required("کد امنیتی الزامی است")
    .matches(/^[a-zA-Z0-9]{6}$/, "کد امنیتی نامعتبر است"),
});

export const ForgetPassConfirmCode: FC<ForgetPassConfirmCodePropsType> = ({
  goNext,
  setCode,
}) => {
  const [confirmCode, setConfirmCode] = useState<(string | null)[]>([
    null, null, null, null, null, null,
  ]);
  const [countDownDate, setCountDownDate] = useState(Date.now() + 120000);
  const haveNull = confirmCode.some((code) => code === null);

  // Captcha related states (only for resend)
  const [captchaKey, setCaptchaKey] = useState("");
  const {
    data: captchaData,
    isLoading: getCaptchaLoading,
    isFetching: getCaptchaFetching,
    refetch,
  } = useGetApiMyAccountCaptchaQuery();

  const isLoading = useMemo(
    () => getCaptchaFetching || getCaptchaLoading,
    [getCaptchaFetching, getCaptchaLoading]
  );

  const [sendMail] = usePostApiMyAccountForgotMutation();
  const dispatch = useDispatch();
  const { email } = useAppSelector((state) => state.forgetPassword);
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) navigate("/account/login");
  }, [email, navigate]);

  // Verify code handler (no captcha needed)
  const handleVerifyCode = () => {
    if (confirmCode.some((char) => char === null)) return;
    if (!email) {
      toast.warning("لطفا ابتدا ایمیل خود را وارد کنید");
      return;
    }
    dispatch(setForgetPasswordConfirmCodeAction(confirmCode.join("")));
    setCode(confirmCode.join(""));
    goNext();
  };

  // Resend code handler (with captcha)
  const handleResendCode = (captchaCode: string) => {

    sendMail({
      forgotModel: {
        email,
        captchaKey,
        captchaCode,
      },
    })
      .unwrap()
      .then(() => {
        toast.success("کد با موفقیت ارسال شد");
        setCountDownDate(Date.now() + 120000);
      })
      .catch((error) => {
        toast.error("خطا در ارسال کد");
      });
  };
 useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 120000);

    return () => clearInterval(intervalId);
  }, [refetch]);
  // Captcha effects
  useEffect(() => {
    if (captchaData?.captchaKey) {
      setCaptchaKey(captchaData.captchaKey);
    }
  }, [captchaData]);

  return (
    <AuthTemplate title="فراموشی رمز عبور">
      <Stack spacing={2} width="100%">
        {countDownDate > Date.now() ? (
          // Show code input when timer is running
          <>
            <Stack spacing={1} alignItems="start" width="100%">
              <Typography fontSize={14} color="secondary">
                کد تایید ارسال شده را وارد کنید:
              </Typography>
              <CodeField
                characters={confirmCode}
                setCharacters={setConfirmCode}
              />
            </Stack>

            <Countdown
              date={countDownDate}
              renderer={({ minutes, seconds }) => (
                <Typography
                  color="secondary"
                  sx={{ fontVariantNumeric: "tabular-nums" }}
                >
                  ارسال مجدد کد تایید تا {("00" + minutes).slice(-2)}:
                  {("00" + seconds).slice(-2)}
                </Typography>
              )}
              onComplete={() => setCountDownDate(Date.now())}
            />

            <LoadingButton
              disabled={haveNull}
              onClick={handleVerifyCode}
              variant="contained"
              fullWidth
              sx={{ py: 1.5 }}
            >
              ادامه
            </LoadingButton>
          </>
        ) : (
          // Show resend form when timer is finished
          <Formik
            initialValues={{ captchaCode: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => handleResendCode(values.captchaCode)}
          >
            {({ isSubmitting }) => (
              <Form>
                <Stack spacing={2}>
                  <Field
                    name="captchaCode"
                    as={TextField}
                    label="کد امنیتی"
                    fullWidth
                    helperText={<ErrorMessage name="captchaCode" />}
                  />
                  <Stack direction="row" spacing={2} alignItems="center">
                    {isLoading ? (
                      <Skeleton variant="rectangular" width={180} height={50} />
                    ) : (
                      <img
                        src={`data:image/jpeg;base64,${captchaData?.base64CaptchaImage}`}
                        alt="captcha"
                      />
                    )}
                    <IconButton
                      onClick={() => refetch()}
                      disabled={isLoading}
                    >
                      <RefreshOutlined />
                    </IconButton>
                  </Stack>
                 
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                    fullWidth
                  >
                    ارسال مجدد کد تایید
                  </LoadingButton>
                </Stack>
              </Form>
            )}
          </Formik>
        )}

        <Button 
          fullWidth 
          href="./login"
        >
          ورود به حساب کاربری
        </Button>
      </Stack>
    </AuthTemplate>
  );
};
