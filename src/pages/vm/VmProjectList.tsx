import { Add } from "@mui/icons-material";
import {
  Button,
  Divider,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { FC, Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { DeleteDialog } from "src/components/molecules/DeleteDialog";
import { EmptyTable } from "src/components/molecules/EmptyTable";
import { CreateVmProjectDialog } from "src/components/organisms/vm/dialogs/CreateVmProjectDialog";
import { VmProjectCard } from "src/components/organisms/vm/project/VmProjectCard";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import {
  VmProjectListResponse,
  useDeleteApiMyHostProjectDeleteByIdMutation,
  useGetApiMyHostProjectListQuery,
} from "src/app/services/api.generated";
import { RefreshButton } from "src/components/atoms/RefreshButton";
import { SearchBox } from "src/components/molecules/SearchBox";

const vmDataList = [
  { label: "زیرساخت:", id: "hypervisorType" },
  { label: "مرکز داده:", id: "datacenter" },
];

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

const VmProjectList: FC = () => {
  const [search, setSearch] = useState("");
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [selectedProject, setSelectedProject] =
    useState<VmProjectListResponse | null>(null);

  const navigate = useNavigate();

  const {
    data: vmProjectList,
    isLoading: VmProjectListLoading,
    isFetching,
    refetch,
  } = useGetApiMyHostProjectListQuery();

  const filteredList =
    vmProjectList?.filter((item) => {
      let result = null;
      if (item?.name) {
        result = item?.name.includes(search);
      }
      return result;
    }) || [];
  const [deleteProject, { isLoading: deleteProjectLoading }] =
    useDeleteApiMyHostProjectDeleteByIdMutation();

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
              <RefreshButton isFetching={isFetching} refetchData={refetch} />
            </Stack>
            <Stack 
             direction={{ xs: "column", sm: "row" }}
             alignItems="center"
             spacing={2}
           >
               <SearchBox
                    onChange={(text) => setSearch(text)}
                    placeholder="جستجو در نام سرویس"
                  />
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
                افزودن پروژه
              </Button>
            </Stack>
          </Stack>
          <Divider sx={{ margin: "20px 0" }} />
          <Grid container columnSpacing={1}>
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
            ) : filteredList?.length === 0 ? (
              <Stack py={3} sx={{ width: "100%" }}>
                <Stack bgcolor="white" borderRadius={3}>
                  <EmptyTable text="در حال حاضر پروژه‌ای وجود ندارد" />
                </Stack>
              </Stack>
            ) : (
              filteredList?.map((item) => {
                return (
                  <Grid
                    key={item.id}
                    item
                    xs={12}
                    sm={5.8}
                    lg={4}
                    mt={1}
                    mb={1}
                    sx={{
                      margin: "max-content",
                      borderRadius: BORDER_RADIUS_1,
                    }}
                  >
                    <VmProjectCard
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
        </Stack>
        <CreateVmProjectDialog
          open={dialogType === DIALOG_TYPE_ENUM.CREATE}
          onClose={closeDialogHandler}
          projectId={selectedProject?.id}
          name={selectedProject?.name}
        />
        <DeleteDialog
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

export default VmProjectList;
