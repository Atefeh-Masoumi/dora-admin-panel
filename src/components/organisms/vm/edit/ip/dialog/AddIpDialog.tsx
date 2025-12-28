import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { FC, MouseEventHandler, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { usePostApiMyVmByProjectIdHostAndVmHostIdIpCreateMutation } from
  "src/app/services/api.generated";

import {
  dialogSx,
  dialogTitleSx,
  dialogContentSx,
  dialogFormStackSx,
  dialogActionsSx,
  dialogButtonSx,
} from "src/configs/dialogStyles";

type AddIpDialogPropsType = DialogProps & {
  vmId: number;
  forceClose: () => void;
  refetch: () => void;
};

const AddIpDialog: FC<AddIpDialogPropsType> = ({
  vmId,
  forceClose,
  refetch,
  ...props
}) => {
  const { projectId } = useParams();
  const [isV4, setIsV4] = useState(true);

  const [addIp, { isLoading }] =
    usePostApiMyVmByProjectIdHostAndVmHostIdIpCreateMutation();

  const formik = useFormik({
    initialValues: {},
    onSubmit: () => {
      addIp({
        projectId: Number(projectId),
        vmHostId: vmId,
        createVmIpModel: { useIpV4: isV4 },
      })
        .unwrap()
        .then(() => {
          toast.success("آی‌پی با موفقیت افزوده شد");
          forceClose();
          refetch();
        })
        .catch(() => {});
    },
  });

  const cancelBtnOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    props.onClose?.(event, "backdropClick");
  };

  return (
    <Dialog {...props} sx={dialogSx}>
      <DialogTitle sx={dialogTitleSx}>افزودن IP</DialogTitle>

      <form onSubmit={formik.handleSubmit}>
        <DialogContent sx={dialogContentSx}>
          <Stack sx={dialogFormStackSx}>
            <Typography fontSize={16}>
              آیا از افزودن IP جدید مطمئن هستید؟
            </Typography>

            <Stack>
              <InputLabel>نسخه IP</InputLabel>
              <Select
                size="small"
                fullWidth
                value={isV4 ? 0 : 1}
                onChange={(e) => setIsV4(e.target.value === 0)}
              >
                <MenuItem value={0}>IPv4</MenuItem>
                <MenuItem value={1}>IPv6</MenuItem>
              </Select>
            </Stack>
          </Stack>
        </DialogContent>

        <DialogActions sx={dialogActionsSx}>
          <Stack direction="row" justifyContent="end" spacing={1} width="100%">
            <Button
              variant="outlined"
              color="secondary"
              sx={dialogButtonSx}
              onClick={cancelBtnOnClick}
            >
              انصراف
            </Button>

            <LoadingButton
              type="submit"
              loading={isLoading}
              variant="contained"
              sx={dialogButtonSx}
            >
              افزودن آی‌پی
            </LoadingButton>
          </Stack>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddIpDialog;
