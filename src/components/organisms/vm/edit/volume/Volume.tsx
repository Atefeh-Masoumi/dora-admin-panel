import { Add } from "@mui/icons-material";
import { Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
// import { CreateVolumeDialog } from "./dialog/CreateVolumeDialog";
import VolumeTableRow from "./table/VolumeTableRow";
import { volumeTableStruct } from "./table/struct";
import {
  useGetApiMyVmByProjectIdVolumeListQuery,
  VolumeListResponse,
  usePutApiMyVmByProjectIdVolumeDisableBackupAndIdMutation,
} from "src/app/services/api.generated";
import { RefreshButton } from "src/components/atoms/RefreshButton";

export const Volume: FC = () => {
  const { id } = useParams();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [dialogType, setDialogType] = useState<null>(null);

  const { projectId } = useParams();

  const {
    data: volumeList,
    isLoading: getVolumeLoading,
    refetch,
    isFetching,
  } = useGetApiMyVmByProjectIdVolumeListQuery({ vmHostId: Number(id), projectId: Number(projectId), });

  const [selectedVolume, setSelectedVolume] =
    useState<VolumeListResponse | null>(null);
  const [autoBackupEnabledIds, setAutoBackupEnabledIds] = useState<
    Set<number>
  >(new Set());

  const [disableAutoBackup, { isLoading: disableAutoBackupLoading }] =
    usePutApiMyVmByProjectIdVolumeDisableBackupAndIdMutation();

  useEffect(() => {
    const getNotifInterval = setInterval(() => {
      refetch();
    }, 120 * 1000);
    return () => {
      clearInterval(getNotifInterval);
    };
  }, [refetch]);

  const openCreateDialogHandler = () => {
    setShowCreateDialog(true);
  };

  const closeDialogHandler = () => {
    setDialogType(null);
    setShowCreateDialog(false);
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
              مدیریت دیسک
            </Typography>
            <RefreshButton isFetching={isFetching} refetchData={refetch} />
          </Stack>

          {/* <Button
              onClick={openCreateDialogHandler}
              variant="outlined"
              startIcon={<Add />}
            >
              افزودن دیسک
            </Button> */}
        </Stack>
        <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
        <Stack>
          <BaseTable
            struct={volumeTableStruct}
            RowComponent={VolumeTableRow}
            rows={volumeList || []}
            text="در حال حاضر دیسک وجود ندارد"
            isLoading={getVolumeLoading}
            initialOrder={1}
            rowExtraProps={{
              autoBackupEnabledIds,
              onEnableAutoBackupClick: (volume: VolumeListResponse) => {
                setSelectedVolume(volume);
                setDialogType("ENABLE_AUTO_BACKUP");
              },
              onDisableAutoBackupClick: (volume: VolumeListResponse) => {
                setSelectedVolume(volume);
                setDialogType("DISABLE_AUTO_BACKUP");
              },
            }}
          />
        </Stack>
      </Paper>

      {/* <CreateVolumeDialog
        maxWidth="xs"
        fullWidth
        open={showCreateDialog}
        onClose={closeDialogHandler}
        forceClose={closeDialogHandler}
        refetch={refetch}
      /> */}
    </>
  );
};
