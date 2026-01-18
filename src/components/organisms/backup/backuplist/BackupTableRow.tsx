import { Button, IconButton, Stack, Chip } from "@mui/material";
import { FC, Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import {
  VmVolumeBackupListResponse,
  useDeleteApiMyVmByProjectIdBackupDeleteAndIdMutation,
  useGetApiMyVmByProjectIdBackupListQuery,
} from "src/app/services/api.generated";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import { withTableRowWrapper } from "src/HOC/withTableRowWrapper";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { backupTableStruct } from "./struct";
import { RefreshSvg } from "src/components/atoms/svg-icons/RefreshSvg";
import { RestoreBackupDialog } from "../dialog/RestoreBackup";
import { Restore } from "@mui/icons-material";

enum DIALOG_TYPE_ENUM {
  RESTORE = "RESTORE",
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
const BackupTableRow: FC<{ row: any }> = ({ row }) => {
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [selectedBackup, setSelectedBackup] = useState<VmVolumeBackupListResponse | null>(null);
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { refetch } = useGetApiMyVmByProjectIdBackupListQuery({
    projectId: Number(projectId),
  });

  const [deleteBackup, { isLoading: deleteBackupLoading }] =
    useDeleteApiMyVmByProjectIdBackupDeleteAndIdMutation();

  const handleOpenDelete = (backup: VmVolumeBackupListResponse) => {
    setSelectedBackup(backup);
    setDialogType(DIALOG_TYPE_ENUM.DELETE);
  };
  const deleteBackupHandler = () => {
    if (!selectedBackup?.id) return;
    deleteBackup({
      id: selectedBackup.id,
      projectId: Number(projectId),
    })
      .unwrap()
      .then(() => {
        toast.success("بکاپ مورد نظر با موفقیت حذف شد");
        refetch();
        closeDialogHandler();
      })
      .catch((_err: unknown) => {});
  };

  const restoreBackupOnClick = () => {
        setSelectedBackup(row);
        setDialogType(DIALOG_TYPE_ENUM.RESTORE);
  };

  const closeDialogHandler = () => {
    setDialogType(null);
    setSelectedBackup(null);
  };
  
  return (
    <Fragment>
      <DorsaTableRow hover tabIndex={-1} key={row.value}>
        {backupTableStruct.map((column) => {
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
                <Stack
                  direction="row"
                  justifyContent="end"
                  spacing={0.6}
                  maxWidth="100%"
                >
                  <IconButton
                    sx={{ borderRadius: 1 }}
                    onClick={restoreBackupOnClick}
                  >
                      <Restore /> 
                  </IconButton>
                  <IconButton
                    sx={{ borderRadius: 1, ml: "auto" }}
                    color="error"
                    onClick={() => handleOpenDelete(row)}
                  >
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
              ) : (
                <>
                  {text}
                </>
              )}
            </DorsaTableCell>
          );
        })}
      </DorsaTableRow>
      <DeleteDialog
        open={dialogType === DIALOG_TYPE_ENUM.DELETE}
        onClose={closeDialogHandler}
        keyTitle="بکاپ"
        subTitle="برای حذبکاپ موردنظر، عبارت امنیتی زیر را وارد کنید."
        securityPhrase={selectedBackup?.name || ""}
        onSubmit={deleteBackupHandler}
        submitLoading={deleteBackupLoading}
      />
      <RestoreBackupDialog
        backupId={row.id}
        openDialog={dialogType === DIALOG_TYPE_ENUM.RESTORE}
        handleClose={closeDialogHandler}
      />
    </Fragment>
  );
};



export default withTableRowWrapper(BackupTableRow);

