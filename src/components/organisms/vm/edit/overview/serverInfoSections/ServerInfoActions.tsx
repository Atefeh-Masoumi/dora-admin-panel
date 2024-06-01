import { FC, useContext, useMemo } from "react";
import { Paper, Stack } from "@mui/material";
import { MonitorSvg } from "src/components/atoms/svg-icons/MonitorSvg";
import {
  BORDER_RADIUS_1,
  BORDER_RADIUS_4,
  BORDER_RADIUS_5,
} from "src/configs/theme";
import { LoadingButton } from "@mui/lab";
import { CloudRemoveSvg } from "src/components/atoms/svg-icons/CloudRemoveSvg";
import { CloudAddSvg } from "src/components/atoms/svg-icons/CloudAddSvg";
import { StopSvg } from "src/components/atoms/svg-icons/StopSvg";
import { PlaySvg } from "src/components/atoms/svg-icons/PlaySvg";
import { ElectricitySvg } from "src/components/atoms/svg-icons/ElectricitySvg";
import { LeftRotateSvg } from "src/components/atoms/svg-icons/LeftRotateSvg";
import {
  usePutApiMyVmHostDisconnectByIdMutation,
  usePutApiMyVmHostConnectByIdMutation,
  usePutApiMyVmHostStartByIdMutation,
  usePutApiMyVmHostStopByIdMutation,
  usePutApiMyVmHostRebootByIdMutation,
  usePutApiMyVmHostShutdownByIdMutation,
  useGetApiMyVmHostGetByIdQuery,
  GetRemoteConsoleResponse,
} from "src/app/services/api.generated";
import { EditServerContext } from "src/components/organisms/vm/edit/rebuild/contexts/EditServerContext";
import { toast } from "react-toastify";
import { useLazyGetApiMyVmKmsGetByIdAndTypeIdQuery } from "src/app/services/api";
import { useParams } from "react-router";
import { VM_TYPE } from "src/constant/vmTypeEnum.constant";

type ServerInfoActionsPropsType = {};

export const ServerInfoActions: FC<ServerInfoActionsPropsType> = () => {
  const { id } = useParams();

  const { serverId } = useContext(EditServerContext);
  const [getConsoleUrl, { isLoading: getConsoleUrlLoading }] =
    useLazyGetApiMyVmKmsGetByIdAndTypeIdQuery();
  const [disconnectServer, { isLoading: disconnectServerIsLoading }] =
    usePutApiMyVmHostDisconnectByIdMutation();
  const [connectServer, { isLoading: connectServerIsLoading }] =
    usePutApiMyVmHostConnectByIdMutation();
  const [startServer, { isLoading: startServerIsLoading }] =
    usePutApiMyVmHostStartByIdMutation();
  const [stopServer, { isLoading: stopServerIsLoading }] =
    usePutApiMyVmHostStopByIdMutation();
  const [shutdownServer, { isLoading: shutdownServerIsLoading }] =
    usePutApiMyVmHostShutdownByIdMutation();
  const [rebootServer, { isLoading: rebootServerIsLoading }] =
    usePutApiMyVmHostRebootByIdMutation();

  const { data: vmData, isLoading: getVmDataLoading } =
    useGetApiMyVmHostGetByIdQuery(
      {
        id: Number(id || 0)!,
      },
      { skip: !id }
    );

  const powerOn = useMemo(
    () => vmData?.powerStatus === "POWERED_ON",
    [vmData?.powerStatus]
  );

  const sendUserToKmsConsole = (
    remoteConsoleObject: GetRemoteConsoleResponse
  ) => {
    let a = document.createElement("a");
    const url: string = remoteConsoleObject?.location || "";
    const vmTypeId = remoteConsoleObject?.vmTypeId || "";

    a.href =
      vmTypeId === VM_TYPE.VM_WARE ? "/console/wmks-sdk.html?url=" + url : url;
    a.target = "_blank";
    a.click();
  };

  const actionsArray = [
    {
      label: "Web Console",
      Icon: MonitorSvg,
      onClick: () => {
        getConsoleUrl({ id: serverId || 0, typeId: 2 })
          .unwrap()
          .then((res) => {
            sendUserToKmsConsole(res);
          })
          .catch((err) => {});
      },
      isLoading: getVmDataLoading || getConsoleUrlLoading,
      isDisable: !powerOn,
    },
    {
      label: "Disconnect Network",
      Icon: CloudRemoveSvg,
      onClick: () => {
        if (!serverId) return;
        disconnectServer({ id: serverId })
          .unwrap()
          .then(() => toast.success("سرور ابری با موفقیت disconnect شد "))
          .catch((err) => {});
      },
      isLoading: getVmDataLoading || disconnectServerIsLoading,
      isDisable: !powerOn,
    },
    {
      label: "Connect Network",
      Icon: CloudAddSvg,
      onClick: () => {
        if (!serverId) return;
        connectServer({ id: serverId })
          .unwrap()
          .then(() => toast.success("سرور ابری با موفقیت connect شد "))
          .catch((err) => {});
      },
      isLoading: getVmDataLoading || connectServerIsLoading,
      isDisable: !powerOn,
    },
    {
      label: "Stop",
      Icon: StopSvg,
      onClick: () => {
        if (!serverId) return;
        stopServer({ id: serverId })
          .unwrap()
          .then(() => toast.success("سرور ابری با موفقیت stop شد "))
          .catch((err) => {});
      },
      isLoading: getVmDataLoading || stopServerIsLoading,
      isDisable: !powerOn,
    },
    {
      label: "Start",
      Icon: PlaySvg,
      onClick: () => {
        if (!serverId) return;
        startServer({ id: serverId })
          .unwrap()
          .then(() => toast.success("سرور ابری با موفقیت start شد "))
          .catch((err) => {});
      },
      isLoading: getVmDataLoading || startServerIsLoading,
      isDisable: false,
    },
    {
      label: "Shutdown",
      Icon: ElectricitySvg,
      onClick: () => {
        if (!serverId) return;
        shutdownServer({ id: serverId })
          .unwrap()
          .then(() => toast.success("سرور ابری با موفقیت shutdown شد "))
          .catch((err) => {});
      },
      isLoading: getVmDataLoading || shutdownServerIsLoading,
      isDisable: !powerOn,
    },
    {
      label: "Reboot",
      Icon: LeftRotateSvg,
      onClick: () => {
        if (!serverId) return;
        rebootServer({ id: serverId })
          .unwrap()
          .then(() => toast.success("سرور ابری با موفقیت reboot شد "))
          .catch((err) => {});
      },
      isLoading: getVmDataLoading || rebootServerIsLoading,
      isDisable: !powerOn,
    },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        overflow: "overlay",
        width: "100%",
        bgcolor: "white",
        borderRadius: BORDER_RADIUS_1,
      }}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        direction="row"
        spacing={1}
        sx={{
          mx: "auto",
          p: 3,
          width: "fit-content",
        }}
      >
        {actionsArray.map(
          ({ label, Icon, onClick, isLoading, isDisable }, index) => {
            return (
              <LoadingButton
                disabled={isDisable || isLoading}
                loading={isLoading}
                variant="outlined"
                key={index}
                endIcon={
                  <Icon
                    sx={{
                      "&>path": {
                        stroke: ({ palette }) =>
                          isDisable ? palette.secondary.light : "#3C8AFF",
                      },
                      opacity: isLoading ? "0" : "1",
                    }}
                  />
                }
                onClick={onClick}
                sx={{
                  pt: "9px !important",
                  "&>span:first-of-type": {
                    marginTop: "-5px",
                  },
                  borderRadius: BORDER_RADIUS_1,
                  border: "1px solid #3C8AFF",
                  color: "#3C8AFF",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </LoadingButton>
            );
          }
        )}
      </Stack>
    </Paper>
  );
};
