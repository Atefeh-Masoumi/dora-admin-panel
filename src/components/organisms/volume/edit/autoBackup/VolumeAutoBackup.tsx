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
 
} from "@mui/material";
import { useParams } from "react-router";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import {
  useGetApiMyVmByProjectIdVolumeListQuery,
  usePutApiMyVmByProjectIdVolumeDisableBackupAndIdMutation,
} from "src/app/services/api.generated";
import { toast } from "react-toastify";
import { RefreshButton } from "src/components/atoms/RefreshButton";
import { EnableAutoBackupDialog } from "./EnableAutoBackupDialog";

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
       <Paper
        elevation={0}
        sx={{ overflow: "hidden", px: { xs: 2, sm: 3, md: 4, lg: 5 }, py: 5 }}
      >
        <Stack
          pb={2}
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent="space-between"
          gap={1}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems="center"
            spacing={2}
          >
            <Typography
              color="grey.700"
              fontSize={24}
              fontWeight={700}
            >
              فعال‌سازی بکاپ خودکار
            </Typography>
            <RefreshButton isFetching={volumeLoading} refetchData={refetchVolume} />
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
                  variant="outlined"
                  color="primary"
                  onClick={() => setDialogType("ENABLE")}
                  disabled={volumeLoading}
                >
                  فعال‌سازی بکاپ خودکار
                </Button>
              )}
            </Stack>
        </Stack>
        <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
        <Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mt: 6 }}
          >
            <Stack direction="row" alignItems="center" columnGap={1}>
              <Typography variant="text2" fontWeight={"bold"}>
                بکاپ خودکار برای این دیسک
              </Typography>
              {isAutoBackupEnabled && (
                <>
                  {/* <Typography variant="text2" fontWeight={"bold"}>به صورت </Typography> */}
                  <Typography
                   
                    sx={{ color: "text.secondary" }}
                  >
                    {getBackupTypeLabel(volumeData?.calculateTypeId ?? undefined)}
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
              <Typography variant="text2" fontWeight={"bold"} >است</Typography>
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




export default VolumeAutoBackup;