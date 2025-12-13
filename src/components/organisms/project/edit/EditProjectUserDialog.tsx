import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  MenuItem,
  Select,
  Stack,
  Typography,
  FormControl,
  InputLabel,
} from "@mui/material";
import { FC, MouseEvent } from "react";
import { useParams } from "react-router";
import {
  ProjectUserListResponse,
  usePutApiMyProjectByProjectIdUserEditAndIdMutation,
} from "src/app/services/api.generated";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";

type EditProjectUserDialogProps = DialogProps & {
  selectedUser: ProjectUserListResponse | null;
  onClose: () => void;
  refetch: () => void;
};

const validationSchema = yup.object().shape({
  userAccessTypeId: yup.number().required("این بخش الزامی می‌باشد"),
});

const EditProjectUserDialog: FC<EditProjectUserDialogProps> = ({
  selectedUser,
  onClose,
  refetch,
  ...props
}) => {
  const { projectId } = useParams();

  const [editUser, { isLoading: editLoading }] =
    usePutApiMyProjectByProjectIdUserEditAndIdMutation();

  const initialValues = {
    userAccessTypeId: selectedUser?.userAccessTypeId || 3,
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (!selectedUser?.id) return;
      
      editUser({
        projectId: Number(projectId),
        id: selectedUser.id,
        editProjectUserModel: {
          userAccessTypeId: values.userAccessTypeId,
        },
      })
        .unwrap()
        .then(() => {
          toast.success("دسترسی کاربر با موفقیت ویرایش شد");
          handleClose();
          refetch();
        })
        .catch(() => {
          toast.error("خطا در ویرایش دسترسی کاربر");
        });
    },
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  const closeButtonOnClick = (event: MouseEvent<any>) => {
    handleClose();
  };

  return (
    <Dialog
      {...props}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>
        <Typography fontWeight="bold">
          ویرایش دسترسی کاربر
        </Typography>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <Typography>
              کاربر: {selectedUser?.user}
            </Typography>
            
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
        <Button onClick={closeButtonOnClick} disabled={editLoading}>
          انصراف
        </Button>
        <LoadingButton
          onClick={() => formik.handleSubmit()}
          variant="contained"
          loading={editLoading}
        >
          ویرایش
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default EditProjectUserDialog;
