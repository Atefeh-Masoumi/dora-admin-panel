import { FC } from "react";
import { Button, Dialog, Stack, Typography } from "@mui/material";
import { BlurBackdrop } from "src/components/atoms/BlurBackdrop";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { Success } from "src/components/atoms/svg-icons/SuccessSvg";
import { useDeleteApiMyDnsRecordDeleteByIdMutation } from "src/app/services/api.generated";

type DeleteRecordDialogPropsType = {
  id: number;
  openDialog: boolean;
  handleClose: () => void;
};

export const DeleteRecordDialog: FC<DeleteRecordDialogPropsType> = ({
  id,
  openDialog,
  handleClose,
}) => {
  const onClose = () => handleClose();
  const [deleteRecord, { isLoading }] =
    useDeleteApiMyDnsRecordDeleteByIdMutation();

  const submit = () =>
    deleteRecord({ id })
      .then(() => {
        toast.error("رکورد مورد نظر حذف شد", { icon: Success });
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
      sx={{ "& .MuiPaper-root": { borderRadius: 2.5 } }}
    >
      <Stack p={{ xs: 1.8, md: 3 }} spacing={{ xs: 2, md: 5 }}>
        <Stack>
          <Typography variant="text1" color="error" fontWeight="bold">
            از حذف رکورد مطمئن هستید؟
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
            حذف رکورد
          </LoadingButton>
        </Stack>
      </Stack>
    </Dialog>
  );
};
