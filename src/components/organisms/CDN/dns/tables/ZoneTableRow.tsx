import { FC, Fragment, useState } from "react";
import { IconButton, Stack } from "@mui/material";
import { Edit } from "src/components/atoms/svg/EditSvg";
import { TrashSvg } from "src/components/atoms/svg/TrashSvg";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { ProxyStatus } from "../ProxyStatus";
import { zoneTableStruct } from "./struct";
import { DeleteRecordDialog } from "../dialogs/DeleteRecordDialog";
import { CreateRecordDialog } from "../dialogs/CreateRecordDialog";

export const ZoneTableRow: FC<{ row: any }> = ({ row }) => {
  const handleOpenDelete = () => setOpenDelete(true);
  const [openDelete, setOpenDelete] = useState(false);
  const handleCloseDelete = () => setOpenDelete(false);

  const handleOpenEdit = () => setOpenEdit(true);
  const [openEdit, setOpenEdit] = useState(false);
  const handleCloseEdit = () => setOpenEdit(false);

  return (
    <Fragment>
      <DorsaTableRow hover role="checkbox" tabIndex={-1} key={row.value}>
        {zoneTableStruct.map((column) => {
          const value = row[column.id];
          const text =
            column.format && typeof value === "number"
              ? column.format(value)
              : value;
          return (
            <DorsaTableCell
              key={column.id}
              align="center"
              sx={{ px: column.id === "control" ? 0 : 5, whiteSpace: "nowrap" }}
            >
              {column.id === "useProxy" ? (
                <ProxyStatus status={row["useProxy"]} id={row["id"]} />
              ) : column.id === "control" ? (
                <Stack direction="row" spacing={0.6} maxWidth="fit-content">
                  <IconButton sx={{ borderRadius: 1 }} onClick={handleOpenEdit}>
                    <Edit />
                  </IconButton>
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
      <DeleteRecordDialog
        id={row.id}
        openDialog={openDelete}
        handleClose={handleCloseDelete}
      />
      {openEdit && (
        <CreateRecordDialog id={row.id} handleClose={handleCloseEdit} />
      )}
    </Fragment>
  );
};
