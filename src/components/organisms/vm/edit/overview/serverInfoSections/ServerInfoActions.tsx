import { FC, useContext, useMemo } from "react";
import { Paper, Stack } from "@mui/material";
import { MonitorSvg } from "src/components/atoms/svg/MonitorSvg";
import { BORDER_RADIUS_4, BORDER_RADIUS_5 } from "src/configs/theme";
import { LoadingButton } from "@mui/lab";
import { CloudRemoveSvg } from "src/components/atoms/svg/CloudRemoveSvg";
import { CloudAddSvg } from "src/components/atoms/svg/CloudAddSvg";
import { StopSvg } from "src/components/atoms/svg/StopSvg";
import { PlaySvg } from "src/components/atoms/svg/PlaySvg";
import { ElectricitySvg } from "src/components/atoms/svg/ElectricitySvg";
import { LeftRotateSvg } from "src/components/atoms/svg/LeftRotateSvg";
import {
  usePutApiMyVmHostDisconnectByIdMutation,
  usePutApiMyVmHostConnectByIdMutation,
  usePutApiMyVmHostStartByIdMutation,
  usePutApiMyVmHostStopByIdMutation,
  usePutApiMyVmHostRebootByIdMutation,
  usePutApiMyVmHostShutdownByIdMutation,
  useGetApiMyVmHostGetByIdQuery,
} from "src/app/services/api.generated";
import { EditServerContext } from "src/components/organisms/vm/edit/rebuild/contexts/EditServerContext";
import { toast } from "react-toastify";
import { useLazyGetApiMyVmKmsGetByIdAndTypeIdQuery } from "src/app/services/api";
import { useParams } from "react-router";

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

  const { data: vmData } = useGetApiMyVmHostGetByIdQuery(
    {
      id: Number(id || 0)!,
    },
    { skip: !id }
  );

  const powerOn = useMemo(
    () => vmData?.powerStatus === "POWERED_ON",
    [vmData?.powerStatus]
  );

  const sendUserToKmsConsole = (url: string) => {
    let a = document.createElement("a");
    a.href = "/console/wmks-sdk.html?url=" + url;
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
            if (!res) return;
            sendUserToKmsConsole(res);
          });
      },
      isLoading: getConsoleUrlLoading,
      isDisable: !powerOn,
    },
    {
      label: "Disconnect Network",
      Icon: CloudRemoveSvg,
      onClick: () => {
        if (!serverId) return;
        disconnectServer({ id: serverId })
          .unwrap()
          .then(() => toast.success("سرور ابری با موفقیت disconnect شد "));
      },
      isLoading: disconnectServerIsLoading,
      isDisable: !powerOn,
    },
    {
      label: "Connect Network",
      Icon: CloudAddSvg,
      onClick: () => {
        if (!serverId) return;
        connectServer({ id: serverId })
          .unwrap()
          .then(() => toast.success("سرور ابری با موفقیت connect شد "));
      },
      isLoading: connectServerIsLoading,
      isDisable: !powerOn,
    },
    {
      label: "Stop",
      Icon: StopSvg,
      onClick: () => {
        if (!serverId) return;
        stopServer({ id: serverId })
          .unwrap()
          .then(() => toast.success("سرور ابری با موفقیت stop شد "));
      },
      isLoading: stopServerIsLoading,
      isDisable: !powerOn,
    },
    {
      label: "Start",
      Icon: PlaySvg,
      onClick: () => {
        if (!serverId) return;
        startServer({ id: serverId })
          .unwrap()
          .then(() => toast.success("سرور ابری با موفقیت start شد "));
      },
      isLoading: startServerIsLoading,
      isDisable: false,
    },
    {
      label: "Shutdown",
      Icon: ElectricitySvg,
      onClick: () => {
        if (!serverId) return;
        shutdownServer({ id: serverId })
          .unwrap()
          .then(() => toast.success("سرور ابری با موفقیت shutdown شد "));
      },
      isLoading: shutdownServerIsLoading,
      isDisable: !powerOn,
    },
    {
      label: "Reboot",
      Icon: LeftRotateSvg,
      onClick: () => {
        if (!serverId) return;
        rebootServer({ id: serverId })
          .unwrap()
          .then(() => toast.success("سرور ابری با موفقیت reboot شد "));
      },
      isLoading: rebootServerIsLoading,
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
        borderRadius: BORDER_RADIUS_4,
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
            // const isVMRC = label === "VMRC Console";

            return (
              <LoadingButton
                disabled={isDisable}
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
                  borderRadius: BORDER_RADIUS_5,
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
