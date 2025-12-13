import { IconButton, Stack, Tooltip } from "@mui/material";
import { FC, Fragment, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import { withTableRowWrapper } from "src/HOC/withTableRowWrapper";
import { volumeTableStruct } from "./struct";
import {
  VolumeListResponse,
  useDeleteApiMyVmByProjectIdHostAndVmHostIdIpDeleteIdMutation,
} from "src/app/services/api.generated";
import PageLoading from "src/components/atoms/PageLoading";
import { useParams } from "react-router";
import { Backup, BackupOutlined } from "@mui/icons-material";

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

type VolumeTableRowProps = {
  row: VolumeListResponse;
  autoBackupEnabledIds: Set<number>;
  onEnableAutoBackupClick: (volume: VolumeListResponse) => void;
  onDisableAutoBackupClick: (volume: VolumeListResponse) => void;
};

export const VolumeTableRow: FC<VolumeTableRowProps> = ({
  row,
  autoBackupEnabledIds,
  onEnableAutoBackupClick,
  onDisableAutoBackupClick,
}) => {
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [selectedVm, setSelectedVm] = useState<VolumeListResponse | null>(
    null
  );
  const { id, projectId } = useParams();
  const [deleteItem, { isLoading: deleteVmRecordLoading }] =
  useDeleteApiMyVmByProjectIdHostAndVmHostIdIpDeleteIdMutation
  ();

  const isAutoBackupEnabled = useMemo(
    () => autoBackupEnabledIds.has(row.id!),
    [autoBackupEnabledIds, row.id]
  );

  const onEnableAutoBackupBtnClick = () => {
    onEnableAutoBackupClick(row);
  };

  const onDisableAutoBackupBtnClick = () => {
    onDisableAutoBackupClick(row);
  };

  const handleOpenDelete = (vm: VolumeListResponse) => {
    setSelectedVm(vm);
    setDialogType(DIALOG_TYPE_ENUM.DELETE);
  };

  const closeDialogHandler = () => {
    setDialogType(null);
    setSelectedVm(null);
  };

  const deleteVmRecordHandler = () =>
    deleteItem(
      {
        id: Number(selectedVm?.id),
        projectId: Number(projectId),
        vmHostId: Number(id),
      })
      .unwrap()
      .then(() => {
        toast.success("دیسک با موفقیت حذف شد");
        closeDialogHandler();
      })
      .catch((err) => { });

  return (
    <Fragment>
      {deleteVmRecordLoading && <PageLoading />}
      <DorsaTableRow hover tabIndex={-1}>
        {volumeTableStruct.map((column) => {
          const value = (row as any)[column.id as keyof VolumeListResponse];
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
                  {isAutoBackupEnabled ? (
                    <Tooltip title="غیرفعال‌سازی بکاپ خودکار">
                      <IconButton
                        onClick={onDisableAutoBackupBtnClick}
                        color="error"
                      >
                        <BackupOutlined />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="فعال‌سازی بکاپ خودکار">
                      <IconButton
                        onClick={onEnableAutoBackupBtnClick}
                        color="success"
                      >
                        <Backup />
                      </IconButton>
                    </Tooltip>
                  )}
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
