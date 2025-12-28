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
import React, { FC, MouseEventHandler } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import {
  useGetApiMyVmByProjectIdFirewallListQuery,
  usePutApiMyVmByProjectIdHostAndVmHostIdAssignFirewallMutation,
} from "src/app/services/api.generated";

import {
  dialogSx,
  dialogTitleSx,
  dialogContentSx,
  dialogFormStackSx,
  dialogActionsSx,
  dialogButtonSx,
} from "src/configs/dialogStyles";

type AssignFirewallDialogPropsType = DialogProps & {
  forceClose: () => void;
};

export const AssignFirewallDialog: FC<AssignFirewallDialogPropsType> = ({
  forceClose,
  ...props
}) => {
  const { projectId, id: vmId } = useParams();

  const [assignFirewall, { isLoading }] =
    usePutApiMyVmByProjectIdHostAndVmHostIdAssignFirewallMutation();

  const { data: firewallList = [], refetch } =
    useGetApiMyVmByProjectIdFirewallListQuery({
      projectId: Number(projectId),
    });

  const formik = useFormik({
    initialValues: { vmFirewallId: 0 },
    onSubmit: (values) => {
      assignFirewall({
        projectId: Number(projectId),
        vmHostId: Number(vmId),
        assignFirewallModel: { vmFirewallId: values.vmFirewallId },
      })
        .unwrap()
        .then(() => {
          toast.success("با موفقیت افزوده شد");
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
      <DialogTitle sx={dialogTitleSx}>تغییر فایروال</DialogTitle>

      <form onSubmit={formik.handleSubmit}>
        <DialogContent sx={dialogContentSx}>
          <Stack sx={dialogFormStackSx}>
            <Typography fontSize={16}>
              آیا از تغییر فایروال مطمئن هستید؟
            </Typography>

            <Stack>
              <InputLabel>لیست فایروال</InputLabel>
              <Select
                size="small"
                name="vmFirewallId"
                value={formik.values.vmFirewallId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
              >
                {firewallList.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
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
              تغییر فایروال
            </LoadingButton>
          </Stack>
        </DialogActions>
      </form>
    </Dialog>
  );
};
