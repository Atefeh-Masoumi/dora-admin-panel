import { FC, useContext } from "react";
import { Button, Dialog, Stack, Typography } from "@mui/material";
import { BlurBackdrop } from "src/components/atoms/BlurBackdrop";
import { usePutApiMyKubernetesNodeDeleteByKubernetesHostNodeIdMutation } from "src/app/services/api.generated";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { DataContext } from "src/pages/kubernetes/Index";
import { useParams } from "react-router";

type DeleteKubernetesNodeDialogPropsType = {
  openDialog: boolean;
  handleClose: () => void;
  nodeId: number;
};

export const DeleteKubernetesNodeDialog: FC<
  DeleteKubernetesNodeDialogPropsType
> = ({ openDialog, handleClose, nodeId }) => {
  const onClose = () => handleClose();
  const [deleteKubernetesNode, { isLoading }] =
    usePutApiMyKubernetesNodeDeleteByKubernetesHostNodeIdMutation();

  const { id: hostId } = useParams();

  const { refetchOnClick } = useContext(DataContext);

  const submit = () => {
    if (!hostId || !nodeId) return;
    deleteKubernetesNode({
      // kubernetesHostId: Number(hostId),
      kubernetesHostNodeId: nodeId,
    }).then(() => {
      toast.success("نود سرویس کوبرنتیز شما با موفقیت حذف شد");
      refetchOnClick();
      handleClose();
    });
  };

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
            از حذف این نود سرویس کوبرنتیز مطمئن هستید؟
          </Typography>
          <Typography variant="text9" color="secondary">
            در صورت حذف نود، امکان بازگرداندن آن وجود ندارد
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
            حذف
          </LoadingButton>
        </Stack>
      </Stack>
    </Dialog>
  );
};
