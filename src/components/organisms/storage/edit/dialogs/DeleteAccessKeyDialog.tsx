import { LoadingButton } from "@mui/lab";
import { Button, Dialog, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { toast } from "react-toastify";
import { useDeleteApiMyStorageUserDeleteByIdMutation } from "src/app/services/api.generated";
import { BlurBackdrop } from "src/components/atoms/BlurBackdrop";
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

  const [DeleteAccessKey, { isLoading }] =
    useDeleteApiMyStorageUserDeleteByIdMutation();

  const submit = () =>
    DeleteAccessKey({ id })
      .then(() => {
        toast.success(" کلید دسترسی با موفقیت حذف شد");
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
