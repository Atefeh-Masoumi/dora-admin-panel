import { FC, Fragment, useState } from "react";
import { IconButton, Stack } from "@mui/material";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { TrashSvg } from "src/components/atoms/svg/TrashSvg";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";
import { DeletePermissionDialog } from "../dialogs/DeletePermissionDialog";
import { permissionTableStruct } from "./struct";

export const PermissionTableRow: FC<{ row: any }> = ({ row }) => {
  const handleOpenDelete = () => setOpenDelete(true);
  const [openDelete, setOpenDelete] = useState(false);
  const handleCloseDelete = () => setOpenDelete(false);

  const handleOpenEdit = () => setOpenEdit(true);
  const [openEdit, setOpenEdit] = useState(false);
  const handleCloseEdit = () => setOpenEdit(false);

  return (
    <Fragment>
      <DorsaTableRow hover tabIndex={-1} key={row.value}>
        {permissionTableStruct.map((column) => {
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
                  {/* <IconButton
                    sx={{ borderRadius: 1 }}
                    color="info"
                    onClick={handleOpenEdit}
                  >
                    <PasswordOutlinedIcon color="secondary" />
                  </IconButton> */}
                </Stack>
              ) : (
                text
              )}
            </DorsaTableCell>
          );
        })}
      </DorsaTableRow>
      <DeletePermissionDialog
        id={row["id"]}
        openDialog={openDelete}
        handleClose={handleCloseDelete}
      />
    </Fragment>
  );
};
