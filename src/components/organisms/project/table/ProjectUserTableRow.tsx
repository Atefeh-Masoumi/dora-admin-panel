import { IconButton, Stack } from "@mui/material";
import { FC, Fragment, useState } from "react";
import { toast } from "react-toastify";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import { withTableRowWrapper } from "src/HOC/withTableRowWrapper";
import { projectUserTableStruct } from "./struct";
import PageLoading from "src/components/atoms/PageLoading";
import {
  ProjectUserListResponse,
  useDeleteApiMyProjectByProjectIdUserDeleteAndIdMutation,
  useGetApiMyProjectByProjectIdUserListQuery,
} from "src/app/services/api.generated";
import { useParams } from "react-router";
import EditProjectUserDialog from "../edit/EditProjectUserDialog";
import { Edit } from "src/components/atoms/svg-icons/EditSvg";
enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
  EDIT = "EDIT",
}

export const ProjectUserTableRow: FC<{ row: any }> = ({ row }) => {
  const { projectId } = useParams();

  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [selectedUser, setSelectedUser] =
    useState<ProjectUserListResponse | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const [deleteItem, { isLoading: deleteUserRecordLoading }] =
  useDeleteApiMyProjectByProjectIdUserDeleteAndIdMutation();

  const { refetch } = useGetApiMyProjectByProjectIdUserListQuery(
    { projectId: Number(projectId) },
    { skip: !projectId }
  );

  const deleteUserRecordHandler = () =>
    deleteItem({ 
      id: Number(selectedUser?.id),
      projectId: Number(projectId),
    })
      .unwrap()
      .then(() => {
        toast.success("حذف کاربر مورد نظر در حال بررسی است");
        refetch();
        closeDialogHandler();
      })
      .catch(() => {});

  const closeDialogHandler = () => {
    setDialogType(null);
    setSelectedUser(null);
  };

  const handleOpenDelete = (user: ProjectUserListResponse) => {
    setSelectedUser(user);
    setDialogType(DIALOG_TYPE_ENUM.DELETE);
  };

  const handleOpenEdit = (user: ProjectUserListResponse) => {
    setSelectedUser(user);
    setShowEditDialog(true);
  };

  const closeEditDialogHandler = () => {
    setShowEditDialog(false);
    setSelectedUser(null);
  };

  return (
    <Fragment>
      {deleteUserRecordLoading && <PageLoading />}
      <DorsaTableRow hover tabIndex={-1} key={row.value}>
        {projectUserTableStruct.map((column) => {
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
                  <IconButton onClick={() => handleOpenEdit(row)}>
                    <Edit />
                  </IconButton>
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
        keyTitle="کاربر"
        subTitle="برای حذف عبارت امنیتی زیر را وارد کنید."
        securityPhrase={selectedUser?.user || ""}
        onSubmit={deleteUserRecordHandler}
        submitLoading={deleteUserRecordLoading}
      />
      <EditProjectUserDialog
        open={showEditDialog}
        onClose={closeEditDialogHandler}
        selectedUser={selectedUser}
        refetch={refetch}
      />
    </Fragment>
  );
};

export default withTableRowWrapper(ProjectUserTableRow); 