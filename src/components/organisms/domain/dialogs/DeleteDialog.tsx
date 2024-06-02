import { FC, useContext } from "react";
import { Button, Dialog, Stack, Typography } from "@mui/material";
import { BlurBackdrop } from "src/components/atoms/BlurBackdrop";
import { useDeleteApiMyDomainHostDeleteByIdMutation } from "src/app/services/api.generated";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { DataContext } from "src/pages/domain/Index";
import { BORDER_RADIUS_1 } from "src/configs/theme";

type DeleteDomainDialogPropsType = {
  openDialog: boolean;
  handleClose: () => void;
  id: number;
};

export const DeleteDomainDialog: FC<DeleteDomainDialogPropsType> = ({
  openDialog,
  handleClose,
  id,
}) => {
  const { refetchOnClick } = useContext(DataContext);

  const onClose = () => handleClose();
  const [deleteItem, { isLoading }] =
    useDeleteApiMyDomainHostDeleteByIdMutation();

  const submit = () =>
    deleteItem({ id })
      .then((res) => {
        const response: any = res;
        const status = response.error.status;
        if (status && status === 400) {
          toast.error(response.error.errorMessage);
        } else {
          toast.success("دامنه با موفقیت حذف شد");
        }
        refetchOnClick();
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
            از حذف سفارش دامنه مطمئن هستید؟
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
            حذف دامنه
          </LoadingButton>
        </Stack>
      </Stack>
    </Dialog>
  );
};
