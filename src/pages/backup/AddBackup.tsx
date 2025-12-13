import {
    Button,
    Dialog,
    DialogContent,
    DialogProps,
    DialogTitle,
    InputLabel,
    MenuItem,
    Select,
    Skeleton,
    Stack,
    TextField,
    Typography,
  } from "@mui/material";
  import { useFormik } from "formik";
  import { FC } from "react";
  import { toast } from "react-toastify";
  import {
    CreateVolumeBackupModel,
    usePostApiMyVmByProjectIdBackupCreateMutation,
    useGetApiMyVmByProjectIdVolumeShortListQuery,
  } from "src/app/services/api.generated";
  import { formikOnSubmitType } from "src/types/form.type";
  import * as yup from "yup";
  import LoadingButton from "src/components/atoms/LoadingButton";
  import { useParams } from "react-router-dom";
  
  type AddBackupDialogPropsType = DialogProps & {
    forceClose: () => void;
    refetch: () => void;
  };
  
  export const AddBackupDialog: FC<AddBackupDialogPropsType> = ({
    forceClose,
    refetch,
    ...props
  }) => {
    const { projectId } = useParams();
    const [createFirewall, { isLoading: createFirewallLoading }] =
      usePostApiMyVmByProjectIdBackupCreateMutation();
  const { data: volumeList, isLoading: volumeLoading } = useGetApiMyVmByProjectIdVolumeShortListQuery({
    projectId: Number(projectId),
  });
    const initialValues: CreateVolumeBackupModel = {
      name: "",
      description: "",
    };
  
    const validationSchema = yup.object().shape({
      name: yup
        .string()
        .min(5, "نام فایروال نباید کمتر از ۵ کارکتر باشد")
        .required("این بخش الزامی می‌باشد"),
    });
  
    const onSubmit: formikOnSubmitType<CreateVolumeBackupModel> = (
      values,
      { setSubmitting }
    ) => {
      createFirewall({
        projectId: Number(projectId),
        createVolumeBackupModel: values,
      })
        .unwrap()
        .then(() => {
          toast.success("بکاپ جدید با موفقیت ایجاد شد");
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
          ایجاد بکاپ جدید
        </DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Stack direction="column" rowGap={2}>
              <Stack direction="column" rowGap={1}>
                <InputLabel>نام بکاپ</InputLabel>
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
              <Stack width={"100%"} justifyContent={"start"}>
                <Typography>لیست دیسک ها  </Typography>
                {volumeLoading ? (
                  <Skeleton width="100%" height={37} sx={{ transform: "none" }} />
                ) : (
                  <Select
                    {...formik.getFieldProps("vmVolumeHostId")}
                    error={Boolean(formik.errors.vmVolumeHostId && formik.touched.vmVolumeHostId)}
                    fullWidth
                  >
                    {volumeList?.map(({ name, id }) => (
                      <MenuItem key={id} value={id}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
                {formik.errors.vmVolumeHostId && formik.touched.vmVolumeHostId && (
                  <Typography color="error">{formik.errors.vmVolumeHostId}</Typography>
                )}
              </Stack>
              <Stack direction="column" rowGap={1}>
                <InputLabel>توضیحات</InputLabel>
                <TextField
                  {...formik.getFieldProps("description")}
                  fullWidth
                  error={Boolean(formik.errors.description && formik.touched.description)}
                  helperText={formik.touched.description && formik.errors.description}
                  placeholder="توضیحات موردنظر را وارد کنید"
                  size="small"
                  multiline
                  minRows={3}
                  maxRows={8}
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
  
  