import { Add } from "@mui/icons-material";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
  VmProjectListResponse,
  useDeleteApiMyVmProjectDeleteByIdMutation,
  useGetApiMyVmProjectListQuery,
} from "src/app/services/api.generated";
import { RefreshSvg } from "src/components/atoms/svg-icons/RefreshSvg";
import { EmptyTable } from "src/components/molecules/EmptyTable";
import { AddProjectCard } from "src/components/organisms/vm/add/AddProjectCard";
import { CreateVmProjectDialog } from "src/components/organisms/vm/dialogs/CreateVmProjectDialog";
import { DeleteVmProjectDialog } from "src/components/organisms/vm/dialogs/DeleteVmProjectDialog";
import { BORDER_RADIUS_1, BORDER_RADIUS_5 } from "src/configs/theme";

const vmDataList = [{ label: "نوع زیرساخت:", id: "hypervisorType" }];

type vmProjectPropsType = any;

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

const AddVmProject: FC<vmProjectPropsType> = () => {
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [openCreateVmProjectDialog, setOpenCreateVkmProjectDialog] =
    useState(false);
  const [openDeleteVmProjectDialog, setOpenDeleteVmProjectDialog] =
    useState(false);
  const [selectedProject, setSelectedProject] =
    useState<VmProjectListResponse | null>(null);

  const navigate = useNavigate();

  const {
    data: vmProjectList,
    isLoading: VmProjectListLoading,
    refetch,
  } = useGetApiMyVmProjectListQuery();

  const [deleteProject, { isLoading: deleteProjectLoading }] =
    useDeleteApiMyVmProjectDeleteByIdMutation();

  useEffect(() => {
    const getNotifInterval = setInterval(() => {
      refetch();
    }, 120 * 1000);
    return () => {
      clearInterval(getNotifInterval);
    };
  }, [refetch]);

  const createBtnOnClick = () => {
    setDialogType(DIALOG_TYPE_ENUM.CREATE);
    setOpenCreateVkmProjectDialog(true);
  };

  const editBtnOnClick = (project: VmProjectListResponse) => {
    setSelectedProject(project);
    setDialogType(DIALOG_TYPE_ENUM.CREATE);
  };

  const deleteBtnOnClick = (project: VmProjectListResponse) => {
    setSelectedProject(project);
    setDialogType(DIALOG_TYPE_ENUM.DELETE);
  };

  const closeDialogHandler = () => {
    setDialogType(null);
    setSelectedProject(null);
  };

  const refetchOnClick = () => refetch();

  const deleteProjectHandler = () => {
    if (!selectedProject?.id) return;
    deleteProject({ id: selectedProject.id })
      .unwrap()
      .then(() => {
        toast.success("پروژه مورد نظر با موفقیت حذف شد");
        closeDialogHandler();
      })
      .catch((err) => {});
  };

  const cardOnClick = (project: VmProjectListResponse) => {
    navigate(`/vm/${project.id}/list`);
  };

  return (
    <>
      <Stack
        p={3}
        mb={3}
        bgcolor="warning.main"
        direction="row"
        gap={1}
        borderRadius={2}
        width="100%"
        color="white"
        alignItems={{ xs: "start", md: "center" }}
      >
        <ErrorOutlineOutlinedIcon />
        <Typography>توجه:</Typography>
        <Typography
          fontSize={14}
          sx={{
            opacity: 0.9,
          }}
        >
          استفاده از ترافیک ممنوعه پیگرد قانونی دارد.
          <br />
        </Typography>
      </Stack>
      <Stack
        bgcolor="white"
        py={3}
        px={3}
        width="100%"
        borderRadius={3}
        direction="column"
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
          rowGap={3}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems="center"
            spacing={2}
          >
            <Typography fontSize={18} color="secondary">
              لیست سرویس فضای ابری
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Button
              onClick={refetchOnClick}
              variant="outlined"
              size="large"
              sx={{
                whiteSpace: "nowrap",
                px: 1.2,
                borderRadius: BORDER_RADIUS_5,
              }}
              startIcon={<RefreshSvg sx={{ width: 20, height: 20 }} />}
            >
              بازخوانی
            </Button>
            <Button
              onClick={createBtnOnClick}
              variant="outlined"
              size="large"
              sx={{
                whiteSpace: "nowrap",
                px: 1.2,
                borderRadius: BORDER_RADIUS_5,
              }}
              startIcon={
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    width: 24,
                    height: 24,
                    border: ({ palette }) =>
                      "1px solid " + palette.primary.main,
                    borderRadius: BORDER_RADIUS_1,
                  }}
                >
                  <Add
                    fontSize="small"
                    sx={{ "& path": { stroke: "rgba(60, 138, 255, 1)" } }}
                  />
                </Stack>
              }
            >
              افزودن پروژه
            </Button>
          </Stack>
        </Stack>
        {/* <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} /> */}
      </Stack>
      <Grid container>
        {VmProjectListLoading ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : vmProjectList?.length === 0 ? (
          <Stack py={3} sx={{ width: "100%" }}>
            <Stack bgcolor="white" borderRadius={3}>
              <EmptyTable text="پروژه‌ای وجود ندارد" />
            </Stack>
          </Stack>
        ) : (
          vmProjectList?.map((item) => {
            return (
              <Grid
                sx={{ minWidth: "max-content" }}
                item
                key={item.id}
                xs={12}
                md={6}
                lg={4}
                p={2}
              >
                <AddProjectCard
                  key={item.id}
                  vmProjectData={item}
                  onEditClick={editBtnOnClick}
                  onDeleteClick={deleteBtnOnClick}
                  itemOnClick={cardOnClick}
                  detailsList={vmDataList}
                  showStatus={false}
                  isProjectCard={true}
                />
              </Grid>
            );
          })
        )}
      </Grid>
      <CreateVmProjectDialog
        open={dialogType === DIALOG_TYPE_ENUM.CREATE}
        onClose={closeDialogHandler}
        projectId={selectedProject?.id}
        name={selectedProject?.name}
      />
      <DeleteVmProjectDialog
        open={dialogType === DIALOG_TYPE_ENUM.DELETE}
        onClose={closeDialogHandler}
        keyTitle="پروژه"
        subTitle="برای حذف پروژه موردنظر، عبارت امنیتی زیر را وارد کنید."
        securityPhrase={selectedProject?.name || ""}
        onSubmit={deleteProjectHandler}
        submitLoading={deleteProjectLoading}
      />
    </>
  );
};

export default AddVmProject;
