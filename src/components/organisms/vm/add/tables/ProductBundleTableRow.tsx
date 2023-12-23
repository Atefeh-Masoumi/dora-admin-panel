import { FC, useContext, useMemo } from "react";
import { Checkbox } from "@mui/material";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { productBundleTableStruct } from "./struct";
import { AddServerContext } from "src/components/organisms/vm/add/contexts/AddVmContext";

export const ProductBundleTableRow: FC<{ row: any }> = ({ row }) => {
  const { serverConfig, setServerConfig } = useContext(AddServerContext);

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
      {productBundleTableStruct
        .slice(1, productBundleTableStruct.length)
        .map((column) => {
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
