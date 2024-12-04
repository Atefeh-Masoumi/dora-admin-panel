import { Chip, IconButton, Stack } from "@mui/material";
import { FC, Fragment, useState } from "react";
import { toast } from "react-toastify";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import { withTableRowWrapper } from "src/HOC/withTableRowWrapper";
import { firewallTableStruct } from "./struct";
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
      <DorsaTableRow hover tabIndex={-1} key={row.value}>
        {firewallTableStruct.map((column) => {
          return (
            <DorsaTableCell
              key={column.id}
              align="center"
              sx={{ px: column.id === "control" ? 0 : 5, whiteSpace: "nowrap" }}
            >
              <Stack direction="row" columnGap={1} alignItems="center">
                <IconButton onClick={() => handleOpenDelete(row)}> 
                  <TrashSvg />
                </IconButton>
              </Stack>
            </DorsaTableCell>
          );
        })}
      </DorsaTableRow>
      <DeleteDialog
        open={dialogType === DIALOG_TYPE_ENUM.DELETE}
        onClose={closeDialogHandler}
        keyTitle="دیسک"
        subTitle="برای حذف عبارت امنیتی زیر را وارد کنید."
        securityPhrase={selectedVolume?.id.toString() || ""}
        onSubmit={deleteVolumeRecordHandler}
        submitLoading={deleteVolumeRecordLoading}
      />
    </Fragment>
  );
};

export default withTableRowWrapper(FirewallTableRow);
