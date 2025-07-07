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
  CreateVmNetworkModel,
  usePostApiMyVmByProjectIdNetworkCreateMutation,
} from "src/app/services/api.generated";
import { formikOnSubmitType } from "src/types/form.type";
import * as yup from "yup";
import LoadingButton from "src/components/atoms/LoadingButton";
import { useParams } from "react-router-dom";

type AddNetworkDialogPropsType = DialogProps & {
  forceClose: () => void;
  refetch: () => void;
};

export const AddNetworkDialog: FC<AddNetworkDialogPropsType> = ({
  forceClose,
  refetch,
  ...props
}) => {
  const { projectId } = useParams();
  const [createNetwork, { isLoading: createNetworkLoading }] =
    usePostApiMyVmByProjectIdNetworkCreateMutation();

  const initialValues: CreateVmNetworkModel = {
    name: "",
    network: "",
    prefix: 24,
  };

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(5, "نام شبکه نباید کمتر از ۵ کارکتر باشد")
      .required("این بخش الزامی می‌باشد"),
    network: yup
      .string()
      .matches(
        /^(\d{1,3}\.){3}\d{1,3}$/,
        "فرمت آدرس شبکه صحیح نمی‌باشد (مثال: 192.168.1.0)"
      )
      .required("این بخش الزامی می‌باشد"),
    prefix: yup
      .number()
      .min(0, "پریفیکس نمی‌تواند کمتر از 0 باشد")
      .max(32, "پریفیکس نمی‌تواند بیشتر از 32 باشد")
      .required("این بخش الزامی می‌باشد"),
  });

  const onSubmit: formikOnSubmitType<CreateVmNetworkModel> = (
    values,
    { setSubmitting }
  ) => {
    createNetwork({
      projectId: Number(projectId),
      createVmNetworkModel: values,
    })
      .unwrap()
      .then(() => {
        toast.success("شبکه جدید با موفقیت ایجاد شد");
        forceClose();
        refetch();
        formik.resetForm();
      })
      .catch(() => {})
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
        ایجاد شبکه جدید
      </DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Stack direction="column" rowGap={2}>
            <Stack direction="column" rowGap={1}>
              <InputLabel>نام شبکه</InputLabel>
              <TextField
                {...formik.getFieldProps("name")}
                fullWidth
                error={Boolean(formik.errors.name && formik.touched.name)}
                helperText={formik.touched.name && formik.errors.name}
                placeholder="نام موردنظر را وارد کنید"
                size="small"
              />
            </Stack>
            <Stack direction="column" rowGap={1}>
              <InputLabel>آدرس شبکه</InputLabel>
              <TextField
                {...formik.getFieldProps("network")}
                fullWidth
                error={Boolean(formik.errors.network && formik.touched.network)}
                helperText={formik.touched.network && formik.errors.network}
                placeholder="مثال: 192.168.1.0"
                inputProps={{ dir: "ltr" }}
                size="small"
              />
            </Stack>
            <Stack direction="column" rowGap={1}>
              <InputLabel>پریفیکس</InputLabel>
              <TextField
                {...formik.getFieldProps("prefix")}
                fullWidth
                type="number"
                error={Boolean(formik.errors.prefix && formik.touched.prefix)}
                helperText={formik.touched.prefix && formik.errors.prefix}
                inputProps={{ 
                  min: 0, 
                  max: 32,
                  dir: "ltr"
                }}
                size="small"
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
                loading={createNetworkLoading}
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
