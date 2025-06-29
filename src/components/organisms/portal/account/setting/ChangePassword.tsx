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
import { useNavigate } from "react-router";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { formikOnSubmitType } from "src/types/form.type";
import { passwordValidatorRegex } from "src/utils/formValidator";
import { usePostApiMyAccountProfileChangePasswordMutation } from "src/app/services/api.generated";
import { BORDER_RADIUS_1 } from "src/configs/theme";

const passValidationHandler = (value: string) =>
  !value ? false : passwordValidatorRegex.test(value);

const formInitialValues = {
  currentPassword: "",
  password: "",
};

const formValidation = yup.object().shape({
  password: yup
    .string()
    .test("Password validation", "رمز عبور معتبر نیست. لطفا قوانین رمز عبور را رعایت کنید", (value) =>
      passValidationHandler(value as string)
    ),
  currentPassword: yup.string().required("پسورد قدیمی را وارد نمایید")
});
export const ChangePassword: FC = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  const [changePassword, { isLoading }] =
    usePostApiMyAccountProfileChangePasswordMutation();

  const navigate = useNavigate();

  const submitHandler: formikOnSubmitType<typeof formInitialValues> = (
    { currentPassword, password },
    { setSubmitting }
  ) => {
    changePassword({
      changePasswordModel: { currentPassword, password },
    })
      .unwrap()
      .then(() => {
        navigate("/");
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
              borderRadius: BORDER_RADIUS_1,
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
                  error={Boolean(
                    errors.currentPassword && touched.currentPassword
                  )}
                  {...getFieldProps("currentPassword")}
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
                  inputProps={{ dir: "ltr" }}
                  helperText={touched.currentPassword && errors.currentPassword}
                />
                <DorsaTextField
                  error={Boolean(errors.password && touched.password)}
                  {...getFieldProps("password")}
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
                  inputProps={{ dir: "ltr" }}
                  helperText={touched.password && errors.password}
                />
                <Stack
                  direction="column"
                  spacing={1}
                  color={
                    touched.currentPassword && errors.currentPassword
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
