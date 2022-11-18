import { FC } from "react";
import { Chip, Stack } from "@mui/material";
import { invoicesTableStruct, invoiceTableStruct } from "./struct";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { useNavigate } from "react-router";

export const InvoicesTableRow: FC<{ row: any }> = ({ row }) => {
  const navigate = useNavigate();
  return (
    <DorsaTableRow
      hover
      role="checkbox"
      tabIndex={-1}
      key={row.usedCode}
      sx={{ cursor: "pointer" }}
      onClick={() => navigate(`/wallet/salesInvoice/${row.id}`)}
    >
      {invoicesTableStruct.map((column) => {
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
              <Stack>
                {column.id === "invoiceStatus" ? (
                  <Chip
                    label={text}
                    sx={{
                      cursor: "pointer",
                      backgroundColor:
                        row["invoiceStatusId"] === 2
                          ? "success.light"
                          : "error.light",
                      color:
                        row["invoiceStatusId"] === 2
                          ? "success.main"
                          : "error.main",
                      py: 2.2,
                      borderRadius: 1,
                      fontSize: "14px",
                    }}
                  />
                ) : column.id === "totalPrice" ||
                  column.id === "vat" ||
                  column.id === "discount" ||
                  column.id === "invoicePrice" ? (
                  <Stack>{text} ریال</Stack>
                ) : (
                  text
                )}
              </Stack>
            )}
          </DorsaTableCell>
        );
      })}
    </DorsaTableRow>
  );
};

export const invoiceTableRow: FC<{ row: any }> = ({ row }) => {
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
