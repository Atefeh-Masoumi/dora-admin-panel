import { FC, useContext } from "react";
import { Button, Dialog, Stack, Typography } from "@mui/material";
import { BlurBackdrop } from "src/components/atoms/BlurBackdrop";
import { useDeleteApiMyStorageUserDeleteByIdMutation } from "src/app/services/api.generated";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { AccessKeyContext } from "../AccessKeyList";
import { BORDER_RADIUS_1 } from "src/configs/theme";

type DeleteAccessKeyDialogPropsType = {
  openDialog: boolean;
  handleClose: () => void;
  id: number;
};

export const DeleteAccessKeyDialog: FC<DeleteAccessKeyDialogPropsType> = ({
  openDialog,
  handleClose,
  id,
}) => {
  const onClose = () => handleClose();

  const { refetchUsersData } = useContext(AccessKeyContext);

  const [DeleteAccessKey, { isLoading }] =
    useDeleteApiMyStorageUserDeleteByIdMutation();

  const submit = () =>
    DeleteAccessKey({ id })
      .then(() => {
        toast.success(" کلید دسترسی با موفقیت حذف شد");
        refetchUsersData();
        handleClose();
      })
      .catch((err) => {});

  return (
    <Dialog
      open={openDialog}
      onClose={onClose}
      components={{ Backdrop: BlurBackdrop }}
      maxWidth="xs"
      fullWidth
      sx={{ "& .MuiPaper-root": { borderRadius: BORDER_RADIUS_1 } }}
    >
      <Stack p={{ xs: 1.8, md: 3 }} spacing={{ xs: 2, md: 5 }}>
        <Stack>
          <Typography variant="text1" color="error" fontWeight="bold">
            از حذف کلید دسترسی مطمئن هستید؟
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="end" spacing={1}>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ px: 3, py: 0.8 }}
            onClick={onClose}
          >
            انصراف
          </Button>
          <LoadingButton
            onClick={submit}
            variant="contained"
            color="error"
            sx={{ px: 3, py: 0.8 }}
            loading={isLoading}
          >
            حذف کلید دسترسی
          </LoadingButton>
        </Stack>
      </Stack>
    </Dialog>
  );
};
