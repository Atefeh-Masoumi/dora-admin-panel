import {
  Box,
  Divider,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { FC, Fragment, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { useGetApiMyDnsCdnHostGetAnalyticByIdAndPeriodIdQuery } from "src/app/services/api.generated";
import { BORDER_RADIUS_1 } from "src/configs/theme";

export const analyticsCategories = [
  "یک ساعت",
  "سه ساعت",
  "شش ساعت",
  "دوازده ساعت",
  "یک روز",
  "سه روز",
  "یک هفته",
  "یک ماه",
];

type AnalyticChartPropsType = {};

export const AnalyticChart: FC<AnalyticChartPropsType> = () => {
  const { id } = useParams();
  const dnsId = Number(id) || 0;

  const [categoryId, setCategoryId] = useState(0);

  const handleChange = (event: SelectChangeEvent) => {
    setCategoryId(+event.target.value);
  };

  const {
    data: userAnalytics,
    isLoading: getDataLoading,
    isFetching: getDataFetching,
  } = useGetApiMyDnsCdnHostGetAnalyticByIdAndPeriodIdQuery({
    id: dnsId,
    periodId: categoryId + 1,
  });

  const isLoading = useMemo(
    () => getDataLoading || getDataFetching,
    [getDataFetching, getDataLoading]
  );

  return (
    <Grid
      container
      justifyContent="space-between"
      rowGap={1}
      columnGap={1}
      sx={{ mb: { xs: 2, md: 3 } }}
    >
      <Grid
        item
        xs={12}
        md
        sx={{
          width: "100%",
          bgcolor: "white",
          borderRadius: { BORDER_RADIUS_1 },
          px: { xs: 1.5, lg: 2 },
          py: { xs: 2, lg: 2.5 },
          overflow: "hidden",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="text1" color="secondary">
            گزارش میزان درخواست
          </Typography>
          <Select
            size="small"
            type="number"
            value={"" + categoryId}
            onChange={handleChange}
            sx={{
              width: 185,
              color: "secondary",
              borderRadius: BORDER_RADIUS_1,
              borderColor: "rgba(110, 118, 138, 0.06)",
            }}
          >
            {analyticsCategories.map((category, index) => (
              <MenuItem
                sx={{
                  mx: 0.5,
                  my: 1,
                  borderRadius: 1,
                }}
                key={category}
                value={index}
              >
                {category}
              </MenuItem>
            ))}
          </Select>
        </Stack>
        <Divider
          sx={{
            borderColor: "rgba(110, 118, 138, 0.08)",
            mt: 1.5,
            mb: { xs: 1.4, md: 2.3 },
          }}
        />
        <Box sx={{ height: 300 }}>
          <Fragment>
            {isLoading ? (
              <Stack spacing={1} alignItems="center" justifyContent="center">
                {[...Array(1)].map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="rectangular"
                    width={800}
                    height={100}
                    sx={{ borderRadius: 2 }}
                  />
                ))}
              </Stack>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={userAnalytics?.series?.[0]?.data?.map(
                    (item, index) => ({
                      uv: item,
                      name: index,
                    })
                  )}
                  margin={{
                    top: 20,
                    bottom: 20,
                    left: -20,
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
        </Box>
      </Grid>
    </Grid>
  );
};
