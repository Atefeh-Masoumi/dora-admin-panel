import { IconButton, Stack } from "@mui/material";
import { FC, Fragment, useState } from "react";
import { toast } from "react-toastify";
import { useDeleteApiMyVpcNetworkDeleteByIdMutation } from "src/app/services/api.generated";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { Success } from "src/components/atoms/svg-icons/SuccessSvg";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import { vpcNetworkStruct } from "./struct";

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

export const VpcNetworkListTableRow: FC<{ row: any }> = ({ row }) => {
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [selectedNetwork, setSelectedNetwork] = useState<any>(null);

  const [deleteNetworkRecord, { isLoading: deleteNetworkRecordLoading }] =
    useDeleteApiMyVpcNetworkDeleteByIdMutation();

  const closeDialogHandler = () => {
    setDialogType(null);
    setSelectedNetwork(null);
  };

  const handleOpenDelete = (dns: any) => {
    setSelectedNetwork(dns);
    setDialogType(DIALOG_TYPE_ENUM.DELETE);
  };

  const deleteNetworkRecordHandler = () =>
    deleteNetworkRecord({ id: Number(selectedNetwork?.id) })
      .unwrap()
      .then(() => {
        toast.success("Network رکورد مورد نظر حذف شد", { icon: Success });
      })
      .catch(() => {});

  return (
    <Fragment>
      <DorsaTableRow hover role="checkbox" tabIndex={-1} key={row.value}>
        {vpcNetworkStruct.map((column) => {
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
        keyTitle="Network"
        subTitle="برای حذف عبارت امنیتی زیر را وارد کنید."
        securityPhrase={selectedNetwork?.name || ""}
        onSubmit={deleteNetworkRecordHandler}
        submitLoading={deleteNetworkRecordLoading}
      />
    </Fragment>
  );
};
