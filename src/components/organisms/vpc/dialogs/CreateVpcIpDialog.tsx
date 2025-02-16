import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import { FC, MouseEventHandler, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { usePostApiMyVpcIpCreateMutation } from "src/app/services/api.generated";

type CreateVpcIpDialogPropsType = DialogProps & {
  id?: number;
  vpcHostId: number;
  //   onClose: () => void;
  //   openDialog: boolean;
};

export const CreateVpcIpDialog: FC<CreateVpcIpDialogPropsType> = ({
  id,
  vpcHostId,
  //   onClose,
  //   openDialog,
  ...props
}) => {
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const { vpcId } = useParams();

  const [createVpcIp, { isLoading: createVpcIpLoading }] =
    usePostApiMyVpcIpCreateMutation();

  const handleButton = () => {
    if (!vpcId) return;

    createVpcIp({
      createVpcHostGatewayIpModel: {
        vpcHostId: Number(vpcId),
      },
    })
      .unwrap()
      .then(() => {
        toast.success("IP مورد نظر با موفقیت ایجاد اضافه شد");
        closeDialogHandler({}, "escapeKeyDown");
      })
      .catch((err) => {})
      .finally(() => {});
  };

  const cancelBtnOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (!props.onClose) return;
    props.onClose(event, "backdropClick");
    setIsConfirm(false);
  };

  const closeDialogHandler = (
    event: {},
    reason: "backdropClick" | "escapeKeyDown"
  ) => {
    if (!props.onClose) return;
    props.onClose(event, reason);
    setIsConfirm(false);
  };
  return (
    <Dialog {...props} onClose={closeDialogHandler}>
      <DialogTitle justifyContent="left">
        <Typography fontSize="1.25rem" component="span" fontWeight={700}>
          افزودن IP
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Stack>
          <Alert
            sx={{ width: "100%", bgcolor: "rgba(240, 247, 255, 1)" }}
            icon={false}
          >
            <FormControlLabel
              sx={{ justifyContent: "left" }}
              label={
                <Typography variant="text6">
                  تأیید کنید که می خواهید یک IP جدید ایجاد کنید.
                </Typography>
              }
              control={
                <Checkbox
                  checked={isConfirm}
                  onChange={(_, checked) => setIsConfirm(checked)}
                />
              }
            />
          </Alert>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Stack direction="row" justifyContent="end" spacing={1}>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ px: 3, py: 0.8 }}
            onClick={cancelBtnOnClick}
          >
            انصراف
          </Button>
          <LoadingButton
            component="button"
            type="submit"
            disabled={!isConfirm}
            loading={createVpcIpLoading}
            variant="contained"
            sx={{ px: 3, py: 0.8 }}
          >
            ذخیره
          </LoadingButton>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};
