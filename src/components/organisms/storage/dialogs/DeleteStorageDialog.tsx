import { LoadingButton } from "@mui/lab";
import { Button, Dialog, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useDeleteApiMyStorageHostDeleteByIdMutation } from "src/app/services/api.generated";
import { BlurBackdrop } from "src/components/atoms/BlurBackdrop";
import { BORDER_RADIUS_1 } from "src/configs/theme";

type DeleteStorageDialogPropsType = {
  openDialog: boolean;
  handleClose: () => void;
  id: number;
};

export const DeleteStorageDialog: FC<DeleteStorageDialogPropsType> = ({
  openDialog,
  handleClose,
  id,
}) => {
  const onClose = () => handleClose();
  const [deleteStorage, { isLoading }] =
    useDeleteApiMyStorageHostDeleteByIdMutation();

  const submit = () =>
    deleteStorage({ id })
      .then(() => {
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
            از حذف فضای ابری مطمئن هستید؟
          </Typography>
          <Typography variant="text9" color="secondary">
            در صورت تایید حذف، امکان بازگشت وجود ندارد
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
            حذف فضای ابری
          </LoadingButton>
        </Stack>
      </Stack>
    </Dialog>
  );
};
