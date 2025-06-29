import { FC } from "react";
import { Button, Dialog, Stack, Typography } from "@mui/material";
import { BlurBackdrop } from "src/components/atoms/BlurBackdrop";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { LoadingButton } from "@mui/lab";
import {
  usePostApiMyDnsCdnEdgeCertCreateUserCertMutation,
} from "src/app/services/api.generated";
import { formikOnSubmitType } from "src/types/form.type";
import { toast } from "react-toastify";
import { BORDER_RADIUS_1 } from "src/configs/theme";

type AddEdgeUserCertDialogPropsType = {
  openDialog: boolean;
  handleClose: () => void;
  dnsId: number;
};
type FormValues = {
  keyPem: string;
  certPem: string;
};
export const AddEdgeUserCertDialog: FC<AddEdgeUserCertDialogPropsType> = ({
  openDialog,
  handleClose,
  dnsId,
}) => {
  const formInitialValues = { keyPem: "", certPem: "" };

  const [createUserCert, { isLoading }] =
    usePostApiMyDnsCdnEdgeCertCreateUserCertMutation();

  const onClose = () => handleClose();

  const formValidation = yup.object().shape({
    keyPem: yup.string().required("این فیلد الزامیست"),
    certPem: yup.string().required("این فیلد الزامیست"),
    bundleCertPem: yup.string(),
  });

  const submitHandler: formikOnSubmitType<FormValues> = (
    { keyPem, certPem },
    { setSubmitting }
  ) => {
    if (!dnsId || !keyPem || !certPem) return;
    createUserCert({
      createCdnEdgeUserCertModel: { dnsCdnHostId: dnsId, keyPem, certPem },
    })
      .unwrap()
      .then(() => {
        toast.success("گواهینامه مورد نظر با موفقیت اضافه شد");
        handleClose();
      })
      .catch((res) => {});
    setSubmitting(false);
  };

  return (
    <Dialog
      open={openDialog}
      onClose={onClose}
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
        {({ errors, touched, getFieldProps }) => (
          <Form autoComplete="on">
            <Stack p={{ xs: 1.8, md: 3 }} spacing={2}>
              <Stack>
                <Typography variant="text1" fontWeight="bold">
                  اطلاعات گواهی کاربر
                </Typography>
                <Typography variant="text13" color="secondary">
                  لطفا اطلاعات گواهینامه مورد نظر را با دقت در زیر وارد نمایید.
                </Typography>
              </Stack>
              <Stack spacing={1}>
                <DorsaTextField
                  multiline
                  rows={4}
                  inputProps={{ dir: "ltr" }}
                  placeholder="Certificate (CRT)"
                  error={Boolean(errors.certPem && touched.certPem)}
                  helperText={touched.certPem && errors.certPem}
                  {...getFieldProps("certPem")}
                />
                <DorsaTextField
                  multiline
                  rows={4}
                  inputProps={{ dir: "ltr" }}
                  placeholder="Private Key (KEY)"
                  error={Boolean(errors.keyPem && touched.keyPem)}
                  helperText={touched.keyPem && errors.keyPem}
                  {...getFieldProps("keyPem")}
                />
              </Stack>
              <Stack direction="row" justifyContent="end" spacing={1}>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{ px: 3, py: 0.8 }}
                  onClick={onClose}
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
                  بارگذاری گواهینامه
                </LoadingButton>
              </Stack>
            </Stack>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};
