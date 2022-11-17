import { FC, useEffect, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { AuthTemplate } from "src/components/templates/AuthTemplate";
import { useDispatch } from "react-redux";
import { setForgetPasswordConfirmCodeAction } from "src/app/slice/forgetPasswordSlice";
import { useNavigate } from "react-router";
import { useAppSelector } from "src/app/hooks";
import { CodeField } from "src/components/atoms/CodeField";
import Countdown from "react-countdown";
import { usePostApiV2AccountForgotMutation } from "src/app/services/api.generated";
import { toast } from "react-toastify";

type ForgetPassConfirmCodePropsType = {
  goNext: () => void;
  setCode: (code: string) => void;
};

export const ForgetPassConfirmCode: FC<ForgetPassConfirmCodePropsType> = ({
  goNext,
  setCode,
}) => {
  // Code field
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

  const [sendMail] = usePostApiV2AccountForgotMutation();
  const resendCode = () => {
    if (!email) {
      toast.warning("لطفا ابتدا ایمیل خود را وارد کنید");
      return;
    }
    sendMail({ forgotModel: { email } }).then(() =>
      toast.success("کد با موفقیت ارسال شد")
    );
    setCountDownDate(Date.now() + 120000);
  };

  const dispatch = useDispatch();

  const { email } = useAppSelector((state) => state.forgetPassword);

  const navigate = useNavigate();

  useEffect(() => {
    if (!email) navigate("/dash/account/login");
  }, [email, navigate]);

  const submitHandler = (confirmCode: any[]) => {
    if (confirmCode.some((char) => char === null)) return;
    if (!email) {
      toast.warning("لطفا ابتدا ایمیل خود را وارد کنید");
      return;
    }
    dispatch(setForgetPasswordConfirmCodeAction(confirmCode.join("")));
    setCode(confirmCode.join(""));
    goNext();
  };

  return (
    <AuthTemplate title="فراموشی رمز عبور">
      <Stack spacing={1} alignItems="start">
        <Stack spacing={1} alignItems="start" pb={2} width="100%">
          <Typography fontSize={14} color="secondary">
            کد تایید ارسال شده به ایمیل را در زیر وارد کنید:
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

          <Stack direction="row" spacing={1}></Stack>
        </Stack>
        <LoadingButton
          disabled={haveNull}
          component="button"
          type="submit"
          variant="contained"
          fullWidth
          sx={{ py: 1.5 }}
          onClick={() => submitHandler(confirmCode)}
        >
          ادامه
        </LoadingButton>

        <Button fullWidth href="./login">
          ورود به حساب کاربری
        </Button>
      </Stack>
    </AuthTemplate>
  );
};
