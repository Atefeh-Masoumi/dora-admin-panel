import { Skeleton, Stack } from "@mui/material";
import { FC, Fragment } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGetApiV2PortalDashboardGetUserAnalyticsByCategoryIdQuery } from "src/app/services/api.generated";
import { ChartTooltip } from "./ChartTooltip";

type SampleChartPropsType = {
  categoryId: number;
};

export const SampleChart: FC<SampleChartPropsType> = ({ categoryId }) => {
  const { data: userAnalytics, isLoading } =
    useGetApiV2PortalDashboardGetUserAnalyticsByCategoryIdQuery({ categoryId });
  return (
    <Fragment>
      {isLoading ? (
        <Stack spacing={1} alignItems="center" justifyContent="center">
          {[...Array(3)].map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              width={700}
              height={60}
              sx={{ borderRadius: 2 }}
            />
          ))}
        </Stack>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={userAnalytics?.[0]?.data?.map((item, index) => ({
              uv: item,
              name: index,
            }))}
            margin={{
              top: 20,
              left: -30,
              right: 30,
            }}
          >
            <CartesianGrid strokeDasharray="1" vertical={false} />
            <XAxis
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
              dataKey="name"
              height={33}
              tickMargin={15}
              interval={4}
            />
            <YAxis
              unit=""
              tickCount={5}
              width={130}
              axisLine={false}
              tickLine={false}
              tickMargin={70}
            />
            <Tooltip content={<ChartTooltip categoryId={categoryId} />} />
            <Line
              type="monotone"
              dataKey="uv"
              stroke="rgba(11, 36, 251, 1)"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Fragment>
  );
};
