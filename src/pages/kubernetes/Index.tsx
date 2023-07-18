import { FC, useState, useMemo, Fragment, createContext } from "react";
import { useGetPortalKubeWorkspaceListQuery } from "src/app/services/api.generated";
import {
  Button,
  Divider,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { BORDER_RADIUS_1, BORDER_RADIUS_5 } from "src/configs/theme";
import { RefreshSvg } from "src/components/atoms/svg/RefreshSvg";
import { SearchBox } from "src/components/molecules/SearchBox";
import { useNavigate } from "react-router";
import { DomainCard } from "src/components/organisms/kubernetes/DomainCard";
import { EmptyTable } from "src/components/molecules/EmptyTable";

// Define the type for your context value
type DomainContextValueType = {
  refetchOnClick: () => any;
};

// Create the context
export const DomainContext = createContext<DomainContextValueType>({
  refetchOnClick: () => null,
});

type NamespaceManagementPropsType = {};

const NamespaceManagement: FC<NamespaceManagementPropsType> = () => {
  const [search, setSearch] = useState("");

  const {
    data,
    isLoading: getDataLoading,
    refetch,
    isFetching,
  } = useGetPortalKubeWorkspaceListQuery();

  const isLoading = useMemo(
    () => getDataLoading || isFetching,
    [getDataLoading, isFetching]
  );

  const filteredList =
    data?.filter((item) => {
      let result = null;
      if (item?.name) {
        result = item?.name.includes(search);
      }
      return result;
    }) || [];

  const navigate = useNavigate();

  const refetchOnClick = () => refetch();
  const createCloudOnClick = () => navigate("/kubernetes/add-kubernetes");

  return (
    <DomainContext.Provider value={{ refetchOnClick }}>
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
              لیست سرویس کوبرنتیز ابری
            </Typography>
            <SearchBox
              onChange={(text) => setSearch(text)}
              placeholder="جستجو در نام سرویس"
            />
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
              onClick={createCloudOnClick}
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
              سرویس کوبرنتیز جدید
            </Button>
          </Stack>
        </Stack>
        <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
        <Stack
          py={3}
          px={3}
          bgcolor="rgba(244, 95, 80, 1)"
          direction="row"
          spacing={3}
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
            این سرویس نسخه آزمایشی می باشد.
            <br />
          </Typography>
        </Stack>
        {/* <Box width="100%" sx={{ pt: 1.5 }}>
          <BaseTable
            struct={namespaceTableStruct}
            RowComponent={NamespaceTableRow}
            rows={filteredList}
            text="در حال حاضر سرویسی وجود ندارد"
            isLoading={isLoading}
            initialOrder={9}
          />
        </Box> */}
      </Stack>
      <Stack py={3} px={3} width="100%" borderRadius={3} direction="column">
        {filteredList && filteredList?.length <= 0 && (
          <Stack py={3}>
            <Stack bgcolor="white" borderRadius={3}>
              <EmptyTable text=" سرویس کوبرنتیز وجود ندارد" />
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
                  <DomainCard item={item} />
                </Grid>
              ))}
            </Fragment>
          )}
        </Grid>
      </Stack>
    </DomainContext.Provider>
  );
};

export default NamespaceManagement;
