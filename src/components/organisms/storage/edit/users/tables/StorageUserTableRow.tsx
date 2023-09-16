import { FC, Fragment, useState } from "react";
import { IconButton, Stack } from "@mui/material";
import { storageUserTableStruct } from "./struct";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { TrashSvg } from "src/components/atoms/svg/TrashSvg";
import { DeleteRabbitUserDialog } from "../dialogs/DeleteStorageUserDialog";

export const StorageUserTableRow: FC<{ row: any }> = ({ row }) => {
  const handleOpenDelete = () => setOpenDelete(true);
  const [openDelete, setOpenDelete] = useState(false);
  const handleCloseDelete = () => setOpenDelete(false);

  return (
    <Fragment>
      <DorsaTableRow hover tabIndex={-1} key={row.value}>
        {storageUserTableStruct.map((column) => {
          const value = row[column.id];
          //TODO: sort has to be apply on array not on each item
          const text = column.format ? column.format(value) : value;
          return (
            <DorsaTableCell
              key={column.id}
              align="center"
              sx={{ px: column.id === "control" ? 0 : 5, whiteSpace: "nowrap" }}
            >
              {column.id === "control" ? (
                <Stack direction="row" spacing={0.6} maxWidth="fit-content">
                  <IconButton
                    sx={{ borderRadius: 1 }}
                    color="error"
                    onClick={handleOpenDelete}
                  >
                    <TrashSvg />
                  </IconButton>
                </Stack>
              ) : (
                text
              )}
            </DorsaTableCell>
          );
        })}
      </DorsaTableRow>
      <DeleteRabbitUserDialog
        id={row["id"]}
        openDialog={openDelete}
        handleClose={handleCloseDelete}
      />
    </Fragment>
  );
};
