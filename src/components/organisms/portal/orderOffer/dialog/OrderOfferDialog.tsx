import { LoadingButton } from "@mui/lab";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogProps,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { FC, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  CreatePaymentResponse,
  useGetApiMyPortalPaymentProviderListQuery,
  usePostApiMyPortalOfferPayMutation,
} from "src/app/services/api.generated";
import { BlurBackdrop } from "src/components/atoms/BlurBackdrop";
import { ParsianLogo } from "src/components/atoms/svg-icons/ParsianSvg";
import { SamanLogo } from "src/components/atoms/svg-icons/SamanSvg";
import FanavaLogo from "src/components/atoms/svg-icons/fanava.png";
import MellatLogo from "src/components/atoms/svg-icons/mellat.png";
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

interface MellatCreatePaymentResponse extends CreatePaymentResponse {
  phoneNumber: string;
  refId: string;
}

export const PurchaseOrderOfferDialog: FC<DialogProps & OfferDetailType> = ({
  name,
  offerId,
  ...props
}) => {
  const [mellatResponseRefId, setMellatResponseRefId] = useState("");
  const [mellatResponsePhoneNumber, setMellatResponsePhoneNumber] =
    useState("");
  const formRef = useRef<HTMLFormElement | null>(null);

  const [callOfferPayment, { isLoading }] =
    usePostApiMyPortalOfferPayMutation();

  const { data: paymentProviderList, isLoading: paymentProviderListLoading } =
    useGetApiMyPortalPaymentProviderListQuery();

  const submitHandler: formikOnSubmitType<typeof formInitialValues> = (
    { paymentProviderId },
    { setSubmitting }
  ) => {
    callOfferPayment({
      orderOfferPayModel: {
        offerId: Number(offerId),
        paymentProviderId: Number(paymentProviderId),
      },
    })
      .unwrap()
      .then((res) => {
        if (paymentProviderId === 4) {
          const mellatProviderRes = res as MellatCreatePaymentResponse;
          setMellatResponseRefId(mellatProviderRes.refId);
          setMellatResponsePhoneNumber(mellatProviderRes.phoneNumber);
        } else {
          if (!res || !res.location || !res.status) return;
          let a = document.createElement("a");
          a.href = res.location;
          a.click();
          toast.success("در حال انتقال به صفحه پرداخت");
        }
      })
      .catch(() => {});
    setSubmitting(false);
  };

  const closeDialogHandler = (event: {}) => {
    if (!props.onClose) return;
    props.onClose(event, "escapeKeyDown");
  };

  const renderProviderLogo = (photoName: string) => {
    switch (photoName) {
      case "parsian":
        return (
          <ParsianLogo
            sx={{
              fontSize: { xs: 20, md: 30 },
            }}
          />
        );
      case "saman":
        return (
          <SamanLogo
            sx={{
              fontSize: { xs: 20, md: 30 },
            }}
          />
        );
      case "fanava":
        return <img src={FanavaLogo} alt={"fanava-logo"} width={"70px"} />;
      case "mellat":
        return (
          <img
            src={MellatLogo}
            alt={"mellat-logo"}
            width={"30px"}
            height={"30px"}
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    if (formRef.current && mellatResponseRefId && mellatResponsePhoneNumber) {
      formRef.current.submit();
    }
  }, [formRef.current, mellatResponseRefId, mellatResponsePhoneNumber]);

  return (
    <>
      <Dialog
        {...props}
        onClose={closeDialogHandler}
        components={{ Backdrop: BlurBackdrop }}
        maxWidth="xs"
        fullWidth
        sx={{ "& .MuiPaper-root": { borderRadius: BORDER_RADIUS_1 } }}
      >
        <Formik
          initialValues={formInitialValues}
          validationSchema={formValidation}
          onSubmit={submitHandler}
        >
          {({ getFieldProps, setFieldValue }) => {
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
                    <Grid container rowSpacing={1} columnSpacing={1}>
                      {paymentProviderListLoading ? (
                        <CircularProgress sx={{ margin: "0 auto" }} />
                      ) : (
                        paymentProviderList?.map((provider) => {
                          return (
                            <Grid key={provider.id} item xs={5.7}>
                              <Button
                                onClick={() =>
                                  setFieldValue(
                                    "paymentProviderId",
                                    provider.id
                                  )
                                }
                                variant="outlined"
                                color={
                                  paymentProvider === provider.id
                                    ? "primary"
                                    : "secondary"
                                }
                                sx={{
                                  border:
                                    paymentProvider === provider.id
                                      ? "2px solid #3C8AFF !important"
                                      : 1,
                                  py: 1,
                                }}
                                fullWidth
                                disabled={provider?.status}
                              >
                                <Stack
                                  direction="row"
                                  spacing={1}
                                  alignItems={{ xs: "start", md: "end" }}
                                >
                                  {renderProviderLogo(
                                    String(provider.photoName)
                                  )}
                                  <Typography variant="text14">
                                    {provider.name}
                                  </Typography>
                                </Stack>
                              </Button>
                            </Grid>
                          );
                        })
                      )}
                    </Grid>
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
        action={"https://bpm.shaparak.ir/pgwchannel/startpay.mellat"}
        method="POST"
        ref={formRef}
      >
        <input
          type="hidden"
          name="MobileNo"
          id="MobileNo"
          value={mellatResponsePhoneNumber}
        />
        <input
          type="hidden"
          name="RefId"
          id="RefId"
          value={mellatResponseRefId}
        />
      </form>
    </>
  );
};
