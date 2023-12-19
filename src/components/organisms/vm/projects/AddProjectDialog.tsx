import { ChangeEvent, FC, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { usePostApiVmProjectCreateMutation } from "src/app/services/api.generated";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";

type AddProjectDialogPropsType = {
  open: boolean;
  onClose: () => any;
};

export const AddProjectDialog: FC<AddProjectDialogPropsType> = ({
  open,
  onClose,
}) => {
  const [name, setName] = useState("");

  const inputOnChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setName(event.target.value);
  };

  const [createNewVmProject, { isLoading }] =
    usePostApiVmProjectCreateMutation();

  const submit = () => {
    createNewVmProject({ createVmProject: { name } })
      .unwrap()
      .then(() => {
        toast.success("سرور ابری با موفقیت ایجاد شد");
        setName("");
        onClose();
      })
      .catch(() => toast.error("مشکلی پیش آمده \nلطفا دوباره امتحان کنید"));
  };

  return (
    <Dialog
      maxWidth="xs"
      PaperProps={{ sx: { width: "100%", py: 1 } }}
      open={open}
      onClose={onClose}
    >
      <DialogTitle align="center">ایجاد پروژه جدید</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          sx={{ mt: 1 }}
          label="نام پروژه"
          value={name}
          onChange={inputOnChange}
        />
      </DialogContent>
      <DialogActions>
        <Stack direction="row" columnGap={2} sx={{ px: 2 }}>
          <Button onClick={onClose}>انصراف</Button>
          <LoadingButton
            onClick={submit}
            variant="contained"
            loading={isLoading}
          >
            ایجاد پروژه
          </LoadingButton>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};
