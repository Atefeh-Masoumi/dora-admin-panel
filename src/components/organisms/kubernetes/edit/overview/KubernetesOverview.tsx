import { FC } from "react";
import {
  Container,
  Typography,
  Stack,
  Paper,
  Chip,
  Divider,
} from "@mui/material";
import { useGetApiMyKubernetesHostGetByIdQuery } from "src/app/services/api.generated";
import { useParams } from "react-router";
import { kubernetesStatusIdentifier } from "src/constant/kubernetesStatus";
import { BoxRow } from "src/components/molecules/BoxRow";
import { BORDER_RADIUS_4 } from "src/configs/theme";

type KubernetesOverviewPropsType = {};

export const KubernetesOverview: FC<KubernetesOverviewPropsType> = () => {
  const { id: kubernetesId } = useParams();

  const { data, isLoading } = useGetApiMyKubernetesHostGetByIdQuery(
    {
      id: Number(kubernetesId) || 0,
    },
    { skip: !kubernetesId }
  );

  const infoList = [
    { label: "نام کلاستر", value: data?.name || "", id: "name" },
    { label: "مرکز داده", value: data?.datacenter || "", id: "datacenter" },
    {
      label: "تعداد نود worker",
      value: data?.workerNode || "",
      id: "workerNode",
    },
    {
      label: "تعداد نود master",
      value: data?.masterNode || "",
      id: "masterNode",
    },
    { label: "تاریخ ایجاد", value: data?.createDate || "", id: "createDate" },
    { label: "تاریخ ویرایش", value: data?.modifyDate || "", id: "modifyDate" },
    { label: "تاریخ انقضا", value: data?.expireDate || "", id: "expireDate" },
    {
      label: "نوع صورت حساب",
      value: data?.customerProductType || "",
      id: "customerProductStatus",
    },
    { label: "وضعیت", value: data?.statusId || 0, id: "statusId" },
  ];

  return (
    <Container maxWidth="md" sx={{ p: 0 }}>
      <Paper
        sx={{ borderRadius: BORDER_RADIUS_4, p: { xs: 2.5 }, height: "100%" }}
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
