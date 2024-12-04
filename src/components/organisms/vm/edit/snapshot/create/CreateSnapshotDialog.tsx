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
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";

type CreateSnapshotDialogPropsType = DialogProps & {
  forceClose: () => void;
};

export const CreateSnapshotDialog: FC<CreateSnapshotDialogPropsType> = ({
  forceClose,
  ...props
}) => {
  const [createSnapshot, { isLoading: createSnapshotLoading }] =
    usePostApiMyVmSnapshotCreateMutation();

  const { id } = useParams();

  const initialValues = {
    snapshotName: "",
    snapshotDescription: "",
  };
  const onSubmit: formikOnSubmitType<typeof initialValues> = (
    { snapshotName, snapshotDescription },
    { setSubmitting }
  ) => {
    if (id === null || id === undefined || isNaN(Number(id))) return;
    createSnapshot({
      createSnapshotModel: {
        vmHostId: Number(id),
        snapshotName,
        snapshotDescription,
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
      snapshotName: yup
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
      <DialogTitle align="center">ایجاد snapshot جدید</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Stack rowGap={3} pt={2}>
            <DorsaTextField
              {...formik.getFieldProps("snapshotName")}
              error={Boolean(
                formik.errors.snapshotName && formik.touched.snapshotName
              )}
              helperText={formik.errors.snapshotName}
              label="نام"
            />
            <DorsaTextField
              {...formik.getFieldProps("snapshotDescription")}
              error={Boolean(
                formik.errors.snapshotDescription &&
                  formik.touched.snapshotDescription
              )}
              helperText={formik.errors.snapshotDescription}
              multiline
              minRows={3}
              maxRows={8}
              label="توضیحات"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Stack p={2} justifyContent="right" direction="row" columnGap={1}>
            <Button variant="outlined" onClick={cancelBtnOnClick}>
              انصراف
            </Button>
            <LoadingButton
              sx={{ minWidth: 40, width: 120 }}
              loading={createSnapshotLoading}
              color="error"
              variant="contained"
            >
              حذف
            </LoadingButton>
          </Stack>
        </DialogActions>
      </form>
    </Dialog>
  );
};
