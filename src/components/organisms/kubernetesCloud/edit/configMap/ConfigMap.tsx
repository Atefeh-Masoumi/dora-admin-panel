import { Add } from "@mui/icons-material";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { CreateConfigMapDialog } from "../../dialog/CreateConfigMapDialog";
import { KubernetesCloudConfigMapTableRow } from "../../tables/KubernetesCloudConfigMapTableRow";
import { kubernetesCloudConfigMapTableStruct } from "../../tables/struct";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { SearchBox } from "src/components/molecules/SearchBox";
import { useGetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdConfigmapListQuery } from "src/app/services/api.generated";
import { RefreshButton } from "src/components/atoms/RefreshButton";

type KubernetesCloudConfigMapPropsType = {};

export const KubernetesCloudConfigMap: FC<
  KubernetesCloudConfigMapPropsType
> = () => {
  const [search, setSearch] = useState("");
  const [openAddConfigMapDialog, setOpenAddConfigMapDialog] =
    useState<boolean>(false);
  const { kubernetesCloudId, projectId } = useParams();

  const { data = [], isLoading, refetch, isFetching } =useGetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdConfigmapListQuery(
      { projectId: Number(projectId),
        kuberHostId: Number(kubernetesCloudId) || 0,
      },
      { skip: !kubernetesCloudId }
    );

  function handleOpenAddConfigMapDialog() {
    setOpenAddConfigMapDialog(true);
  }

  function handleCloseAddConfigMapDialog() {
    setOpenAddConfigMapDialog(false);
  }

  const filteredList =
    data?.filter((item) => {
      let result = null;
      if (item?.name) {
        result = item.name.toLowerCase().includes(search.toLowerCase());
      }
      return result;
    }) || [];

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
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Typography fontSize={18} color="secondary">
              لیست کانفیگ‌مپ
            </Typography>
            <RefreshButton isFetching={isFetching} refetchData={refetch} />
          </Stack>
        
        </Stack>
        <Button
          onClick={handleOpenAddConfigMapDialog}
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
             
            >
              <Add />
            </Stack>
          }
        >
          افزودن
        </Button>
      </Stack>

      <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
      <Box width="100%" sx={{ pt: 1.5 }}>
        <BaseTable
          struct={kubernetesCloudConfigMapTableStruct}
          RowComponent={KubernetesCloudConfigMapTableRow}
          rows={filteredList}
          text="در حال حاضر سرویسی وجود ندارد"
          isLoading={isLoading}
          initialOrder={9}
        />
      </Box>
      <CreateConfigMapDialog
        openDialog={openAddConfigMapDialog}
        onClose={handleCloseAddConfigMapDialog}
      />
    </Stack>
  );
};
