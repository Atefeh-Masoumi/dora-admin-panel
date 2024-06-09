import { FC, Fragment, useState } from "react";
import { loadBalanceTableStruct } from "./struct";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { IconButton, Stack } from "@mui/material";
import { Edit } from "src/components/atoms/svg-icons/EditSvg";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteLoadBalanceDialog } from "../dialogs/DeleteLoadBalanceDialog";
import { CreateLoadBalanceDialog } from "../dialogs/CreateLoadBalanceDialog";

export const LoadBalanceTableRow: FC<{ row: any }> = ({ row }) => {
  const handleOpenDelete = () => setOpenDelete(true);
  const [openDelete, setOpenDelete] = useState(false);
  const handleCloseDelete = () => setOpenDelete(false);

  const handleOpenEdit = () => setOpenEdit(true);
  const [openEdit, setOpenEdit] = useState(false);
  const handleCloseEdit = () => setOpenEdit(false);

  return (
    <Fragment>
      <DorsaTableRow hover tabIndex={-1} key={row.value}>
        {loadBalanceTableStruct.map((column) => {
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
      <DeleteLoadBalanceDialog
        id={row.id}
        openDialog={openDelete}
        handleClose={handleCloseDelete}
      />
      {openEdit && (
        <CreateLoadBalanceDialog
          dnsId={row.id}
          openDialog={openEdit}
          onClose={handleCloseEdit}
        />
      )}
    </Fragment>
  );
};
