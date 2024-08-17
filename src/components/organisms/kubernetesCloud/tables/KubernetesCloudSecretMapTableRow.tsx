import { IconButton, Stack } from "@mui/material";
import { FC, useState } from "react";
import { toast } from "react-toastify";
import {
  GetKuberCloudSecretResponse,
  useDeleteApiMyKubernetesCloudSecretDeleteByIdMutation,
} from "src/app/services/api.generated";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import { kubernetesCloudSecretMapTableStruct } from "./struct";

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

export const KubernetesCloudSecretMapTableRow: FC<{ row: any }> = ({ row }) => {
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [
    selectedKubernetesCloudSecretMap,
    setSelectedKubernetesCloudSecretMap,
  ] = useState<GetKuberCloudSecretResponse | null>(null);

  const [deleteSecretMap, { isLoading: deleteSecretMapLoading }] =
    useDeleteApiMyKubernetesCloudSecretDeleteByIdMutation();

  const deleteDnsRecordHandler = () =>
    deleteSecretMap({ id: Number(selectedKubernetesCloudSecretMap?.id) })
      .unwrap()
      .then(() => {
        toast.success("Secret Map با موفقیت حذف شد");
        closeDialogHandler();
      })
      .catch((err) => {});

  const closeDialogHandler = () => {
    setDialogType(null);
    setSelectedKubernetesCloudSecretMap(null);
  };

  const handleOpenDelete = (kubernetes: GetKuberCloudSecretResponse) => {
    setSelectedKubernetesCloudSecretMap(kubernetes);
    setDialogType(DIALOG_TYPE_ENUM.DELETE);
  };

  return (
    <>
      <DorsaTableRow hover tabIndex={-1} key={row.value}>
        {kubernetesCloudSecretMapTableStruct.map((column) => {
          const value = row[column.id];
          const text = column.format ? column.format(value) : value;
          return (
            <DorsaTableCell
              key={column.id}
              align="center"
              sx={{
                px: column.id === "control" ? 0 : 5,
                whiteSpace: "nowrap",
              }}
            >
              {column.id === "control" ? (
                <Stack
                  direction="row"
                  spacing={0.6}
                  maxWidth="fit-content"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "0 auto",
                  }}
                >
                  <IconButton
                    sx={{ borderRadius: 1 }}
                    color="error"
                    onClick={() => handleOpenDelete(row)}
                  >
                    <TrashSvg />
                  </IconButton>
                </Stack>
              ) : (
                <>{text || "__"}</>
              )}
            </DorsaTableCell>
          );
        })}
      </DorsaTableRow>
      <DeleteDialog
        open={dialogType === DIALOG_TYPE_ENUM.DELETE}
        onClose={closeDialogHandler}
        keyTitle="Secret Map"
        subTitle="برای حذف Secret Map, عبارت امنیتی زیر را وارد کنید."
        securityPhrase={selectedKubernetesCloudSecretMap?.name || ""}
        onSubmit={deleteDnsRecordHandler}
        submitLoading={deleteSecretMapLoading}
      />
    </>
  );
};
