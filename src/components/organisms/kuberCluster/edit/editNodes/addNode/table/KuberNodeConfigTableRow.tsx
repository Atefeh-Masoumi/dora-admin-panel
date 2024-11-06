import { FC, useMemo } from "react";
import { Checkbox } from "@mui/material";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { productBundleTableStruct } from "src/components/organisms/vm/add/tables/struct";
import { setProductBundleIdAction } from "src/app/slice/createNodeSlice";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { withTableRowWrapper } from "src/HOC/withTableRowWrapper";

const KuberNodeConfigTableRow: FC<{ row: any }> = ({ row }) => {
  const dispatch = useAppDispatch();

  const productBundleId = useAppSelector(
    (store) => store.createNode?.productBundle?.id || 0
  );

  const isChecked = useMemo(
    () => productBundleId === row["id"],
    [row, productBundleId]
  );

  const onCheckboxClick = () => {
    dispatch(setProductBundleIdAction(row));
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

export default withTableRowWrapper(KuberNodeConfigTableRow);
