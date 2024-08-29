import { FC } from "react";
import {
  Container,
  Typography,
  Stack,
  Paper,
  Chip,
  Divider,
} from "@mui/material";
import { useGetApiMyKubernetesClusterHostGetByIdQuery } from "src/app/services/api.generated";
import { useParams } from "react-router";
import { kubernetesStatusIdentifier } from "src/constant/kubernetesStatus";
import { BoxRow } from "src/components/molecules/BoxRow";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { ConvertToJalali } from "src/utils/convertToJalali";

type KubernetesOverviewPropsType = {};

export const KubernetesOverview: FC<KubernetesOverviewPropsType> = () => {
  const { id: kubernetesId } = useParams();

  const { data, isLoading } = useGetApiMyKubernetesClusterHostGetByIdQuery(
    {
      id: Number(kubernetesId) || 0,
    },
    { skip: !kubernetesId }
  );

  const infoList = [
    { label: "Status", value: data?.statusId || 0, id: "statusId" },
    { label: "Cluster Name", value: data?.name || "", id: "name" },
    { label: "Datacenter", value: data?.datacenter || "", id: "datacenter" },
    {
      label: "Worker Node",
      value: data?.workerNode || "",
      id: "workerNode",
    },
    {
      label: "Master Node",
      value: data?.masterNode || "",
      id: "masterNode",
    },
    {
      label: "Create Date",
      value: data?.createDate
        ? ConvertToJalali(String(data?.createDate))
        : "----",
      id: "createDate",
    },
    {
      label: "Modify Date",
      value: data?.modifyDate
        ? ConvertToJalali(String(data?.modifyDate))
        : "----",
      id: "modifyDate",
    },
    {
      label: "Expire Date",
      value: data?.expireDate
        ? ConvertToJalali(String(data?.expireDate))
        : "----",
      id: "expireDate",
    },
    {
      label: "Customer Product Status",
      value: data?.customerProductType || "",
      id: "customerProductStatus",
    },
  ];

  return (
    <Container maxWidth="md" sx={{ p: 0 }}>
      <Paper
        sx={{ borderRadius: BORDER_RADIUS_1, p: { xs: 2.5 }, height: "100%" }}
        elevation={0}
      >
        <Stack rowGap={2}>
          <Typography align="center" fontWeight={700} fontSize={18}>
            اطلاعات سرویس کوبرنتیز
          </Typography>
          <Divider flexItem />

          {infoList.map(({ id, label, value }) => {
            return (
              <BoxRow
                key={id}
                title={label}
                component={
                  id === "statusId" ? (
                    <Chip
                      clickable={false}
                      label={kubernetesStatusIdentifier(value as number).label}
                      color={
                        kubernetesStatusIdentifier(value as number)
                          .chipColor as any
                      }
                      sx={{
                        bgcolor: kubernetesStatusIdentifier(value as number)
                          .bgcolor,
                        color: kubernetesStatusIdentifier(value as number)
                          .textColor,
                        py: 2.2,
                        borderRadius: 1,
                        fontSize: "14px",
                      }}
                    />
                  ) : undefined
                }
                isLoading={isLoading}
                value={value}
              />
            );
          })}
        </Stack>
      </Paper>
    </Container>
  );
};
