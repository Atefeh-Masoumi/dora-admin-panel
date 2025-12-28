import { Chip, IconButton, Stack, Typography } from "@mui/material";
import { FC, Fragment, useState } from "react";
import { toast } from "react-toastify";
import {
  VmVolumeSnapshotListResponse,
  useDeleteApiMyVmByProjectIdSnapshotDeleteAndIdMutation,
  useGetApiMyVmByProjectIdSnapshotListQuery,
} from "src/app/services/api.generated";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { RefreshSvg } from "src/components/atoms/svg-icons/RefreshSvg";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import theme, { BORDER_RADIUS_1 } from "src/configs/theme";
import { withTableRowWrapper } from "src/HOC/withTableRowWrapper";
import { RevertVmSnapshotDialog } from "../dialog/RevertVmSnapshotDialog";
import { snapShotTableStruct } from "./struct";
import { useParams } from "react-router";
import { Restore } from "@mui/icons-material";

enum VM_SNAPSHOT_STATUS_INFO {
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

const vmSnapShotStatusList = (statusId: number) => {
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

export const SnapshotTableRow: FC<{ row: any }> = ({ row }) => {

  const { id, projectId } = useParams();
  
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [selectedSnapshot, setSelectedSnapshot] =
    useState<VmVolumeSnapshotListResponse | null>(null);
  const [openRevert, setOpenRevert] = useState(false);

  const handleOpenRevert = () => setOpenRevert(true);
  const handleCloseRevert = () => setOpenRevert(false);

  const [deleteItem, { isLoading: deleteSnapshotRecordLoading }] =
  useDeleteApiMyVmByProjectIdSnapshotDeleteAndIdMutation();

  const {refetch} =useGetApiMyVmByProjectIdSnapshotListQuery(
      { projectId: Number(projectId), vmHostId: Number(id) },
      { skip: !id }
    );
  const deleteSnapshotRecordHandler = () =>
    deleteItem({ id: Number(selectedSnapshot?.id),
      projectId: Number(projectId),
     })
      .unwrap()
      .then(() => {
        toast.success("حدف snapshot مورد نظر در حال بررسی است");
        closeDialogHandler();
        refetch();
      })
      .catch((_err: unknown) => {});

  const closeDialogHandler = () => {
    setDialogType(null);
    setSelectedSnapshot(null);
  };

  const handleOpenDelete = (snapshot: VmVolumeSnapshotListResponse) => {
    setSelectedSnapshot(snapshot);
    setDialogType(DIALOG_TYPE_ENUM.DELETE);
  };

  return (
    <Fragment>
      <DorsaTableRow hover tabIndex={-1} key={row.value}>
        {snapShotTableStruct.map((column) => {
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
                  {statusId === VM_SNAPSHOT_STATUS_INFO.INACTIVE && (
                    <IconButton onClick={handleOpenRevert}>
                       <Restore />
                    </IconButton>
                  )}

                  <IconButton onClick={() => handleOpenDelete(row)}>
                    <TrashSvg />
                  </IconButton>
                </Stack>
              ) : column.id === "statusId" ? (
                <Chip
                  label={vmSnapShotStatusList(statusId).label}
                  sx={{
                    bgcolor: ({ palette }) => {
                      const [color, shade] = vmSnapShotStatusList(statusId).bgcolor.split('.');
                      return (palette as any)[color][shade];
                    },
                    color: ({ palette }) => {
                      const [color, shade] = vmSnapShotStatusList(statusId).color.split('.');
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
      <RevertVmSnapshotDialog
        snapshotId={row.id}
        openDialog={openRevert}
        handleClose={handleCloseRevert}
      />
    </Fragment>
  );
};

export default withTableRowWrapper(SnapshotTableRow);
