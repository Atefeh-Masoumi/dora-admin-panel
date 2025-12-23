import {
  Divider,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
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
import { BORDER_RADIUS_1 } from "src/configs/theme";

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

  const [categoryId, setCategoryId] = useState(1);

  const handleChange = (event: SelectChangeEvent) => {
    setCategoryId(+event.target.value);
  };
  const {
    data: userAnalytics,
    isLoading: getDataLoading,
    isFetching: getDataFetching,
  } = useGetApiMyVmByProjectIdHostGetAnalyticAndIdQuery(
    {
      id: vmHostId,
      projectId: Number(projectId),
      periodId: categoryId,
    },
    {
      skip: !projectId || !vmHostId,
    }
  );

  const isLoading = useMemo(
    () => getDataLoading || getDataFetching,
    [getDataFetching, getDataLoading]
  );
  const formatStatValue = (value?: number) =>
    typeof value === "number" ? value.toFixed(4) : "0";
  const total =
    (userAnalytics?.totalUpload ?? 0) + (userAnalytics?.totalDownload ?? 0);

  return (
    <>
      <Paper elevation={0} sx={{ px: { xs: 2, sm: 3, md: 4, lg: 5 }, py: 1 }}>
        <Stack
          p={2}
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "stretch", sm: "center" }}
          justifyContent="space-between"
          gap={1}
        >
          <Typography color="grey.700" fontSize={24} fontWeight={700}>
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
              alignSelf: { xs: "flex-start", sm: "center" },
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
        <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          sx={{ m: 1 }}
        >
          <StatBox
            title="Total"
            value={formatStatValue(total) ?? 0}
            unit="GB"
            img={UploadImage}
          />
          <StatBox
            title="Download"
            value={formatStatValue(userAnalytics?.totalDownload) ?? 0}
            unit="GB"
            img={DownloadImage}
          />
          <StatBox
            title="Upload"
            value={formatStatValue(userAnalytics?.totalUpload) ?? 0}
            unit="GB"
            color="green"
            img={UploadImage}
          />
        </Stack>

        <Grid2 container spacing={4} sx={{ p: 2 }}>
          {isLoading ? (
            <Grid2 size={12}>
              <Skeleton
                variant="rectangular"
                height={250}
                sx={{ borderRadius: 2 }}
              />
            </Grid2>
          ) : (
            userAnalytics?.series
              ?.filter((item) => item.name !== "Bandwidth UsageChart (MByte)")
              .map((item, index) => (
                <Grid2 key={index} size={{ xs: 12, md: 6 }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      borderRadius: 2,
                      border: "1px solid rgba(0,0,0,0.08)",
                      height: "100%",
                    }}
                  >
                    <Stack spacing={1} sx={{ height: 250 }}>
                      <Typography variant="text1" color="secondary">
                        {item.name}
                      </Typography>

                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={item.data?.map((v) => ({ uv: v }))}>
                          <CartesianGrid strokeDasharray="1" vertical={false} />
                          <XAxis />
                          <YAxis />
                          <Line dataKey="uv" dot={false} />
                        </LineChart>
                      </ResponsiveContainer>

                      <Divider sx={{ mt: 2 }} />
                    </Stack>
                  </Paper>
                </Grid2>
              ))
          )}
        </Grid2>
      </Paper>
    </>
  );
};
