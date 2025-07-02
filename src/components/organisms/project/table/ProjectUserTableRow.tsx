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
  useDeleteApiMyByProjectIdUserDeleteAndIdMutation,
  useGetApiMyByProjectIdUserListQuery,
} from "src/app/services/api.generated";
import { useParams } from "react-router";

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

export const ProjectUserTableRow: FC<{ row: any }> = ({ row }) => {
  const { projectId } = useParams();

  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [selectedUser, setSelectedUser] =
    useState<ProjectUserListResponse | null>(null);

  const [deleteItem, { isLoading: deleteUserRecordLoading }] =
    useDeleteApiMyByProjectIdUserDeleteAndIdMutation();

  const { refetch } = useGetApiMyByProjectIdUserListQuery(
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

  return (
    <Fragment>
      {deleteUserRecordLoading && <PageLoading />}
      <DorsaTableRow hover tabIndex={-1} key={row.value}>
        {projectUserTableStruct.map((column) => {
          const value = row[column.id];
          return (
            <DorsaTableCell
              key={column.id}
              align="center"
              sx={{ px: 1, whiteSpace: "nowrap" }}
            >
              {column.format && typeof value === "number"
                ? column.format(value)
                : value}
              {column.id === "control" ? (
                <Stack direction="row" columnGap={1} alignItems="center">
                  <IconButton onClick={() => handleOpenDelete(row)}>
                    <TrashSvg />
                  </IconButton>
                </Stack>
              ) : (
                <></>
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
    </Fragment>
  );
};

export default withTableRowWrapper(ProjectUserTableRow); 