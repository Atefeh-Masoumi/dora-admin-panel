import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Typography
} from "@mui/material";
import { FC, useState } from "react";
import { useParams } from "react-router";
import { useGetApiMyKubernetesCloudConfigmapListByNamespaceIdQuery } from "src/app/services/api.generated";
import { DorsaTableCell, DorsaTableRow } from "src/components/atoms/DorsaTable";
import { EmptyTable } from "src/components/molecules/EmptyTable";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { CreateConfigMapDialog } from "../../dialog/CreateConfigMapDialog";
import { KubernetesCloudConfigMapTableRow } from "../../tables/KubernetesCloudConfigMapTableRow";
import { kubernetesCloudConfigMapTableStruct } from "../../tables/struct";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { SearchBox } from "src/components/molecules/SearchBox";

type KubernetesCloudConfigMapPropsType = {};

export const KubernetesCloudConfigMap: FC<
  KubernetesCloudConfigMapPropsType
> = () => {
  const [search, setSearch] = useState("");
  const [openAddConfigMapDialog, setOpenAddConfigMapDialog] =
    useState<boolean>(false);
  const { kubernetesCloudId } = useParams();

  const { data = [], isLoading } =
    useGetApiMyKubernetesCloudConfigmapListByNamespaceIdQuery(
      {
        namespaceId: Number(kubernetesCloudId) || 0,
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
          <Typography fontSize={18} color="secondary">
            لیست کانفیگ‌مپ
          </Typography>
          <SearchBox
            onChange={(text) => setSearch(text)}
            placeholder="جستجو در نام سرویس"
          />
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
