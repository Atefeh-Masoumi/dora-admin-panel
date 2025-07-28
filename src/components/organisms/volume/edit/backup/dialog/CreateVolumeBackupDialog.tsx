import { FC, MouseEventHandler } from "react";
import {
  DialogProps,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  Button,
  DialogActions,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { formikOnSubmitType } from "src/types/form.type";
import { usePostApiMyVmByProjectIdVolumeAndVmVolumeHostIdBackupCreateMutation } from "src/app/services/api.generated";
import { toast } from "react-toastify";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import LoadingButton from "src/components/atoms/LoadingButton";
import { useParams } from "react-router";

type CreateVolumeBackupDialogPropsType = DialogProps & {
  blockstorageId: number;
  forceClose: () => void;
  refetch: () => void;
};

export const CreateVolumeBackupDialog: FC<CreateVolumeBackupDialogPropsType> = ({
  blockstorageId,
  forceClose,
  refetch,
  ...props
}) => {
  const [createBackup, { isLoading: createBackupLoading }] =
    usePostApiMyVmByProjectIdVolumeAndVmVolumeHostIdBackupCreateMutation();

  const initialValues = {
    name: "",
    description: "",
  };

  const { projectId } = useParams();
  
  const onSubmit: formikOnSubmitType<typeof initialValues> = (
    { name, description },
    { setSubmitting }
  ) => {
    if (blockstorageId === null || blockstorageId === undefined || isNaN(Number(blockstorageId))) return;
    
    if (name.length < 5 || name.length > 50) {
      toast.error("تعداد کارکترهای نام بکاپ باید حداقل 5 عدد باشد و حداکثر 50 عدد باشد");
      return;
    }

    createBackup({
      createVolumeBackupModel: {
        name,
        description,
      },
      projectId: Number(projectId),
      vmVolumeHostId: Number(blockstorageId),
    })
      .unwrap()
      .then(() => {
        toast.success("بکاپ دیسک ابری با موفقیت ایجاد شد");
        forceClose();
        refetch();
      })
      .catch((err) => {})
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
        .max(50, "تعداد کارکترهای نام بکاپ باید حداقل ۵۰ عدد باشد")
        .required("این بخش الزامی می‌باشد"),
    }),
    onSubmit,
  });

  const cancelBtnOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (!props.onClose) return;
    props.onClose(event, "backdropClick");
  };

  return (
    <Dialog {...props}>
      <DialogTitle align="center">ایجاد بکاپ دیسک ابری</DialogTitle>
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