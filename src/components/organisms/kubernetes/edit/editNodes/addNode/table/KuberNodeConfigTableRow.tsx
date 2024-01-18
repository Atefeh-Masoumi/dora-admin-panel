import { FC, useMemo } from "react";
import { Checkbox } from "@mui/material";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { productBundleTableStruct } from "src/components/organisms/vm/add/tables/struct";
import { setProductBundleIdAction } from "src/app/slice/createNodeSlice";
import { useAppDispatch, useAppSelector } from "src/app/hooks";

export const KuberNodeConfigTableRow: FC<{ row: any }> = ({ row }) => {
  const dispatch = useAppDispatch();

   const nodeType = useAppSelector((store) => store.createNode.nodeType);
   const isMaster = nodeType === 1;

  const productBundleId = useAppSelector(
    (store) => store.createNode?.productBundle?.id || 0
  );

  const isChecked = useMemo(
    () => productBundleId === row["id"],
    [row, productBundleId]
  );

  const onCheckboxClick = () => {
    !isMaster && dispatch(setProductBundleIdAction(row));
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
