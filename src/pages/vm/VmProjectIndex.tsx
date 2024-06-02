import { Add } from "@mui/icons-material";
import { Button, Grid, Skeleton, Stack, Typography } from "@mui/material";
import { FC, Fragment, useEffect, useState } from "react";
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
import { BORDER_RADIUS_1 } from "src/configs/theme";

const vmDataList = [{ label: "نوع زیرساخت:", id: "hypervisorType" }];

type VmProjectIndexPropsType = any;

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

const AVmProjectIndex: FC<VmProjectIndexPropsType> = () => {
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
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
      .catch(() => {});
  };

  const cardOnClick = (project: VmProjectListResponse) => {
    navigate(`/vm/${project.id}/list`);
  };

  return (
    <>
      <Fragment>
        {/* <Stack
          p={2.5}
          mb={1}
          bgcolor="warning.main"
          direction="row"
          spacing={1}
          borderRadius={BORDER_RADIUS_1}
          width="100%"
          color="white"
          alignItems={{ xs: "start", md: "center" }}
        >
          <ErrorOutlineOutlinedIcon />
          <Typography variant="text14">
            استفاده از ترافیک غیرمجاز پیگرد قانونی دارد.
          </Typography>
        </Stack> */}

        <Stack
          borderRadius={BORDER_RADIUS_1}
          bgcolor="white"
          p={{ xs: 1.8, lg: 3 }}
        >
          <Stack
            direction="row"
            spacing={1}
            justifyContent="space-between"
            alignItems="center"
            px={{ xs: 2, md: 2 }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography
                variant="text1"
                color="rgba(110, 118, 138, 1)"
                whiteSpace="nowrap"
              >
                لیست پروژه‌ها
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
                  borderRadius: BORDER_RADIUS_1,
                }}
                startIcon={<RefreshSvg sx={{ width: 20, height: 20 }} />}
              >
                بازخوانی
              </Button>
              <Button
                variant="outlined"
                onClick={createBtnOnClick}
                size="large"
                sx={{
                  whiteSpace: "nowrap",
                  px: 1.2,
                  borderRadius: BORDER_RADIUS_1,
                }}
                startIcon={
                  <Add sx={{ "& path": { stroke: "rgba(60, 138, 255, 1)" } }} />
                }
              >
                افزودن پروژه جدید
              </Button>
            </Stack>
          </Stack>
        </Stack>

        <Grid container>
          {VmProjectListLoading ? (
            <Fragment>
              {[...Array(12)].map((_, index) => (
                <Grid
                  key={index}
                  item
                  xs={12}
                  sm={5.8}
                  lg={3.8}
                  sx={{ margin: "10px auto" }}
                >
                  <Skeleton
                    variant="rectangular"
                    height={100}
                    sx={{
                      bgcolor: "secondary.light",
                      borderRadius: BORDER_RADIUS_1,
                    }}
                  />
                </Grid>
              ))}
            </Fragment>
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
                  py={2}
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
      </Fragment>
    </>
  );
};

export default AVmProjectIndex;
