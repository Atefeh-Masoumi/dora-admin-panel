import { IconButton, Stack } from "@mui/material";
import { FC } from "react";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { vpcTableNetworkStruct } from "./vpcTableNetworkStruct";
import { withTableRowWrapper } from "src/HOC/withTableRowWrapper";

export type VpcNetworkTableRowProps = {
  row: any;
  onDelete: (id: number) => void;
};

const VpcNetworkTableRow: FC<VpcNetworkTableRowProps> = ({ row, onDelete }) => {
  const handleOnDelete = (item: any) => {
    onDelete(item.id);
  };

  return (
    <>
      <DorsaTableRow hover tabIndex={-1} key={row.value}>
        {vpcTableNetworkStruct.map((column) => {
          const value = row[column.id];
          const text = column.format ? column.format(value) : value;
          return (
            <DorsaTableCell
              key={column.id}
              align="center"
              sx={{
                px: column.id === "control" ? 0 : 5,
                whiteSpace: "nowrap",
              }}
            >
              {column.id === "control" ? (
                <Stack direction="row" spacing={0.6} maxWidth="fit-content">
                  <IconButton
                    sx={{ borderRadius: 1 }}
                    color="error"
                    onClick={() => handleOnDelete(row)}
                  >
                    <TrashSvg />
                  </IconButton>
                </Stack>
              ) : (
                <>{text || "--"}</>
              )}
            </DorsaTableCell>
          );
        })}
      </DorsaTableRow>
    </>
  );
};

export default withTableRowWrapper(VpcNetworkTableRow);
