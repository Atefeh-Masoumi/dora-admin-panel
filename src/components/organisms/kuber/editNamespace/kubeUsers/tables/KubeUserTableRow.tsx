import { FC, Fragment, useState } from "react";
import { IconButton, Stack } from "@mui/material";
import { kubeUserTableStruct } from "./struct";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { TrashSvg } from "src/components/atoms/svg/TrashSvg";
import { Edit } from "src/components/atoms/svg/EditSvg";
import { DeleteKubeUserDialog } from "../dialogs/DeleteKubeUserDialog";
import { EditKubeUserDialog } from "../dialogs/EditKubeUserDialog";

export const KubeUserTableRow: FC<{ row: any }> = ({ row }) => {
  const handleOpenDelete = () => setOpenDelete(true);
  const [openDelete, setOpenDelete] = useState(false);
  const handleCloseDelete = () => setOpenDelete(false);

  const handleOpenEdit = () => setOpenEdit(true);
  const [openEdit, setOpenEdit] = useState(false);
  const handleCloseEdit = () => setOpenEdit(false);

  return (
    <Fragment>
      <DorsaTableRow hover tabIndex={-1} key={row.value}>
        {kubeUserTableStruct.map((column) => {
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
                  <IconButton
                    sx={{ borderRadius: 1 }}
                    color="info"
                    onClick={handleOpenEdit}
                  >
                    <Edit />
                  </IconButton>
                </Stack>
              ) : (
                text
              )}
            </DorsaTableCell>
          );
        })}
      </DorsaTableRow>
      <DeleteKubeUserDialog
        id={row["id"]}
        openDialog={openDelete}
        handleClose={handleCloseDelete}
      />
      <EditKubeUserDialog
        id={row["id"]}
        openDialog={openEdit}
        handleClose={handleCloseEdit}
      />
    </Fragment>
  );
};
