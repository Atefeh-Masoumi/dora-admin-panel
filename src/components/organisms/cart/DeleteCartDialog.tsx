import { FC } from "react";
import { Button, Dialog, Stack, Typography } from "@mui/material";
import { BlurBackdrop } from "src/components/atoms/BlurBackdrop";
import { usePutApiV2PortalOrderCancelByIdMutation } from "src/app/services/api.generated";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";

type DeleteCartDialogPropsType = {
  handleClose: () => void;
  id: number;
};

export const DeleteCartDialog: FC<DeleteCartDialogPropsType> = ({
  handleClose,
  id,
}) => {
  const onClose = () => handleClose();
  const [deleteOrder, { isLoading: deleteOrderLoading }] =
    usePutApiV2PortalOrderCancelByIdMutation();

  const submit = () =>
    deleteOrder({ id })
      .unwrap()
      .then(() =>
        toast.success("محصول مورد نظر با موفقیت از سبد خرید شما حذف شد")
      );

  return (
    <Dialog
      open={true}
      onClose={onClose}
      components={{ Backdrop: BlurBackdrop }}
      maxWidth="xs"
      fullWidth
      sx={{ "& .MuiPaper-root": { borderRadius: 2.5 } }}
    >
      <Stack p={{ xs: 1.8, md: 3 }} spacing={{ xs: 2, md: 5 }}>
        <Stack>
          <Typography variant="text1" color="error" fontWeight="bold">
            یا از حذف این سفارش از سبد خرید خود اطمینان دارید؟
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
            loading={deleteOrderLoading}
          >
            حذف از سبد خرید
          </LoadingButton>
        </Stack>
      </Stack>
    </Dialog>
  );
};
