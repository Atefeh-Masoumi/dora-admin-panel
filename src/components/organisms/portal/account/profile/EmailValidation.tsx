import { FC, useState } from "react";
import { Box, Button, Chip, Divider, Stack, Typography } from "@mui/material";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import Countdown from "react-countdown";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { emailValidator } from "src/utils/formValidator";
import {
  useGetApiMyAccountProfileGetQuery,
  usePostApiMyAccountProfileConfirmEmailMutation,
  usePutApiMyAccountProfileEditEmailMutation,
} from "src/app/services/api.generated";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { formikOnSubmitType } from "src/types/form.type";
import { CodeField } from "src/components/atoms/CodeField";
import { BORDER_RADIUS_1 } from "src/configs/theme";

const validationSchema = yup.object().shape({
  email: emailValidator.required("شماره موبایل الزامیست."),
});

type EmailValidationProps = {};

export const EmailValidation: FC<EmailValidationProps> = () => {
  const [isCodeField, setIsCodeField] = useState(false);
  const [countDownDate, setCountDownDate] = useState(Date.now() + 120000);
  const [confirmCode, setConfirmCode] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  const { data } = useGetApiMyAccountProfileGetQuery();

  const [sendEmail, { isLoading }] =
    usePutApiMyAccountProfileEditEmailMutation();

  const onSubmit: formikOnSubmitType<{ email: string }> = (
    { email },
    { setSubmitting }
  ) => {
    sendEmail({ editEmailModel: { email } })
      .unwrap()
      .then((res) => {
        toast.success("کد تایید به ایمیل شما ارسال شد");
        setIsCodeField(true);
      })
      .catch((err) => {});
    setSubmitting(false);
  };

  const haveNull = confirmCode.some((code) => code === null);

  const [confirm, { isLoading: loadingConfirm }] =
    usePostApiMyAccountProfileConfirmEmailMutation();

  const submitConfirm = () => {
    if (haveNull) return;
    confirm({ confirmEmailModel: { confirmCode: confirmCode.join("") } })
      .unwrap()
      .then((res) => {
        if (!res) return;
        setIsCodeField(false);
        toast.success("ایمیل با موفقیت تایید شد");
      })
      .catch((res) => {});
  };

  return (
    <Formik
      initialValues={{
        email: data?.email || "",
      }}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, getFieldProps }) => {
        const input = getFieldProps("email").value;

        return (
          <Form autoComplete="on">
            <Stack
              sx={{
                px: { xs: 1.8, lg: 2 },
                py: { xs: 1.8, lg: 2.25 },
                borderRadius: BORDER_RADIUS_1,
                backgroundColor: "white",
                height: "100%",
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ px: 3 }}
              >
                <Typography
                  variant="text1"
                  fontWeight={500}
                  color="secondary"
                  sx={{ pt: 1.1, pb: 1 }}
                >
                  پست الکترونیکی
                </Typography>
                {data?.emailConfirmed ? (
                  <Chip
                    label="تایید شده"
                    sx={{
                      color: "rgba(13, 191, 102, 1)",
                      backgroundColor: "rgba(218, 246, 232, 1)",
                      borderRadius: 1,
                      fontSize: "14px",
                      p: 0.5,
                    }}
                  />
                ) : (
                  <Chip
                    label="احراز هویت نشده"
                    sx={{
                      color: "rgba(244, 95, 80, 1)",
                      backgroundColor: "rgba(244, 95, 80, 0.12)",
                      borderRadius: 1,
                      fontSize: "14px",
                      p: 0.5,
                    }}
                  />
                )}
              </Stack>
              <Divider variant="middle" sx={{ my: 1 }} />
              <Stack px={1} pt={2} spacing={1}>
                {isCodeField && (
                  <Typography variant="text9" color="secondary">
                    کد تایید به ایمیل {input} ارسال شد
                  </Typography>
                )}
                <Box>
                  {isCodeField ? (
                    <CodeField
                      characters={confirmCode}
                      setCharacters={setConfirmCode}
                    />
                  ) : (
                    <DorsaTextField
                      error={Boolean(errors.email && touched.email)}
                      helperText={touched.email && errors.email}
                      {...getFieldProps("email")}
                      placeholder="ایمیل"
                      fullWidth
                      inputProps={{ dir: "ltr" }}
                    />
                  )}
                </Box>
                <Stack
                  direction="row"
                  justifyContent={{ xs: "center", md: "space-between" }}
                  py={2}
                  alignItems="center"
                >
                  <Box>
                    {isCodeField && (
                      <Box>
                        {countDownDate > Date.now() ? (
                          <Countdown
                            date={countDownDate}
                            renderer={({ minutes, seconds }) => (
                              <Typography
                                color="secondary"
                                sx={{ fontVariantNumeric: "tabular-nums" }}
                              >
                                ارسال مجدد کد تایید تا{" "}
                                {("00" + minutes).slice(-2)}:
                                {("00" + seconds).slice(-2)}
                              </Typography>
                            )}
                            onComplete={() => setCountDownDate(Date.now())}
                          />
                        ) : (
                          <Button
                            component="button"
                            type="submit"
                            color="primary"
                          >
                            ارسال مجدد کد تایید
                          </Button>
                        )}
                      </Box>
                    )}
                  </Box>

                  <LoadingButton
                    component="button"
                    type={isCodeField ? "button" : "submit"}
                    loading={isCodeField ? loadingConfirm : isLoading}
                    variant="contained"
                    sx={{ px: 3, py: 1, fontSize: 16 }}
                    onClick={isCodeField ? submitConfirm : () => {}}
                  >
                    تایید و تغییر ایمیل
                  </LoadingButton>
                </Stack>
              </Stack>
            </Stack>
          </Form>
        );
      }}
    </Formik>
  );
};
