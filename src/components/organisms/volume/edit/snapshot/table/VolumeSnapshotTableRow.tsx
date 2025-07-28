import { Chip, IconButton, Stack, Typography } from "@mui/material";
import { FC, Fragment, useState } from "react";
import { toast } from "react-toastify";
import {
  useDeleteApiMyVmByProjectIdVolumeAndVmVolumeHostIdSnapshotDeleteIdMutation,
  useGetApiMyVmByProjectIdVolumeAndVmVolumeHostIdSnapshotListQuery,
} from "src/app/services/api.generated";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { RefreshSvg } from "src/components/atoms/svg-icons/RefreshSvg";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import theme, { BORDER_RADIUS_1 } from "src/configs/theme";
import { withTableRowWrapper } from "src/HOC/withTableRowWrapper";
import { RevertVolumeSnapshotDialog } from "../dialog/RevertVolumeSnapshotDialog";
import { volumeSnapShotTableStruct } from "./struct";
import { useParams } from "react-router";

enum VOLUME_SNAPSHOT_STATUS_INFO {
  ACTIVE = 1,
  INACTIVE = 2,
  INQUEUE = 3,
  WAIT = 4,
  FAIL = 5,
  DELETE = 6,
  REVERTING = 7,
  DELETING = 8,
}

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

const volumeSnapShotStatusList = (statusId: number) => {
  switch (statusId) {
    case 1:
      return {
        id: 1,
        label: "فعال",
        bgcolor: "success.light",
        color: "success.main",
      };

    case 2:
      return {
        id: 2,
        label: "غیرفعال",
        bgcolor: "error.light",
        color: "error.main",
      };
    case 3:
      return {
        id: 3,
        label: "درصف انتظار",
        bgcolor: "warning.light",
        color: "warning.main",
      };
    case 4:
      return {
        id: 4,
        label: "درانتظار",
        bgcolor: "warning.light",
        color: "warning.main",
      };
    case 5:
      return {
        id: 5,
        label: "ناموفق",
        bgcolor: "error.light",
        color: "error.main",
      };

    case 6:
      return {
        id: 6,
        label: "حذف شده",
        bgcolor: "error.light",
        color: "error.main",
      };
      case 7:
        return {
          id: 7,
          label: "درحال بازگردانی",
          bgcolor: "warning.light",
          color: "warning.main",
        };
      case 8:
        return {
          id: 8,
          label: "درحال حذف",
          bgcolor: "warning.light",
          color: "warning.main",
        };
    default:
      return {
        id: 0,
        label: "نامشخص",
        bgcolor: "error.light",
        color: "error.main",
      };
  }
};

export const VolumeSnapshotTableRow: FC<{ row: any }> = ({ row }) => {

  const { blockstorageId, projectId } = useParams();
  
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [selectedSnapshot, setSelectedSnapshot] = useState<any | null>(null);
  const [openRevert, setOpenRevert] = useState(false);

  const handleOpenRevert = () => setOpenRevert(true);
  const handleCloseRevert = () => setOpenRevert(false);

  const [deleteItem, { isLoading: deleteSnapshotRecordLoading }] =
    useDeleteApiMyVmByProjectIdVolumeAndVmVolumeHostIdSnapshotDeleteIdMutation();

  const {refetch} = useGetApiMyVmByProjectIdVolumeAndVmVolumeHostIdSnapshotListQuery(
      { projectId: Number(projectId), vmVolumeHostId: Number(blockstorageId) },
      { skip: !blockstorageId }
    );
    
  const deleteSnapshotRecordHandler = () =>
    deleteItem({ 
      id: Number(selectedSnapshot?.id),
      projectId: Number(projectId),
      vmVolumeHostId: Number(blockstorageId) 
     })
      .unwrap()
      .then(() => {
        toast.success("حذف snapshot مورد نظر در حال بررسی است");
        closeDialogHandler();
        refetch();
      })
      .catch((err) => {});

  const closeDialogHandler = () => {
    setDialogType(null);
    setSelectedSnapshot(null);
  };

  const handleOpenDelete = (snapshot: any) => {
    setSelectedSnapshot(snapshot);
    setDialogType(DIALOG_TYPE_ENUM.DELETE);
  };

  return (
    <Fragment>
      <DorsaTableRow hover tabIndex={-1} key={row.value}>
        {volumeSnapShotTableStruct.map((column) => {
          const value = row[column.id];
          const text = column.format ? column.format(value) : value;
          const statusId = row.statusId;

          return (
            <DorsaTableCell
              key={column.id}
              align="center"
              sx={{ px: column.id === "control" ? 0 : 5, whiteSpace: "nowrap" }}
            >
              {column.id === "control" ? (
                <Stack direction="row" columnGap={1} alignItems="center">
                  {statusId === VOLUME_SNAPSHOT_STATUS_INFO.INACTIVE && (
                    <IconButton onClick={handleOpenRevert}>
                      <RefreshSvg />
                    </IconButton>
                  )}

                  <IconButton onClick={() => handleOpenDelete(row)}>
                    <TrashSvg />
                  </IconButton>
                </Stack>
              ) : column.id === "statusId" ? (
                <Chip
                  label={volumeSnapShotStatusList(statusId).label}
                  sx={{
                    bgcolor: ({ palette }) => {
                      const [color, shade] = volumeSnapShotStatusList(statusId).bgcolor.split('.');
                      return (palette as any)[color][shade];
                    },
                    color: ({ palette }) => {
                      const [color, shade] = volumeSnapShotStatusList(statusId).color.split('.');
                      return (palette as any)[color][shade];
                    },
                    borderRadius: BORDER_RADIUS_1,
                  }}
                />
              )  : column.id === "description" ? (
                <Typography>
                  {row.description}
                </Typography>
              ) : (
                text
              )}
            </DorsaTableCell>
          );
        })}
      </DorsaTableRow>
      <DeleteDialog
        open={dialogType === DIALOG_TYPE_ENUM.DELETE}
        onClose={closeDialogHandler}
        keyTitle="Snapshot"
        subTitle="برای حذف عبارت امنیتی زیر را وارد کنید."
        securityPhrase={selectedSnapshot?.name || ""}
        onSubmit={deleteSnapshotRecordHandler}
        submitLoading={deleteSnapshotRecordLoading}
      />
      <RevertVolumeSnapshotDialog
        snapshotId={row.id}
        openDialog={openRevert}
        handleClose={handleCloseRevert}
      />
    </Fragment>
  );
};

export default withTableRowWrapper(VolumeSnapshotTableRow); 