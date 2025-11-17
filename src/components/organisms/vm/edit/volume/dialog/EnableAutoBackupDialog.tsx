import { FC, MouseEventHandler, useEffect, useState } from "react";
import {
  DialogProps,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  DialogContentText,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  useGetApiMyVmByProjectIdHostAndVmHostIdVolumeListQuery,
  usePutApiMyVmByProjectIdHostEnableBackupAndIdMutation,
} from "src/app/services/api.generated";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

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

export const EnableAutoBackupDialog: FC<EnableAutoBackupDialogPropsType> = ({
  forceClose,
  vmBackupId,
  onSuccess,
  ...props
}) => {
  const { projectId, id: vmId } = useParams();

  const [enableAutoBackup, { isLoading: enableAutoBackupLoading }] =
    usePutApiMyVmByProjectIdHostEnableBackupAndIdMutation();

  const [calculateTypeId, setCalculateTypeId] = useState<number>(1);

  useEffect(() => {
    if (props.open) {
      setCalculateTypeId(1);
    }
  }, [props.open]);

  const { refetch } =
    useGetApiMyVmByProjectIdHostAndVmHostIdVolumeListQuery({
      projectId: Number(projectId),
      vmHostId: Number(vmId),
    });

  const onSubmit = () => {
    enableAutoBackup({
      id: vmBackupId,
      projectId: Number(projectId),
      enableBackupSnapshotModel: { calculateTypeId: calculateTypeId },
    })
      .unwrap()
      .then(() => {
        toast.success("بکاپ خودکار با موفقیت فعال شد");
        onSuccess?.();
        forceClose();
        refetch();
      })
      .catch(() => { });
  };

  const cancelBtnOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (!props.onClose) return;
    props.onClose(event, "backdropClick");
    setCalculateTypeId(1);
  };

  const handleClose = (event: any, reason?: string) => {
    if (props.onClose) {
      props.onClose(event, "backdropClick");
      setCalculateTypeId(1);
    }
  };

  return (
    <Dialog {...props} onClose={handleClose}>
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
              id="calculate-type"
              value={calculateTypeId}
              label="دوره زمانی"
              onChange={(e) => setCalculateTypeId(Number(e.target.value))}
            >
              {calculateTypeOptions.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
          onClick={onSubmit}
        >
          فعال‌سازی
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};


