import { FC } from "react";
import { Typography, Stack, Paper, Chip, Divider } from "@mui/material";
import { useGetApiMyKubernetesCloudHostGetByIdQuery } from "src/app/services/api.generated";
import { useParams } from "react-router";
import { BoxRow } from "src/components/molecules/BoxRow";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { ConvertToJalali } from "src/utils/convertToJalali";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { serviceStatusIdentifier } from "src/constant/serviceStatusIdentifier";

type KubernetesCloudInfoPropsType = {};

export const KubernetesCloudInfo: FC<KubernetesCloudInfoPropsType> = () => {
  const { kubernetesCloudId } = useParams();

  const { data, isLoading } = useGetApiMyKubernetesCloudHostGetByIdQuery(
    {
      id: Number(kubernetesCloudId) || 0,
    },
    { skip: !kubernetesCloudId }
  );

  const infoList = [
    { label: "Status", value: data?.statusId || 0, id: "statusId" },
    { label: "Name", value: data?.name || "", id: "name" },
    { label: "Datacenter", value: data?.datacenter || "", id: "datacenter" },
    {
      label: "Create Date",
      value: data?.createDate
        ? ConvertToJalali(String(data?.createDate))
            .split(" - ")
            .reverse()
            .join(" - ")
        : "",
      id: "createDate",
    },
  ];

  return (
    <Grid2
      container
      spacing={3}
      justifyContent="space-between"
      alignItems="stretch"
      width="100%"
    >
      <Grid2 xs={12} md={6}>
        <Paper
          component={Stack}
          rowGap={2}
          elevation={0}
          sx={{ borderRadius: BORDER_RADIUS_1, p: { xs: 2.5 }, height: "100%" }}
        >
          <Typography align="right" fontWeight={700} fontSize={18}>
            Overview
          </Typography>
          <Divider />
          {infoList.map(({ id, label, value }, index) =>
            id === "statusId" ? (
              <BoxRow
                key={index}
                title="Status"
                component={
                  <Chip
                    label={serviceStatusIdentifier(Number(value)).label}
                    sx={{
                      bgcolor: serviceStatusIdentifier(Number(value)).bgColor,
                      color: serviceStatusIdentifier(Number(value))
                        .typographyColor,
                      borderRadius: BORDER_RADIUS_1,
                    }}
                  />
                }
                isLoading={isLoading}
              />
            ) : (
              <BoxRow
                key={index}
                title={label}
                value={value}
                isLoading={isLoading}
              />
            )
          )}
        </Paper>
      </Grid2>
      <Grid2 xs={12} md={6}>
        <Paper
          component={Stack}
          rowGap={2}
          elevation={0}
          sx={{ borderRadius: BORDER_RADIUS_1, p: { xs: 2.5 }, height: "100%" }}
        >
          <Typography align="right" fontWeight={700} fontSize={18}>
            Hardware
          </Typography>
          <Divider />
          <BoxRow
            title="CPU"
            value={`${data?.cpu} Core`}
            isLoading={isLoading}
          />
          <BoxRow
            title="Memory"
            value={`${data?.memory} G`}
            isLoading={isLoading}
          />

          <BoxRow
            title="Disk"
            value={`${data?.disk} GB`}
            isLoading={isLoading}
          />

          <BoxRow
            title="Ten pods"
            value={`${data?.tenPods} TenPods`}
            isLoading={isLoading}
          />
        </Paper>
      </Grid2>
    </Grid2>
  );
};
