import { FC } from "react";
import { Button, Dialog, Stack, Typography } from "@mui/material";
import { BlurBackdrop } from "src/components/atoms/BlurBackdrop";
import { useGetApiMyVmByProjectIdBackupListQuery, usePutApiMyVmByProjectIdHostIpEnablePortSecurityAndIdMutation } from "src/app/services/api.generated";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { useNavigate, useParams } from "react-router";
import { BORDER_RADIUS_1 } from "src/configs/theme";

type EnablePortDialogPropsType = {
  openDialog: boolean;
  handleClose: () => void;
  id: number;
  refetch: () => void;
};

export const EnablePortDialog: FC<EnablePortDialogPropsType> = ({
  openDialog,
  handleClose,
  refetch,
  id,
}) => {
  const onClose = () => handleClose();
  const [enableport, { isLoading }] =
    usePutApiMyVmByProjectIdHostIpEnablePortSecurityAndIdMutation();
  const navigate = useNavigate();

  const { projectId, id: vmId } = useParams();
  
  
  const submit = () => {
    if (!id) return;
        enableport({ projectId: Number(projectId), 
          // vmHostId: Number(vmId), 
          id })
          .unwrap()
          .then(() => {
            toast.success("با موفقیت فعال شد");
            refetch();
          })
          .catch(() => {
            
          });
      
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
            آیا از فعال سازی port security این IP مطمئن هستید؟
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
            تایید
          </LoadingButton>
        </Stack>
      </Stack>
    </Dialog>
  );
}; 