import { FC, useState } from "react";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { SearchBox } from "src/components/molecules/SearchBox";
import { useNavigate } from "react-router";
import { useGetApiMyKubernetesClusterHostListQuery } from "src/app/services/api.generated";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { kubernetesTableStruct } from "src/components/organisms/kuberCluster/tables/struct";
import KubernetesTableRow from "src/components/organisms/kuberCluster/tables/KubernetesTableRow";
import { RefreshButton } from "src/components/atoms/RefreshButton";

const KubernetesList: FC = () => {
  const [search, setSearch] = useState("");

  const { data, isLoading,isFetching,refetch } = useGetApiMyKubernetesClusterHostListQuery();

  const filteredList =
    data?.filter((item) => {
      let result = null;
      if (item?.name) {
        result = item?.name.includes(search);
      }
      return result;
    }) || [];

  const navigate = useNavigate();

  const gotToAddKubernetes = () => navigate("/kubernetes-cluster/add");

  return (
    <>
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
            <Typography fontSize={18} color="secondary">
              لیست سرویس کلاستر کوبرنتیز
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
            onClick={gotToAddKubernetes}
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
                  sx={{ "& path": { stroke: "rgba(60, 138, 255, 1)" } }}
                />
              </Stack>
            }
          >
            ایجاد کلاستر کوبرنتیز
          </Button>
          </Stack>
        </Stack>
        <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
        <Box width="100%" sx={{ pt: 1.5 }}>
          <BaseTable
            struct={kubernetesTableStruct}
            RowComponent={KubernetesTableRow}
            rows={filteredList}
            text="در حال حاضر سرویس کوبرنتیزی وجود ندارد"
            isLoading={isLoading}
            initialOrder={9}
          />
        </Box>
      </Stack>
    </>
  );
};

export default KubernetesList;
