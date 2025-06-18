import { LoadingButton } from "@mui/lab";
import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, InputLabel, MenuItem, Select, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { FC, MouseEventHandler, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import {  usePostApiMyVmByProjectIdHostAndVmHostIdIpCreateMutation } from "src/app/services/api.generated";

type AddIpDialogPropsType = DialogProps & {
  vmId: number;
  forceClose: () => void;
    refetch:()=>void;
};

const AddIpDialog: FC<AddIpDialogPropsType> = ({
  vmId,
  forceClose,
   refetch,
  ...props
}) => {
  const {projectId} = useParams();
  const [isV4, setIsV4] = useState<boolean>(true);
  const [addIp, { isLoading: addIpLoading }] =
  usePostApiMyVmByProjectIdHostAndVmHostIdIpCreateMutation();
  
    const initialValues = {
        id: vmId,
    };
      
    const onSubmit = () => {
    if (vmId === null || vmId === undefined || isNaN(Number(vmId))) return;
    addIp({
      projectId: Number(projectId),
      vmHostId: vmId,
      createVmIpModel: {
        useIpV4: isV4
      }
    })
      .unwrap()
      .then(() => {
        toast.success(" آی پی با موفقیت افزوده شد");
        forceClose();
        refetch();
      })
      .catch((err) => {});
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  const cancelBtnOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (!props.onClose) return;
    props.onClose(event, "backdropClick");
  };

  return (
    <Dialog {...props}>
      <DialogTitle align="center">افزودن IP</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Stack rowGap={3} pt={2}>
          <Typography fontSize={16} >
            آیا از افزودن IP جدید مطمئن هستید؟
          </Typography>
            <InputLabel>IpV4</InputLabel>
                <Select
                  label="ipV4"
                  size="small"
                  value={isV4 ? 0 : 1}
                  onChange={(e) => setIsV4(e.target.value === 0)}
                >
                  {["IPv4", "IPv6"].map((label, index) => (
                    <MenuItem key={index} value={index}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
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
              loading={addIpLoading}
              variant="contained"
              sx={{ px: 3, py: 0.8 }}
            >
              افزودن آی پی
            </LoadingButton>
          </Stack>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddIpDialog;
