import { FC, ChangeEvent, useRef } from "react";
import {
  Button,
  Stack,
  Typography,
  Dialog,
  SxProps,
  Theme,
} from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { numberToWords } from "@persian-tools/persian-tools";
import { formikOnSubmitType } from "src/types/form.type";
import { BlurBackdrop } from "src/components/atoms/BlurBackdrop";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { SamanLogo } from "src/components/atoms/svg/SamanSvg";
import { ParsianLogo } from "src/components/atoms/svg/ParsianSvg";
import { usePostApiMyPortalPaymentCreateMutation } from "src/app/services/api.generated";

const selectedStyle: SxProps<Theme> = {
  border: 1,
  borderColor: "primary.main",
  color: "primary.main",
  boxShadow: "0px 2px 11px rgba(60, 138, 255, 0.44)",
};

const formInitialValues = {
  paymentProviderId: 1,
  amount: undefined,
};

const formValidation = yup.object().shape({
  paymentProviderId: yup.number(),
  amount: yup.number().min(1).required("فیلد الزامیست"),
});

type DepositDialogPropsType = { openDialog: boolean; handleClose: () => void };

export const DepositDialog: FC<DepositDialogPropsType> = ({
  openDialog,
  handleClose,
}) => {
  const [createDeposit, { isLoading }] =
    usePostApiMyPortalPaymentCreateMutation();

  const formRef = useRef(null);
  const formToken = useRef(null);
  const formRedirectURL = useRef(null);

  const submitHandler: formikOnSubmitType<typeof formInitialValues> = (
    { paymentProviderId, amount },
    { setSubmitting }
  ) => {
    if (amount === undefined) return;

    createDeposit({
      createPaymentModel: {
        paymentProviderId,
        amount,
      },
    })
      .unwrap()
      .then((res) => {
        if (!res || !res.location || !res.status) return;
        let a = document.createElement("a");
        a.href = res.location;
        a.click();
        toast.success("در حال انتقال به صفحه پرداخت");
      });
    setSubmitting(false);
  };

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        components={{ Backdrop: BlurBackdrop }}
        maxWidth="xs"
        fullWidth
        sx={{ "& .MuiPaper-root": { borderRadius: 2.5 } }}
      >
        <Formik
          initialValues={formInitialValues}
          validationSchema={formValidation}
          onSubmit={submitHandler}
        >
          {({ errors, touched, getFieldProps, setFieldValue }) => {
            const amount = getFieldProps("amount").value;
            const modeTen =
              amount % 10 === 0 ? "" : `و ${numberToWords(amount % 10)} ریال`;
            const onChangeAmount = (e: ChangeEvent<any>) =>
              setFieldValue(
                "amount",
                e.target.value.length === 0 ? undefined : +e.target.value
              );

            const paymentProvider = getFieldProps("paymentProviderId").value;

            return (
              <Form autoComplete="on">
                <Stack sx={{ boxShadow: 24, px: 1.5, py: 3 }} spacing={3}>
                  <Typography variant="text1" fontWeight="bold">
                    افزایش موجودی کیف پول
                  </Typography>
                  <Stack spacing={0.5}>
                    <DorsaTextField
                      placeholder="مبلغ مورد نیاز"
                      error={Boolean(errors.amount && touched.amount)}
                      helperText={touched.amount && errors.amount}
                      {...getFieldProps("amount")}
                      type="number"
                      value={amount === undefined ? "" : amount}
                      onChange={onChangeAmount}
                    />
                    <Stack
                      color="secondary.main"
                      px={1}
                      direction="row"
                      justifyContent="end"
                    >
                      {amount === undefined || amount > 999999999999999
                        ? ""
                        : amount === 0
                        ? "صفر تومان"
                        : amount < 10 && amount > 0
                        ? `${numberToWords(amount)} ریال`
                        : `${numberToWords(
                            Math.floor(amount / 10)
                          )} تومان ${modeTen}`}
                    </Stack>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    whiteSpace="nowrap"
                  >
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => setFieldValue("amount", 2000000)}
                      sx={amount === 2000000 ? selectedStyle : {}}
                    >
                      ۲,۰۰۰,۰۰۰ ریال
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => setFieldValue("amount", 5000000)}
                      sx={amount === 5000000 ? selectedStyle : {}}
                    >
                      ۵,۰۰۰,۰۰۰ ریال
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => setFieldValue("amount", 10000000)}
                      sx={amount === 10000000 ? selectedStyle : {}}
                    >
                      ۱۰,۰۰۰,۰۰۰ ریال
                    </Button>
                  </Stack>
                  {/* TODO: Add Charge Code Here */}
                  <Stack
                    spacing={2}
                    border={1}
                    borderRadius={2}
                    borderColor="secondary.light"
                    p={2}
                  >
                    <Typography variant="text14" color="secondary">
                      درگاه پرداخت
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      whiteSpace="nowrap"
                    >
                      <Button
                        onClick={() => setFieldValue("paymentProviderId", 1)}
                        variant="outlined"
                        color={paymentProvider === 1 ? "primary" : "secondary"}
                        sx={{
                          border:
                            paymentProvider === 1
                              ? "2px solid #3C8AFF !important"
                              : 1,
                          py: 1,
                        }}
                        fullWidth
                      >
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems={{ xs: "start", md: "end" }}
                        >
                          <ParsianLogo sx={{ fontSize: { xs: 20, md: 30 } }} />
                          <Typography variant="text14">بانک پارسیان</Typography>
                        </Stack>
                      </Button>
                      <Button
                        onClick={() => setFieldValue("paymentProviderId", 2)}
                        variant="outlined"
                        color={paymentProvider === 2 ? "primary" : "secondary"}
                        sx={{
                          border:
                            paymentProvider === 2
                              ? "2px solid #3C8AFF !important"
                              : 1,
                          py: 1,
                        }}
                        fullWidth
                      >
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems={{ xs: "start", md: "end" }}
                        >
                          <SamanLogo sx={{ fontSize: { xs: 20, md: 30 } }} />
                          <Typography variant="text14">بانک سامان</Typography>
                        </Stack>
                      </Button>
                    </Stack>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={0.5}
                    alignItems="center"
                    justifyContent="end"
                  >
                    <Button
                      variant="outlined"
                      color="secondary"
                      sx={{ py: 1, borderRadius: 1.5 }}
                      onClick={handleClose}
                    >
                      انصراف
                    </Button>
                    <LoadingButton
                      loading={isLoading}
                      variant="contained"
                      component="button"
                      type="submit"
                      sx={{ py: 1, borderRadius: 1.5 }}
                    >
                      پرداخت آنلاین
                    </LoadingButton>
                  </Stack>
                </Stack>
              </Form>
            );
          }}
        </Formik>
      </Dialog>
      <form
        action="https://sep.shaparak.ir/payment.aspx"
        method="POST"
        ref={formRef}
      >
        <input ref={formToken} type="hidden" name="Token" value="token" />
        <input
          ref={formRedirectURL}
          type="hidden"
          name="RedirectURL"
          value="redirect"
        />
      </form>
    </>
  );
};
