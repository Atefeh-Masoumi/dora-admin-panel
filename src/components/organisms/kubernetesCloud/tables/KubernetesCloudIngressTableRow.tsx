import { Chip, IconButton, Stack } from "@mui/material";
import { FC, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
  KuberCloudIngressListResponse,
  useDeleteApiMyKubernetesCloudIngressDeleteByIngressIdMutation,
} from "src/app/services/api.generated";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { Setting } from "src/components/atoms/svg-icons/SettingSvg";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import { withTableRowWrapper } from "src/HOC/withTableRowWrapper";
import { kubernetesCloudIngressTableStruct } from "./struct";
import { serviceStatusIdentifier } from "src/constant/serviceStatusIdentifier";

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

const KubernetesCloudIngressTableRow: FC<{ row: any }> = ({ row }) => {
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [selectedIngress, setSelectedIngress] =
    useState<KuberCloudIngressListResponse | null>(null);

  const navigate = useNavigate();

  // const settingOnClick = () =>
  //   navigate("/kubernetes-cloud/" + row["id"] + "/overview");
  const [deleteIngress, { isLoading: deleteIngressLoading }] =
    useDeleteApiMyKubernetesCloudIngressDeleteByIngressIdMutation();

  const deleteIngressRecordHandler = () =>
    deleteIngress({ ingressId: Number(selectedIngress?.id) })
      .unwrap()
      .then(() => {
        toast.success("سرویس کوبرنتیز شما با موفقیت حذف شد");
        closeDialogHandler();
      })
      .catch((err) => {});

  const closeDialogHandler = () => {
    setDialogType(null);
    setSelectedIngress(null);
  };

  const handleOpenDelete = (ingress: KuberCloudIngressListResponse) => {
    setSelectedIngress(ingress);
    setDialogType(DIALOG_TYPE_ENUM.DELETE);
  };

  return (
    <>
      <DorsaTableRow hover tabIndex={-1} key={row.value}>
        {kubernetesCloudIngressTableStruct.map((column) => {
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
                <Stack direction="row" spacing={0.6} maxWidth="fit-content">
                  <IconButton sx={{ borderRadius: 1 }} onClick={() => {}}>
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
        keyTitle="سرویس ingress"
        subTitle="برای حذف سرویس ingress, عبارت امنیتی زیر را وارد کنید."
        securityPhrase={selectedIngress?.name || ""}
        onSubmit={deleteIngressRecordHandler}
        submitLoading={deleteIngressLoading}
      />
    </>
  );
};

export default withTableRowWrapper(KubernetesCloudIngressTableRow);
