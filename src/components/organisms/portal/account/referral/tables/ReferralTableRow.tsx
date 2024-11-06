import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { FC } from "react";
import { referralTableStruct } from "./struct";
import { withTableRowWrapper } from "src/HOC/withTableRowWrapper";

const ReferralTableRow: FC<{ row: any }> = ({ row }) => {
  return (
    <DorsaTableRow hover role="checkbox" tabIndex={-1} key={row.usedCode}>
      {referralTableStruct.map((column) => {
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

export default withTableRowWrapper(ReferralTableRow);
