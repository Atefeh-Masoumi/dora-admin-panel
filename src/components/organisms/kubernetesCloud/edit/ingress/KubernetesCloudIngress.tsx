import { Add } from "@mui/icons-material";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useGetApiMyKubernetesCloudIngressListQuery } from "src/app/services/api.generated";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { KubernetesCloudIngressTableRow } from "../../tables/KubernetesCloudIngressTableRow";
import { kubernetesCloudIngressTablrStruct } from "../../tables/struct";
import { CreateIngressDialog } from "../../dialog/CreateIngressDialog";

type KubernetesCloudIngressPropsType = {};

export const KubernetesCloudIngress: FC<
  KubernetesCloudIngressPropsType
> = () => {
  const [openAddIngressDialog, setOpenAddIngressDialog] =
    useState<boolean>(false);

  const { data = [], isLoading } = useGetApiMyKubernetesCloudIngressListQuery();

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
          <Typography fontSize={18} color="secondary">
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
          struct={kubernetesCloudIngressTablrStruct}
          RowComponent={KubernetesCloudIngressTableRow}
          rows={data}
          text="در حال حاضر سرویسی وجود ندارد"
          isLoading={isLoading}
          initialOrder={9}
        />
      </Box>
      <CreateIngressDialog
        openDialog={openAddIngressDialog}
        onClose={handleCloseAddIngressDialog}
      />
    </Stack>
  );
};
