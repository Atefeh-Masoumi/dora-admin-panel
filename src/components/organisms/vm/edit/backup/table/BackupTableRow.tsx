import { Chip, IconButton, Stack, Typography } from "@mui/material";
import { FC, Fragment, useState } from "react";
import { toast } from "react-toastify";
import {
  useDeleteApiMyVmByProjectIdHostAndVmHostIdBackupDeleteIdMutation,
  useGetApiMyVmByProjectIdHostAndVmHostIdBackupListQuery,
} from "src/app/services/api.generated";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { RefreshSvg } from "src/components/atoms/svg-icons/RefreshSvg";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import theme, { BORDER_RADIUS_1 } from "src/configs/theme";
import { withTableRowWrapper } from "src/HOC/withTableRowWrapper";
import { RestoreBackupDialog } from "../dialog/RestoreBackupDialog";
import { BackupTableStruct } from "./struct";
import { useParams } from "react-router";

enum VOLUME_BACKUP_STATUS_INFO {
  ACTIVE = 1,
  INACTIVE = 2,
  INQUEUE = 3,
  WAIT = 4,
  FAIL = 5,
  DELETE = 6,
  RESTORING = 7,
  DELETING = 8,
}

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

const volumeBackupStatusList = (statusId: number) => {
  switch (statusId) {
    case 1:
      return {
        id: 1,
        label: "فعال",
        bgcolor: "success.light",
        color: "success.main",
      };

    case 2:
      return {
        id: 2,
        label: "خطا در زیرساخت",
        bgcolor: "error.light",
        color: "error.main",
      };
    case 3:
      return {
        id: 3,
        label: "درصف انتظار",
        bgcolor: "warning.light",
        color: "warning.main",
      };
    case 4:
      return {
        id: 4,
        label: "درانتظار",
        bgcolor: "warning.light",
        color: "warning.main",
      };
    case 5:
      return {
        id: 5,
        label: "ناموفق",
        bgcolor: "error.light",
        color: "error.main",
      };

    case 6:
      return {
        id: 6,
        label: "حذف شده",
        bgcolor: "error.light",
        color: "error.main",
      };
      case 7:
        return {
          id: 7,
          label: "درحال بازگردانی",
          bgcolor: "warning.light",
          color: "warning.main",
        };
      case 8:
        return {
          id: 8,
          label: "درحال حذف",
          bgcolor: "warning.light",
          color: "warning.main",
        };
    default:
      return {
        id: 0,
        label: "نامشخص",
        bgcolor: "error.light",
        color: "error.main",
      };
  }
};

export const BackupTableRow: FC<{ row: any }> = ({ row }) => {

  const { id:vmId, projectId } = useParams();
  
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [selectedBackup, setSelectedBackup] = useState<any | null>(null);
  const [openRestore, setOpenRestore] = useState(false);

  const handleOpenRestore = () => setOpenRestore(true);
  const handleCloseRestore = () => setOpenRestore(false);

  const [deleteItem, { isLoading: deleteBackupRecordLoading }] =
    useDeleteApiMyVmByProjectIdHostAndVmHostIdBackupDeleteIdMutation();

  const {refetch} = useGetApiMyVmByProjectIdHostAndVmHostIdBackupListQuery(
      { projectId: Number(projectId), vmHostId: Number(vmId) },
      { skip: !vmId }
    );
    
  const deleteBackupRecordHandler = () =>
    deleteItem({ 
      id: Number(selectedBackup?.id),
      projectId: Number(projectId),
      vmHostId: Number(vmId) 
     })
      .unwrap()
      .then(() => {
        toast.success("حذف بکاپ مورد نظر در حال بررسی است");
        closeDialogHandler();
        refetch();
      })
      .catch((err) => {});

  const closeDialogHandler = () => {
    setDialogType(null);
    setSelectedBackup(null);
  };

  const handleOpenDelete = (backup: any) => {
    setSelectedBackup(backup);
    setDialogType(DIALOG_TYPE_ENUM.DELETE);
  };

  return (
    <Fragment>
      <DorsaTableRow hover tabIndex={-1} key={row.value}>
        {BackupTableStruct.map((column) => {
          const value = row[column.id];
          const text = column.format ? column.format(value) : value;
          const statusId = row.statusId;

          return (
            <DorsaTableCell
              key={column.id}
              align="center"
              sx={{ px: column.id === "control" ? 0 : 5, whiteSpace: "nowrap" }}
            >
              {column.id === "control" ? (
                <Stack direction="row" columnGap={1} alignItems="center">
                  {statusId === VOLUME_BACKUP_STATUS_INFO.INACTIVE && (
                    <IconButton onClick={handleOpenRestore}>
                      <RefreshSvg />
                    </IconButton>
                  )}

                  <IconButton onClick={() => handleOpenDelete(row)}>
                    <TrashSvg />
                  </IconButton>
                </Stack>
              ) : column.id === "statusId" ? (
                <Chip
                  label={volumeBackupStatusList(statusId).label}
                  sx={{
                    bgcolor: ({ palette }) => {
                      const [color, shade] = volumeBackupStatusList(statusId).bgcolor.split('.');
                      return (palette as any)[color][shade];
                    },
                    color: ({ palette }) => {
                      const [color, shade] = volumeBackupStatusList(statusId).color.split('.');
                      return (palette as any)[color][shade];
                    },
                    borderRadius: BORDER_RADIUS_1,
                  }}
                />
              )  : column.id === "description" ? (
                <Typography>
                  {row.description}
                </Typography>
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
        keyTitle="Backup"
        subTitle="برای حذف عبارت امنیتی زیر را وارد کنید."
        securityPhrase={selectedBackup?.name || ""}
        onSubmit={deleteBackupRecordHandler}
        submitLoading={deleteBackupRecordLoading}
      />
      <RestoreBackupDialog
        backupId={row.id}
        openDialog={openRestore}
        handleClose={handleCloseRestore}
      />
    </Fragment>
  );
};

export default withTableRowWrapper(BackupTableRow); 