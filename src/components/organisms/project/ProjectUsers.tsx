import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { Add } from "src/components/atoms/svg-icons/AddSvg";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { CreateProjectUserDialog } from "./create/CreateProjectUserDialog";
import { projectUserTableStruct } from "./table/struct";
import ProjectUserTableRow from "./table/ProjectUserTableRow";
import {
  useGetApiMyByProjectIdUserListQuery,
  ProjectUserListResponse,
} from "src/app/services/api.generated";

type ProjectUsersPropsType = {};

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

export const ProjectUsers: FC<ProjectUsersPropsType> = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  useState<ProjectUserListResponse | null>(null);

  const { projectId } = useParams();
  const { data: userList = [], isLoading: getUserListLoading, refetch} =
  useGetApiMyByProjectIdUserListQuery(
      { projectId: Number(projectId) },
      { skip: !projectId }
    );
  console.log(userList);
  const openCreateDialogHandler = () => {
    setShowCreateDialog(true);
  };
  
  const closeDialogHandler = () => {
    setDialogType(null);
    setShowCreateDialog(false);
  };

  return (
    <>
      <Typography
        color="grey.700"
        fontSize={24}
        fontWeight={700}
        sx={{ mb: 2 }}
      >
        کاربران پروژه
      </Typography>
      <Paper
        elevation={0}
        sx={{ overflow: "hidden", px: { xs: 2, sm: 3, md: 4, lg: 5 }, py: 5 }}
      >
        <Stack
          pb={2}
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent="end"
          gap={1}
        >
          <Stack direction={{ xs: "column", sm: "row" }} gap={1}>
            <Button
              onClick={openCreateDialogHandler}
              variant="outlined"
              startIcon={
                <Add sx={{ "& path": { stroke: "#00a651" } }} />
              }
            >
              افزودن کاربر
            </Button>
          </Stack>
        </Stack>
        <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
        <Stack>
          <BaseTable
            struct={projectUserTableStruct}
            RowComponent={ProjectUserTableRow}
            rows={userList}
            text="در حال حاضر کاربری وجود ندارد"
            isLoading={getUserListLoading}
            initialOrder={2}
          />
        </Stack>
      </Paper>
      <CreateProjectUserDialog
        maxWidth="xs"
        fullWidth
        open={showCreateDialog}
        onClose={closeDialogHandler}
        forceClose={closeDialogHandler}
        refetch={refetch}
      />
    </>
  );
}; 