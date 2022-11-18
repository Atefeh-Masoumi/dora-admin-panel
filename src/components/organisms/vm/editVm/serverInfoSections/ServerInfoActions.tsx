import { FC, useContext } from "react";
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
  usePostApiV2VmVmKmsGetMutation,
  usePutApiV2VmVmDisconnectByIdMutation,
  usePutApiV2VmVmConnectByIdMutation,
  usePutApiV2VmVmStartByIdMutation,
  usePutApiV2VmVmStopByIdMutation,
  usePutApiV2VmVmRebootByIdMutation,
  usePutApiV2VmVmShutdownByIdMutation,
} from "src/app/services/api.generated";
import { EditServerContext } from "src/components/organisms/vm/editVm/contexts/EditServerContext";
import { toast } from "react-toastify";

type ServerInfoActionsPropsType = {};

export const ServerInfoActions: FC<ServerInfoActionsPropsType> = () => {
  const { serverId } = useContext(EditServerContext);
  const [getUrl, { isLoading: getUrlIsLoading }] =
    usePostApiV2VmVmKmsGetMutation();
  const [disconnectServer, { isLoading: disconnectServerIsLoading }] =
    usePutApiV2VmVmDisconnectByIdMutation();
  const [connectServer, { isLoading: connectServerIsLoading }] =
    usePutApiV2VmVmConnectByIdMutation();
  const [startServer, { isLoading: startServerIsLoading }] =
    usePutApiV2VmVmStartByIdMutation();
  const [stopServer, { isLoading: stopServerIsLoading }] =
    usePutApiV2VmVmStopByIdMutation();
  const [shutdownServer, { isLoading: shutdownServerIsLoading }] =
    usePutApiV2VmVmShutdownByIdMutation();
  const [rebootServer, { isLoading: rebootServerIsLoading }] =
    usePutApiV2VmVmRebootByIdMutation();

  const actionsArray = [
    {
      label: "Console to VM",
      Icon: MonitorSvg,
      onClick: () => {
        if (!serverId) return;

        getUrl({
          getKmsModel: {
            id: serverId,
            typeId: 2,
          },
        })
          .unwrap()
          .then((res) => {
            if (res) {
              let a = document.createElement("a");
              a.href = "/console/wmks-sdk.html?url=" + res;
              a.target = "_blank";
              a.click();
            }
          });
      },
      isLoading: getUrlIsLoading,
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
          py: 3,
          width: { xs: 900, md: 930, lg: 995, xl: 1010 },
        }}
      >
        {actionsArray.map(({ label, Icon, onClick, isLoading }, index) => (
          <LoadingButton
            loading={isLoading}
            variant="outlined"
            key={index}
            endIcon={<Icon sx={{ "&>path": { stroke: "#3C8AFF" } }} />}
            onClick={onClick}
            sx={{
              pt: "9px !important",
              "&>span:first-of-type": {
                marginTop: "-5px",
              },
              borderRadius: BORDER_RADIUS_5,
              border: "1px solid #3C8AFF",
              color: "#3C8AFF",
            }}
          >
            {label}
          </LoadingButton>
        ))}
      </Stack>
    </Paper>
  );
};
