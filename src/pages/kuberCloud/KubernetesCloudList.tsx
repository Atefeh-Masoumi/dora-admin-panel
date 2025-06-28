import { Add } from "@mui/icons-material";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useGetApiMyKubernetesCloudByProjectIdHostListQuery } from "src/app/services/api.generated";
import { SearchBox } from "src/components/molecules/SearchBox";
import KubernetesCloudTableRow from "src/components/organisms/kubernetesCloud/tables/KubernetesCloudTableRow";
import { kubernetesCloudTableStruct } from "src/components/organisms/kubernetesCloud/tables/struct";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { RefreshButton } from "src/components/atoms/RefreshButton";

const KubernetesCloudList: FC = () => {
  const [search, setSearch] = useState("");
  const { projectId } = useParams();
  const { data, isLoading,isFetching,refetch } = useGetApiMyKubernetesCloudByProjectIdHostListQuery({ projectId: Number(projectId) });

  const filteredList =
    data?.filter((item) => {
      let result = null;
      if (item?.name) {
        result = item?.name.includes(search);
      }
      return result;
    }) || [];

  const navigate = useNavigate();

  const gotToAddKubernetes = () => navigate(`/kubernetes-cloud/${projectId}/add`);

  return (
    <>
      <Stack
        p={3}
        mb={3}
        bgcolor="warning.main"
        direction="row"
        gap={1}
        borderRadius={BORDER_RADIUS_1}
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
              لیست کوبرنتیز ابری
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
                  sx={{ "& path": { stroke: "#00a651" } }}
                />
              </Stack>
            }
          >
            ایجاد کوبرنتیز ابری
          </Button>
          </Stack>
        </Stack>
        <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
        <Box width="100%" sx={{ pt: 1.5 }}>
          <BaseTable
            struct={kubernetesCloudTableStruct}
            RowComponent={KubernetesCloudTableRow}
            rows={filteredList.reverse()}
            text="در حال حاضر سرویس کوبرنتیزی وجود ندارد"
            isLoading={isLoading}
            initialOrder={9}
          />
        </Box>
      </Stack>
    </>
  );
};

export default KubernetesCloudList;
