import { IconButton, Stack } from "@mui/material";
import { FC, Fragment, useState } from "react";
import { toast } from "react-toastify";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import { withTableRowWrapper } from "src/HOC/withTableRowWrapper";
import { firewallTableStruct } from "./struct";
import PageLoading from "src/components/atoms/PageLoading";
import {
  VmFirewallListResponse,
  useDeleteApiMyVmFirewallDeleteByIdMutation,
} from "src/app/services/api.generated";

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

export const FirewallTableRow: FC<{ row: any }> = ({ row }) => {
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [selectedVolume, setSelectedVolume] =
    useState<VmFirewallListResponse | null>(null);

  const [deleteItem, { isLoading: deleteVolumeRecordLoading }] =
    useDeleteApiMyVmFirewallDeleteByIdMutation();

  const deleteVolumeRecordHandler = () =>
    deleteItem({ id: Number(selectedVolume?.id) })
      .unwrap()
      .then(() => {
        toast.success("حذف رول مورد نظر در حال بررسی است");
        closeDialogHandler();
      })
      .catch(() => {});

  const closeDialogHandler = () => {
    setDialogType(null);
    setSelectedVolume(null);
  };

  const handleOpenDelete = (snapshot: VmFirewallListResponse) => {
    setSelectedVolume(snapshot);
    setDialogType(DIALOG_TYPE_ENUM.DELETE);
  };

  return (
    <Fragment>
      {deleteVolumeRecordLoading && <PageLoading />}
      <DorsaTableRow hover tabIndex={-1} key={row.value}>
        {firewallTableStruct.map((column) => {
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
              {column.id === "control" ? (
                <Stack direction="row" columnGap={1} alignItems="center">
                  <IconButton onClick={() => handleOpenDelete(row)}>
                    <TrashSvg />
                  </IconButton>
                </Stack>
              ) : (
                <></>
              )}
            </DorsaTableCell>
          );
        })}
      </DorsaTableRow>
      <DeleteDialog
        open={dialogType === DIALOG_TYPE_ENUM.DELETE}
        onClose={closeDialogHandler}
        keyTitle="رول"
        subTitle="برای حذف عبارت امنیتی زیر را وارد کنید."
        securityPhrase={selectedVolume?.id.toString() || ""}
        onSubmit={deleteVolumeRecordHandler}
        submitLoading={deleteVolumeRecordLoading}
      />
    </Fragment>
  );
};

export default withTableRowWrapper(FirewallTableRow);
