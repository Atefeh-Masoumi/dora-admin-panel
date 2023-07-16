import { FC, useMemo } from "react";
import {
  Chip,
  Divider,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { BORDER_RADIUS_1, BORDER_RADIUS_4 } from "src/configs/theme";
import Grid2 from "@mui/material/Unstable_Grid2";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { useParams } from "react-router";
import { useGetPortalKubeNamespaceGetByIdQuery } from "src/app/services/api.generated";

type boxRowType = {
  title: string;
  value?: string | number | undefined | null;
  component?: any;
  isLoading: boolean;
};

const BoxRow: FC<boxRowType> = ({ title, value, component, isLoading }) => (
  <Stack direction="row" alignItems="center" justifyContent="space-between">
    {isLoading ? (
      <Skeleton width={150} height={24} />
    ) : component ? (
      component
    ) : (
      <Typography
        sx={{ color: ({ palette }) => palette.grey[700], direction: "rtl" }}
      >
        {value || ""}
      </Typography>
    )}
    <Typography sx={{ color: ({ palette }) => palette.grey[700] }}>
      :{title}
    </Typography>
  </Stack>
);

type ServiceInfoPropsType = {};

export const ServiceInfo: FC<ServiceInfoPropsType> = () => {
  const { id } = useParams();

  const {
    data: rabbitData,
    isLoading: getRabbitDataLoading,
    isFetching: getRabbitDataFetching,
  } = useGetPortalKubeNamespaceGetByIdQuery({
    id: Number(id)!,
  });

  const isLoading = useMemo(
    () => getRabbitDataLoading || getRabbitDataFetching,
    [getRabbitDataFetching, getRabbitDataLoading]
  );

  const isActive = useMemo(
    () => rabbitData?.statusId === 2,
    [rabbitData?.statusId]
  );

  return (
    <Grid2
      container
      spacing={3}
      justifyContent="space-between"
      alignItems="stretch"
    >
      <Divider />
      <Grid2 xs={12}>
        <Stack
          py={3}
          px={3}
          bgcolor="rgba(244, 95, 80, 1)"
          direction="row"
          spacing={3}
          borderRadius={2}
          width="100%"
          color="white"
          alignItems={{ xs: "start", md: "center" }}
        >
          <ErrorOutlineOutlinedIcon />
          <Typography>توجه:</Typography>
          <Typography
            fontSize={14}
            sx={{
              opacity: 0.9,
            }}
          >
            این سرویس نسخه آزمایشی می باشد.
            <br />
            به منظور مدیریت و استفاده از سرویس از https://s1-k1.dorsacloud.com
            استفاده نمایید.
            <br />
            برای استفاده از سرویس از نام کاربری و رمز عبور ارسال شده استفاده
            نمایید.
            <br />
            درصورتیکه نام کاربری را فراموش کرده اید از گزینه شناسه کاربری
            استفاده نمایید.
          </Typography>
        </Stack>
      </Grid2>
      <Divider />

      <Grid2 xs={12} md={6}>
        <Paper
          component={Stack}
          rowGap={2}
          elevation={0}
          sx={{ borderRadius: BORDER_RADIUS_4, p: { xs: 2.5 }, height: "100%" }}
        >
          <Typography align="center" fontWeight={700} fontSize={18}>
            Kubernetes Service
          </Typography>
          <Divider />
          <BoxRow
            title="Status"
            component={
              <Chip
                label={rabbitData?.status}
                sx={{
                  bgcolor: ({ palette }) =>
                    isActive ? palette.success.light : palette.error.light,
                  color: ({ palette }) =>
                    isActive ? palette.success.main : palette.error.main,
                  borderRadius: BORDER_RADIUS_1,
                }}
              />
            }
            isLoading={isLoading}
          />
          <BoxRow
            title="Namespace Name"
            value={rabbitData?.name}
            isLoading={isLoading}
          />
          <BoxRow
            title="DataCenter"
            value={rabbitData?.datacenter}
            isLoading={isLoading}
          />
          <BoxRow
            title="Create Date"
            value={rabbitData?.createDate}
            isLoading={isLoading}
          />
        </Paper>
      </Grid2>
      <Grid2 xs={12} md={6}>
        <Paper
          component={Stack}
          rowGap={2}
          elevation={0}
          sx={{ borderRadius: BORDER_RADIUS_4, p: { xs: 2.5 }, height: "100%" }}
        >
          <Typography align="right" fontWeight={700} fontSize={18}>
            Hardware
          </Typography>
          <Divider />
          <BoxRow
            title="CPU"
            value={`${rabbitData?.cpu} Core`}
            isLoading={isLoading}
          />
          <BoxRow
            title="Memory"
            value={`${rabbitData?.memory} G`}
            isLoading={isLoading}
          />
          <BoxRow
            title="Disk"
            value={`${rabbitData?.disk} GB`}
            isLoading={isLoading}
          />
          <BoxRow
            title="IP Address"
            value={rabbitData?.ipAddress}
            isLoading={isLoading}
          />
        </Paper>
      </Grid2>
    </Grid2>
  );
};
