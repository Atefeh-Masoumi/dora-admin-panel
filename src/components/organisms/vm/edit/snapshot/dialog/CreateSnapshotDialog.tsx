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
import { usePostApiMyVmSnapshotCreateMutation } from "src/app/services/api.generated";
import { toast } from "react-toastify";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";

type CreateSnapshotDialogPropsType = DialogProps & {
  vmId: number;
  forceClose: () => void;
  refetch:()=>void;
};

export const CreateSnapshotDialog: FC<CreateSnapshotDialogPropsType> = ({
  vmId,
  forceClose,
  refetch,
  ...props
}) => {
  const [createSnapshot, { isLoading: createSnapshotLoading }] =
    usePostApiMyVmSnapshotCreateMutation();

  const initialValues = {
    name: "",
    description: "",
  };

  const onSubmit: formikOnSubmitType<typeof initialValues> = (
    { name, description },
    { setSubmitting }
  ) => {
    if (vmId === null || vmId === undefined || isNaN(Number(vmId))) return;
    createSnapshot({
      createSnapshotModel: {
        vmHostId: Number(vmId),
        name,
        description,
      },
    })
      .unwrap()
      .then(() => {
        toast.success("اسنپ شات با موفقیت ایجاد شد");
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
        .min(2, "تعداد کارکترهای نام اسنپ شات باید حداقل 2 عدد باشد")
        .max(50, "تعداد کارکترهای نام اسنپ شات باید حداقل ۵۰ عدد باشد")
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
      <DialogTitle align="center">ایجاد اسنپ شات</DialogTitle>
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
              component="button"
              type="submit"
              loading={createSnapshotLoading}
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
