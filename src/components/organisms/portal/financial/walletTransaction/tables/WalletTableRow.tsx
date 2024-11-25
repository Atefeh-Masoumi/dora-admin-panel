import { FC } from "react";
import { Stack, Typography } from "@mui/material";
import { walletTableStruct } from "./struct";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { withTableRowWrapper } from "src/HOC/withTableRowWrapper";

const WalletTableRow: FC<{ row: any }> = ({ row }) => {
  return (
    <DorsaTableRow hover role="checkbox" tabIndex={-1} key={row.usedCode}>
      {walletTableStruct.map((column) => {
        const value = row[column.id];
        const text =
          column.format && typeof value === "number"
            ? column.format(value)
            : value;
        return (
          <DorsaTableCell
            key={column.id}
            align="center"
            sx={{ py: 2.9, px: 1, whiteSpace: "nowrap" }}
          >
            {column.id === "description" ? (
              <Typography
                sx={{
                  fontSize: "14px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {text}
              </Typography>
            ) : column.id === "debit" ||
              column.id === "credit" ||
              column.id === "balance" ? (
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

export default withTableRowWrapper(WalletTableRow);
