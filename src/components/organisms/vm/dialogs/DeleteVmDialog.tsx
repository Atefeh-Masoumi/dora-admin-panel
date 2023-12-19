import { FC, useContext } from "react";
import { Button, Dialog, Stack, Typography } from "@mui/material";
import { BlurBackdrop } from "src/components/atoms/BlurBackdrop";
import { useDeleteApiVmProjectDeleteByIdMutation } from "src/app/services/api.generated";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { DataContext } from "src/pages/vm/Index";

type DeleteVmDialogPropsType = {
  openDialog: boolean;
  handleClose: () => void;
  id: number;
};

export const DeleteVmDialog: FC<DeleteVmDialogPropsType> = ({
  openDialog,
  handleClose,
  id,
}) => {
  const { refetchOnClick } = useContext(DataContext);

  const onClose = () => handleClose();
  const [deleteItem, { isLoading }] = useDeleteApiVmProjectDeleteByIdMutation();

  const submit = () =>
    deleteItem({ id })
      .unwrap()
      .then(() => {
        refetchOnClick();
        toast.success("سرور ابری با موفقیت حذف شد");
        handleClose();
      })
      .catch(() => toast.error("مشکلی پیش آمده \nلطفا دوباره امتحان کنید"));

  return (
    <Dialog
      open={openDialog}
      onClose={onClose}
      components={{ Backdrop: BlurBackdrop }}
      maxWidth="xs"
      fullWidth
      sx={{ "& .MuiPaper-root": { borderRadius: 2.5 } }}
    >
      <Stack p={{ xs: 1.8, md: 3 }} spacing={{ xs: 2, md: 5 }}>
        <Stack>
          <Typography variant="text1" color="error" fontWeight="bold">
            از حذف سرور ابری مطمئن هستید؟
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
            حذف سرور ابری
          </LoadingButton>
        </Stack>
      </Stack>
    </Dialog>
  );
};
