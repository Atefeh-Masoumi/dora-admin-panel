import { Chip, IconButton, Stack } from "@mui/material";
import { FC, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
  KubernetesListResponse,
  useDeleteApiMyKubernetesClusterHostDeleteByIdMutation,
  useGetApiMyKubernetesClusterHostListQuery,
} from "src/app/services/api.generated";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { Setting } from "src/components/atoms/svg-icons/SettingSvg";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import { kubernetesStatusIdentifier } from "src/constant/kubernetesStatus";
import { kubernetesTableStruct } from "./struct";
import { withTableRowWrapper } from "src/HOC/withTableRowWrapper";

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

const KubernetesTableRow: FC<{ row: any }> = ({ row }) => {
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [selectedKubernetes, setSelectedKubernetes] =
    useState<KubernetesListResponse | null>(null);
  const {
    data: kubernetesList,
    isLoading: kubernetesListLoading,
    refetch: refetchKubernetesList,
  } = useGetApiMyKubernetesClusterHostListQuery({} as any, { skip: true });

  const navigate = useNavigate();

  const settingOnClick = () => navigate("/kubernetes/" + row["id"]);
  const [deleteKubernetes, { isLoading: deleteDnsRecordLoading }] =
    useDeleteApiMyKubernetesClusterHostDeleteByIdMutation();

  const deleteDnsRecordHandler = () =>
    deleteKubernetes({ id: Number(selectedKubernetes?.id) })
      .unwrap()
      .then(() => {
        toast.success("سرویس کوبرنتیز شما با موفقیت حذف شد");
        closeDialogHandler();
        refetchKubernetesList();
      })
      .catch((err) => {});

  const closeDialogHandler = () => {
    setDialogType(null);
    setSelectedKubernetes(null);
  };

  const handleOpenDelete = (kubernetes: KubernetesListResponse) => {
    setSelectedKubernetes(kubernetes);
    setDialogType(DIALOG_TYPE_ENUM.DELETE);
  };

  return (
    <>
      <DorsaTableRow hover tabIndex={-1} key={row.value}>
        {kubernetesTableStruct.map((column) => {
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
        keyTitle="سرویس کوبرنتیز"
        subTitle="برای حذف سرویس کوبرنتیز, عبارت امنیتی زیر را وارد کنید."
        securityPhrase={selectedKubernetes?.name || ""}
        onSubmit={deleteDnsRecordHandler}
        submitLoading={deleteDnsRecordLoading}
      />
    </>
  );
};

export default withTableRowWrapper(KubernetesTableRow);
