import { LoadingButton } from "@mui/lab";
import { Button, Dialog, DialogProps, Stack, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { FC, useRef } from "react";
import { toast } from "react-toastify";
import { usePostApiMyPortalOfferPaymentMutation } from "src/app/services/api.generated";
import { BlurBackdrop } from "src/components/atoms/BlurBackdrop";
import { ParsianLogo } from "src/components/atoms/svg-icons/ParsianSvg";
import { SamanLogo } from "src/components/atoms/svg-icons/SamanSvg";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { formikOnSubmitType } from "src/types/form.type";
import * as yup from "yup";

type OfferDetailType = {
  name: string;
  offerId: number | null;
};

const formInitialValues = {
  paymentProviderId: 1,
};

const formValidation = yup.object().shape({
  paymentProviderId: yup.number(),
});

export const PurchaseOrderOfferDialog: FC<DialogProps & OfferDetailType> = ({
  name,
  offerId,
  ...props
}) => {
  const formRef = useRef(null);
  const formToken = useRef(null);
  const formRedirectURL = useRef(null);

  const [callOfferPayment, { isLoading }] =
    usePostApiMyPortalOfferPaymentMutation();

  const submitHandler: formikOnSubmitType<typeof formInitialValues> = (
    { paymentProviderId },
    { setSubmitting }
  ) => {
    callOfferPayment({
      paymentModel: {
        offerId: Number(offerId),
        paymentProviderId: Number(paymentProviderId),
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

  const closeDialogHandler = (event: {}) => {
    if (!props.onClose) return;
    props.onClose(event, "escapeKeyDown");
  };

  return (
    <>
      <Dialog
        {...props}
        onClose={closeDialogHandler}
        components={{ Backdrop: BlurBackdrop }}
        sx={{ "& .MuiPaper-root": { borderRadius: BORDER_RADIUS_1 } }}
      >
        <Formik
          initialValues={formInitialValues}
          validationSchema={formValidation}
          onSubmit={submitHandler}
        >
          {({ errors, touched, getFieldProps, setFieldValue }) => {
            const paymentProvider = getFieldProps("paymentProviderId").value;

            return (
              <Form autoComplete="on">
                <Stack sx={{ boxShadow: 24, px: 1.5, py: 3 }} spacing={3}>
                  <Typography variant="text1" fontWeight="bold">
                    خرید {name}
                  </Typography>
                  <Stack
                    spacing={2}
                    border={1}
                    borderRadius={BORDER_RADIUS_1}
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
                      onClick={closeDialogHandler}
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
