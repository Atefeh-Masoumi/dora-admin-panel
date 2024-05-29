import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogProps,
  DialogTitle,
  Divider,
  Stack,
} from "@mui/material";
import { FC, MouseEventHandler } from "react";

type DeleteDialogPropsType = DialogProps & {
  keyTitle: string;
  subTitle: string;
  securityPhrase: string;
  onSubmit: MouseEventHandler<HTMLButtonElement>;
  submitLoading: boolean;
};

export const DeleteVmProjectDialog: FC<DeleteDialogPropsType> = ({
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
      {...{
        ...props,
        onClose: (e) => {
          if (!props.onClose) return;
          props.onClose(e, "backdropClick");
        },
      }}
    >
      <DialogTitle textAlign="center">{`حذف ${keyTitle}`}</DialogTitle>
      <Divider />
      <DialogActions sx={{ padding: "20px" }}>
        <Stack width="100%" direction="column" alignItems="center" rowGap={1}>
          <LoadingButton
            variant="contained"
            color="error"
            sx={{ width: 260 }}
            onClick={onSubmit}
            loading={submitLoading}
          >
            {`حذف ${keyTitle}`}
          </LoadingButton>
          <Button
            variant="text"
            color="error"
            sx={{ width: 260 }}
            onClick={onCloseButtonClick}
          >
            انصراف
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};
