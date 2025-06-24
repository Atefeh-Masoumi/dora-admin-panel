import { Add } from "@mui/icons-material";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useGetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdIngressListQuery } from "src/app/services/api.generated";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { kubernetesCloudIngressTableStruct } from "../../tables/struct";
import { AddIngressDialog } from "../../dialog/AddIngressDialog";
import { useParams } from "react-router-dom";
import { KubernetesCloudIngressTableRow } from "../../tables/KubernetesCloudIngressTableRow";

type KubernetesCloudIngressPropsType = {};

export const KubernetesCloudIngress: FC<
  KubernetesCloudIngressPropsType
> = () => {
  const [openAddIngressDialog, setOpenAddIngressDialog] =
    useState<boolean>(false);

  const { kubernetesCloudId ,projectId} = useParams();

  const { data = [], isLoading } =
  useGetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdIngressListQuery({
    projectId: Number(projectId),
    kuberHostId: Number(kubernetesCloudId) || 0,
    });

  function handleOpenAddIngressDialog() {
    setOpenAddIngressDialog(true);
  }

  function handleCloseAddIngressDialog() {
    setOpenAddIngressDialog(false);
  }

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
            لیست اینگرس
          </Typography>
        </Stack>
        <Button
          onClick={handleOpenAddIngressDialog}
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
          struct={kubernetesCloudIngressTableStruct}
          RowComponent={KubernetesCloudIngressTableRow}
          rows={data}
          text="در حال حاضر سرویسی وجود ندارد"
          isLoading={isLoading}
          initialOrder={9}
        />
      </Box>
      <AddIngressDialog
        maxWidth="sm"
        open={openAddIngressDialog}
        onClose={handleCloseAddIngressDialog}
      />
    </Stack>
  );
};
