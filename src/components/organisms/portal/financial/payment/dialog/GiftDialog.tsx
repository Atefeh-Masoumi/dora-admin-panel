import { FC } from "react";
import { Button, Stack, Dialog, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { formikOnSubmitType } from "src/types/form.type";
import { BlurBackdrop } from "src/components/atoms/BlurBackdrop";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { usePostApiMyPortalVoucherUseMutation } from "src/app/services/api.generated";
import { BORDER_RADIUS_1 } from "src/configs/theme";

const formInitialValues = {
  giftCode: "",
};

const formValidation = yup.object().shape({
  giftCode: yup
    .string()
    .min(3, "کد هدیه نباید کمتر از ۳ کارکتر باشد")
    .max(50, "کد هدیه نباید بیشتر از ۵۰ کارکتر باشد"),
});

type GiftDialogPropsType = { openDialog: boolean; handleClose: () => void };

export const GiftDialog: FC<GiftDialogPropsType> = ({
  openDialog,
  handleClose,
}) => {
  const [addGift, { isLoading }] = usePostApiMyPortalVoucherUseMutation();

  const submitHandler: formikOnSubmitType<typeof formInitialValues> = (
    { giftCode },
    { setSubmitting }
  ) => {
    if (!giftCode || giftCode.length < 3) {
      toast.warning("لطفاً ابتدا کد هدیه خود را وارد کنید");
      return;
    }
    addGift({
      useVoucherModel: {
        voucherCode: giftCode,
      },
    })
      .unwrap()
      .then(() => {
        toast.success("کد هدیه با موفقیت اعمال شد");
        handleClose();
      })
      .catch((err) => {});
    setSubmitting(false);
  };

  return (
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
          return (
            <Form autoComplete="on">
              <Stack sx={{ boxShadow: 24, px: 1.5, py: 3 }} spacing={3}>
                <Typography align="center" variant="text1" fontWeight="bold">
                  افزایش موجودی با کد هدیه
                </Typography>
                <Stack
                  direction="row"
                  // alignItems="center"
                  sx={{ width: "100%" }}
                  justifyContent="space-between"
                  p={1}
                  border="1px solid #eee"
                  borderRadius={BORDER_RADIUS_1}
                >
                  <DorsaTextField
                    placeholder="کد هدیه خود را در این محل وارد کنید"
                    error={Boolean(errors.giftCode && touched.giftCode)}
                    helperText={touched.giftCode && errors.giftCode}
                    {...getFieldProps("giftCode")}
                    type="string"
                    sx={{ width: "75%" }}
                    inputProps={{
                      style: {
                        padding: "10px",
                      },
                    }}
                  />
                  <LoadingButton
                    loading={isLoading}
                    variant="contained"
                    type="submit"
                    size="large"
                    sx={{ py: 1, borderRadius: 1.5, maxHeight: 40 }}
                  >
                    ثبت کد
                  </LoadingButton>
                </Stack>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{ py: 1, borderRadius: 1.5 }}
                  onClick={handleClose}
                >
                  انصراف
                </Button>
                <Stack
                  direction="row"
                  spacing={0.5}
                  alignItems="center"
                  justifyContent="end"
                ></Stack>
              </Stack>
            </Form>
          );
        }}
      </Formik>
    </Dialog>
  );
};
