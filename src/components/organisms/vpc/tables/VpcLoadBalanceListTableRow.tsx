import { IconButton, Stack } from "@mui/material";
import { FC, Fragment, useState } from "react";
import { toast } from "react-toastify";
import { useDeleteApiMyVpcLoadBalancerDeleteVirtualServerByIdMutation } from "src/app/services/api.generated";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { Success } from "src/components/atoms/svg-icons/SuccessSvg";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import { vpcLoadBalanceStruct } from "./struct";

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

export const VpcLoadBalanceListTableRow: FC<{ row: any }> = ({ row }) => {
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [selectedLoadBalance, setSelectedLoadBalance] = useState<any>(null);

  const [
    deleteLoadBalanceRecord,
    { isLoading: deleteLoadBalanceRecordLoading },
  ] = useDeleteApiMyVpcLoadBalancerDeleteVirtualServerByIdMutation();

  const closeDialogHandler = () => {
    setDialogType(null);
    setSelectedLoadBalance(null);
  };

  const handleOpenDelete = (loadBalance: any) => {
    setSelectedLoadBalance(loadBalance);
    setDialogType(DIALOG_TYPE_ENUM.DELETE);
  };

  const deleteLoadBalanceRecordHandler = () =>
    deleteLoadBalanceRecord({
      id: Number(selectedLoadBalance?.virtualServerId),
    })
      .unwrap()
      .then(() => {
        toast.success("LoadBalance رکورد مورد نظر حذف شد", { icon: Success });
        closeDialogHandler();
      })
      .catch((err) => {});

  return (
    <Fragment>
      <DorsaTableRow hover role="checkbox" tabIndex={-1} key={row.value}>
        {vpcLoadBalanceStruct.map((column) => {
          const value = row[column.id];
          const text =
            column.format && typeof value === "number"
              ? column.format(value)
              : value;

          return (
            <DorsaTableCell
              key={column.id}
              align="center"
              sx={{ px: column.id === "control" ? 0 : 5, whiteSpace: "nowrap" }}
            >
              {column.id === "control" ? (
                <Stack direction="row" spacing={0.6} maxWidth="fit-content">
                  <IconButton
                    sx={{ borderRadius: 1 }}
                    color="error"
                    onClick={() => handleOpenDelete(row)}
                  >
                    <TrashSvg />
                  </IconButton>
                </Stack>
              ) : (
                text
              )}
            </DorsaTableCell>
          );
        })}
      </DorsaTableRow>
      <DeleteDialog
        open={dialogType === DIALOG_TYPE_ENUM.DELETE}
        onClose={closeDialogHandler}
        keyTitle="LoadBalance"
        subTitle="برای حذف عبارت امنیتی زیر را وارد کنید."
        securityPhrase={selectedLoadBalance?.name || ""}
        onSubmit={deleteLoadBalanceRecordHandler}
        submitLoading={deleteLoadBalanceRecordLoading}
      />
    </Fragment>
  );
};
