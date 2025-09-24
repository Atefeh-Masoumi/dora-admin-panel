import {
  Divider,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { useGetApiMyVmByProjectIdHostGetAnalyticAndIdQuery } from "src/app/services/api.generated";
import { StatBox } from "src/components/molecules/StatBox";
import UploadImage from "src/assets/images/upload.png";
import DownloadImage from "src/assets/images/download.png";

export const analyticsCategories = [
  "یک ساعت",
  "سه ساعت",
  "شش ساعت",
  "دوازده ساعت",
  "یک روز",
];

type AnalyticChartPropsType = {};

export const AnalyticChart: FC<AnalyticChartPropsType> = () => {
  const { id, projectId } = useParams();
  const vmHostId = Number(id) || 0;

  const [categoryId, setCategoryId] = useState(0);

  const {
    data: userAnalytics,
    isLoading: getDataLoading,
    isFetching: getDataFetching,
  } = useGetApiMyVmByProjectIdHostGetAnalyticAndIdQuery({
    id: vmHostId,
    projectId: Number(projectId),
    periodId: categoryId + 1,
  });

  const isLoading = useMemo(
    () => getDataLoading || getDataFetching,
    [getDataFetching, getDataLoading]
  );

  return (
    <>
      <Typography
        color="grey.700"
        fontSize={24}
        fontWeight={700}
        sx={{ mb: 2 }}
      >
      </Typography>
      <Paper elevation={0} sx={{ px: { xs: 2, sm: 3, md: 4, lg: 5 }, py: 1 }}>
        <Stack
          p={2}
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent="space-between"
          gap={1}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems="center"
            spacing={2}
          >
            <Typography
              color="grey.700"
              fontSize={24}
              fontWeight={700}
            >
              گزارش میزان درخواست

            </Typography>
          </Stack>
        </Stack>
        <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          sx={{ m: 3 }}
          
        >

          <StatBox
            title="Total"
            value={(userAnalytics?.totalUpload ?? 0) + (userAnalytics?.totalDownload ?? 0)}
            unit="GB"
            img={UploadImage}
          />
          <StatBox
            title="Download"
            value={userAnalytics?.totalDownload ?? 0}
            unit="GB"
            img={DownloadImage}
          />
          <StatBox
            title="Upload"
            value={userAnalytics?.totalUpload ?? 0}
            unit="GB"color="green"
            img={UploadImage}
          />

        </Stack>

        <Stack rowGap={{ xs: 3, md: 7.4 }} sx={{ p: 4 }}>
          {isLoading ? (
            <Stack spacing={4} alignItems="center" justifyContent="center">
              {[...Array(1)].map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rectangular"
                  width={"100%"}
                  height={"100%"}
                  sx={{ borderRadius: 2 }}
                />
              ))}
            </Stack>
          ) : (
            userAnalytics?.series?.map((item) => (
              <Stack sx={{ height: 250 }}>
                <Typography variant="text1" color="secondary">
                  {item.name}
                </Typography>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={item.data?.map((item2) => ({
                      uv: item2,
                      // name: index2,
                    }))}
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
                <Divider
                  sx={{
                    borderColor: "rgba(110, 118, 138, 0.08)",
                    mt: 1.5,
                    mb: { xs: 1.4, md: 2.3 },
                  }}
                />
              </Stack>
            ))
          )}
        </Stack>
      </Paper>
    </>
  );
};
