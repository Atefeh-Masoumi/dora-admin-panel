import { FC } from "react";
import { Button, Dialog, Stack, Typography } from "@mui/material";
import { BlurBackdrop } from "src/components/atoms/BlurBackdrop";
import { usePutApiMyVmSnapshotRevertMutation } from "src/app/services/api.generated";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router";

type RevertVmSnapshotDialogPropsType = {
  openDialog: boolean;
  handleClose: () => void;
  snapshotId: number;
};

export const RevertVmSnapshotDialog: FC<RevertVmSnapshotDialogPropsType> = ({
  openDialog,
  handleClose,
  snapshotId,
}) => {
  const onClose = () => handleClose();
  const [revertSnapshot, { isLoading }] = usePutApiMyVmSnapshotRevertMutation();
  const navigate = useNavigate();

  const submit = () => {
    if (!snapshotId) return;
    revertSnapshot({ revertSnapshotModel: { snapshotId } })
      .unwrap()
      .then(() => {
        toast.success(
          "فرآیند بازگرداندن به snapshot مورد نظر با موفقیت آغاز شد"
        );
        handleClose();
        navigate("/vm/list");
      })
      .catch((err) => {});
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
            آیا از بازگشت به snapshot مورد نظر مطمئن هستید؟
          </Typography>
          <Typography variant="text9" color="secondary">
            در صورت تایید شروع فرآیند، امکان لغو آن وجود ندارد
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
            شروع فرآیند
          </LoadingButton>
        </Stack>
      </Stack>
    </Dialog>
  );
};
