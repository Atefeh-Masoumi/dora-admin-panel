import { Checkbox } from "@mui/material";
import { FC, useContext, useMemo } from "react";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { productBundleTableStruct } from "src/components/organisms/vm/add/tables/struct";
import { withTableRowWrapper } from "src/HOC/withTableRowWrapper";
import { AddKubernetesContext } from "../contexts/AddKubernetesContext";

const KuberServerConfigTableRow: FC<{ row: any }> = ({ row }) => {
  const { predefinedConfig, setPredefinedConfig } = useContext(AddKubernetesContext);

  const isChecked = useMemo(
    () => predefinedConfig?.id === row["id"],
    [row, predefinedConfig?.id]
  );

  const onCheckboxClick = () => {
    setPredefinedConfig(row);
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

export default withTableRowWrapper(KuberServerConfigTableRow);
