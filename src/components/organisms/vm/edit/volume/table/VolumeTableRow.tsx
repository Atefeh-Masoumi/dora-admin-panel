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

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

export const VolumeTableRow: FC<{ row: any }> = ({ row }) => {
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [selectedVolume, setSelectedVolume] =
    useState<VmVolumeListResponse | null>(null);

  const [deleteItem, { isLoading: deleteVolumeRecordLoading }] =
    useDeleteApiMyVmVolumeDeleteByIdMutation();

  const deleteVolumeRecordHandler = () =>
    deleteItem({ id: Number(selectedVolume?.id) })
      .unwrap()
      .then(() => {
        toast.success("حذف دیسک مورد نظر در حال بررسی است");
        closeDialogHandler();
      })
      .catch((err) => {});

  const closeDialogHandler = () => {
    setDialogType(null);
    setSelectedVolume(null);
  };

  const handleOpenDelete = (snapshot: VmVolumeListResponse) => {
    setSelectedVolume(snapshot);
    setDialogType(DIALOG_TYPE_ENUM.DELETE);
  };

  return (
    <Fragment>
      <DorsaTableRow hover tabIndex={-1} key={row.value}>
        {volumeTableStruct.map((column) => {
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
        securityPhrase={selectedVolume?.name || ""}
        onSubmit={deleteVolumeRecordHandler}
        submitLoading={deleteVolumeRecordLoading}
      />
    </Fragment>
  );
};

export default withTableRowWrapper(VolumeTableRow);
