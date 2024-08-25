import { IconButton, Stack } from "@mui/material";
import { FC, Fragment, useState } from "react";
import { toast } from "react-toastify";
import {
  CdnRouteListResponse,
  useDeleteApiMyDnsCdnRouteDeleteByIdMutation,
} from "src/app/services/api.generated";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { Edit } from "src/components/atoms/svg-icons/EditSvg";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import { CreateLoadBalanceDialog } from "../dialogs/CreateLoadBalanceDialog";
import { loadBalanceTableStruct } from "./struct";

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

export const LoadBalanceTableRow: FC<{ row: any }> = ({ row }) => {
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [selectedCluster, setSelectedCluster] =
    useState<CdnRouteListResponse | null>(null);

  const handleOpenEdit = () => setOpenEdit(true);
  const [openEdit, setOpenEdit] = useState(false);
  const handleCloseEdit = () => setOpenEdit(false);

  const [deleteItem, { isLoading: deleteClusterRecordLoading }] =
    useDeleteApiMyDnsCdnRouteDeleteByIdMutation();

  const handleOpenDelete = (clusterInfo: CdnRouteListResponse) => {
    setSelectedCluster(clusterInfo);
    setDialogType(DIALOG_TYPE_ENUM.DELETE);
  };

  const closeDialogHandler = () => {
    setDialogType(null);
    setSelectedCluster(null);
  };

  const deleteClusterRecordHandler = () =>
    deleteItem({ id: Number(selectedCluster?.id) })
      .unwrap()
      .then(() => {
        toast.success("Load Balance با موفقیت حذف شد");
        closeDialogHandler();
      })
      .catch((err) => {});

  return (
    <Fragment>
      <DorsaTableRow hover tabIndex={-1} key={row.value}>
        {loadBalanceTableStruct.map((column) => {
          const value = row[column.id];
          //TODO: sort has to be apply on array not on each item
          const text = column.format ? column.format(value) : value;
          return (
            <DorsaTableCell
              key={column.id}
              align="center"
              sx={{ px: column.id === "control" ? 0 : 5, whiteSpace: "nowrap" }}
            >
              {column.id === "control" ? (
                <Stack direction="row" spacing={0.6} maxWidth="fit-content">
                  <IconButton sx={{ borderRadius: 1 }} onClick={handleOpenEdit}>
                    <Edit />
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
                text
              )}
            </DorsaTableCell>
          );
        })}
      </DorsaTableRow>
      <DeleteDialog
        open={dialogType === DIALOG_TYPE_ENUM.DELETE}
        onClose={closeDialogHandler}
        keyTitle="Load Balance"
        subTitle="برای حذف عبارت امنیتی زیر را وارد کنید."
        securityPhrase={selectedCluster?.host || ""}
        onSubmit={deleteClusterRecordHandler}
        submitLoading={deleteClusterRecordLoading}
      />
      {openEdit && (
        <CreateLoadBalanceDialog
          dnsId={row.dnsId}
          id={row.id}
          openDialog={openEdit}
          onClose={handleCloseEdit}
        />
      )}
    </Fragment>
  );
};
