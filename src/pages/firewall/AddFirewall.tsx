import {
  Button,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  InputLabel,
  Stack,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { FC } from "react";
import { toast } from "react-toastify";
import {
  VmFirewallModel,
  usePostApiMyVmByProjectIdFirewallCreateMutation,
} from "src/app/services/api.generated";
import { formikOnSubmitType } from "src/types/form.type";
import * as yup from "yup";
import LoadingButton from "src/components/atoms/LoadingButton";
import { useParams } from "react-router-dom";

type AddFirewallDialogPropsType = DialogProps & {
  forceClose: () => void;
  refetch: () => void;
};

export const AddFirewallDialog: FC<AddFirewallDialogPropsType> = ({
  forceClose,
  refetch,
  ...props
}) => {
  const { projectId } = useParams();
  const [createFirewall, { isLoading: createFirewallLoading }] =
    usePostApiMyVmByProjectIdFirewallCreateMutation();

  const initialValues: VmFirewallModel = {
    name: "",
  };

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(5, "نام فایروال نباید کمتر از ۵ کارکتر باشد")
      .required("این بخش الزامی می‌باشد"),
  });

  const onSubmit: formikOnSubmitType<VmFirewallModel> = (
    values,
    { setSubmitting }
  ) => {
    createFirewall({
      projectId: Number(projectId),
      vmFirewallModel: values,
    })
      .unwrap()
      .then(() => {
        toast.success("فایروال جدید با موفقیت ایجاد شد");
        forceClose();
        refetch();
        formik.resetForm();
      })
      .catch(() => { })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit,
  });

  const closeDialogHandler = (event: {}) => {
    if (!props.onClose) return;
    props.onClose(event, "escapeKeyDown");
    formik.resetForm();
  };

  return (
    <Dialog
      {...props}
      onClose={closeDialogHandler}
      fullWidth
    >
      <DialogTitle textAlign="left">
        ایجاد فایروال جدید
      </DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Stack direction="column" rowGap={2}>
            <Stack direction="column" rowGap={1}>
              <InputLabel>نام فایروال</InputLabel>
              <TextField
                {...formik.getFieldProps("name")}
                fullWidth
                error={Boolean(formik.errors.name && formik.touched.name)}
                helperText={formik.touched.name && formik.errors.name}
                placeholder="نام موردنظر را وارد کنید"
                size="small"
                inputProps={{
                  dir: "ltr"
                }}
              />
            </Stack>
            <Stack direction="row" justifyContent="end" spacing={1}>
              <Button
                variant="outlined"
                color="secondary"
                sx={{ px: 3, py: 0.8 }}
                onClick={closeDialogHandler}
              >
                انصراف
              </Button>
              <LoadingButton
                type="submit"
                loading={createFirewallLoading}
                variant="contained"
                sx={{ px: 3, py: 0.8 }}
              >
                ایجاد
              </LoadingButton>
            </Stack>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};

