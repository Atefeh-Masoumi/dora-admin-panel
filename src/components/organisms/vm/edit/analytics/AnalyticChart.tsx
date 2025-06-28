// import {
//   Divider,
//   Paper,
//   Skeleton,
//   Stack,
//   Typography,
// } from "@mui/material";
// import { FC, useMemo, useState } from "react";
// import { useParams } from "react-router-dom";
// import {
//   CartesianGrid,
//   Line,
//   LineChart,
//   ResponsiveContainer,
//   XAxis,
//   YAxis,
// } from "recharts";
// import { useGetApiMyVmHostGetAnalyticByIdAndPeriodIdQuery } from "src/app/services/api.generated";

// export const analyticsCategories = [
//   "یک ساعت",
//   "سه ساعت",
//   "شش ساعت",
//   "دوازده ساعت",
//   "یک روز",
// ];

// type AnalyticChartPropsType = {};

// export const AnalyticChart: FC<AnalyticChartPropsType> = () => {
//   const { id } = useParams();
//   const vmHostId = Number(id) || 0;

//   const [categoryId, setCategoryId] = useState(0);

//   const {
//     data: userAnalytics,
//     isLoading: getDataLoading,
//     isFetching: getDataFetching,
//   } = useGetApiMyVmHostGetAnalyticByIdAndPeriodIdQuery({
//     id: vmHostId,
//     periodId: categoryId + 1,
//   });

//   const isLoading = useMemo(
//     () => getDataLoading || getDataFetching,
//     [getDataFetching, getDataLoading]
//   );

//   return (
//     <>
//       <Typography
//         color="grey.700"
//         fontSize={24}
//         fontWeight={700}
//         sx={{ mb: 2 }}
//       >
//         گزارش میزان درخواست
//       </Typography>
//       <Paper elevation={0} sx={{ px: { xs: 2, sm: 3, md: 4, lg: 5 }, py: 1 }}>
//         <Stack rowGap={{ xs: 3, md: 7.4 }} sx={{ p: 4 }}>
//           {isLoading ? (
//             <Stack spacing={4} alignItems="center" justifyContent="center">
//               {[...Array(1)].map((_, index) => (
//                 <Skeleton
//                   key={index}
//                   variant="rectangular"
//                   width={"100%"}
//                   height={"100%"}
//                   sx={{ borderRadius: 2 }}
//                 />
//               ))}
//             </Stack>
//           ) : (
//             userAnalytics?.series?.map((item) => (
//               <Stack sx={{ height: 250 }}>
//                 <Typography variant="text1" color="secondary">
//                   {item.name}
//                 </Typography>
//                 <ResponsiveContainer width="100%" height="100%">
//                   <LineChart
//                     data={item.data?.map((item2) => ({
//                       uv: item2,
//                       // name: index2,
//                     }))}
//                     margin={{
//                       top: 20,
//                       bottom: 20,
//                       left: -20,
//                       right: 30,
//                     }}
//                   >
//                     <CartesianGrid strokeDasharray="1" vertical={false} />
//                     <XAxis
//                       axisLine={false}
//                       tickLine={false}
//                       allowDecimals={false}
//                       dataKey="name"
//                       height={33}
//                       tickMargin={15}
//                       interval={4}
//                     />
//                     <YAxis
//                       unit=""
//                       tickCount={5}
//                       width={130}
//                       axisLine={false}
//                       tickLine={false}
//                       tickMargin={70}
//                     />
//                     <Line
//                       type="monotone"
//                       dataKey="uv"
//                       stroke="rgba(11, 36, 251, 1)"
//                       dot={false}
//                     />
//                   </LineChart>
//                 </ResponsiveContainer>
//                 <Divider
//                   sx={{
//                     borderColor: "rgba(110, 118, 138, 0.08)",
//                     mt: 1.5,
//                     mb: { xs: 1.4, md: 2.3 },
//                   }}
//                 />
//               </Stack>
//             ))
//           )}
//         </Stack>
//       </Paper>
//     </>
//   );
// };
