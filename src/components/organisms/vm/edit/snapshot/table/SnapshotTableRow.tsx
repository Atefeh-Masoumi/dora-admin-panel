import { FC, Fragment, useState } from "react";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { snapShotTableStruct } from "./struct";
import { Chip, IconButton, Stack } from "@mui/material";
import { BORDER_RADIUS_1 } from "src/configs/theme";
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

  return (
    <Fragment>
      <DorsaTableRow hover tabIndex={-1} key={row.value}>
        {snapShotTableStruct.map((column) => {
          const value = row[column.id];
          const text = column.format ? column.format(value) : value;
          const isActive = row["isActive"];
          const isCreated = row["isCreated"];

          return (
            <DorsaTableCell
              key={column.id}
              align="center"
              sx={{ px: column.id === "control" ? 0 : 5, whiteSpace: "nowrap" }}
            >
              {column.id === "control" ? (
                <Stack direction="row" columnGap={1} alignItems="center">
                  {!isActive && (
                    <IconButton onClick={handleOpenRevert}>
                      <RefreshSvg />
                    </IconButton>
                  )}

                  <IconButton onClick={handleOpenDelete}>
                    <TrashSvg />
                  </IconButton>
                </Stack>
              ) : column.id === "isActive" ? (
                <Chip
                  label={isActive ? "فعال" : "غیرفعال"}
                  sx={{
                    bgcolor: ({ palette }) =>
                      isActive ? palette.success.light : palette.error.light,
                    color: ({ palette }) =>
                      isActive ? palette.success.main : palette.error.main,
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
        id={row["snapshotId"]}
        openDialog={openDelete}
        handleClose={handleCloseDelete}
      />
      <RevertVmSnapshotDialog
        snapshotId={row["snapshotId"]}
        openDialog={openRevert}
        handleClose={handleCloseRevert}
      />
    </Fragment>
  );
};
