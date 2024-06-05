import { Button, Grid, Skeleton, Stack, Typography } from "@mui/material";
import {
  FC,
  Fragment,
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
  DnsListResponse,
  useDeleteApiMyDnsHostDeleteByIdMutation,
  useGetApiMyDnsHostListQuery,
} from "src/app/services/api.generated";
import { Add } from "src/components/atoms/svg-icons/AddSvg";
import { RefreshSvg } from "src/components/atoms/svg-icons/RefreshSvg";
import { EmptyTable } from "src/components/molecules/EmptyTable";
import { SearchBox } from "src/components/molecules/SearchBox";
import { DeleteCdnDialog } from "src/components/organisms/cdn/dialog/DeleteCdnDialog";
import { DomainCard } from "src/components/organisms/cdn/edit/DomainCard";
import { BORDER_RADIUS_1 } from "src/configs/theme";

// Define the type for your context value
type DataContextValueType = {
  refetchOnClick: () => any;
};

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

// Create the context
export const DataContext = createContext<DataContextValueType>({
  refetchOnClick: () => null,
});
const ZoneManagement: FC = () => {
  const [selectedCdn, setSelectedCdn] = useState<DnsListResponse | null>(null);
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const refetchOnClick = () => refetch();

  const {
    data: zoneList,
    isLoading: getDataLoading,
    refetch,
    isFetching,
  } = useGetApiMyDnsHostListQuery();

  const isLoading = useMemo(
    () => getDataLoading || isFetching,
    [getDataLoading, isFetching]
  );

  const createBtnOnClick = () => navigate("/cdn/add-domain");

  const filteredList = zoneList?.filter((zone) =>
    zone.zoneName?.includes(search)
  );

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

  const deleteBtnOnClick = (cdn: DnsListResponse) => {
    setSelectedCdn(cdn);
    setDialogType(DIALOG_TYPE_ENUM.DELETE);
  };

  const closeDialogHandler = () => {
    setDialogType(null);
    setSelectedCdn(null);
  };

  const [deleteCdn, { isLoading: deleteCdnLoading }] =
    useDeleteApiMyDnsHostDeleteByIdMutation();

  const deleteCdnHandler = () => {
    if (!selectedCdn?.id) return;
    deleteCdn({ id: selectedCdn.id })
      .unwrap()
      .then(() => {
        toast.success("پروژه مورد نظر با موفقیت حذف شد");
        closeDialogHandler();
      })
      .catch(() => {});
  };

  return (
    <DataContext.Provider value={{ refetchOnClick }}>
      <Fragment>
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
                لیست دامنه ها
              </Typography>
              {windowDimenion.winWidth >= 650 ? (
                <SearchBox
                  onChange={(text) => setSearch(text)}
                  placeholder="جستجو در نام دامنه"
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
                افزودن دامنه جدید
              </Button>
            </Stack>
          </Stack>
          {windowDimenion.winWidth < 650 ? (
            <SearchBox placeholder="جستجو در نام دامنه" />
          ) : (
            <></>
          )}
        </Stack>
        <Grid container>
          {isLoading ? (
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
          ) : zoneList?.length === 0 ? (
            <Stack py={3} sx={{ width: "100%" }}>
              <Stack bgcolor="white" borderRadius={3}>
                <EmptyTable text="دامنه ای وجود ندارد" />
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
                  lg={3.8}
                  mt={1}
                  mr={1}
                  mb={1}
                  sx={{ margin: "max-content" }}
                >
                  <DomainCard
                    key={item.id}
                    domainData={item}
                    onDeleteClick={deleteBtnOnClick}
                    itemOnClick={createBtnOnClick}
                    showStatus={false}
                    isDomainCard={true}
                    detailsList={[
                      {
                        id: item.zoneStatusId?.toString() ?? "",
                        label: item.zoneStatus ?? "",
                      },
                    ]}
                  />
                </Grid>
              );
            })
          )}
        </Grid>
        <DeleteCdnDialog
          open={dialogType === DIALOG_TYPE_ENUM.DELETE}
          onClose={closeDialogHandler}
          keyTitle="دامنه"
          subTitle="برای حذف دامنه موردنظر، عبارت امنیتی زیر را وارد کنید."
          securityPhrase={selectedCdn?.zoneName || ""}
          onSubmit={deleteCdnHandler}
          submitLoading={deleteCdnLoading}
        />
      </Fragment>
    </DataContext.Provider>
  );
};

export default ZoneManagement;
