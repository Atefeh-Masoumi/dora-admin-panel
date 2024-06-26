import { FC, useContext, useMemo } from "react";
import { Checkbox } from "@mui/material";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { addVpcTableStruct } from "./struct";
import { AddVpcContext } from "../contexts/AddVpcContext";

export const AddVpcTableRow: FC<{ row: any }> = ({ row }) => {
  const { serverConfig, setServerConfig } = useContext(AddVpcContext);

  const isChecked = useMemo(
    () => serverConfig?.id === row["id"],
    [row, serverConfig?.id]
  );

  const onCheckboxClick = () => {
    if (serverConfig?.id === row["id"]) {
      setServerConfig(null);
      return;
    }
    setServerConfig(row);
  };

  return (
    <DorsaTableRow hover tabIndex={-1} key={row.value}>
      <DorsaTableCell padding="checkbox" onClick={onCheckboxClick}>
        <Checkbox
          sx={{ borderRadius: "6px" }}
          color="primary"
          checked={isChecked}
          onChange={onCheckboxClick}
        />
      </DorsaTableCell>
      {addVpcTableStruct.slice(1, addVpcTableStruct.length).map((column) => {
        const value = row[column.id];
        const text = column.format ? column.format(value) : value;
        return (
          <DorsaTableCell
            key={column.id}
            align="center"
            sx={{ px: 1, whiteSpace: "nowrap" }}
          >
            {text}
          </DorsaTableCell>
        );
      })}
    </DorsaTableRow>
  );
};
