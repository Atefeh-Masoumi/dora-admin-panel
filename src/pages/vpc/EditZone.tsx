// import { Box, Stack, Tabs } from "@mui/material";
// import { FC, SyntheticEvent, useMemo } from "react";
// import { useLocation, useNavigate, useParams } from "react-router";
// import { useSearchParams } from "react-router-dom";
// import { DorsaTab } from "src/components/atoms/DorsaTab";
// import { BORDER_RADIUS_1 } from "src/configs/theme";
// import { VpcIp } from "./VpcIp";
// import { VpcLoadBalancer } from "./VpcLoadBalancer";
// import { VpcNat } from "./VpcNat";
// import { VpcNetwork } from "./VpcNetwork";
// import { VpcVm } from "./VpcVm";
// import { ServiceOverview } from "src/components/molecules/ServiceOverview";
// import { useGetApiMyVpcHostGetByIdQuery } from "src/app/services/api.generated";
// import { ConvertToJalali } from "src/utils/convertToJalali";

// const EditZone: FC = () => {
//   const { vpcId } = useParams();
//   const navigate = useNavigate();

//   const [searchParams] = useSearchParams();
//   const projectId = searchParams.get("projectId");

//   const {
//     data,
//     isLoading: getDataLoading,
//     refetch,
//     isFetching: getDataFetching,
//   } = useGetApiMyVpcHostGetByIdQuery({ id: Number(vpcId) }, { skip: !vpcId });

//   const refetchOnClick = () => refetch();

//   const infoList = [
//     [
//       { id: "statusId", label: "Status", value: data?.statusId ?? "---" },
//       { id: "name", label: "vPC Name", value: data?.name ?? "---" },
//       {
//         id: "datacenter",
//         label: "Datacenter",
//         value: data?.datacenter ?? "---",
//       },
//       {
//         id: "createDate",
//         label: "Create Date",
//         value: data?.createDate
//           ? ConvertToJalali(String(data.createDate))
//               .split("-")
//               .reverse()
//               .join(" - ")
//           : "---",
//       },
//       {
//         id: "lastEditDate",
//         label: "Last Edit Date",
//         value: data?.modifyDate
//           ? ConvertToJalali(String(data.modifyDate))
//               .split("-")
//               .reverse()
//               .join(" - ")
//           : "---",
//       },
//     ],
//   ];

//   const isLoading = useMemo(
//     () => getDataLoading || getDataFetching,
//     [getDataFetching, getDataLoading]
//   );

//   const { pathname } = useLocation();

//   const selectedTab = useMemo(() => {
//     let result;
//     if (pathname.includes("overview")) {
//       result = `overview`;
//     }
//     if (pathname.includes("network")) {
//       result = `network`;
//     }
//     if (pathname.includes("vpcVm")) {
//       result = `vpcVm`;
//     }
//     if (pathname.includes("nat")) {
//       result = `nat`;
//     }
//     if (pathname.includes("ip")) {
//       result = `ip`;
//     }
//     if (pathname.includes("loadBalancer")) {
//       result = `loadBalancer`;
//     }
//     return result;
//   }, [pathname]);

//   const handleChange = (_: SyntheticEvent, newValue: string) => {
//     navigate(`/vpc/${vpcId}/${newValue}?projectId=${projectId}&vpcId=${vpcId}`);
//   };

//   const renderHandler = () => {
//     let result = <></>;

//     switch (selectedTab) {
//       case `network`:
//         result = <VpcNetwork />;
//         break;
//       case `vpcVm`:
//         result = <VpcVm />;
//         break;
//       case `nat`:
//         result = <VpcNat />;
//         break;
//       case `ip`:
//         result = <VpcIp />;
//         break;
//       case `loadBalancer`:
//         result = <VpcLoadBalancer />;
//         break;
//       case `overview`:
//       default:
//         result = (
//           <ServiceOverview
//             infoList={infoList}
//             isLoading={isLoading}
//             refetchOnClick={refetchOnClick}
//           />
//         );
//         break;
//     }
//     return result;
//   };

//   return (
//     <Stack spacing={5} alignItems="center">
//       <Box
//         sx={{
//           maxWidth: "100%",
//           bgcolor: "white",
//           py: 0.5,
//           borderRadius: BORDER_RADIUS_1,
//         }}
//       >
//         <Tabs
//           sx={{
//             minWidth: "fix-content",
//             borderRadius: BORDER_RADIUS_1,
//           }}
//           TabIndicatorProps={{ style: { display: "none" } }}
//           value={selectedTab}
//           onChange={handleChange}
//           variant="scrollable"
//           scrollButtons="auto"
//         >
//           <DorsaTab value={`overview`} label="مشخصات سرویس" />
//           <DorsaTab value={`network`} label="Network" />
//           <DorsaTab value={`vpcVm`} label="Virtual Machine" />
//           <DorsaTab value={`nat`} label="NAT" />
//           <DorsaTab value={`ip`} label="Public IP" />
//           <DorsaTab value={`loadBalancer`} label="Load Balancer" />
//         </Tabs>
//       </Box>
//       {renderHandler()}
//     </Stack>
//   );
// };

// export default EditZone;
