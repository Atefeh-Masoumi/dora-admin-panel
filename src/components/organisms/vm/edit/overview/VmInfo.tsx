import { FC, useMemo } from "react";
import { ServerInfoActions } from "./serverInfoSections/ServerInfoActions";
import { ServiceOverview } from "src/components/molecules/ServiceOverview";
import { useGetApiMyVmHostGetByIdQuery } from "src/app/services/api.generated";
import { useParams } from "react-router";

type VmInfoPropsType = {};

export const VmInfo: FC<VmInfoPropsType> = () => {
  const { id } = useParams();

  const {
    data,
    isLoading: getVmDataLoading,
    isFetching: getVmDataFetching,
    refetch,
  } = useGetApiMyVmHostGetByIdQuery({
    id: Number(id)!,
  });

  const refetchOnClick = () => refetch();

  const isLoading = useMemo(
    () => getVmDataLoading || getVmDataFetching,
    [getVmDataFetching, getVmDataLoading]
  );

  const isConnected = useMemo(
    () => data?.networkStatus === "CONNECTED",
    [data?.networkStatus]
  );

  const powerOn = useMemo(
    () => data?.powerStatus === "POWERED_ON",
    [data?.powerStatus]
  );

  const infoList = [
    [
      { id: "statusId", label: "Status", value: `${data?.statusId || ""}` },
      { id: "name", label: "Server Name", value: data?.name || "" },
      {
        id: "os",
        label: "Operating System",
        value: data?.operatingSystem || "",
      },
      {
        id: "powerStatus",
        label: "Power Status",
        value: data?.powerStatus || "---",
        statusColor: powerOn ? "success.main" : "error.main",
      },
      {
        id: "networkStatus",
        label: "Network Status",
        value: data?.networkStatus || "---",
        statusColor: isConnected ? "success.main" : "error.main",
      },
    ],
    [
      { id: "cpu", label: "CPU", value: `${data?.cpu || 0} Core` },
      { id: "memory", label: "Memory", value: `${data?.memory || 0} G` },
      { id: "disk", label: "Disk", value: `${data?.disk || 0} GB` },
      {
        id: "macAddress",
        label: "MAC Address",
        value: data?.macAddress || "---",
      },
    ],
  ];

  return (
    <>
      <ServerInfoActions />
      <br />
      <ServiceOverview
        infoList={infoList}
        isLoading={isLoading}
        refetchOnClick={refetchOnClick}
      />
    </>
  );
};
