import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { FC, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  usePostApiMyProjectByProjectIdUserCreateMutation,
} from "src/app/services/api.generated";

type CreateProjectUserDialogPropsType = {
  open: boolean;
  onClose: () => void;
  forceClose: () => void;
  refetch: () => void;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
};

const validationSchema = yup.object().shape({
  userName: yup.string().required("این بخش الزامی می‌باشد"),
  userAccessTypeId: yup.number().required("این بخش الزامی می‌باشد"),
});

const initialValues = {
  userName: "",
  userAccessTypeId: 3, // Reporter
};

export const CreateProjectUserDialog: FC<CreateProjectUserDialogPropsType> = ({
  open,
  onClose,
  forceClose,
  refetch,
  maxWidth = "xs",
  fullWidth = true,
}) => {
  const { projectId } = useParams();
  const [createUser, { isLoading: createLoading }] =
  usePostApiMyProjectByProjectIdUserCreateMutation();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      createUser({
        projectId: Number(projectId)!,
        createProjectUserModel: {
          userName: values.userName,
          userAccessTypeId: values.userAccessTypeId,
        },
      })
        .unwrap()
        .then(() => {
          toast.success("کاربر با موفقیت اضافه شد");
          refetch();
          handleClose();
        })
        .catch(() => {
          toast.error("خطا در اضافه کردن کاربر");
        });
    },
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
    >
      <DialogTitle>
        <Typography fontWeight="bold">
          افزودن کاربر جدید
        </Typography>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              label="نام کاربری"
              size="small"
              {...formik.getFieldProps("userName")}
              error={Boolean(formik.errors.userName && formik.touched.userName)}
              helperText={formik.errors.userName}
              placeholder="نام کاربری را وارد کنید"
              fullWidth
              inputProps={{
                dir: "ltr",
              }}
            />

            <FormControl size="small" fullWidth>
              <InputLabel id="userAccessTypeId-label">نوع دسترسی</InputLabel>
              <Select
                {...formik.getFieldProps("userAccessTypeId")}
                labelId="userAccessTypeId-label"
                id="userAccessTypeId"
                label="نوع دسترسی"
                fullWidth
                error={Boolean(formik.errors.userAccessTypeId && formik.touched.userAccessTypeId)}
              >
                <MenuItem value={1}>Owner</MenuItem>
                <MenuItem value={2}>Maintainer</MenuItem>
                <MenuItem value={3}>Reporter</MenuItem>
              </Select>
              {formik.errors.userAccessTypeId && formik.touched.userAccessTypeId && (
                <Typography color="error">{formik.errors.userAccessTypeId}</Typography>
              )}
            </FormControl>
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={createLoading}>
          انصراف
        </Button>
        <LoadingButton
          onClick={() => formik.handleSubmit()}
          variant="contained"
          loading={createLoading}
        >
          افزودن
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}; 