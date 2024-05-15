import { FC, Fragment, useState } from "react";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { snapShotTableStruct } from "./struct";
import { Chip, IconButton, Palette, Stack } from "@mui/material";
import theme, { BORDER_RADIUS_1 } from "src/configs/theme";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { RefreshSvg } from "src/components/atoms/svg-icons/RefreshSvg";
import { DeleteVmSnapshotDialog } from "../../../dialogs/DeleteVmSnapshotDialog";
import { RevertVmSnapshotDialog } from "../../../dialogs/RevertVmSnapshotDialog";

export const SnapshotTableRow: FC<{ row: any }> = ({ row }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openRevert, setOpenRevert] = useState(false);

  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const handleOpenRevert = () => setOpenRevert(true);
  const handleCloseRevert = () => setOpenRevert(false);

  const vmSnapshotStatusInfo = (vmSnapshotStatusId: number) => {
    switch (vmSnapshotStatusId) {
      case 1:
        return {
          id: 1,
          label: "فعال",
          bgcolor: theme.palette.success.light,
          color: theme.palette.success.main,
        };
      case 2:
        return {
          id: 2,
          label: "غیرفعال",
          bgcolor: theme.palette.error.light,
          color: theme.palette.error.main,
        };
      case 3:
        return {
          id: 3,
          label: "درصف",
          bgcolor: theme.palette.warning.light,
          color: theme.palette.warning.main,
        };

      case 4:
        return {
          id: 4,
          label: "درانتظار",
          bgcolor: theme.palette.warning.light,
          color: theme.palette.warning.main,
        };

      case 5:
        return {
          id: 5,
          label: "ناموفق",
          bgcolor: theme.palette.error.light,
          color: theme.palette.error.main,
        };

      case 6:
        return {
          id: 6,
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

  return (
    <Fragment>
      <DorsaTableRow hover tabIndex={-1} key={row.value}>
        {snapShotTableStruct.map((column) => {
          const value = row[column.id];
          const text = column.format ? column.format(value) : value;
          const isCreated = row.isCreated;
          const vmSnapshotStatusId = row.vmSnapshotStatusId;

          //TODO: for revert function
          const vmTypeId = row.vmTypeId;

          return (
            <DorsaTableCell
              key={column.id}
              align="center"
              sx={{ px: column.id === "control" ? 0 : 5, whiteSpace: "nowrap" }}
            >
              {column.id === "control" ? (
                <Stack direction="row" columnGap={1} alignItems="center">
                  {vmSnapshotStatusId === 2 && (
                    <IconButton onClick={handleOpenRevert}>
                      <RefreshSvg />
                    </IconButton>
                  )}

                  <IconButton onClick={handleOpenDelete}>
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
      <DeleteVmSnapshotDialog
        id={row.id}
        openDialog={openDelete}
        handleClose={handleCloseDelete}
      />
      <RevertVmSnapshotDialog
        snapshotId={row.id}
        openDialog={openRevert}
        handleClose={handleCloseRevert}
      />
    </Fragment>
  );
};
