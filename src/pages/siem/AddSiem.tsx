import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  FormControlLabel,
  InputLabel,
  Stack,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { FC } from "react";
import { toast } from "react-toastify";
import {
  CreateSiemModel,
  usePostApiMySecurityByProjectIdSiemHostCreateMutation,
} from "src/app/services/api.generated";
import { formikOnSubmitType } from "src/types/form.type";
import * as yup from "yup";
import LoadingButton from "src/components/atoms/LoadingButton";
import { useParams } from "react-router-dom";

type AddDialogPropsType = DialogProps & {
  forceClose: () => void;
  refetch: () => void;
};


export const AddSiemDialog: FC<AddDialogPropsType> = ({
  forceClose,
  refetch,
  ...props
}) => {
  const { projectId } = useParams();
  const [createSiem, { isLoading: createPamLoading }] =
    usePostApiMySecurityByProjectIdSiemHostCreateMutation();


  const initialValues: CreateSiemModel = {
    name: "",
    osLogEnabled: false,
    serviceLogEnabled: false,
    trafficAnalysisLogEnabled: false,
    idsLogEnabled: false,
  };

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(5, "نام SIEM نباید کمتر از ۵ کارکتر باشد")
      .required("این بخش الزامی می‌باشد"),
  });

  const onSubmit: formikOnSubmitType<CreateSiemModel> = (
    values,
    { setSubmitting }
  ) => {
    createSiem({
      projectId: Number(projectId),
      createSiemModel: values,
    })
      .unwrap()
      .then(() => {
        toast.success("SIEM جدید با موفقیت ایجاد شد");
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
    <Dialog {...props} onClose={closeDialogHandler} fullWidth>
      <DialogTitle textAlign="left">ایجاد SIEM جدید</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Stack direction="column" rowGap={2}>
            <Stack direction="column" rowGap={1}>
              <InputLabel>نام SIEM</InputLabel>
              <TextField
                {...formik.getFieldProps("name")}
                fullWidth
                error={Boolean(formik.errors.name && formik.touched.name)}
                helperText={formik.touched.name && formik.errors.name}
                placeholder="نام موردنظر را وارد کنید"
                size="small"
                inputProps={{
                  dir: "ltr",
                }}
              />
            </Stack>
            <Stack width={"100%"} justifyContent={"start"}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="osLogEnabled"
                    checked={Boolean(formik.values.osLogEnabled)}
                    onChange={formik.handleChange}
                  />
                }
                label=" لاگ سیستم عامل "
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="serviceLogEnabled"
                    checked={Boolean(formik.values.serviceLogEnabled)}
                    onChange={formik.handleChange}
                  />
                }
                label=" لاگ سرویس ها (وب، دیتابیس ...) "
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="trafficAnalysisLogEnabled"
                    checked={Boolean(formik.values.trafficAnalysisLogEnabled)}
                    onChange={formik.handleChange}
                  />
                }
                label=" لاگ آنالیز ترافیک  "
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="idsLogEnabled"
                    checked={Boolean(formik.values.idsLogEnabled)}
                    onChange={formik.handleChange}
                  />
                }
                label="   لاگ IDS  "
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
                loading={createPamLoading}
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

