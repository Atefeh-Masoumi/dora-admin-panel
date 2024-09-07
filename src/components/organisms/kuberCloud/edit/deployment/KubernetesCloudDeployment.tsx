import { Add } from "@mui/icons-material";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useGetApiMyKubernetesCloudDeploymentListQuery } from "src/app/services/api.generated";
import { SearchBox } from "src/components/molecules/SearchBox";
import { KubernetesCloudAppTableRow } from "../../tables/KubernetesCloudAppTableRow";
import { kubernetesCloudAppTableStruct } from "../../tables/struct";

import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { BORDER_RADIUS_1 } from "src/configs/theme";

export const KubernetesCloudDeployment: FC = () => {
  const [search, setSearch] = useState("");

  const { data, isLoading } = useGetApiMyKubernetesCloudDeploymentListQuery();

  const filteredList =
    data?.filter((item) => {
      let result = null;
      if (item?.name) {
        result = item?.name.includes(search);
      }
      return result;
    }) || [];

  const navigate = useNavigate();
  const { kubernetesCloudId } = useParams();

  const gotToAddKubernetesCloudDeployment = () =>
    navigate(`/kubernetes-cloud/${kubernetesCloudId}/deployment/create`);

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
              لیست Deployment
            </Typography>
            <SearchBox
              onChange={(text) => setSearch(text)}
              placeholder="جستجو در نام سرویس"
            />
          </Stack>
          <Button
            onClick={gotToAddKubernetesCloudDeployment}
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
            ایجاد app
          </Button>
        </Stack>
        <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
        <Box width="100%" sx={{ pt: 1.5 }}>
          <BaseTable
            struct={kubernetesCloudAppTableStruct}
            RowComponent={KubernetesCloudAppTableRow}
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
