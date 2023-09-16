import { FC, useState } from "react";
import { Box, Button, Chip, Divider, Stack, Typography } from "@mui/material";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import Countdown from "react-countdown";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import {
  usePostApiAccountProfileConfirmPhoneNumberMutation,
  usePutApiAccountProfileEditPhoneNumberMutation,
} from "src/app/services/api.generated";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { phoneNumberValidator } from "src/utils/formValidator";
import { formikOnSubmitType } from "src/types/form.type";
import { CodeField } from "src/components/atoms/CodeField";

const formValidation = yup.object().shape({
  phoneNumber: phoneNumberValidator.required("شماره موبایل الزامیست."),
});

type MobileValidationProps = {
  isVerified?: boolean;
  phoneNumber?: string | any;
};

export const MobileValidation: FC<MobileValidationProps> = ({
  isVerified,
  phoneNumber,
}) => {
  const [sendMessage, { isLoading }] =
    usePutApiAccountProfileEditPhoneNumberMutation();
  const [isCodeField, setIsCodeField] = useState(false);
  const [countDownDate, setCountDownDate] = useState(Date.now() + 120000);

  const submitHandler: formikOnSubmitType<{ phoneNumber?: string }> = (
    { phoneNumber },
    { setSubmitting }
  ) => {
    if (!phoneNumber) return;
    sendMessage({ editPhoneNumberModel: { phoneNumber } })
      .unwrap()
      .then(() => {
        toast.success("کد تایید به موبایل شما ارسال شد");
      })
      .catch(
        ({ status }: { status: number }) =>
          (status === 401 || status === 404) &&
          toast.error("Something went wrong")
      );
    setIsCodeField(true);
    setSubmitting(false);
  };

  const [confirmCode, setConfirmCode] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const haveNull = confirmCode.some((code) => code === null);

  const [confirm, { isLoading: loadingConfirm }] =
    usePostApiAccountProfileConfirmPhoneNumberMutation();

  const submitConfirm = () => {
    if (haveNull) return;
    confirm({
      confirmPhoneNumberModel: { confirmCode: confirmCode.join("") },
    }).then(() => {
      setIsCodeField(false);
      toast.success("شماره با موفقیت تایید شد");
    });
  };

  return (
    <Formik
      initialValues={{ phoneNumber }}
      validationSchema={formValidation}
      onSubmit={submitHandler}
    >
      {({ errors, touched, getFieldProps }) => {
        const input = getFieldProps("phoneNumber").value;

        return (
          <Form autoComplete="on">
            <Stack
              sx={{
                px: { xs: 1.8, lg: 2 },
                py: { xs: 1.8, lg: 2.25 },
                borderRadius: 2,
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
                  شماره موبایل
                </Typography>
                {isVerified ? (
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
                    کد تایید به شماره موبایل {input} ارسال شد
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
                      error={Boolean(errors.phoneNumber && touched.phoneNumber)}
                      helperText={touched.phoneNumber && errors.phoneNumber}
                      {...getFieldProps("phoneNumber")}
                      placeholder="شماره موبایل"
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
                    sx={{ px: 4, py: 2, fontSize: 16 }}
                    onClick={isCodeField ? submitConfirm : () => {}}
                  >
                    تایید و تغییر شماره تماس
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
