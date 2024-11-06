import { Stack } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { commissionTableStruct } from "./struct";
import { withTableRowWrapper } from "src/HOC/withTableRowWrapper";

export const CommissionTableRow: FC<{ row: any }> = ({ row }) => {
  const navigate = useNavigate();
  return (
    <DorsaTableRow
      hover
      role="checkbox"
      tabIndex={-1}
      key={row.id}
      sx={{ cursor: "pointer" }}
      onClick={() => navigate(`/portal/wallet/bill/${row.id}`)}
    >
      {commissionTableStruct.map((column) => {
        const value = row[column.id];
        const text =
          column.format && typeof value === "number"
            ? column.format(value)
            : value;
        return (
          <DorsaTableCell
            key={column.id}
            align="center"
            sx={{ px: 1, whiteSpace: "nowrap" }}
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
                {column.id === "totalPrice" ||
                column.id === "commissionPrice" ? (
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

export default withTableRowWrapper(CommissionTableRow);
