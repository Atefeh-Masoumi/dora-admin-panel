import { FC } from "react";
import { Button, Dialog, Stack, Typography } from "@mui/material";
import { BlurBackdrop } from "src/components/atoms/BlurBackdrop";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { LoadingButton } from "@mui/lab";
import {
  CreateCdnEdgeUserCertModel,
  usePostApiMyCdnEdgeCertCreateUserCertMutation,
} from "src/app/services/api.generated";
import { formikOnSubmitType } from "src/types/form.type";
import { toast } from "react-toastify";

type AddEdgeUserCertDialogPropsType = {
  openDialog: boolean;
  handleClose: () => void;
  cdnId: number;
};

export const AddEdgeUserCertDialog: FC<AddEdgeUserCertDialogPropsType> = ({
  openDialog,
  handleClose,
  cdnId,
}) => {
  const formInitialValues = { cdnId, keyPem: "", certPem: "" };

  const [createUserCert, { isLoading }] =
    usePostApiMyCdnEdgeCertCreateUserCertMutation();

  const onClose = () => handleClose();

  const formValidation = yup.object().shape({
    keyPem: yup.string().required("این فیلد الزامیست"),
    certPem: yup.string().required("این فیلد الزامیست"),
    bundleCertPem: yup.string(),
  });

  const submitHandler: formikOnSubmitType<CreateCdnEdgeUserCertModel> = (
    { cdnId, keyPem, certPem },
    { setSubmitting }
  ) => {
    if (!cdnId || !keyPem || !certPem) return;
    createUserCert({
      createCdnEdgeUserCertModel: { cdnId, keyPem, certPem },
    })
      .unwrap()
      .then(() => {
        toast.success("گواهینامه مورد نظر با موفقیت اضافه شد");
        handleClose();
      })
      .catch((res) => {
        if (res.status === 401 || res.status === 404) {
          toast.error("اطلاعات را درست وارد کنید");
        } else {
          toast.error(res.data[""][0]);
        }
      });
    setSubmitting(false);
  };

  return (
    <Dialog
      open={openDialog}
      onClose={onClose}
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
