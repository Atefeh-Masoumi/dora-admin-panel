import { Stack } from "@mui/material";
import { FC } from "react";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { withTableRowWrapper } from "src/HOC/withTableRowWrapper";
import { invoiceTableStruct } from "./struct";

const InvoiceTableRow: FC<{ row: any }> = ({ row }) => {
  return (
    <DorsaTableRow hover role="checkbox" tabIndex={-1} key={row}>
      {invoiceTableStruct.map((column) => {
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
            {column.id === "price" || column.id === "totalPrice" ? (
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

export default withTableRowWrapper(InvoiceTableRow);
