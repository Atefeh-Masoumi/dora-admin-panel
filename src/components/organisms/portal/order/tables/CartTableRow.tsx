import { FC, MouseEventHandler, useState } from "react";
import { IconButton, Stack } from "@mui/material";
import { cartTableStruct } from "./struct";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { useNavigate } from "react-router";
import { DeleteSvg } from "src/components/atoms/svg/DeleteSvg";
import { DeleteCartDialog } from "../DeleteCartDialog";

export const CartTableRow: FC<{ row: any }> = ({ row }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const openDialogHandler = () => {
    if (!row.id || isNaN(Number(row.id))) return;
    setOpenDialog(true);
  };
  const closeDialogHandler = () => setOpenDialog(false);

  const deleteButtonClickHandler: MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.stopPropagation();
    e.preventDefault();
    openDialogHandler();
  };

  const goToOrderDetails = () => navigate(`/dash/portal/order/${row.id}`);

  return (
    <>
      <DorsaTableRow
        hover
        role="checkbox"
        tabIndex={-1}
        key={row.usedCode}
        sx={{ cursor: "pointer" }}
        onClick={goToOrderDetails}
      >
        {cartTableStruct.map((column) => {
          const value = row[column.id];
          const text =
            column.format && typeof value === "number"
              ? column.format(value)
              : value;
          return (
            <DorsaTableCell
              key={column.id}
              align="center"
              sx={{ px: 5, whiteSpace: "nowrap" }}
            >
              {column.id === "title" ? (
                <Stack
                  sx={{
                    maxWidth: 232,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {text}
                </Stack>
              ) : (
                <Stack>{text}</Stack>
              )}
            </DorsaTableCell>
          );
        })}
        <DorsaTableCell align="center" sx={{ px: 5, whiteSpace: "nowrap" }}>
          <IconButton onClick={deleteButtonClickHandler}>
            <DeleteSvg />
          </IconButton>
        </DorsaTableCell>
      </DorsaTableRow>
      {openDialog && (
        <DeleteCartDialog
          id={Number(row.id)}
          handleClose={closeDialogHandler}
        />
      )}
    </>
  );
};
