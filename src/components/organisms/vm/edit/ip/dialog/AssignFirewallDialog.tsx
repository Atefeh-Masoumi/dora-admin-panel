import { LoadingButton } from "@mui/lab";
import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, InputLabel, MenuItem, Select, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { FC, MouseEventHandler, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import {  useGetApiMyVmByProjectIdFirewallListQuery, usePostApiMyVmByProjectIdHostAndVmHostIdIpCreateMutation, usePutApiMyVmByProjectIdHostAndVmHostIdAssignFirewallMutation } from "src/app/services/api.generated";

type AssignFirewallDialogPropsType = DialogProps & {
 
  forceClose: () => void;
};

export const AssignFirewallDialog: FC<AssignFirewallDialogPropsType> = ({
  forceClose,
  ...props
}) => {
  const {projectId, id:vmId} = useParams();

  const [AssignFirewall, { isLoading: isLoading }] =
  usePutApiMyVmByProjectIdHostAndVmHostIdAssignFirewallMutation();
  
  const {
    data: firewallList = [],
    isLoading: getFirewallListLoading,
    refetch,
    isFetching,
  } = useGetApiMyVmByProjectIdFirewallListQuery({
    projectId: Number(projectId),
  });

    const initialValues = {
        vmFirewallId: 0,
    };
      
    const onSubmit = (values: typeof initialValues) => {
    AssignFirewall({
      projectId: Number(projectId),
      vmHostId: Number(vmId) ,
      assignFirewallModel: {
        vmFirewallId: values.vmFirewallId
      }
    })
      .unwrap()
      .then(() => {
        toast.success("   با موفقیت افزوده شد");
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
      <DialogTitle align="center">افزودن رول</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Stack rowGap={3} pt={2}>
          <Typography fontSize={16} >
            آیا از افزودن رول جدید مطمئن هستید؟
          </Typography>
            <InputLabel>لیست فایروال</InputLabel>
                <Select
                  label="لیست فایروال"
                  size="small"
                  name="vmFirewallId"
                  value={formik.values.vmFirewallId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  {firewallList.map((item, index) => (
                    <MenuItem key={index} value={item.id}>
                      {item.name}
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
              loading={isLoading}
              variant="contained"
              sx={{ px: 3, py: 0.8 }}
            >
              افزودن رول 
            </LoadingButton>
          </Stack>
        </DialogActions>
      </form>
    </Dialog>
  );
};

