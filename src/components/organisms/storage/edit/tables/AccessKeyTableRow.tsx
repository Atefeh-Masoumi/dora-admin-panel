import { FC, useState } from "react";
import { IconButton, Stack } from "@mui/material";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { accessKeyTableStruct } from "./AccessKeyStruct";
import { DeleteAccessKeyDialog } from "../dialogs/DeleteAccessKeyDialog";
import { TrashSvg } from "src/components/atoms/svg/TrashSvg";

export const AccessKeyTableRow: FC<{ row: any }> = ({ row }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  return (
    <>
      <DorsaTableRow hover tabIndex={-1} key={row.value}>
        {accessKeyTableStruct.map((column) => {
          const value = row[column.id];
          const text = column.format ? column.format(value) : value;
          return (
            <DorsaTableCell
              key={column.id}
              align="center"
              sx={{ px: 1, whiteSpace: "nowrap" }}
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
                <>{text}</>
              )}
            </DorsaTableCell>
          );
        })}
      </DorsaTableRow>
      <DeleteAccessKeyDialog
        id={row["id"]}
        openDialog={openDelete}
        handleClose={handleCloseDelete}
      />
    </>
  );
};
