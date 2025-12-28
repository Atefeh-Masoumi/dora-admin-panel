import { FC } from "react";
import { Button, Dialog, Stack, Typography } from "@mui/material";
import { BlurBackdrop } from "src/components/atoms/BlurBackdrop";
import { usePutApiMyVmByProjectIdSnapshotRevertAndIdMutation } from "src/app/services/api.generated";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { useNavigate, useParams } from "react-router";
import { BORDER_RADIUS_1 } from "src/configs/theme";

type RevertVolumeSnapshotDialogPropsType = {
  openDialog: boolean;
  handleClose: () => void;
  snapshotId: number;
};

export const RevertVolumeSnapshotDialog: FC<RevertVolumeSnapshotDialogPropsType> = ({
  openDialog,
  handleClose,
  snapshotId,
}) => {
  const onClose = () => handleClose();
  const [revertSnapshot, { isLoading }] =
    usePutApiMyVmByProjectIdSnapshotRevertAndIdMutation();
  const navigate = useNavigate();

  const { projectId, blockstorageId } = useParams();
  
  const submit = () => {
    if (!snapshotId) return;
    revertSnapshot({
      id: snapshotId,
      projectId: Number(projectId),
      isRootDisk: false
    })
      .unwrap()
      .then(() => {
        toast.success("فرآیند بارگذاری اسنپ شات مورد نظر با موفقیت آغاز شد");
        handleClose();
        navigate(`/block-storage/${projectId}`);
      })
      .catch((_err: unknown) => {});
  };

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
            component="button"
            type="submit"
            loading={isLoading}
            variant="contained"
            sx={{ px: 3, py: 0.8 }}
            onClick={submit}
          >
            ذخیره
          </LoadingButton>
        </Stack>
      </Stack>
    </Dialog>
  );
}; 