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
      <Paper sx={{ p: { xs: 2, sm: 4, md: 6 } }}>
        <Stack rowGap={3}>
          <Typography align="center" variant="title3" fontWeight="bold">
            نگاه کلی
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
            // <Stack
            //   direction="row"
            //   key={id}
            //   alignItems="center"
            //   justifyContent="space-between"
            // >
            //   <Typography
            //     noWrap
            //     textOverflow="ellipsis"
            //     maxWidth="49%"
            //     fontWeight="bold"
            //   >
            //     {label}
            //   </Typography>
            //   {isLoading ? (
            //     <Skeleton width={150} />
            //   ) : id === "statusId" ? (
            //     <Chip
            //       clickable={false}
            //       label={kubernetesStatusIdentifier(value as number).label}
            //       color={
            //         kubernetesStatusIdentifier(value as number).chipColor as any
            //       }
            //       sx={{
            //         bgcolor: kubernetesStatusIdentifier(value as number)
            //           .bgcolor,
            //         color: kubernetesStatusIdentifier(value as number)
            //           .textColor,
            //         py: 2.2,
            //         borderRadius: 1,
            //         fontSize: "14px",
            //       }}
            //     />
            //   ) : (
            //     <Typography noWrap textOverflow="ellipsis" maxWidth="49%">
            //       {value}
            //     </Typography>
            //   )}
            // </Stack>
          })}
        </Stack>
      </Paper>
    </Container>
  );
};
