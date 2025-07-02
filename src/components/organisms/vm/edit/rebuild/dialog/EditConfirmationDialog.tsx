import { FC } from "react";
import { Button, Dialog, Stack, Typography } from "@mui/material";
import { BlurBackdrop } from "src/components/atoms/BlurBackdrop";
import { LoadingButton } from "@mui/lab";
import { BORDER_RADIUS_1 } from "src/configs/theme";

type EditConfirmationDialogPropsType = {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  submitLoading: boolean;
};

export const EditConfirmationDialog: FC<EditConfirmationDialogPropsType> = ({
  open,
  onClose,
  onSubmit,
  submitLoading,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      components={{ Backdrop: BlurBackdrop }}
      maxWidth="xs"
      fullWidth
      sx={{ "& .MuiPaper-root": { borderRadius: BORDER_RADIUS_1 } }}
    >
      <Stack p={{ xs: 1.8, md: 3 }} spacing={{ xs: 2, md: 5 }}>
        <Stack>
          <Typography variant="text1" color="error" fontWeight="bold">
            آیا از بازسازی سرور مورد نظر مطمئن هستید؟
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
            loading={submitLoading}
            variant="contained"
            sx={{ px: 3, py: 0.8 }}
            onClick={onSubmit}
          >
            تایید
          </LoadingButton>
        </Stack>
      </Stack>
    </Dialog>
  );
}; 