import { FC, MouseEventHandler } from "react";
import {
  DialogProps,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  Button,
  DialogActions,
  Typography,
  Skeleton,
  Select,
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { formikOnSubmitType } from "src/types/form.type";
import { useGetApiMyVmByProjectIdVolumeShortListQuery, usePostApiMyVmByProjectIdBackupCreateMutation } from "src/app/services/api.generated";
import { toast } from "react-toastify";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import LoadingButton from "src/components/atoms/LoadingButton";
import { useParams } from "react-router";

type CreateBackupDialogPropsType = DialogProps & {
  forceClose: () => void;
  refetch: () => void;
};

export const CreateBackupDialog: FC<CreateBackupDialogPropsType> = ({
  forceClose,
  refetch,
  ...props
}) => {
  const { projectId, id:vmId } = useParams();
  
  const [createBackup, { isLoading: createBackupLoading }] =
  usePostApiMyVmByProjectIdBackupCreateMutation();

  const { data: volumeList, isLoading: volumeLoading } = useGetApiMyVmByProjectIdVolumeShortListQuery({
    projectId: Number(projectId),
  });
  const initialValues = {
    name: "",
    description: "",
    vmVolumeHostId:0,
  };

  const onSubmit: formikOnSubmitType<typeof initialValues> = (
    { name, description },
    { setSubmitting }
  ) => {
    
    if (name.length < 5 || name.length > 50) {
      toast.error("تعداد کارکترهای نام بکاپ باید حداقل 5 عدد باشد و حداکثر 50 عدد باشد");
      return;
    }

    createBackup({
      createVolumeBackupModel: {
        vmVolumeHostId: Number(vmId),
        name,
        description,
      },
      projectId: Number(projectId),
    })
      .unwrap()
      .then(() => {
        toast.success("بکاپ   با موفقیت ایجاد شد");
        forceClose();
        refetch();
      })
      .catch((_err: unknown) => {})
      .finally(() => {
        setSubmitting(false);
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema: yup.object().shape({
      name: yup
        .string()
        .min(2, "تعداد کارکترهای نام بکاپ باید حداقل 2 عدد باشد")
        .max(50, "تعداد کارکترهای نام بکاپ باید حداقل ۵۰ عدد باشد"),
      vmVolumeHostId: yup.number()
    }),
    onSubmit,
  });

  const cancelBtnOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (!props.onClose) return;
    props.onClose(event, "backdropClick");
  };

  return (
    <Dialog {...props}>
      <DialogTitle align="center">ایجاد بکاپ </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Stack rowGap={3} pt={2}>
            <DorsaTextField
              focused
              {...formik.getFieldProps("name")}
              error={Boolean(formik.errors.name && formik.touched.name)}
              helperText={formik.errors.name}
              label="نام"
              inputProps={{ dir: "ltr" }}
            />
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
            <DorsaTextField
              {...formik.getFieldProps("description")}
              error={Boolean(
                formik.errors.description && formik.touched.description
              )}
              helperText={formik.errors.description}
              multiline
              minRows={3}
              maxRows={8}
              label="توضیحات"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Stack direction="row" justifyContent="end" spacing={1}>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ px: 3, py: 0.8 }}
              onClick={cancelBtnOnClick}
            >
              انصراف
            </Button>
            <LoadingButton
              type="submit"
              loading={createBackupLoading}
              variant="contained"
              sx={{ px: 3, py: 0.8 }}
            >
              ذخیره
            </LoadingButton>
          </Stack>
        </DialogActions>
      </form>
    </Dialog>
  );
}; 