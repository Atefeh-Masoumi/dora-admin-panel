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
import { LoadingButton } from "@mui/lab";
import { usePostApiMyVmVolumeCreateMutation } from "src/app/services/api.generated";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";

type CreateVolumeDialogPropsType = DialogProps & {
  forceClose: () => void;
};

export const CreateVolumeDialog: FC<CreateVolumeDialogPropsType> = ({
  forceClose,
  ...props
}) => {
  const [createVolume, { isLoading: createVolumeLoading }] =
    usePostApiMyVmVolumeCreateMutation();

  const { id } = useParams();

  const initialValues = {
    name: "",
    volumeSize: 0,
  };
  const onSubmit: formikOnSubmitType<typeof initialValues> = (
    { name, volumeSize },
    { setSubmitting }
  ) => {
    if (id === null || id === undefined || isNaN(Number(id))) return;
    createVolume({
      createVmVolumeModel: {
        vmHostId: Number(id),
        name,
        volumeSize,
      },
    })
      .unwrap()
      .then(() => {
        toast.success("snapshot جدید با موفقیت ایجاد شد");
        forceClose();
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
        .min(5, "تعداد کارکترهای نام snapshot باید حداقل ۵ عدد باشد")
        .max(50, "تعداد کارکترهای نام snapshot باید حداقل ۵۰ عدد باشد")
        .required("این بخش الزامی می‌باشد"),
      snapshotDescription: yup.string(),
    }),
    onSubmit,
  });

  const cancelBtnOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (!props.onClose) return;
    props.onClose(event, "backdropClick");
  };

  return (
    <Dialog {...props}>
      <DialogTitle align="center">ایجاد دیسک جدید</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Stack rowGap={3} pt={2}>
            <DorsaTextField
              {...formik.getFieldProps("name")}
              error={Boolean(formik.errors.name && formik.touched.name)}
              helperText={formik.errors.name}
              label="نام"
            />
            <DorsaTextField
              type="number"
              {...formik.getFieldProps("volumeSize")}
              error={Boolean(
                formik.errors.volumeSize && formik.touched.volumeSize
              )}
              helperText={formik.errors.volumeSize}
              multiline
              label="حجم دیسک (GB)"
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
              component="button"
              type="submit"
              loading={createVolumeLoading}
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
