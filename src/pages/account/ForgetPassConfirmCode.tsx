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
import { ErrorMessage, Field, Form, Formik, useFormikContext } from "formik";
import { FC, useEffect, useMemo, useState } from "react";
import Countdown from "react-countdown";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useAppSelector } from "src/app/hooks";
import {
  useGetApiMyAccountCaptchaQuery,
  usePostApiMyAccountForgotMutation,
} from "src/app/services/api.generated";
import { setForgetPasswordConfirmCodeAction } from "src/app/slice/forgetPasswordSlice";
import { CodeField } from "src/components/atoms/CodeField";
import { AuthTemplate } from "src/components/templates/AuthTemplate";
import * as Yup from "yup";

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
  const [captchaKey, setCaptchaKey] = useState("");
  const [confirmCode, setConfirmCode] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const haveNull = confirmCode.some((code) => code === null);

  const [countDownDate, setCountDownDate] = useState(Date.now() + 120000);

  const [sendMail] = usePostApiMyAccountForgotMutation();

  const {
    data: captchaData,
    isLoading: getCaptchaLoading,
    isFetching: getCaptchaFetching,
    refetch,
  } = useGetApiMyAccountCaptchaQuery();

  const resendCode = (values: any) => {
    if (!values.captchaCode) {
      toast.warning("لطفا ابتدا متن امنیتی خود را وارد کنید");
      return;
    }
    sendMail({
      forgotModel: {
        email,
        captchaKey: captchaKey,
        captchaCode: values.captchaCode,
      },
    })
      .unwrap()
      .then(() => toast.success("کد با موفقیت ارسال شد"));
    setCountDownDate(Date.now() + 120000);
  };

  const dispatch = useDispatch();

  const { email } = useAppSelector((state) => state.forgetPassword);

  const navigate = useNavigate();

  useEffect(() => {
    if (!email) navigate("/account/login");
  }, [email, navigate]);

  const submitHandler = (values: any) => {
    if (confirmCode.some((char) => char === null)) return;
    if (!email) {
      toast.warning("لطفا ابتدا ایمیل خود را وارد کنید");
      return;
    }
    dispatch(setForgetPasswordConfirmCodeAction(confirmCode.join("")));
    setCode(confirmCode.join(""));
    goNext();
  };

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 120000);

    return () => clearInterval(intervalId);
  }, [refetch]);

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
    <AuthTemplate title="فراموشی رمز عبور">
      <Formik
        initialValues={{ captchaCode: "" }}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {({ isSubmitting, resetForm, values }) => (
          <Form>
            <Stack spacing={1} alignItems="start">
              <Stack spacing={1} alignItems="start" pb={2} width="100%">
                <Typography fontSize={14} color="secondary">
                  کد تایید ارسال شده را وارد کنید:
                </Typography>
                <CodeField
                  characters={confirmCode}
                  setCharacters={setConfirmCode}
                />
                <Stack direction="column" rowGap={2} width="100%">
                  <Divider flexItem />
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
                        onClick={() => {
                          refetch();
                          resetForm({ values: { captchaCode: "" } });
                        }}
                        sx={{ width: 51, height: 51 }}
                      >
                        {isLoading ? (
                          <CircularProgress size={16} />
                        ) : (
                          <RefreshOutlined fontSize="large" />
                        )}
                      </IconButton>
                      {isLoading ? (
                        <Skeleton
                          variant="rectangular"
                          width={180}
                          height={50}
                        />
                      ) : (
                        <img
                          src={`data:image/jpeg;base64,${captchaData?.base64CaptchaImage}`}
                          alt="captcha_image"
                        />
                      )}
                    </Stack>
                    <Field
                      as={TextField}
                      name="captchaCode"
                      className="rtlPlaceHolder"
                      size="small"
                      label="کد امنیتی"
                      fullWidth
                      sx={{ width: { xs: "100%", md: 150 }, direction: "ltr" }}
                      helperText={<ErrorMessage name="captchaCode" />}
                      error={!!ErrorMessage}
                    />
                  </Stack>
                  <Divider flexItem />
                </Stack>
                {countDownDate > Date.now() ? (
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
                ) : (
                  <Button color="primary" onClick={() => resendCode(values)}>
                    ارسال مجدد کد تایید
                  </Button>
                )}
                <Stack direction="row" spacing={1}></Stack>
              </Stack>
              <LoadingButton
                disabled={haveNull || isSubmitting}
                component="button"
                type="submit"
                variant="contained"
                fullWidth
                sx={{ py: 1.5 }}
              >
                ادامه
              </LoadingButton>

              <Button fullWidth href="./login">
                ورود به حساب کاربری
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </AuthTemplate>
  );
};
