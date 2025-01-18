import { LoadingButton } from "@mui/lab";
import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { FC, MouseEventHandler } from "react";
import { toast } from "react-toastify";
import {  usePostApiMyDatacenterIpAddByIdMutation } from "src/app/services/api.generated";

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
  const [addIp, { isLoading: addIpLoading }] =
    usePostApiMyDatacenterIpAddByIdMutation();
  
    const initialValues = {
        id: vmId,
    };
      
    const onSubmit = () => {
    if (vmId === null || vmId === undefined || isNaN(Number(vmId))) return;
    addIp({
      id: vmId,
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
