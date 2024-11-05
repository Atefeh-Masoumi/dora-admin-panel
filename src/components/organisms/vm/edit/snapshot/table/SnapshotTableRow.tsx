import { Chip, IconButton, Stack } from "@mui/material";
import { FC, Fragment, useState } from "react";
import { toast } from "react-toastify";
import {
  VmSnapshotResponse,
  useDeleteApiMyVmSnapshotDeleteByIdMutation,
} from "src/app/services/api.generated";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { RefreshSvg } from "src/components/atoms/svg-icons/RefreshSvg";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import theme, { BORDER_RADIUS_1 } from "src/configs/theme";
import { withTableRowWrapper } from "src/HOC/withTableRowWrapper";
import { RevertVmSnapshotDialog } from "../../../dialogs/RevertVmSnapshotDialog";
import { snapShotTableStruct } from "./struct";

enum VM_SNAPSHOT_STATUS_INFO {
  ACTIVE = 1,
  INACTIVE = 2,
  INQUEUE = 3,
  WAIT = 4,
  FAIL = 5,
  DELETE = 6,
}

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

const vmSnapshotStatusInfo = (vmSnapshotStatusId: number) => {
  switch (vmSnapshotStatusId) {
    case 1:
      return {
        id: VM_SNAPSHOT_STATUS_INFO.ACTIVE,
        label: "فعال",
        bgcolor: theme.palette.success.light,
        color: theme.palette.success.main,
      };
    case 2:
      return {
        id: VM_SNAPSHOT_STATUS_INFO.INACTIVE,
        label: "غیرفعال",
        bgcolor: theme.palette.error.light,
        color: theme.palette.error.main,
      };
    case 3:
      return {
        id: VM_SNAPSHOT_STATUS_INFO.INQUEUE,
        label: "درصف",
        bgcolor: theme.palette.warning.light,
        color: theme.palette.warning.main,
      };

    case 4:
      return {
        id: VM_SNAPSHOT_STATUS_INFO.WAIT,
        label: "درانتظار",
        bgcolor: theme.palette.warning.light,
        color: theme.palette.warning.main,
      };

    case 5:
      return {
        id: VM_SNAPSHOT_STATUS_INFO.FAIL,
        label: "ناموفق",
        bgcolor: theme.palette.error.light,
        color: theme.palette.error.main,
      };

    case 6:
      return {
        id: VM_SNAPSHOT_STATUS_INFO.DELETE,
        label: "حذف شده",
        bgcolor: theme.palette.error.light,
        color: theme.palette.error.main,
      };
    default:
      return {
        label: "نامشخص",
        bgcolor: theme.palette.error.light,
        color: theme.palette.error.main,
      };
  }
};

export const SnapshotTableRow: FC<{ row: any }> = ({ row }) => {
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [selectedSnapshot, setSelectedSnapshot] =
    useState<VmSnapshotResponse | null>(null);
  const [openRevert, setOpenRevert] = useState(false);

  const handleOpenRevert = () => setOpenRevert(true);
  const handleCloseRevert = () => setOpenRevert(false);

  const [deleteItem, { isLoading: deleteSnapshotRecordLoading }] =
    useDeleteApiMyVmSnapshotDeleteByIdMutation();

  const deleteSnapshotRecordHandler = () =>
    deleteItem({ id: Number(selectedSnapshot?.id) })
      .unwrap()
      .then(() => {
        toast.success("حدف snapshot مورد نظر در حال بررسی است");
        closeDialogHandler();
      })
      .catch((err) => {});

  const closeDialogHandler = () => {
    setDialogType(null);
    setSelectedSnapshot(null);
  };

  const handleOpenDelete = (snapshot: VmSnapshotResponse) => {
    setSelectedSnapshot(snapshot);
    setDialogType(DIALOG_TYPE_ENUM.DELETE);
  };

  return (
    <Fragment>
      <DorsaTableRow hover tabIndex={-1} key={row.value}>
        {snapShotTableStruct.map((column) => {
          const value = row[column.id];
          const text = column.format ? column.format(value) : value;
          const isCreated = row.isCreated;
          const vmSnapshotStatusId = row.vmSnapshotStatusId;

          return (
            <DorsaTableCell
              key={column.id}
              align="center"
              sx={{ px: column.id === "control" ? 0 : 5, whiteSpace: "nowrap" }}
            >
              {column.id === "control" ? (
                <Stack direction="row" columnGap={1} alignItems="center">
                  {vmSnapshotStatusId === VM_SNAPSHOT_STATUS_INFO.INACTIVE && (
                    <IconButton onClick={handleOpenRevert}>
                      <RefreshSvg />
                    </IconButton>
                  )}

                  <IconButton onClick={() => handleOpenDelete(row)}>
                    <TrashSvg />
                  </IconButton>
                </Stack>
              ) : column.id === "vmSnapshotStatus" ? (
                <Chip
                  label={vmSnapshotStatusInfo(vmSnapshotStatusId).label}
                  sx={{
                    bgcolor: vmSnapshotStatusInfo(vmSnapshotStatusId).bgcolor,
                    color: vmSnapshotStatusInfo(vmSnapshotStatusId).color,
                    borderRadius: BORDER_RADIUS_1,
                  }}
                />
              ) : column.id === "isCreated" ? (
                <Chip
                  label={isCreated ? "فعال" : "غیرفعال"}
                  sx={{
                    bgcolor: ({ palette }) =>
                      isCreated ? palette.success.light : palette.error.light,
                    color: ({ palette }) =>
                      isCreated ? palette.success.main : palette.error.main,
                    borderRadius: BORDER_RADIUS_1,
                  }}
                />
              ) : column.id === "isCreated" ? (
                ""
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
