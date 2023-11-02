import { FC } from "react";
import { Stack } from "@mui/material";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { billsTableStruct } from "./billsTableStruct";

export const BillTableRow: FC<{ row: any }> = ({ row }) => {
  return (
    <DorsaTableRow hover role="checkbox" tabIndex={-1} key={row}>
      {billsTableStruct.map((column) => {
        const value = row[column.id];
        const text =
          column.format && typeof value === "number"
            ? column.format(value)
            : value;
        return (
          <DorsaTableCell
            key={column.id}
            align="center"
            sx={{ px: 10, border: 1, whiteSpace: "nowrap" }}
          >
            {column.id === "price" ? (
              <Stack>{text} ریال</Stack>
            ) : (
              <Stack>{text}</Stack>
            )}
          </DorsaTableCell>
        );
      })}
    </DorsaTableRow>
  );
};
