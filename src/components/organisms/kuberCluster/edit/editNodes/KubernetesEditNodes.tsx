import { Add } from "@mui/icons-material";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { useNavigate, useParams } from "react-router";
import { useGetApiMyKubernetesClusterNodeByKubernetesHostIdQuery } from "src/app/services/api.generated";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import KubernetesNodesTableRow from "./table/KubernetesNodesTableRow";
import { kubernetesNodesTableStruct } from "./table/struct";

type KubernetesEditNodesPropsType = {};

export const KubernetesEditNodes: FC<KubernetesEditNodesPropsType> = () => {
  const { id: kubernetesId } = useParams();

  const { data = [], isLoading } =
    useGetApiMyKubernetesClusterNodeByKubernetesHostIdQuery(
      {
        kubernetesHostId: Number(kubernetesId) || 0,
      },
      { skip: !kubernetesId }
    );

  const navigate = useNavigate();

  const gotToAddNode = () =>
    kubernetesId && navigate(`/kubernetes-cluster/${kubernetesId}/add-node`);

  return (
    <Stack
      bgcolor="white"
      py={2}
      px={3}
      borderRadius={BORDER_RADIUS_1}
      width="100%"
      direction="row"
      justifyContent="center"
    >
      <Stack width="100%">
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems={{ xs: "start", md: "center" }}
          justifyContent="space-between"
        >
          <Typography fontSize={18} color="rgba(110, 118, 138, 1)">
            لیست نودهای کوبرنتیز ابری
          </Typography>
          <Button
            onClick={gotToAddNode}
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
            افزودن نود
          </Button>
        </Stack>
        <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
        <Box width="100%" sx={{ pt: 1.5 }}>
          <BaseTable
            struct={kubernetesNodesTableStruct}
            RowComponent={KubernetesNodesTableRow}
            rows={data}
            text="در حال حاضر نودی برای این سرویس کوبرنتیزی وجود ندارد"
            isLoading={isLoading}
            initialOrder={9}
          />
        </Box>
      </Stack>
    </Stack>
  );
};
