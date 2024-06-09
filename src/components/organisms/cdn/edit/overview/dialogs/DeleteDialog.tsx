import { LoadingButton } from "@mui/lab";
import { Button, Dialog, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
  useDeleteApiMyDnsHostDeleteByIdMutation,
  useGetApiMyDnsHostListQuery,
} from "src/app/services/api.generated";
import { BlurBackdrop } from "src/components/atoms/BlurBackdrop";
import { Success } from "src/components/atoms/svg-icons/SuccessSvg";
import { BORDER_RADIUS_1 } from "src/configs/theme";

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
  const [DeleteZone, { isLoading }] = useDeleteApiMyDnsHostDeleteByIdMutation();
  const { refetch } = useGetApiMyDnsHostListQuery();

  const navigate = useNavigate();

  const submit = () =>
    DeleteZone({ id })
      .unwrap()
      .then(() => {
        navigate("/cdn");
        toast.error("دامنه مورد نظر حذف شد", { icon: Success });
        refetch();
      })
      .catch(() => {});

  return (
    <Dialog
      open={openDialog}
      onClose={onClose}
      components={{ Backdrop: BlurBackdrop }}
      disableEscapeKeyDown
      maxWidth="xs"
      fullWidth
      sx={{ "& .MuiPaper-root": { borderRadius: BORDER_RADIUS_1 } }}
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
