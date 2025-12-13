import { Button, IconButton, Stack, Chip } from "@mui/material";
import { FC, Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import {
  VmVolumeSnapshotListResponse,
  useDeleteApiMyVmByProjectIdSnapshotDeleteAndIdMutation,
  useGetApiMyVmByProjectIdSnapshotListQuery,
} from "src/app/services/api.generated";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import { withTableRowWrapper } from "src/HOC/withTableRowWrapper";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { snapshotTableStruct } from "./struct";
import { RefreshSvg } from "src/components/atoms/svg-icons/RefreshSvg";
import { RevertSnapshotDialog } from "../dialog/RevertSnapshot";

enum DIALOG_TYPE_ENUM {
  REVERT = "REVERT",
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
          label: "غیرفعال",
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
const SnapshotTableRow: FC<{ row: any }> = ({ row }) => {
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [selectedSnapshot, setSelectedSnapshot] = useState<VmVolumeSnapshotListResponse | null>(null);
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { refetch } = useGetApiMyVmByProjectIdSnapshotListQuery({
    projectId: Number(projectId),
  });

  const [deleteBackup, { isLoading: deleteBackupLoading }] =
    useDeleteApiMyVmByProjectIdSnapshotDeleteAndIdMutation();

  

  const handleOpenDelete = (snapshot: VmVolumeSnapshotListResponse) => {
    setSelectedSnapshot(snapshot);
    setDialogType(DIALOG_TYPE_ENUM.DELETE);
  };
  const deleteSnapshotHandler = () => {
    if (!selectedSnapshot?.id) return;
    deleteBackup({
      id: selectedSnapshot.id,
      projectId: Number(projectId),
    })
      .unwrap()
      .then(() => {
        toast.success("اسنپ شات مورد نظر با موفقیت حذف شد");
        refetch();
        closeDialogHandler();
      })
      .catch((_err: unknown) => {});
  };

  const revertSnapshotOnClick = () => {
        setSelectedSnapshot(row);
        setDialogType(DIALOG_TYPE_ENUM.REVERT);
  };

  const closeDialogHandler = () => {
    setDialogType(null);
    setSelectedSnapshot(null);
  };
  
  return (
    <Fragment>
      <DorsaTableRow hover tabIndex={-1} key={row.value}>
        {snapshotTableStruct.map((column) => {
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
                    onClick={revertSnapshotOnClick}
                  >
                     <RefreshSvg />
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
        keyTitle="اسنپ شات"
        subTitle="برای حذف اسنپ شات موردنظر، عبارت امنیتی زیر را وارد کنید."
        securityPhrase={selectedSnapshot?.name || ""}
        onSubmit={deleteSnapshotHandler}
        submitLoading={deleteBackupLoading}
      />
      <RevertSnapshotDialog
        snapshotId={row.id}
        openDialog={dialogType === DIALOG_TYPE_ENUM.REVERT}
        handleClose={closeDialogHandler}
      />
    </Fragment>
  );
};



export default withTableRowWrapper(SnapshotTableRow);

