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
import { useGetApiMyRabbitHostGetByIdQuery } from "src/app/services/api.generated";
import { useParams } from "react-router";

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
  } = useGetApiMyRabbitHostGetByIdQuery({
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
    <Grid2 container spacing={3} alignItems="center" justifyContent="center">
      <Grid2 xs={12} md={8}>
        <Paper
          component={Stack}
          rowGap={2}
          elevation={0}
          sx={{ borderRadius: BORDER_RADIUS_4, p: { xs: 2.5 }, height: "100%" }}
        >
          <Typography align="center" fontWeight={700} fontSize={18}>
            RabbitMQ Service
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
            title="Service Name (VHost)"
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
    </Grid2>
  );
};
