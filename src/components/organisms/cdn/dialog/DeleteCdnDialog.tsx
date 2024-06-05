import { LoadingButton } from "@mui/lab";
import { Button, Dialog, DialogProps, Stack, Typography } from "@mui/material";
import { FC, MouseEventHandler } from "react";
import { BlurBackdrop } from "src/components/atoms/BlurBackdrop";
import { BORDER_RADIUS_1 } from "src/configs/theme";

type DeleteDialogPropsType = DialogProps & {
  keyTitle: string;
  subTitle: string;
  securityPhrase: string;
  onSubmit: MouseEventHandler<HTMLButtonElement>;
  submitLoading: boolean;
};

export const DeleteCdnDialog: FC<DeleteDialogPropsType> = ({
  keyTitle,
  subTitle,
  securityPhrase,
  onSubmit,
  submitLoading,
  ...props
}) => {
  const onCloseButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    props.onClose && props.onClose(event, "escapeKeyDown");
  };

  return (
    <Dialog
      components={{ Backdrop: BlurBackdrop }}
      fullWidth
      sx={{ "& .MuiPaper-root": { borderRadius: BORDER_RADIUS_1 } }}
      {...{
        ...props,
        onClose: (e) => {
          if (!props.onClose) return;
          props.onClose(e, "backdropClick");
        },
      }}
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
            onClick={onCloseButtonClick}
          >
            انصراف
          </Button>
          <LoadingButton
            variant="contained"
            color="error"
            onClick={onSubmit}
            loading={submitLoading}
          >
            {`حذف ${keyTitle}`}
          </LoadingButton>
        </Stack>
      </Stack>
    </Dialog>
  );
};
