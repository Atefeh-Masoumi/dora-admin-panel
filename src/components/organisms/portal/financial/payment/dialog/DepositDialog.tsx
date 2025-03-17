import { LoadingButton } from "@mui/lab";
import {
  Button,
  CircularProgress,
  Dialog,
  Grid,
  Grid2,
  Stack,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import { numberToWords } from "@persian-tools/persian-tools";
import { Form, Formik } from "formik";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { BlurBackdrop } from "src/components/atoms/BlurBackdrop";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { ParsianLogo } from "src/components/atoms/svg-icons/ParsianSvg";
import { SamanLogo } from "src/components/atoms/svg-icons/SamanSvg";
import FanavaLogo from "src/components/atoms/svg-icons/fanava.png";
import MellatLogo from "src/components/atoms/svg-icons/mellat.png";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { formikOnSubmitType } from "src/types/form.type";
import * as yup from "yup";
import {
  CreatePaymentResponse,
  useGetApiMyPortalPaymentProviderListQuery,
  usePostApiMyPortalPaymentCreateMutation,
} from "src/app/services/api.generated";

const selectedStyle: SxProps<Theme> = {
  border: 1,
  borderColor: "primary.main",
  color: "primary.main",
  boxShadow: "0px 2px 11px rgba(60, 138, 255, 0.44)",
};

const formInitialValues = {
  paymentProviderId: 0,
  amount: undefined,
};

const formValidation = yup.object().shape({
  paymentProviderId: yup.number(),
  amount: yup.number().min(1).required("فیلد الزامیست"),
});

type DepositDialogPropsType = { openDialog: boolean; handleClose: () => void };

interface MellatCreatePaymentResponse extends CreatePaymentResponse {
  phoneNumber: string;
  refId: string;
}

export const DepositDialog: FC<DepositDialogPropsType> = ({
  openDialog,
  handleClose,
}) => {
  const [mellatResponseRefId, setMellatResponseRefId] = useState("");
  const [mellatResponsePhoneNumber, setMellatResponsePhoneNumber] =
    useState("");
  const [createDeposit, { isLoading }] =
    usePostApiMyPortalPaymentCreateMutation();

  const { data: paymentProviderList, isLoading: paymentProviderListLoading } =
    useGetApiMyPortalPaymentProviderListQuery();

  const formRef = useRef<HTMLFormElement | null>(null);

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
        if (paymentProviderId === 4) {
          const mellatProviderRes = res as MellatCreatePaymentResponse;
          setMellatResponseRefId(mellatProviderRes.refId);
          setMellatResponsePhoneNumber(mellatProviderRes.phoneNumber);
        } else {
          if (!res || !res.location || !res.status) return;
          window.location.href = res.location;
          toast.success("در حال انتقال به صفحه پرداخت");
        }
      })
      .catch((err) => { });
    setSubmitting(false);
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
        open={openDialog}
        onClose={handleClose}
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
                    <Grid2 container rowSpacing={1} columnSpacing={1}>
                      {paymentProviderListLoading ? (
                        <CircularProgress sx={{ margin: "0 auto" }} />
                      ) : (
                        paymentProviderList
                          ?.filter((provider) => provider.status) // Filter enabled providers
                          .map((provider) => {
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
                                  disabled={!provider?.status}
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
                    </Grid2>
                  </Stack>
                  <Stack direction="row" justifyContent="end" spacing={1}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      sx={{ px: 3, py: 0.8 }}
                      onClick={handleClose}
                    >
                      انصراف
                    </Button>
                    <LoadingButton
                      component="button"
                      type="submit"
                      loading={isLoading}
                      variant="contained"
                      sx={{ px: 3, py: 0.8 }}
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
