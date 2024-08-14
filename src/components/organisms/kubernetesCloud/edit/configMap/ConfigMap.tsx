import { Add } from "@mui/icons-material";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useParams } from "react-router";
import { useGetApiMyKubernetesCloudConfigmapListByIdQuery } from "src/app/services/api.generated";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { KubernetesCloudConfigMapTableRow } from "../../tables/KubernetesCloudConfigMapTableRow";
import { kubernetesCloudConfigMapTableStruct } from "../../tables/struct";
import { CreateConfigMapDialog } from "../../dialog/CreateConfigMapDialog";

type KubernetesCloudConfigMapPropsType = {};

export const KubernetesCloudConfigMap: FC<
  KubernetesCloudConfigMapPropsType
> = () => {
  const [openAddConfigMapDialog, setOpenAddConfigMapDialog] =
    useState<boolean>(false);
  const { id: kubernetesCloudId } = useParams();

  const { data = [], isLoading } =
    useGetApiMyKubernetesCloudConfigmapListByIdQuery(
      {
        id: Number(kubernetesCloudId) || 0,
      },
      { skip: !kubernetesCloudId }
    );

  function handleOpenAddConfigMapDialog() {
    setOpenAddConfigMapDialog(true);
  }

  function handleCloseAddConfigMapDialog() {
    setOpenAddConfigMapDialog(false);
  }

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
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        rowGap={3}
      >
        <Typography fontSize={18} color="secondary">
          لیست Config Map
        </Typography>
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
          افزودن Config Map
        </Button>
      </Stack>
      <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
      <Box width="100%" sx={{ pt: 1.5 }}>
        <BaseTable
          struct={kubernetesCloudConfigMapTableStruct}
          RowComponent={KubernetesCloudConfigMapTableRow}
          rows={data}
          text="در حال حاضر Config Map وجود ندارد"
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
