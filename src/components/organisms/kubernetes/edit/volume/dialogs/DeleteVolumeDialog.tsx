import { FC, useContext } from "react";
import { Button, Dialog, Stack, Typography } from "@mui/material";
import { BlurBackdrop } from "src/components/atoms/BlurBackdrop";
import { useDeletePortalKubeVolumeDeleteByIdMutation } from "src/app/services/api.generated";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { VolumeContext } from "../../VolumeManagement";

type DeleteVolumeDialogPropsType = {
  openDialog: boolean;
  handleClose: () => void;
  id: number;
};

export const DeleteVolumeDialog: FC<DeleteVolumeDialogPropsType> = ({
  openDialog,
  handleClose,
  id,
}) => {
  const onClose = () => handleClose();
  const [deleteVolume, { isLoading }] =
    useDeletePortalKubeVolumeDeleteByIdMutation();

  const { refetchVolumes } = useContext(VolumeContext);

  const submit = () =>
    deleteVolume({ id })
      .then(() => {
        toast.success(" والیوم با موفقیت حذف شد");
        refetchVolumes();
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
            از حذف حجم مطمئن هستید؟
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
            حذف والیوم
          </LoadingButton>
        </Stack>
      </Stack>
    </Dialog>
  );
};
