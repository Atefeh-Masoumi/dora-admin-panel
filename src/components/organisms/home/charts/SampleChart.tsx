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
import { useGetApiMyDashboardUsageByCategoryIdQuery } from "src/app/services/api.generated";
import { ChartTooltip } from "./ChartTooltip";
import { priceToPersian } from "src/utils/priceToPersian";

type SampleChartPropsType = {
  categoryId: number;
};

export const SampleChart: FC<SampleChartPropsType> = ({ categoryId }) => {
  const { data: userAnalytics, isLoading } =
    useGetApiMyDashboardUsageByCategoryIdQuery({
      categoryId,
    });
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
            data={userAnalytics}
            margin={{
              top: 20,
              left: -30,
              right: 30,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="1" vertical={false} />
            <XAxis
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
              dataKey="month"
              height={33}
              tickMargin={15}
            />
            <YAxis
              unit="ریال"
              tickCount={5}
              width={130}
              axisLine={false}
              tickLine={false}
              tickMargin={70}
              tickFormatter={(value: any) => {
                return priceToPersian(value);
              }}
            />
            <Tooltip content={<ChartTooltip categoryId={categoryId} />} />
            <Line
              type="monotone"
              dataKey="count"
              stroke="rgba(11, 36, 251, 1)"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Fragment>
  );
};
