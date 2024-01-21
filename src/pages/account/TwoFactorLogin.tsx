import { FC, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { AuthTemplate } from "src/components/templates/AuthTemplate";
import { Navigate, useNavigate } from "react-router";
import { useAppSelector } from "src/app/hooks";
import { CodeField } from "src/components/atoms/CodeField";
import Countdown from "react-countdown";
import {
  usePostApiMyAccountLoginMutation,
  usePostApiMyAccountTwoFactorLoginMutation,
} from "src/app/services/api.generated";
import { toast } from "react-toastify";

const TwoFactorLogin: FC = () => {
  const [confirmCode, setConfirmCode] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  const [countDownDate, setCountDownDate] = useState(Date.now() + 120000);

  const [loginUser] = usePostApiMyAccountLoginMutation();
  const [twoFactorLogin, { isLoading }] =
    usePostApiMyAccountTwoFactorLoginMutation();

  const email = useAppSelector((state) => state.auth?.email);
  const password = useAppSelector((state) => state.auth?.password);
  const twoFactor = useAppSelector((state) => state.auth?.twoFactor);

  const disableSubmitButton = confirmCode.some((code) => code === null);

  const resendCode = () => {
    if (!email || !password || !twoFactor) {
      navigate("/account/login");
      return;
    }
    loginUser({ loginModel: { email, password } })
      .unwrap()
      .then((res) => {
        if (!res) return;
        toast.success("کد احراز هویت به شماره همراهتان ارسال شد");
        setConfirmCode([null, null, null, null, null, null]);
      })
      .catch(
        ({ status }: { status: number }) =>
          (status === 401 || status === 404) &&
          toast.error("ایمیل یا گذرواژه صحیح اشتباه است")
      );
    setCountDownDate(Date.now() + 120000);
  };

  const navigate = useNavigate();

  const submitHandler = () => {
    if (!email) {
      navigate("/account/login");
      return;
    }

    if (confirmCode.some((char) => char === null)) return;

    twoFactorLogin({
      twoFactorLoginModel: {
        email,
        confirmCode: confirmCode.join(""),
      } as any,
    })
      .unwrap()
      .then((res) => {
        if (!res) return;
        toast.success("شما با موفقیت وارد شدید");
        navigate("/");
      })
      .catch(
        ({ status }: { status: number }) =>
          (status === 401 || status === 404) &&
          toast.error("کد وارد شده درست نمی‌باشد")
      );
  };

  if (!twoFactor || !email) {
    return <Navigate to="/account/login" />;
  }

  return (
    <AuthTemplate title="ورود دو مرحله‌ای">
      <Stack rowGap={4} alignItems="start">
        <Stack rowGap={4} alignItems="start" width="100%">
          <Typography fontSize={14} color="secondary">
            کد تایید ارسال شده به شماره همراهتان را در زیر وارد کنید:
          </Typography>
          <CodeField characters={confirmCode} setCharacters={setConfirmCode} />
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
            <Button color="primary" onClick={resendCode}>
              ارسال مجدد کد تایید
            </Button>
          )}
        </Stack>
        <LoadingButton
          loading={isLoading}
          disabled={disableSubmitButton}
          variant="contained"
          type="submit"
          fullWidth
          sx={{ py: 1.5 }}
          onClick={() => submitHandler()}
        >
          ورود
        </LoadingButton>
      </Stack>
    </AuthTemplate>
  );
};

export default TwoFactorLogin;
