import { FC } from "react";
import { Button, Dialog, Stack, Typography } from "@mui/material";
import { BlurBackdrop } from "src/components/atoms/BlurBackdrop";
import { useGetApiMyVmByProjectIdBackupListQuery, usePostApiMyVmByProjectIdBackupRestoreAndIdMutation } from "src/app/services/api.generated";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { useNavigate, useParams } from "react-router";
import { BORDER_RADIUS_1 } from "src/configs/theme";

type RestoreBackupDialogPropsType = {
  openDialog: boolean;
  handleClose: () => void;
  backupId: number;
};

export const RestoreBackupDialog: FC<RestoreBackupDialogPropsType> = ({
  openDialog,
  handleClose,
  backupId,
}) => {
  const onClose = () => handleClose();
  const [restoreBackup, { isLoading }] =
    usePostApiMyVmByProjectIdBackupRestoreAndIdMutation();
  const navigate = useNavigate();

  const { projectId } = useParams();
  const { refetch } = useGetApiMyVmByProjectIdBackupListQuery({
    projectId: Number(projectId),
  });
  
  const submit = () => {
    if (!backupId) return;
    restoreBackup({
      id: backupId,
      projectId: Number(projectId),
    })
      .unwrap()
      .then(() => {
        toast.success("فرآیند بارگذاری بکاپ مورد نظر با موفقیت آغاز شد");
        handleClose();
       refetch();
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
            آیا از بازگردانی به بکاپ مورد نظر مطمئن هستید؟
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