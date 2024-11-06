import { FC, MouseEventHandler } from "react";
import {
  DialogProps,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  Button,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { formikOnSubmitType } from "src/types/form.type";
import { LoadingButton } from "@mui/lab";
import { usePostApiMyVmSnapshotCreateMutation } from "src/app/services/api.generated";
import { useParams } from "react-router";
import { toast } from "react-toastify";

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
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Stack rowGap={3} pt={2}>
            <TextField
              {...formik.getFieldProps("snapshotName")}
              error={Boolean(
                formik.errors.snapshotName && formik.touched.snapshotName
              )}
              helperText={formik.errors.snapshotName}
              size="small"
              label="نام snapshot"
            />
            <TextField
              {...formik.getFieldProps("snapshotDescription")}
              error={Boolean(
                formik.errors.snapshotDescription &&
                  formik.touched.snapshotDescription
              )}
              helperText={formik.errors.snapshotDescription}
              multiline
              minRows={3}
              maxRows={8}
              size="small"
              label="توضیحات"
            />
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems="center"
              gap={2}
            >
              <LoadingButton
                fullWidth
                type="submit"
                variant="contained"
                loading={createSnapshotLoading}
              >
                ایجاد
              </LoadingButton>
              <Button onClick={cancelBtnOnClick} fullWidth variant="outlined">
                انصراف
              </Button>
            </Stack>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};
