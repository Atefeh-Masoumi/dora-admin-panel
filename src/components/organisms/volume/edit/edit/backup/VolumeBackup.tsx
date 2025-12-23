import { Add } from "@mui/icons-material";
import { Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { CreateVolumeBackupDialog } from "./dialog/CreateVolumeBackupDialog";
import VolumeBackupTableRow from "./table/VolumeBackupTableRow";
import { volumeBackupTableStruct } from "./table/struct";
import { useGetApiMyVmByProjectIdBackupListQuery } from "src/app/services/api.generated";
import { RefreshButton } from "src/components/atoms/RefreshButton";

type VolumeBackupPropsType = {};

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

export const VolumeBackup: FC<VolumeBackupPropsType> = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);

  const { blockstorageId, projectId } = useParams();
  const { data: backupList = [], isLoading: getBackupLoading, refetch, isFetching } =
    useGetApiMyVmByProjectIdBackupListQuery(
      { projectId: Number(projectId), vmVolumeHostId: Number(blockstorageId) },
      { skip: !blockstorageId }
    );
    
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
              مدیریت بکاپ دیسک ابری
            </Typography>
            <RefreshButton isFetching={isFetching} refetchData={refetch} />
          </Stack>
          <Button
            onClick={openCreateDialogHandler}
            variant="outlined"
            startIcon={<Add />}
          >
            افزودن بکاپ
          </Button>
        </Stack>
        <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
        <Stack>
          <BaseTable
            struct={volumeBackupTableStruct}
            RowComponent={VolumeBackupTableRow}
            rows={backupList}
            text="در حال حاضر بکاپ وجود ندارد"
            isLoading={getBackupLoading}
            initialOrder={7}
          />
        </Stack>
      </Paper>
      <CreateVolumeBackupDialog
        maxWidth="xs"
        fullWidth
        blockstorageId={Number(blockstorageId)}
        open={showCreateDialog}
        onClose={closeDialogHandler}
        forceClose={closeDialogHandler}
        refetch={refetch}
      />
    </>
  );
};
