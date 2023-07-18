import { FC } from "react";
import { Button, Dialog, Stack, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { Success } from "src/components/atoms/svg/SuccessSvg";
import { BlurBackdrop } from "src/components/atoms/BlurBackdrop";
import { useDeletePortalCdnCdnDeleteByIdMutation } from "src/app/services/api.generated";
import { useNavigate } from "react-router";

type DeleteZoneDialogPropsType = {
  id: number;
  openDialog: boolean;
  handleClose: () => void;
};

export const DeleteZoneDialog: FC<DeleteZoneDialogPropsType> = ({
  id,
  openDialog,
  handleClose,
}) => {
  const onClose = () => handleClose();
  const [DeleteZone, { isLoading }] = useDeletePortalCdnCdnDeleteByIdMutation();

  const navigate = useNavigate();

  const submit = () =>
    DeleteZone({ id })
      .unwrap()
      .then(() => {
        navigate("/cdn");
        toast.error("دامنه مورد نظر حذف شد", { icon: Success });
      })
      .catch(() => toast.error("مشکلی پیش آمده \nلطفا دوباره امتحان کنید"));

  return (
    <Dialog
      open={openDialog}
      onClose={onClose}
      components={{ Backdrop: BlurBackdrop }}
      disableEscapeKeyDown
      maxWidth="xs"
      fullWidth
      sx={{ "& .MuiPaper-root": { borderRadius: 2.5 } }}
    >
      <Stack p={{ xs: 1.8, md: 3 }} spacing={{ xs: 2, md: 5 }}>
        <Stack>
          <Typography variant="text1" color="error" fontWeight="bold">
            از حذف دامنه مطمئن هستید؟
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
