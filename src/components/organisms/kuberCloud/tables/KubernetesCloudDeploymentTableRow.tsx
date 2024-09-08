import { Chip, IconButton, Stack } from "@mui/material";
import { FC, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
  KubernetesListResponse,
  useDeleteApiMyKubernetesCloudDeploymentDeleteByIdMutation,
} from "src/app/services/api.generated";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { Setting } from "src/components/atoms/svg-icons/SettingSvg";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import { kubernetesStatusIdentifier } from "src/constant/kubernetesStatus";
import { kubernetesCloudDeploymentTableStruct } from "./struct";
import { ConvertToJalali } from "src/utils/convertToJalali";

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

export const KubernetesCloudDeploymentTableRow: FC<{ row: any }> = ({
  row,
}) => {
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [selectedDeployment, setSelectedDeployment] =
    useState<KubernetesListResponse | null>(null);

  // const navigate = useNavigate();
  // const settingOnClick = () => navigate("/kubernetes-cloud/" + row["id"]);
  const [deleteDeployment, { isLoading: deleteDeploymentRecordLoading }] =
    useDeleteApiMyKubernetesCloudDeploymentDeleteByIdMutation();

  const deleteDeploymentRecordHandler = () =>
    deleteDeployment({ id: Number(selectedDeployment?.id) })
      .unwrap()
      .then(() => {
        toast.success("سرویس deployment شما با موفقیت حذف شد");
        closeDialogHandler();
      })
      .catch((err) => {});

  const closeDialogHandler = () => {
    setDialogType(null);
    setSelectedDeployment(null);
  };

  const handleOpenDelete = (kubernetes: KubernetesListResponse) => {
    setSelectedDeployment(kubernetes);
    setDialogType(DIALOG_TYPE_ENUM.DELETE);
  };

  return (
    <>
      <DorsaTableRow hover tabIndex={-1} key={row.value}>
        {kubernetesCloudDeploymentTableStruct.map((column) => {
          const value = row[column.id];
          const text = column.format ? column.format(value) : value;
          const id = row["statusId"];
          return (
            <DorsaTableCell
              key={column.id}
              align="center"
              sx={{ px: column.id === "control" ? 0 : 5, whiteSpace: "nowrap" }}
            >
              {column.id === "control" ? (
                <Stack
                  direction="row"
                  justifyContent="center"
                  spacing={0.6}
                  maxWidth="fit-content"
                >
                  {/* <IconButton sx={{ borderRadius: 1 }} onClick={settingOnClick}>
                    <Setting
                      sx={{
                        "&> path": {
                          stroke: ({ palette }) => palette.grey[700],
                        },
                      }}
                    />
                  </IconButton> */}
                  <IconButton
                    sx={{ borderRadius: 1 }}
                    color="error"
                    onClick={() => handleOpenDelete(row)}
                  >
                    <TrashSvg />
                  </IconButton>
                </Stack>
              ) : (
                <>
                  {column.id === "statusId" ? (
                    <Chip
                      clickable={false}
                      label={kubernetesStatusIdentifier(id).label}
                      color={kubernetesStatusIdentifier(id).chipColor as any}
                      sx={{
                        bgcolor: kubernetesStatusIdentifier(id).bgcolor,
                        color: kubernetesStatusIdentifier(id).textColor,
                        py: 2.2,
                        borderRadius: 1,
                        fontSize: "14px",
                      }}
                    />
                  ) : column.id === "createDate" ? (
                    ConvertToJalali(text)
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
        keyTitle="سرویس Deployment"
        subTitle="برای حذف Deployment, عبارت امنیتی زیر را وارد کنید."
        securityPhrase={selectedDeployment?.name || ""}
        onSubmit={deleteDeploymentRecordHandler}
        submitLoading={deleteDeploymentRecordLoading}
      />
    </>
  );
};
