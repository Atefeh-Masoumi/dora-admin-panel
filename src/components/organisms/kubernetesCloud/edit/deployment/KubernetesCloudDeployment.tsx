import { Add } from "@mui/icons-material";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useGetApiMyKubernetesCloudDeploymentListByNamespaceIdQuery } from "src/app/services/api.generated";
import { SearchBox } from "src/components/molecules/SearchBox";
import { kubernetesCloudDeploymentTableStruct } from "../../tables/struct";

import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { KubernetesCloudDeploymentTableRow } from "../../tables/KubernetesCloudDeploymentTableRow";

export const KubernetesCloudDeployment: FC = () => {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const { kubernetesCloudId } = useParams();

  const { data, isLoading } =
    useGetApiMyKubernetesCloudDeploymentListByNamespaceIdQuery({
      namespaceId: Number(kubernetesCloudId),
    });

  const filteredList =
    data?.filter((item) => {
      let result = null;
      if (item?.name) {
        result = item.name.toLowerCase().includes(search.toLowerCase());
      }
      return result;
    }) || [];

  const gotToAddKubernetesCloudDeployment = () =>
    navigate(`/kubernetes-cloud/${kubernetesCloudId}/deployment/add`);

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
              لیست دپلویمنت
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
                  sx={{ "& path": { stroke: "#00a651" } }}
                />
              </Stack>
            }
          >
           افزودن
          </Button>
        </Stack>
        <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
        <Box width="100%" sx={{ pt: 1.5 }}>
          <BaseTable
            struct={kubernetesCloudDeploymentTableStruct}
            RowComponent={KubernetesCloudDeploymentTableRow}
            rows={filteredList}
            text="در حال حاضر سرویسی وجود ندارد"
            isLoading={isLoading}
            initialOrder={9}
          />
        </Box>
      </Stack>
    </>
  );
};
