import { IconButton, Stack } from "@mui/material";
import { FC, Fragment, useState } from "react";
import { toast } from "react-toastify";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import { withTableRowWrapper } from "src/HOC/withTableRowWrapper";
import { volumeTableStruct } from "./struct";
import {
  VmVolumeListResponse,
  useDeleteApiMyVmVolumeDeleteByIdMutation,
} from "src/app/services/api.generated";
import PageLoading from "src/components/atoms/PageLoading";

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

export const VolumeTableRow: FC<{ row: any }> = ({ row }) => {
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [selectedVm, setSelectedVm] = useState<VmVolumeListResponse | null>(
    null
  );

  const [deleteItem, { isLoading: deleteVmRecordLoading }] =
    useDeleteApiMyVmVolumeDeleteByIdMutation();

  const handleOpenDelete = (vm: VmVolumeListResponse) => {
    setSelectedVm(vm);
    setDialogType(DIALOG_TYPE_ENUM.DELETE);
  };

  const closeDialogHandler = () => {
    setDialogType(null);
    setSelectedVm(null);
  };

  const deleteVmRecordHandler = () =>
    deleteItem({ id: Number(selectedVm?.id) })
      .unwrap()
      .then(() => {
        toast.success("سرور ابری با موفقیت حذف شد");
        closeDialogHandler();
      })
      .catch((err) => {});

  return (
    <Fragment>
      {deleteVmRecordLoading && <PageLoading />}
      <DorsaTableRow hover tabIndex={-1} key={row.value}>
        {volumeTableStruct.map((column) => {
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
        keyTitle="دیسک"
        subTitle="برای حذف دیسک, عبارت امنیتی زیر را وارد کنید."
        securityPhrase={selectedVm?.name || ""}
        onSubmit={deleteVmRecordHandler}
        submitLoading={deleteVmRecordLoading}
      />
    </Fragment>
  );
};

export default withTableRowWrapper(VolumeTableRow);
