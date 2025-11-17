import {
  FC,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import {
  Stack,
  Typography,
  Paper,
  Divider,
  Button,
  Chip,
  DialogProps,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useParams } from "react-router";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import {
  useGetApiMyVmByProjectIdVolumeListQuery,
  usePutApiMyVmByProjectIdVolumeDisableBackupAndIdMutation,
  useGetApiMyVmByProjectIdVolumeAndVmVolumeHostIdBackupListQuery,
  usePutApiMyVmByProjectIdVolumeEnableBackupAndIdMutation,
} from "src/app/services/api.generated";
import { toast } from "react-toastify";

type DialogType = "ENABLE" | "DISABLE" | null;

const calculateTypeOptions = [
  { id: 1, label: "روزانه" },
  { id: 2, label: "هفتگی" },
  // { id: 3, label: "دو هفته‌ای" },
  { id: 4, label: "ماهانه" },
];

const VolumeAutoBackup: FC = () => {
  const { projectId, blockstorageId } = useParams();

  const [dialogType, setDialogType] = useState<DialogType>(null);

  const {
    data: volumeList,
    isLoading: volumeLoading,
    refetch: refetchVolume,
  } = useGetApiMyVmByProjectIdVolumeListQuery({
    projectId: Number(projectId),
  });

  const volumeData = volumeList?.find(
    (item) => item.id === Number(blockstorageId)
  );

  const [disableAutoBackup, { isLoading: disableAutoBackupLoading }] =
    usePutApiMyVmByProjectIdVolumeDisableBackupAndIdMutation();

  const isAutoBackupEnabled = !!volumeData?.calculateTypeId;

  const getBackupTypeLabel = (id?: number) => {
    return (
      calculateTypeOptions.find((item) => item.id === id)?.label || "نامشخص"
    );
  };

  const closeDialogs = () => {
    setDialogType(null);
  };

  const handleDisableAutoBackup = () => {
    disableAutoBackup({
      projectId: Number(projectId),
      id: Number(blockstorageId),
    })
      .unwrap()
      .then(() => {
        toast.success("بکاپ خودکار با موفقیت غیرفعال شد");
        refetchVolume();
        closeDialogs();
      })
      .catch(() => {
        toast.error("خطا در غیرفعال‌سازی بکاپ خودکار");
      });
  };

  const handleEnableAutoBackupSuccess = () => {
    refetchVolume();
  };

  return (
    <>
      <Paper sx={{ p: 2 }}>
        <Stack direction="column" rowGap={2}>
          <Typography color="grey.700"
              fontSize={24}
              fontWeight={700}>بکاپ خودکار دیسک</Typography>
          <Divider flexItem sx={{ borderWidth: 1.5 }} />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mt: 2 }}
          >
            <Stack direction="row" alignItems="center" columnGap={1}>
              <Typography >
                بکاپ خودکار برای این دیسک
              </Typography>
              {isAutoBackupEnabled && (
                <>
                  <Typography>به صورت </Typography>
                  <Typography
                   
                    sx={{ color: "text.secondary" }}
                  >
                    {getBackupTypeLabel(volumeData?.calculateTypeId)}
                  </Typography>
                </>
              )}
              <Chip
                label={
                  isAutoBackupEnabled
                    ? "فعال"
                    : volumeLoading
                    ? "در حال بارگذاری..."
                    : "غیرفعال"
                }
                color={isAutoBackupEnabled ? "success" : "default"}
                variant="outlined"
              />
              <Typography >است</Typography>
            </Stack>
            <Stack direction="row" columnGap={2}>
              {isAutoBackupEnabled ? (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => setDialogType("DISABLE")}
                  disabled={volumeLoading}
                >
                  غیرفعال‌سازی بکاپ خودکار
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setDialogType("ENABLE")}
                  disabled={volumeLoading}
                >
                  فعال‌سازی بکاپ خودکار
                </Button>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Paper>

      <EnableAutoBackupDialog
        open={dialogType === "ENABLE"}
        onClose={closeDialogs}
        vmBackupId={Number(blockstorageId)}
        forceClose={closeDialogs}
        onSuccess={handleEnableAutoBackupSuccess}
      />

      <DeleteDialog
        open={dialogType === "DISABLE"}
        onClose={closeDialogs}
        keyTitle="بکاپ خودکار"
        subTitle="برای غیرفعال‌سازی بکاپ خودکار این دیسک، عبارت امنیتی زیر را وارد کنید."
        securityPhrase={volumeData?.name || ""}
        onSubmit={handleDisableAutoBackup}
        submitLoading={disableAutoBackupLoading}
      />
    </>
  );
};

type EnableAutoBackupDialogPropsType = DialogProps & {
  forceClose: () => void;
  vmBackupId: number;
  onSuccess?: () => void;
};

export const EnableAutoBackupDialog: FC<EnableAutoBackupDialogPropsType> = ({
  forceClose,
  vmBackupId,
  onSuccess,
  ...props
}) => {
  const { projectId, blockstorageId } = useParams();

  const [enableAutoBackup, { isLoading: enableAutoBackupLoading }] =
    usePutApiMyVmByProjectIdVolumeEnableBackupAndIdMutation();

  const [calculateTypeId, setCalculateTypeId] = useState<number>(1);

  const { refetch } =
    useGetApiMyVmByProjectIdVolumeAndVmVolumeHostIdBackupListQuery({
      projectId: Number(projectId),
      vmVolumeHostId: Number(blockstorageId),
    });

  useEffect(() => {
    if (props.open) {
      setCalculateTypeId(1);
    }
  }, [props.open]);

  const onSubmit = () => {
    enableAutoBackup({
      id: Number(blockstorageId),
      projectId: Number(projectId),
      enableBackupSnapshotModel:
      {calculateTypeId: calculateTypeId},
    })
      .unwrap()
      .then(() => {
        toast.success("بکاپ خودکار با موفقیت فعال شد");
        refetch();
        onSuccess?.();
        forceClose();
      })
      .catch(() => {
        toast.error("خطا در فعال‌سازی بکاپ خودکار");
      });
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

export default VolumeAutoBackup;