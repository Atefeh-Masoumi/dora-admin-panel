import { FC } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Button,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { formikOnSubmitType } from "src/types/form.type";
import { LoadingButton } from "@mui/lab";
import {
  CreateVmKeyModel,
  usePostApiMyVmByProjectIdKeyCreateMutation,
} from "src/app/services/api.generated";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { Typography } from "@mui/material";

const initialValues: CreateVmKeyModel = {
  name: "",
  publicKey: "",
};

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .min(5, "نام کلید نباید کمتر از ۵ کارکتر باشد")
    .required("این بخش الزامی می‌باشد"),
  publicKey: yup.string().required("این بخش الزامی می‌باشد"),
});

type CreateKeyProps = {
  onClose: () => void;
  refetch: () => void;
};

const CreateKey: FC<CreateKeyProps> = ({ onClose, refetch }) => {
  const { projectId } = useParams();
  const [createKey, { isLoading: createKeyLoading }] =
    usePostApiMyVmByProjectIdKeyCreateMutation();

  const onSubmit: formikOnSubmitType<CreateVmKeyModel> = (
    values,
    { setSubmitting }
  ) => {
    createKey({
      projectId: Number(projectId),
      createVmKeyModel: values,
    })
      .unwrap()
      .then(() => {
        toast.success("کلید جدید با موفقیت ایجاد شد");
        handleClose();
        refetch();
      })
      .catch(() => {
        toast.error("خطا در ایجاد کلید");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  return (
    <Dialog open={true} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography fontWeight="bold">ایجاد کلید</Typography>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              label="نام کلید"
              size="small"
              {...formik.getFieldProps("name")}
              error={Boolean(formik.errors.name && formik.touched.name)}
              helperText={formik.errors.name}
              placeholder="نام کلید را وارد کنید"
              fullWidth
              inputProps={{
                dir: "ltr",
              }}
            />
            <TextField
              label="کلید عمومی"
              size="small"
              {...formik.getFieldProps("publicKey")}
              error={Boolean(
                formik.errors.publicKey && formik.touched.publicKey
              )}
              helperText={formik.errors.publicKey}
              placeholder="کلید عمومی را وارد کنید"
              multiline
              rows={4}
              fullWidth
              inputProps={{
                dir: "ltr",
              }}
            />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ px: 3, py: 0.8 }}
          onClick={handleClose}
          disabled={createKeyLoading}
        >
          انصراف
        </Button>
        <LoadingButton
          onClick={() => formik.handleSubmit()}
          variant="contained"
          sx={{ px: 3, py: 0.8 }}
          loading={createKeyLoading}
        >
          ایجاد
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default CreateKey;
