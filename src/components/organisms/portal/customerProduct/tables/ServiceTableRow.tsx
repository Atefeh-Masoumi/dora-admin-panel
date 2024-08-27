import { FC } from "react";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { serviceTableStruct } from "./struct";
import { withTableRowWrapper } from "src/HOC/withTableRowWrapper";

const ServiceTableRow: FC<{ row: any }> = ({ row }) => {
  return (
    <DorsaTableRow hover role="checkbox" tabIndex={-1} key={row.usedCode}>
      {serviceTableStruct.map((column) => {
        const value = row[column.id];
        return (
          <DorsaTableCell
            key={column.id}
            align="center"
            sx={{ px: 1, whiteSpace: "nowrap" }}
          >
            {column.format && typeof value === "number"
              ? column.format(value)
              : value}
          </DorsaTableCell>
        );
      })}
    </DorsaTableRow>
  );
};

export default withTableRowWrapper(ServiceTableRow);
