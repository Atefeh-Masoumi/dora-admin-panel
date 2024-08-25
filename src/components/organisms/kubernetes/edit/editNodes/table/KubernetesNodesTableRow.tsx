import { Button, Chip, IconButton, Stack } from "@mui/material";
import { FC, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
  KubernetesNodeListResponse,
  useDeleteApiMyKuberClusterNodeDeleteByIdMutation,
} from "src/app/services/api.generated";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { Setting } from "src/components/atoms/svg-icons/SettingSvg";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import { kubernetesStatusIdentifier } from "src/constant/kubernetesStatus";
import { kubernetesNodesTableStruct } from "./struct";

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

export const KubernetesNodesTableRow: FC<{ row: any }> = ({ row }) => {
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [selectedKuberNode, setSelectedKuberNode] =
    useState<KubernetesNodeListResponse | null>(null);

  const navigate = useNavigate();

  const settingOnClick = () => navigate("/vm/" + row["hostId"]);

  const handleOpenDelete = (kuberNode: KubernetesNodeListResponse) => {
    setSelectedKuberNode(kuberNode);
    setDialogType(DIALOG_TYPE_ENUM.DELETE);
  };

  const closeDialogHandler = () => {
    setDialogType(null);
    setSelectedKuberNode(null);
  };

  const [deleteKubernetesNode, { isLoading: deleteDnsRecordLoading }] =
    useDeleteApiMyKuberClusterNodeDeleteByIdMutation();

  const deleteDnsRecordHandler = () => {
    deleteKubernetesNode({
      id: Number(selectedKuberNode?.hostId),
    })
      .unwrap()
      .then((res) => {
        toast.success("نود کوبرنتیز با موفقیت حذف شد");
      })
      .catch((err) => {});
  };

  return (
    <>
      <DorsaTableRow hover tabIndex={-1} key={row.value}>
        {kubernetesNodesTableStruct.map((column) => {
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
                  ) : column.id === "ip" && text ? (
                    <Button
                      variant="text"
                      sx={{ py: 0, px: 0.5 }}
                      onClick={() => {
                        if (!row[column.id]) return;
                        navigator.clipboard.writeText(row[column.id]);
                        toast.success("ip نود مورد نظر کپی شد", {
                          position: "bottom-left",
                        });
                      }}
                    >
                      {text}
                    </Button>
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
        keyTitle="نود کوبرنتیز"
        subTitle="برای حذف عبارت امنیتی زیر را وارد کنید."
        securityPhrase={selectedKuberNode?.name || ""}
        onSubmit={deleteDnsRecordHandler}
        submitLoading={deleteDnsRecordLoading}
      />
    </>
  );
};
