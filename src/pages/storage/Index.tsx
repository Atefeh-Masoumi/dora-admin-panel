import { FC, useState, useMemo } from "react";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { BORDER_RADIUS_1, BORDER_RADIUS_5 } from "src/configs/theme";
import { useNavigate } from "react-router";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { RefreshSvg } from "src/components/atoms/svg/RefreshSvg";
import { SearchBox } from "src/components/molecules/SearchBox";
import { StorageTableRow } from "src/components/organisms/storage/tables/StorageTableRow";
import { storageTableStruct } from "src/components/organisms/storage/tables/struct";
import { useGetPortalStorageStorageHostListQuery } from "src/app/services/api.generated";

type StorageManagementPropsType = {};

const StorageManagement: FC<StorageManagementPropsType> = () => {
  const [search, setSearch] = useState("");

  const {
    data,
    isLoading: getDataLoading,
    refetch,
    isFetching,
  } = useGetPortalStorageStorageHostListQuery();

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
  const createCloudOnClick = () => navigate("/storage/addStorageService");

  return (
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
                  border: ({ palette }) => "1px solid " + palette.primary.main,
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
            فضای ابری جدید
          </Button>
        </Stack>
      </Stack>
      <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
      <Stack
        p={2.5}
        bgcolor="rgba(244, 95, 80, 1)"
        direction="row"
        spacing={3}
        borderRadius={2}
        width="100%"
        color="white"
        alignItems={{ xs: "start", md: "center" }}
      >
        {/* <ErrorOutlineIcon /> */}
        <Typography variant="text14">این سرویس نسخه بتا می باشد.</Typography>
      </Stack>

      <Box width="100%" sx={{ pt: 1.5 }}>
        <BaseTable
          struct={storageTableStruct}
          RowComponent={StorageTableRow}
          rows={filteredList}
          text="در حال حاضر سرویسی وجود ندارد"
          isLoading={isLoading}
          initialOrder={9}
        />
      </Box>
    </Stack>
  );
};

export default StorageManagement;
