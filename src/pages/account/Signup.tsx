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
import * as yup from "yup";
import {
  emailValidator,
  passwordValidatorRegex,
  phoneNumberValidator,
} from "src/utils/formValidator";
import {
  useGetApiMyAccountCaptchaQuery,
  usePostApiMyAccountRegisterMutation,
} from "src/app/services/api.generated";
import { useNavigate } from "react-router-dom";
import { formikOnSubmitType } from "src/types/form.type";
import { toast } from "react-toastify";
import { Form, Formik } from "formik";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Captcha } from "src/components/molecules/Captcha";
import { captchaRegex } from "src/utils/regexUtils";
import LoadingButton from "src/components/atoms/LoadingButton";

const passValidationHandler = (value: string) =>
  !value ? false : passwordValidatorRegex.test(value);

const formInitialValues = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  password: "",
  referralCode: "",
  captchaCode: "",
};

const formValidation = yup.object().shape({
  firstName: yup.string().required("نام الزامیست!"),
  lastName: yup.string().required("نام خانوادگی الزامیست!"),
  phoneNumber: phoneNumberValidator.required("شماره موبایل الزامیست."),
  email: emailValidator.required("ایمیل الزامیست!"),
  password: yup
    .string()
    .test("Password validation", "Password is not valid", (value) =>
      passValidationHandler(value as string)
    ),
  captchaCode: yup.string().required("عبارت امنیتی الزامی است"),
  referralCode: yup.string(),
});

const Signup: FC = () => {
  const [captchaKey, setCaptchaKey] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [registerUser, { isLoading }] = usePostApiMyAccountRegisterMutation();

  const navigate = useNavigate();

  const { refetch: refetchCaptchaData } = useGetApiMyAccountCaptchaQuery();

  const submitHandler: formikOnSubmitType<typeof formInitialValues> = (
    {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      referralCode,
      captchaCode,
    },
    { setSubmitting }
  ) => {
    if (!captchaRegex.test(captchaCode)) {
      toast.error("ساختار عبارت امنیتی وارد شده صحیح نمی‌باشد");
      setSubmitting(false);
      return;
    }
    registerUser({
      registerModel: {
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
        referralCode,
        captchaKey: captchaKey,
        captchaCode: captchaCode,
      },
    })
      .unwrap()
      .then(() => {
        toast.success("شما با موفقیت ثبت نام شدید");
        navigate("/");
      })
      .catch(({ status }: { status: number }) => {
        (status === 401 || status === 404) &&
          toast.error("ایمیل یا گذرواژه اشتباه است!");
      });
    setSubmitting(false);
    refetchCaptchaData();
  };

  return (
    <AuthTemplate title="ثبت نام">
      <Formik
        initialValues={formInitialValues}
        validationSchema={formValidation}
        onSubmit={submitHandler}
      >
        {({ errors, touched, getFieldProps }) => (
          <Form autoComplete="on">
            <Stack spacing={1} alignItems="start">
              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={1}
                width="100%"
              >
                <DorsaTextField
                  error={Boolean(errors.firstName && touched.firstName)}
                  helperText={errors.firstName}
                  {...getFieldProps("firstName")}
                  autoFocus
                  label="نام"
                  fullWidth
                />
                <DorsaTextField
                  error={Boolean(errors.lastName && touched.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  {...getFieldProps("lastName")}
                  label="نام خانوادگی"
                  fullWidth
                />
              </Stack>
              <DorsaTextField
                error={Boolean(errors.phoneNumber && touched.phoneNumber)}
                helperText={touched.phoneNumber && errors.phoneNumber}
                {...getFieldProps("phoneNumber")}
                label="موبایل"
                fullWidth
                inputProps={{ dir: "ltr" }}
              />
              <DorsaTextField
                error={Boolean(errors.email && touched.email)}
                helperText={touched.email && errors.email}
                {...getFieldProps("email")}
                label="ایمیل"
                fullWidth
                inputProps={{ dir: "ltr" }}
              />
              <DorsaTextField
                error={Boolean(errors.password && touched.password)}
                {...getFieldProps("password")}
                type={showPassword ? "text" : "password"}
                label="رمز عبور"
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
              <DorsaTextField
                error={Boolean(errors.referralCode && touched.referralCode)}
                helperText={touched.referralCode && errors.referralCode}
                {...getFieldProps("referralCode")}
                label="کد معرف (اختیاری)"
                fullWidth
                dir="ltr"
              />
              <Captcha
                error={errors.captchaCode}
                touched={touched.captchaCode}
                setCaptchaKey={setCaptchaKey}
              />
              <Stack pt={2} width="100%" spacing={2}>
                <LoadingButton
                  type="submit"
                  loading={isLoading}
                  variant="contained"
                  fullWidth
                  sx={{ py: 1.5 }}
                >
                  ثبت نام
                </LoadingButton>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  justifyContent="center"
                  width="100%"
                >
                  <Typography fontSize={16} color="secondary">
                    حساب کاربری دارید؟
                  </Typography>
                  <Button href="./login">ورود</Button>
                </Stack>
              </Stack>
            </Stack>
          </Form>
        )}
      </Formik>
    </AuthTemplate>
  );
};

export default Signup;
