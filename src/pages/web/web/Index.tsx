import { FC, useState, useMemo, createContext } from "react";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { BORDER_RADIUS_1, BORDER_RADIUS_5 } from "src/configs/theme";
import { useNavigate } from "react-router";
import { RefreshSvg } from "src/components/atoms/svg-icons/RefreshSvg";
import { SearchBox } from "src/components/molecules/SearchBox";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { WebTableRow } from "src/components/organisms/web/web/tables/WebTableRow";
import { webTableStruct } from "src/components/organisms/web/web/tables/struct";
import { useGetApiMyWebHostListQuery } from "src/app/services/api.generated";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

// Define the type for your context value
type DataContextValueType = {
  refetchOnClick: () => any;
};

// Create the context
export const DataContext = createContext<DataContextValueType>({
  refetchOnClick: () => null,
});

type WebManagementPropsType = {};

const WebManagement: FC<WebManagementPropsType> = () => {
  const [search, setSearch] = useState("");

  const {
    data,
    isLoading: getDataLoading,
    refetch,
    isFetching,
  } = useGetApiMyWebHostListQuery();

  const isLoading = useMemo(
    () => getDataLoading || isFetching,
    [getDataLoading, isFetching]
  );

  const filteredList =
    data?.filter((item) => {
      let result = null;
      if (item?.domainName) {
        result = item?.domainName.includes(search);
      }
      return result;
    }) || [];

  const navigate = useNavigate();

  const refetchOnClick = () => refetch();
  const createCloudOnClick = () => navigate("/web/addWeb");

  return (
    <DataContext.Provider value={{ refetchOnClick }}>
      <Stack
        bgcolor="white"
        py={3}
        px={3}
        width="100%"
        borderRadius={3}
        direction="column"
      >
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
              لیست سرویس هاستینگ ابری
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
              سرویس هاستینگ جدید
            </Button>
          </Stack>
        </Stack>
        <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
        <Box width="100%" sx={{ pt: 1.5 }}>
          <BaseTable
            struct={webTableStruct}
            RowComponent={WebTableRow}
            rows={filteredList}
            text="در حال حاضر سرویسی وجود ندارد"
            isLoading={isLoading}
            initialOrder={9}
          />
        </Box>
      </Stack>
    </DataContext.Provider>
  );
};

export default WebManagement;
