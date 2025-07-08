import { IconButton, Stack } from "@mui/material";
import { FC, Fragment, useState } from "react";
import { toast } from "react-toastify";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import { withTableRowWrapper } from "src/HOC/withTableRowWrapper";
import { keyTableStruct } from "./struct";
import PageLoading from "src/components/atoms/PageLoading";
import {
  VmKeyListResponse,
  useDeleteApiMyVmByProjectIdKeyDeleteAndIdMutation,
  useGetApiMyVmByProjectIdKeyListQuery,
} from "src/app/services/api.generated";
import { useParams } from "react-router";

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

export const KeyListTableRow: FC<{ row: any }> = ({ row }) => {
  const { projectId } = useParams();

  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [selectedKey, setSelectedKey] =
    useState<VmKeyListResponse | null>(null);

  const [deleteItem, { isLoading: deleteKeyRecordLoading }] =
    useDeleteApiMyVmByProjectIdKeyDeleteAndIdMutation();

  const { refetch } = useGetApiMyVmByProjectIdKeyListQuery(
    { projectId: Number(projectId) },
    { skip: !projectId }
  );

  const deleteKeyRecordHandler = () =>
    deleteItem({ 
      id: Number(selectedKey?.id),
      projectId: Number(projectId),
    })
      .unwrap()
      .then(() => {
        toast.success("کلید مورد نظر با موفقیت حذف شد");
        refetch();
        closeDialogHandler();
      })
      .catch(() => {});

  const closeDialogHandler = () => {
    setDialogType(null);
    setSelectedKey(null);
  };

  const handleOpenDelete = (key: VmKeyListResponse) => {
    setSelectedKey(key);
    setDialogType(DIALOG_TYPE_ENUM.DELETE);
  };

  return (
    <Fragment>
      {deleteKeyRecordLoading && <PageLoading />}
      <DorsaTableRow hover tabIndex={-1} key={row.value}>
        {keyTableStruct.map((column) => {
          const value = row[column.id];
          const text = column.format && typeof value === "number"
            ? column.format(value)
            : value;

          return (
            <DorsaTableCell
              key={column.id}
              align="center"
              sx={{ px: column.id === "control" ? 0 : 5, whiteSpace: "nowrap" }}
            >
              {column.id === "control" ? (
                <Stack direction="row" columnGap={1} alignItems="center">
                  <IconButton onClick={() => handleOpenDelete(row)}>
                    <TrashSvg />
                  </IconButton>
                </Stack>
              ) : (
                text || "-"
              )}
            </DorsaTableCell>
          );          
        })}
      </DorsaTableRow>
      <DeleteDialog
        open={dialogType === DIALOG_TYPE_ENUM.DELETE}
        onClose={closeDialogHandler}
        keyTitle="کلید"
        subTitle="برای حذف کلید موردنظر، عبارت امنیتی زیر را وارد کنید."
        securityPhrase={selectedKey?.name || ""}
        onSubmit={deleteKeyRecordHandler}
        submitLoading={deleteKeyRecordLoading}
      />
    </Fragment>
  );
};

export default withTableRowWrapper(KeyListTableRow);
