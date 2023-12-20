import {
  FC,
  useState,
  useEffect,
  Fragment,
  useMemo,
  createContext,
} from "react";
import { Button, Grid, Skeleton, Stack, Typography } from "@mui/material";
import { SearchBox } from "src/components/molecules/SearchBox";
import { Add } from "src/components/atoms/svg/AddSvg";
import { EmptyTable } from "src/components/molecules/EmptyTable";
import { RefreshSvg } from "src/components/atoms/svg/RefreshSvg";
import { BORDER_RADIUS_5 } from "src/configs/theme";
import { VmProjectCard } from "src/components/organisms/vm/edit/ProjectCard";
import { useGetApiVmProjectListQuery } from "src/app/services/api.generated";
import { AddProjectDialog } from "src/components/organisms/vm/projects/AddProjectDialog";

// Define the type for your context value
type DataContextValueType = {
  refetchOnClick: () => any;
};

// Create the context
export const DataContext = createContext<DataContextValueType>({
  refetchOnClick: () => null,
});

const VmManagement: FC = () => {
  const [openAddProjectDialog, setOpenAddProjectDialog] = useState(false);

  const {
    data: zoneList,
    isLoading: getDataLoading,
    refetch,
    isFetching,
  } = useGetApiVmProjectListQuery();

  const isLoading = useMemo(
    () => getDataLoading || isFetching,
    [getDataLoading, isFetching]
  );

  const refetchOnClick = () => refetch();

  const [search, setSearch] = useState("");

  const filteredList = zoneList?.filter((zone) => zone.name?.includes(search));

  const [windowDimenion, detectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  });

  const detectSize = () => {
    detectHW({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [windowDimenion]);

  const openAddProjectDialogHandler = () => {
    setOpenAddProjectDialog(true);
  };
  const closeAddProjectDialogHandler = () => {
    setOpenAddProjectDialog(false);
  };

  return (
    <DataContext.Provider value={{ refetchOnClick }}>
      <Fragment>
        <Stack borderRadius={2} bgcolor="white" p={{ xs: 1.8, lg: 3 }}>
          <Stack
            direction="row"
            spacing={1}
            justifyContent="space-between"
            alignItems="center"
            px={{ xs: 2, md: 2 }}
            sx={{
              paddingBottom: windowDimenion.winWidth < 650 ? "10px" : "0",
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography
                variant="text1"
                color="rgba(110, 118, 138, 1)"
                whiteSpace="nowrap"
              >
                لیست پروژه ها
              </Typography>
              {windowDimenion.winWidth >= 650 ? (
                <SearchBox
                  onChange={(text) => setSearch(text)}
                  placeholder="جستجو در نام پروژه"
                />
              ) : (
                <></>
              )}
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
                variant="outlined"
                onClick={openAddProjectDialogHandler}
                size="large"
                sx={{
                  whiteSpace: "nowrap",
                  px: 1.2,
                  borderRadius: BORDER_RADIUS_5,
                }}
                startIcon={
                  <Add sx={{ "& path": { stroke: "rgba(60, 138, 255, 1)" } }} />
                }
              >
                پروژه جدید
              </Button>
            </Stack>
          </Stack>
          {windowDimenion.winWidth < 650 ? (
            <SearchBox placeholder="جستجو در نام پروژه" />
          ) : (
            <></>
          )}
        </Stack>
        {filteredList && filteredList?.length <= 0 && (
          <Stack py={3}>
            <Stack bgcolor="white" borderRadius={3}>
              <EmptyTable text="پروژه ای وجود ندارد" />
            </Stack>
          </Stack>
        )}
        <Grid container justifyContent="end" spacing={3} py={3}>
          {isLoading ? (
            <Fragment>
              {[...Array(12)].map((_, index) => (
                <Grid key={index} item xs={12} sm={6} md={6} lg={4}>
                  <Skeleton
                    variant="rectangular"
                    height={125}
                    sx={{ bgcolor: "secondary.light", borderRadius: 2 }}
                  />
                </Grid>
              ))}
            </Fragment>
          ) : (
            <Fragment>
              {filteredList?.map((item, index) => (
                <Grid key={index} item xs={12} sm={6} md={6} lg={4}>
                  <VmProjectCard vmItem={item} />
                </Grid>
              ))}
            </Fragment>
          )}
        </Grid>
        <AddProjectDialog
          open={openAddProjectDialog}
          onClose={closeAddProjectDialogHandler}
        />
      </Fragment>
    </DataContext.Provider>
  );
};

export default VmManagement;
