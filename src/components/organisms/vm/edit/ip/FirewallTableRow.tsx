import { Chip } from "@mui/material";
import { FC, Fragment } from "react";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { withTableRowWrapper } from "src/HOC/withTableRowWrapper";
import { FirewalStruct } from "./struct";

export const FirewalTableRow: FC<{ row: any }> = ({ row }) => {
  return (
    <Fragment>
      <DorsaTableRow hover tabIndex={-1} key={row?.id ?? row?.vmHostName}>
        {FirewalStruct.map((column) => {
          const value = row?.[column.id];

          return (
            <DorsaTableCell
              key={column.id}
              align="center"
              sx={{ px: 1, whiteSpace: "nowrap" }}
            >
              {column.id === "isSecurityEnabled" ? (
                <Chip
                  size="small"
                  color={value ? "success" : "default"}
                  label={value ? "فعال" : "غیرفعال"}
                />
              ) : (
                value ?? "-"
              )}
            </DorsaTableCell>
          );
        })}
      </DorsaTableRow>
    </Fragment>
  );
};

export default withTableRowWrapper(FirewalTableRow);
