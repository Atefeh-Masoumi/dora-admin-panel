import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    DialogProps,
    Stack,
    Divider,
    Button,
} from "@mui/material";
import { FC, MouseEventHandler, useEffect, useState } from "react";
import { usePutApiMyVmByProjectIdVolumeEnableBackupAndIdMutation, useGetApiMyVmByProjectIdBackupListQuery, } from "src/app/services/api.generated";
import { LoadingButton } from "@mui/lab";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import * as yup from "yup";
import { useFormik } from "formik";

type EnableAutoBackupDialogPropsType = DialogProps & {
    forceClose: () => void;
    vmBackupId: number;
    onSuccess?: () => void;
};
const calculateTypeOptions = [
    { id: 1, label: "روزانه" },
    { id: 2, label: "هفتگی" },
    // { id: 3, label: "دو هفته‌ای" },
    { id: 4, label: "ماهانه" },
];

const validationSchema = yup.object({
    calculateTypeId: yup.number(),
    cleanUpDuration: yup.number().max(7, "حداکثر زمان نگه داری بکاپ 7 روز میباشد")
})

const initialValues = {
    calculateTypeId: 0,
    cleanUpDuration: 0
}
export const EnableAutoBackupDialog: FC<EnableAutoBackupDialogPropsType> = ({
    forceClose,
    vmBackupId,
    onSuccess,
    ...props
  }) => {
    const { projectId, blockstorageId } = useParams();
  
    const [enableAutoBackup, { isLoading: enableAutoBackupLoading }] =
      usePutApiMyVmByProjectIdVolumeEnableBackupAndIdMutation();
  
    const { refetch } = useGetApiMyVmByProjectIdBackupListQuery({
      projectId: Number(projectId),
      vmVolumeHostId: Number(blockstorageId),
    });
  
    const formik = useFormik({
      initialValues: { calculateTypeId: 1, cleanUpDuration: 0 },
      validationSchema,
      onSubmit: (values) => {
        enableAutoBackup({
          id: Number(blockstorageId),
          projectId: Number(projectId),
          enableBackupSnapshotModel: {
            calculateTypeId: values.calculateTypeId,
            cleanUpDuration: Number(values.cleanUpDuration),
          },
        })
          .unwrap()
          .then(() => {
            toast.success("بکاپ خودکار با موفقیت فعال شد");
            refetch();
            onSuccess?.();
            forceClose();
          })
          .catch(() => {
            toast.error("فعال‌سازی بکاپ خودکار ناموفق بود");
          });
      },
    });
  
    useEffect(() => {
      if (props.open) formik.resetForm();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.open]);
  
    const cancelBtnOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
      props.onClose?.(event, "backdropClick");
      formik.resetForm();
    };
  
    const handleClose = (event: any) => {
      props.onClose?.(event, "backdropClick");
      formik.resetForm();
    };
  
    return (
      <Dialog {...props} onClose={handleClose}>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle align="center">فعال‌سازی بکاپ خودکار</DialogTitle>
  
          <DialogContent>
            <Stack direction="column" rowGap={2} sx={{ mt: 1, minWidth: 300 }}>
              <DialogContentText>
                لطفاً دوره زمانی بکاپ خودکار را انتخاب کنید.
              </DialogContentText>
  
              <FormControl fullWidth size="small">
                <InputLabel id="calculate-type-label">دوره زمانی</InputLabel>
                <Select
                  labelId="calculate-type-label"
                  id="calculateTypeId"
                  name="calculateTypeId"
                  value={formik.values.calculateTypeId}
                  label="دوره زمانی"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  {calculateTypeOptions.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
  
              <DorsaTextField
                focused
                name="cleanUpDuration"
                value={formik.values.cleanUpDuration}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(formik.touched.cleanUpDuration && formik.errors.cleanUpDuration)}
                helperText={
                  formik.touched.cleanUpDuration ? (formik.errors.cleanUpDuration as string) : ""
                }
                label="مدت زمان نگه داری بکاپ"
                inputProps={{ dir: "ltr" }}
              />
            </Stack>
          </DialogContent>
  
          <Divider />
  
          <DialogActions sx={{ alignItems: "center", columnGap: 2, p: 2 }}>
            <Button variant="outlined" fullWidth onClick={cancelBtnOnClick}>
              انصراف
            </Button>
  
            <LoadingButton
              variant="contained"
              color="primary"
              fullWidth
              loading={enableAutoBackupLoading}
              type="submit"
            >
              فعال‌سازی
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    );
  };
  