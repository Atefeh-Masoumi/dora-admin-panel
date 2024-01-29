import { FC, useEffect, useState } from "react";
import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { AuthTemplate } from "src/components/templates/AuthTemplate";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { usePostApiMyAccountForgotConfirmMutation } from "src/app/services/api.generated";
import { formikOnSubmitType } from "src/types/form.type";
import { toast } from "react-toastify";
import { passwordValidatorRegex } from "src/utils/formValidator";
import { LoadingButton } from "@mui/lab";
import { useAppSelector } from "src/app/hooks";
import { useDispatch } from "react-redux";
import { resetForgetPasswordStateAction } from "src/app/slice/forgetPasswordSlice";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const passValidationHandler = (value: string) =>
  !value ? false : passwordValidatorRegex.test(value);

const formInitialValues = {
  password: "",
  passwordConfirm: "",
};

const formValidation = yup.object().shape({
  password: yup
    .string()
    .test("Password validation", "Password is not valid", (value) =>
      passValidationHandler(value as string)
    ),
});

type ForgetPasswordSetPassPropsType = { code: string };

export const ForgetPasswordSetPass: FC<ForgetPasswordSetPassPropsType> = ({
  code,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const { email } = useAppSelector((state) => state.forgetPassword);

  const navigate = useNavigate();

  useEffect(() => {
    if (!email || !code) {
      navigate("/account/login");
    }
  }, [email, code, navigate]);

  const [setPassword, { isLoading }] =
    usePostApiMyAccountForgotConfirmMutation();

  const dispatch = useDispatch();

  const formSubmitHandler: formikOnSubmitType<typeof formInitialValues> = (
    { password },
    { setSubmitting }
  ) => {
    if (!password) {
      setSubmitting(false);
      return;
    }
    setPassword({
      forgotConfirmModel: { confirmCode: Number(code), email, password },
    })
      .unwrap()
      .then(() => {
        toast.success("گذرواژه با موفقیت بروز رسانی شد");
        dispatch(resetForgetPasswordStateAction());
        navigate("/account/login");
      });
  };

  return (
    <AuthTemplate title="ایجاد رمز عبور جدید">
      <Formik
        initialValues={formInitialValues}
        validationSchema={formValidation}
        onSubmit={formSubmitHandler}
      >
        {({ errors, touched, getFieldProps, values }) => (
          <Form autoComplete="off">
            <Stack spacing={1} alignItems="start">
              <Stack
                spacing={1.5}
                alignItems="start"
                pb={2}
                color="secondary.main"
                width="100%"
              >
                <Typography fontSize={14}>
                  رمز عبور خود را وارد کنید:
                </Typography>
                <DorsaTextField
                  type={showPassword ? "text" : "password"}
                  label="رمز عبور"
                  error={Boolean(errors.password && touched.password)}
                  {...getFieldProps("password")}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="start"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{ dir: "ltr" }}
                />
                <DorsaTextField
                  type={showPasswordConfirm ? "text" : "password"}
                  label="تکرار رمز عبور"
                  error={
                    touched.passwordConfirm &&
                    values.password !== values.passwordConfirm
                  }
                  helperText={
                    touched.passwordConfirm &&
                    values.password !== values.passwordConfirm &&
                    "تکرار گذرواژه یکسان نیست"
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          onClick={() =>
                            setShowPasswordConfirm(!showPasswordConfirm)
                          }
                          edge="start"
                        >
                          {showPasswordConfirm ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  {...getFieldProps("passwordConfirm")}
                  fullWidth
                  inputProps={{ dir: "ltr" }}
                />
                <Stack
                  direction="column"
                  spacing={1}
                  color={
                    touched.password && errors.password
                      ? "error.main"
                      : "secondary.main"
                  }
                >
                  <Typography variant="text13">حداقل ۸ کاراکتر باشد</Typography>
                  <Typography variant="text13">
                    ترکیبی از حروف کوچک و بزرگ باشد
                  </Typography>
                  <Typography variant="text13">شامل اعداد باشد</Typography>
                  <Typography variant="text13">
                    شامل کاراکترهای خاص (نمادها) باشد
                  </Typography>
                </Stack>
              </Stack>

              <LoadingButton
                loading={isLoading}
                variant="contained"
                fullWidth
                sx={{ py: 1.5 }}
                disabled={Boolean(
                  !values.password ||
                    !values.passwordConfirm ||
                    errors.password ||
                    values.password !== values.passwordConfirm
                )}
                type="submit"
              >
                تایید
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
