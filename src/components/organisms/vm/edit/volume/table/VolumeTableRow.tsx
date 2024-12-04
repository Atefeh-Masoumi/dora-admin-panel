import { IconButton, Stack } from "@mui/material";
import { FC, Fragment, useState } from "react";
import { toast } from "react-toastify";
import {
  VmSnapshotResponse,
  useDeleteApiMyVmSnapshotDeleteByIdMutation,
} from "src/app/services/api.generated";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import theme from "src/configs/theme";
import { withTableRowWrapper } from "src/HOC/withTableRowWrapper";
import { RevertVmSnapshotDialog } from "../../../dialogs/RevertVmSnapshotDialog";
import { volumeTableStruct } from "./struct";

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

export const VolumeTableRow: FC<{ row: any }> = ({ row }) => {
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [selectedSnapshot, setSelectedSnapshot] =
    useState<VmSnapshotResponse | null>(null);
  const [openRevert, setOpenRevert] = useState(false);

  const handleOpenRevert = () => setOpenRevert(true);
  const handleCloseRevert = () => setOpenRevert(false);

  const [deleteItem, { isLoading: deleteSnapshotRecordLoading }] =
    useDeleteApiMyVmSnapshotDeleteByIdMutation();

  const deleteSnapshotRecordHandler = () =>
    deleteItem({ id: Number(selectedSnapshot?.id) })
      .unwrap()
      .then(() => {
        toast.success("حدف snapshot مورد نظر در حال بررسی است");
        closeDialogHandler();
      })
      .catch((err) => {});

  const closeDialogHandler = () => {
    setDialogType(null);
    setSelectedSnapshot(null);
  };

  const handleOpenDelete = (snapshot: VmSnapshotResponse) => {
    setSelectedSnapshot(snapshot);
    setDialogType(DIALOG_TYPE_ENUM.DELETE);
  };

  return (
    <Fragment>
      <DorsaTableRow hover tabIndex={-1} key={row.value}>
        {volumeTableStruct.map((column) => {
          const value = row[column.id];
          const text = column.format ? column.format(value) : value;
          const isCreated = row.isCreated;

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
        keyTitle="Snapshot"
        subTitle="برای حذف عبارت امنیتی زیر را وارد کنید."
        securityPhrase={selectedSnapshot?.name || ""}
        onSubmit={deleteSnapshotRecordHandler}
        submitLoading={deleteSnapshotRecordLoading}
      />
      <RevertVmSnapshotDialog
        snapshotId={row.id}
        openDialog={openRevert}
        handleClose={handleCloseRevert}
      />
    </Fragment>
  );
};

export default withTableRowWrapper(VolumeTableRow);
