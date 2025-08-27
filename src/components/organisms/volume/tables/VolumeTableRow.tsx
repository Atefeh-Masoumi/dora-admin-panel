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

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

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

  return (
    <Fragment>
      {deleteVolumeLoading && <PageLoading />}
      <DorsaTableRow hover tabIndex={-1} key={row.id}>
        {volumeListTableStruct.map((column) => {
          const value = row[column.id];
          const text = column.format ? column.format(value) : value;
          const id = row["statusId"];
          return (
            <DorsaTableCell
              key={column.id}
              align="center"
              sx={{ px: 1, whiteSpace: "nowrap" }}
            >
             
             
              {column.id === "control" ? (
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
              ) : (
                <>
                {column.id === "statusId" ? (
                  <Chip
                    clickable={false}
                    label={DiskStatusIdentifier(id).label}
                    sx={{
                      bgcolor: DiskStatusIdentifier(id).bgColor,
                      color: DiskStatusIdentifier(id).typographyColor,
                      py: 2.2,
                      borderRadius: 1,
                      fontSize: "14px",
                    }}
                  />
                  ) : (
                    text || "__"
                  )}
                </>
              )}
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