import { FC } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { AuthTemplate } from "src/components/templates/AuthTemplate";
import { usePostApiAccountForgotMutation } from "src/app/services/api.generated";
import { formikOnSubmitType } from "src/types/form.type";
import { emailValidator } from "src/utils/formValidator";

const formInitialValues = { email: "" };

const formValidation = yup.object().shape({
  email: emailValidator.required("ایمیل الزامیست!"),
});

type ForgetPassPropsType = { goNext: () => void };

export const ForgetPass: FC<ForgetPassPropsType> = ({ goNext }) => {
  const [sendMail, { isLoading }] = usePostApiAccountForgotMutation();

  const submitHandler: formikOnSubmitType<typeof formInitialValues> = (
    { email },
    { setSubmitting }
  ) => {
    if (!email) return;
    sendMail({ forgotModel: { email } })
      .unwrap()
      .then(() => {
        toast.success("کد تایید بصورت ایمیل ارسال شد");
        goNext();
      });
    setSubmitting(false);
  };

  return (
    <AuthTemplate title="فراموشی رمز عبور">
      <Formik
        initialValues={formInitialValues}
        validationSchema={formValidation}
        onSubmit={submitHandler}
      >
        {({ errors, touched, getFieldProps, values }) => (
          <Form autoComplete="on">
            <Stack spacing={1} alignItems="start">
              <Stack spacing={1} alignItems="start" pb={2} width="100%">
                <Typography fontSize={14} color="secondary">
                  برای بازیابی رمزعبور لطفا ایمیل حساب کاربری خود را وارد کنید.
                </Typography>
                <DorsaTextField
                  error={Boolean(errors.email && touched.email)}
                  label="ایمیل"
                  helperText={touched.email && errors.email}
                  fullWidth
                  {...getFieldProps("email")}
                  inputProps={{ dir: "ltr" }}
                />
              </Stack>
              <LoadingButton
                disabled={Boolean(!values.email || errors.email)}
                loading={isLoading}
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
