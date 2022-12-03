import { FC } from "react";
import { Stack } from "@mui/material";
import { cartTableStruct } from "./struct";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { useNavigate } from "react-router";

export const CartTableRow: FC<{ row: any }> = ({ row }) => {
  const navigate = useNavigate();

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
        {/* <DorsaTableCell align="center" sx={{ px: 5, whiteSpace: "nowrap" }}>
          <IconButton onClick={deleteButtonClickHandler}>
            <DeleteSvg />
          </IconButton>
        </DorsaTableCell> */}
      </DorsaTableRow>
    </>
  );
};
