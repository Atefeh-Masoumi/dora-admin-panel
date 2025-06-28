import { Add } from "@mui/icons-material";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { FC, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { SearchBox } from "src/components/molecules/SearchBox";
import StorageTableRow from "src/components/organisms/storage/tables/StorageTableRow";
import { storageTableStruct } from "src/components/organisms/storage/tables/struct";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { useGetApiMyStorageByProjectIdHostListQuery } from "src/app/services/api.generated";
import { RefreshButton } from "src/components/atoms/RefreshButton";

const StorageList: FC = () => {
  const [search, setSearch] = useState("");
  const { projectId } = useParams();
  const {
    data,
    isLoading: getDataLoading,
    isFetching,
    refetch
  } = useGetApiMyStorageByProjectIdHostListQuery({
    projectId: Number(projectId),
  });

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

  const createCloudOnClick = () => navigate("/storage/addStorageService");

  return (
    <Stack
      bgcolor="white"
      py={3}
      px={3}
      width="100%"
      borderRadius={BORDER_RADIUS_1}
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
          <Typography fontSize={18} color="rgba(110, 118, 138, 1)">
            لیست سرویس فضای ابری
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
            onClick={createCloudOnClick}
            variant="outlined"
            size="large"
            sx={{
              whiteSpace: "nowrap",
              px: 1.2,
              borderRadius: BORDER_RADIUS_1,
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
                  sx={{ "& path": { stroke: "#00a651" } }}
                />
              </Stack>
            }
          >
            ایجاد فضای ابری
          </Button>
        </Stack>
      </Stack>
      <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
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

export default StorageList;
