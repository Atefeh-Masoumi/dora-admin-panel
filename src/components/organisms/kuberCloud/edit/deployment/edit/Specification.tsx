import { FC, useMemo } from "react";
import { Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useGetApiMyKubernetesCloudDeploymentGetByIdQuery } from "src/app/services/api.generated";
import { useParams } from "react-router";
import { BoxRow } from "src/components/molecules/BoxRow";
import { ConvertToJalali } from "src/utils/convertToJalali";

type SpecificationPropsType = {};

export const Specification: FC<SpecificationPropsType> = () => {
  const { deploymentId, kubernetesCloudId } = useParams();

  const {
    data: deploymentData,
    isLoading: getDeploymentDataLoading,
    isFetching: getDeploymentDataFetching,
  } = useGetApiMyKubernetesCloudDeploymentGetByIdQuery({
    id: Number(deploymentId)!,
  });

  const isLoading = useMemo(
    () => getDeploymentDataLoading || getDeploymentDataFetching,
    [getDeploymentDataFetching, getDeploymentDataLoading]
  );

  return (
    <Grid
      container
      spacing={3}
      justifyContent="space-between"
      alignItems="stretch"
    >
      <Grid item xs={12} md={6}>
        <Paper
          component={Stack}
          rowGap={2}
          elevation={0}
          sx={{ borderRadius: BORDER_RADIUS_1, p: { xs: 2.5 }, height: "100%" }}
        >
          <Typography align="right" fontWeight={700} fontSize={18}>
            deployment
          </Typography>
          <Divider />

          <BoxRow
            title="Name"
            value={deploymentData?.name}
            isLoading={isLoading}
          />
          <BoxRow
            title="Image"
            value={deploymentData?.image}
            isLoading={isLoading}
          />
          <BoxRow
            title="Namespace"
            value={deploymentData?.namespace}
            isLoading={isLoading}
          />
          <BoxRow
            title="Create Date"
            value={
              ConvertToJalali(deploymentData?.createDate!)
                .split(" ")
                .join(" - ") || "----"
            }
            isLoading={isLoading}
          />
          <BoxRow
            title="Modify Date"
            value={
              ConvertToJalali(deploymentData?.modifyDate!)
                .split(" ")
                .join(" - ") || "----"
            }
            isLoading={isLoading}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper
          component={Stack}
          rowGap={2}
          elevation={0}
          sx={{ borderRadius: BORDER_RADIUS_1, p: { xs: 2.5 }, height: "100%" }}
        >
          <Typography align="right" fontWeight={700} fontSize={18}>
            Config
          </Typography>

          <Divider />
          <BoxRow
            title="Replica"
            value={`${deploymentData?.replica}`}
            isLoading={isLoading}
          />
          <BoxRow
            title="Node Port"
            value={`${deploymentData?.nodePort}`}
            isLoading={isLoading}
          />
          <BoxRow
            title="Service Port"
            value={`${deploymentData?.servicePort}`}
            isLoading={isLoading}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};
