import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import { FC, MouseEventHandler, useState } from "react";
import { useParams } from "react-router";
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
          افزودن IP جدید
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
        <Stack direction="column" rowGap={3} pt={2}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            alignItems="center"
            justifyContent="right"
            gap={2}
          >
            <Button
              onClick={cancelBtnOnClick}
              fullWidth
              variant="outlined"
              sx={{ width: "23%" }}
            >
              انصراف
            </Button>
            <LoadingButton
              fullWidth
              disabled={!isConfirm}
              type="button"
              onClick={handleButton}
              variant="contained"
              loading={createVpcIpLoading}
              sx={{ width: "25%" }}
            >
              ایجاد
            </LoadingButton>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
