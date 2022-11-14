import { FC, useState } from "react";
import {
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import * as yup from "yup";
import { Form, Formik } from "formik";
import {
  passwordValidator,
  passwordValidatorRegex,
} from "src/utils/formValidator";
import { formikOnSubmitType } from "src/types/form.type";
import { usePostApiV2PortalProfileChangePasswordMutation } from "src/app/services/api.generated";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const passValidationHandler = (value: string) =>
  !value ? false : passwordValidatorRegex.test(value);

const formInitialValues = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const formValidation = yup.object().shape({
  oldPassword: yup
    .string()
    .test("Password validation", "Password is not valid", (value) =>
      passValidationHandler(value as string)
    ),
  newPassword: passwordValidator.required("فیلد الزامیست"),
  confirmPassword: passwordValidator.required("فیلد الزامیست"),
});

export const ChangePassword: FC = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [changePassword, { isLoading }] =
    usePostApiV2PortalProfileChangePasswordMutation();

  const submitHandler: formikOnSubmitType<typeof formInitialValues> = (
    { oldPassword, newPassword, confirmPassword },
    { setSubmitting }
  ) => {
    changePassword({
      changePasswordModel: { oldPassword, newPassword, confirmPassword },
    })
      .unwrap()
      .then(() => {
        toast.success("رمز عبور با موفقیت انجام شد");
      })
      .catch(({ status, data }) => {
        if (status === 401 || status === 404) toast.error("گذرواژه اشتباه است");
        else toast.error(data[""][0]);
      });
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={formInitialValues}
      validationSchema={formValidation}
      onSubmit={submitHandler}
    >
      {({ errors, touched, getFieldProps }) => (
        <Form autoComplete="on">
          <Stack
            sx={{
              width: { xs: "100%" },
              px: { xs: 1.8, lg: 3 },
              py: { xs: 1.8, lg: 2.25 },
              backgroundColor: "white",
              borderRadius: 2,
            }}
          >
            <Typography variant="text1" color="secondary" sx={{ pt: 1.1 }}>
              تغییر رمز عبور
            </Typography>
            <Divider variant="middle" sx={{ my: 2.5 }} />
            <Stack direction="row" justifyContent="center">
              <Stack
                direction="column"
                spacing={1.5}
                width="100%"
                maxWidth="450px"
                justifyContent="center"
                my={2}
              >
                <DorsaTextField
                  error={Boolean(errors.oldPassword && touched.oldPassword)}
                  {...getFieldProps("oldPassword")}
                  type={showOldPassword ? "text" : "password"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          onClick={() => setShowOldPassword(!showOldPassword)}
                          edge="start"
                        >
                          {showOldPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  label="رمز عبور فعلی"
                  fullWidth
                  dir="ltr"
                />
                <DorsaTextField
                  error={Boolean(errors.newPassword && touched.newPassword)}
                  {...getFieldProps("newPassword")}
                  type={showNewPassword ? "text" : "password"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          edge="start"
                        >
                          {showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  label="رمز عبور جدید"
                  fullWidth
                  dir="ltr"
                />
                <DorsaTextField
                  error={Boolean(
                    errors.confirmPassword && touched.confirmPassword
                  )}
                  {...getFieldProps("confirmPassword")}
                  type={showConfirmPassword ? "text" : "password"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          edge="start"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  label="تکرار رمز عبور"
                  fullWidth
                  dir="ltr"
                />
                <Stack
                  direction="column"
                  spacing={1}
                  color={
                    touched.oldPassword && errors.oldPassword
                      ? "error.main"
                      : "secondary.main"
                  }
                >
                  <Typography variant="text1">رمز عبور میبایست:</Typography>
                  <Stack spacing={0.5} pl={2}>
                    <Typography variant="text9">
                      حداقل ۸ کاراکتر باشد
                    </Typography>
                    <Typography variant="text9">
                      ترکیبی از حروف کوچک و بزرگ باشد
                    </Typography>
                    <Typography variant="text9">شامل اعداد باشد</Typography>
                    <Typography variant="text9">
                      شامل کاراکترهای خاص (نمادها) باشد
                    </Typography>
                  </Stack>
                </Stack>
                <Stack direction="row" justifyContent="center">
                  <LoadingButton
                    loading={isLoading}
                    component="button"
                    type="submit"
                    color="primary"
                    variant="contained"
                    sx={{ px: 7, py: 2 }}
                  >
                    تغییر رمز عبور
                  </LoadingButton>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};
