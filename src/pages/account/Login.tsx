import { FC, useState } from "react";
import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { AuthTemplate } from "src/components/templates/AuthTemplate";
import { toast } from "react-toastify";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { emailValidator, passwordValidator } from "src/utils/formValidator";
import { useNavigate } from "react-router";
import { usePostApiMyAccountLoginMutation } from "src/app/services/api.generated";
import { formikOnSubmitType } from "src/types/form.type";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Captcha } from "src/components/molecules/Captcha";
import { useAppSelector } from "src/app/hooks";
import LoadingButton from "src/components/atoms/LoadingButton";

const formInitialValues = { email: "", password: "", captchaCode:"" };

const formValidation = yup.object().shape({
  email: emailValidator.required("ایمیل الزامیست!"),
  password: passwordValidator.required("گذرواژه الزامیست!"),
  captchaCode: yup.string().optional(),
});

const Login: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
 
  const [captchaKey, setCaptchaKey] = useState("");
  const [loginUser, { isLoading }] = usePostApiMyAccountLoginMutation();

  const navigate = useNavigate();

  const needCaptcha = useAppSelector((store) => store.auth?.captchaRequired);

  const submitHandler: formikOnSubmitType<typeof formInitialValues> = (
    { email, password,captchaCode },
    { setSubmitting }
  ) => {
    loginUser({
      loginModel: {
        email,
        password,
        captchaKey: captchaKey || undefined,
        captchaCode: captchaCode || undefined,
      },
    })
      .unwrap()
      .then((res) => {
        if (!res) return;
        if (res.twoFactor) {
          navigate("/account/two-factor-login");
          return;
        }
        if (!res.accessToken || res.accessToken === "0") {
          toast.error("نام کاربری یا گذرواژه وارد شده صحیح نمی‌باشد.");
          return;
        }
        toast.success("شما با موفقیت وارد شدید");
        navigate("/");
      })
      .catch(
        ({ status }: { status: number }) =>
          (status === 401 || status === 404) &&
          toast.error("ایمیل یا گذرواژه صحیح اشتباه است")
      );
    setSubmitting(false);
  };

  return (
    <AuthTemplate title="ورود به حساب کاربری">
      <Formik
        initialValues={formInitialValues}
        validationSchema={formValidation}
        onSubmit={submitHandler}
      >
        {({ errors, touched, getFieldProps }) => (
          <Form autoComplete="on">
            <Stack spacing={1} alignItems="start">
              <DorsaTextField
                label="ایمیل *"
                fullWidth
                error={Boolean(errors.email && touched.email)}
                {...getFieldProps("email")}
                helperText={touched.email && errors.email}
                inputProps={{ dir: "ltr" }}
              />
              <DorsaTextField
                label="رمز عبور *"
                fullWidth
                type={showPassword ? "text" : "password"}
                error={Boolean(errors.password && touched.password)}
                {...getFieldProps("password")}
                helperText={touched.password && errors.password}
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
              <Button color="secondary" sx={{ fontSize: 14 }} href="./forget">
                رمز عبور خود را فراموش کرده اید؟
              </Button>
              {needCaptcha && <Captcha setCaptchaKey={setCaptchaKey} />
              }
              <Stack pt={2} width="100%" spacing={2}>
                <LoadingButton
                  loading={isLoading}
                  variant="contained"
                  type="submit"
                  fullWidth
                  sx={{ py: 1.5 }}
                >
                  ورود
                </LoadingButton>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography fontSize={16} color="secondary">
                    حساب کاربری ندارید؟
                  </Typography>
                  <Button href="./signup">ثبت نام</Button>
                </Stack>
              </Stack>
            </Stack>
          </Form>
        )}
      </Formik>
    </AuthTemplate>
  );
};

export default Login;
