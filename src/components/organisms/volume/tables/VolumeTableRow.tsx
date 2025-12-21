import { Chip, IconButton, Stack } from "@mui/material";
import { FC, Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import {
  VolumeListResponse,
  useDeleteApiMyVmByProjectIdVolumeDeleteAndIdMutation,
} from "src/app/services/api.generated";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import PageLoading from "src/components/atoms/PageLoading";
import { Setting } from "src/components/atoms/svg-icons/SettingSvg";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import { withTableRowWrapper } from "src/HOC/withTableRowWrapper";
import { volumeListTableStruct } from "./struct";
import { DiskStatusIdentifier } from "src/constant/serviceStatusIdentifier";
import { BORDER_RADIUS_1 } from "src/configs/theme";

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

const getStatusConfig = (enabled: boolean) => {
  if (enabled) {
    return {
      bgcolor: "success.light",
      typographyColor: "success.main",
      label: "فعال",
    };
  }

  return {
    bgcolor: "error.light",
    typographyColor: "error.main",
    label: "غیرفعال",
  };
};

const calculateTypeOptions = [
  { id: 1, label: "روزانه" },
  { id: 2, label: "هفتگی" },
  // { id: 3, label: "دو هفته‌ای" },
  { id: 4, label: "ماهانه" },
];
const VolumeTableRow: FC<{ row: any }> = ({ row }) => {
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [selectedVolume, setSelectedVolume] = useState<VolumeListResponse | null>(null);
  const navigate = useNavigate();
  const { projectId } = useParams();

  const [deleteVolume, { isLoading: deleteVolumeLoading }] =
    useDeleteApiMyVmByProjectIdVolumeDeleteAndIdMutation();

  const settingOnClick = () => {
    navigate(`/block-storage/${projectId}/${row["id"]}/specification`);
  };

  const handleOpenDelete = (selectedVolume: VolumeListResponse) => {
    setSelectedVolume(selectedVolume);
    setDialogType(DIALOG_TYPE_ENUM.DELETE);
  };

  const closeDialogHandler = () => {
    setDialogType(null);
    setSelectedVolume(null);
  };

  const deleteVolumeHandler = () => {
    if (!selectedVolume || !selectedVolume.id) return;
    deleteVolume({
      id: selectedVolume.id,
      projectId: Number(projectId),
    })
      .unwrap()
      .then(() => {
        toast.success("دیسک مورد نظر با موفقیت حذف شد");
        closeDialogHandler();
      })
      .catch((err) => {
        toast.error("خطا در حذف دیسک");
      });
  };
  const getScheduleLabel = (isAutoBackup: boolean, scheduleTypeId?: number | null) => {
    if (!isAutoBackup || !scheduleTypeId) return "غیرفعال";
  
    return (
      calculateTypeOptions.find(
        (option) => option.id === Number(scheduleTypeId)
      )?.label || "غیرفعال"
    );
  };
  
  return (
    <Fragment>
      {deleteVolumeLoading && <PageLoading />}
      <DorsaTableRow hover tabIndex={-1} key={row.id}>
        {volumeListTableStruct.map((column) => {
          const value = row[column.id];
          const text = column.format ? column.format(value) : value;
          const diskStatus = DiskStatusIdentifier(row["statusId"]);

          const renderCellContent = () => {
            if (column.id === "control") {
              return (
                <Stack direction="row" columnGap={1} alignItems="center">
                  <IconButton onClick={settingOnClick}>
                    <Setting
                      sx={{
                        "&> path": {
                          stroke: ({ palette }) => palette.grey[700],
                        },
                      }}
                    />
                  </IconButton>
                  <IconButton onClick={() => handleOpenDelete(row)}>
                    <TrashSvg />
                  </IconButton>
                </Stack>
              );
            }

            if (column.id === "statusId") {
              return (
                <Chip
                  clickable={false}
                  label={diskStatus.label}
                  sx={{
                    bgcolor: diskStatus.bgColor,
                    color: diskStatus.typographyColor,
                    py: 2.2,
                    borderRadius: 1,
                    fontSize: "14px",
                  }}
                />
              );
            }

            if (column.id === "isAutoBackup" || column.id === "isAutoSnapshot") {
              const status = getStatusConfig(Boolean(value));
              return (
                <Chip
                  size="small"
                  label={status.label}
                  sx={{
                    bgcolor: ({ palette }) => {
                      const [color, shade] = status.bgcolor.split(".");
                      return (palette as any)[color]?.[shade];
                    },
                    color: ({ palette }) => {
                      const [color, shade] = status.typographyColor.split(".");
                      return (palette as any)[color]?.[shade];
                    },
                    borderRadius: BORDER_RADIUS_1,
                  }}
                />
              );
            }
            if (column.id === "calculateTypeId") {
              const isEnabled = Boolean(row["isAutoBackup"] && value && Number(value) !== 0);
              const status = getStatusConfig(isEnabled);
            
              let label = status.label; 
            
              if (isEnabled) {
                label =
                  calculateTypeOptions.find(
                    (option) => option.id === Number(value)
                  )?.label || status.label;
              }
            
              return (
                <Chip
                  size="small"
                  label={label}
                  sx={{
                    bgcolor: ({ palette }) => {
                      const [color, shade] = status.bgcolor.split(".");
                      return (palette as any)[color]?.[shade];
                    },
                    color: ({ palette }) => {
                      const [color, shade] = status.typographyColor.split(".");
                      return (palette as any)[color]?.[shade];
                    },
                    borderRadius: BORDER_RADIUS_1,
                  }}
                />
              );
            }

            return text || "__";
          };

          return (
            <DorsaTableCell
              key={column.id}
              align="center"
              sx={{ px: 1, whiteSpace: "nowrap" }}
            >
              {renderCellContent()}
            </DorsaTableCell>
          );
        })}
      </DorsaTableRow>
      <DeleteDialog
        open={dialogType === DIALOG_TYPE_ENUM.DELETE}
        onClose={closeDialogHandler}
        keyTitle="دیسک"
        subTitle="برای حذف دیسک موردنظر، عبارت امنیتی زیر را وارد کنید."
        securityPhrase={selectedVolume?.name || ""}
        onSubmit={deleteVolumeHandler}
        submitLoading={deleteVolumeLoading}
      />
    </Fragment>
  );
};

export default withTableRowWrapper(VolumeTableRow); 