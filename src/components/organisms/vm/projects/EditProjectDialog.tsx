import { ChangeEvent, FC, useEffect, useMemo, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { usePutApiVmProjectEditMutation } from "src/app/services/api.generated";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import { useAppSelector } from "src/app/hooks";

type EditProjectDialogPropsType = {
  open: boolean;
  onClose: () => any;
};

export const EditProjectDialog: FC<EditProjectDialogPropsType> = ({
  open,
  onClose,
}) => {
  const selectedVmProject = useAppSelector(
    (store) => store.vmProject.selectedVmProject
  );

  console.log({ selectedVmProject });

  const [name, setName] = useState(selectedVmProject?.name || "");

  useEffect(() => {
    if (name || !selectedVmProject || name === selectedVmProject.name) return;
    setName(selectedVmProject.name || "");
  }, [name, selectedVmProject]);

  const inputOnChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setName(event.target.value);
  };

  const [editVmProject, { isLoading }] = usePutApiVmProjectEditMutation();

  const canChange = useMemo(
    () =>
      name &&
      name !== selectedVmProject?.name &&
      name.length > 1 &&
      selectedVmProject?.id,
    [name, selectedVmProject?.id, selectedVmProject?.name]
  );

  const submit = () => {
    if (!canChange) return;

    editVmProject({ editVmProject: { id: selectedVmProject!.id, name } })
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
      <DialogTitle align="center">ویرایش پروژه</DialogTitle>
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
            disabled={!canChange}
            onClick={submit}
            variant="contained"
            loading={isLoading}
          >
            اعمال تغییرات
          </LoadingButton>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};
