import { Chip, IconButton, Stack } from "@mui/material";
import { FC, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import {
  KuberHostListResponse,
  useDeleteApiMyKubernetesCloudByProjectIdHostDeleteAndIdMutation,
} from "src/app/services/api.generated";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { Setting } from "src/components/atoms/svg-icons/SettingSvg";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import { withTableRowWrapper } from "src/HOC/withTableRowWrapper";
import { kubernetesCloudTableStruct } from "./struct";
import { CircularProgressWithLabel } from "src/components/atoms/CircularProgressWithLabel";
import { serviceStatusIdentifier } from "src/constant/serviceStatusIdentifier";

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

const KubernetesCloudTableRow: FC<{ row: any }> = ({ row }) => {
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [selectedKubernetes, setSelectedKubernetes] =
    useState<KuberHostListResponse | null>(null);
    const { kubernetesCloudId,projectId } = useParams();
  const navigate = useNavigate();

  const settingOnClick = () =>
    navigate("/kubernetes-cloud/" +projectId + "/" + row["id"] + "/overview");
  const [deleteKubernetes, { isLoading: deleteDnsRecordLoading }] =
  useDeleteApiMyKubernetesCloudByProjectIdHostDeleteAndIdMutation();

  const deleteDnsRecordHandler = () =>
    deleteKubernetes({ id: Number(selectedKubernetes?.id), projectId: Number(projectId),  })
      .unwrap()
      .then(() => {
        toast.success("سرویس کوبرنتیز شما با موفقیت حذف شد");
        closeDialogHandler();
      })
      .catch((err) => {});

  const closeDialogHandler = () => {
    setDialogType(null);
    setSelectedKubernetes(null);
  };

  const handleOpenDelete = (kubernetes: KuberHostListResponse) => {
    setSelectedKubernetes(kubernetes);
    setDialogType(DIALOG_TYPE_ENUM.DELETE);
  };

  return (
    <>
      <DorsaTableRow hover tabIndex={-1} key={row.value}>
        {kubernetesCloudTableStruct.map((column) => {
          const value = row[column.id];
          const text = column.format ? column.format(value) : value;
          const id = row["statusId"];
          const tenPods = row["tenPods"] * 10;
          const podInUse = row["podInUse"];
          return (
            <DorsaTableCell
              key={column.id}
              align="center"
              sx={{ px: column.id === "control" ? 0 : 5, whiteSpace: "nowrap" }}
            >
              {column.id === "control" ? (
                <Stack direction="row" spacing={0.6} maxWidth="fit-content">
                  <IconButton sx={{ borderRadius: 1 }} onClick={settingOnClick}>
                    <Setting
                      sx={{
                        "&> path": {
                          stroke: ({ palette }) => palette.grey[700],
                        },
                      }}
                    />
                  </IconButton>
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
                      label={serviceStatusIdentifier(id).label}
                      sx={{
                        bgcolor: serviceStatusIdentifier(id).bgColor,
                        color: serviceStatusIdentifier(id).typographyColor,
                        py: 2.2,
                        borderRadius: 1,
                        fontSize: "14px",
                      }}
                    />
                  ) : column.id === "id" ? (
                    <CircularProgressWithLabel
                      value={(podInUse * 100) / tenPods}
                      total={tenPods}
                    />
                  ) : (
                    // <CircularProgress variant="determinate" value={25} />
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
        keyTitle="کوبرنتیز ابری"
        subTitle="برای حذف سرویس کوبرنتیز, عبارت امنیتی زیر را وارد کنید."
        securityPhrase={selectedKubernetes?.name || ""}
        onSubmit={deleteDnsRecordHandler}
        submitLoading={deleteDnsRecordLoading}
      />
    </>
  );
};

export default withTableRowWrapper(KubernetesCloudTableRow);
