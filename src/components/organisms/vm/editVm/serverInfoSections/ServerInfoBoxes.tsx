import { FC, useContext, useEffect, useMemo } from "react";
import {
  Chip,
  Divider,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { EditServerContext } from "src/components/organisms/vm/editVm/contexts/EditServerContext";
import { BORDER_RADIUS_1, BORDER_RADIUS_4 } from "src/configs/theme";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useGetUserV2VmVmGetByIdQuery } from "src/app/services/api.generated";
import { useParams } from "react-router";

type boxRowType = {
  title: string;
  value?: string | number | undefined | null;
  component?: any;
  isLoading: boolean;
};

const BoxRow: FC<boxRowType> = ({ title, value, component, isLoading }) => (
  <Stack direction="row" alignItems="center" justifyContent="space-between">
    {isLoading ? (
      <Skeleton width={150} height={24} />
    ) : component ? (
      component
    ) : (
      <Typography
        sx={{ color: ({ palette }) => palette.grey[700], direction: "rtl" }}
      >
        {value || ""}
      </Typography>
    )}
    <Typography sx={{ color: ({ palette }) => palette.grey[700] }}>
      :{title}
    </Typography>
  </Stack>
);

type ServerInfoBoxesPropsType = {};

export const ServerInfoBoxes: FC<ServerInfoBoxesPropsType> = () => {
  const { id } = useParams();
  const { setDataCenter } = useContext(EditServerContext);

  const {
    data: vmData,
    isLoading: getVmDataLoading,
    isFetching: getVmDataFetching,
  } = useGetUserV2VmVmGetByIdQuery({
    id: Number(id)!,
  });

  const isLoading = useMemo(
    () => getVmDataLoading || getVmDataFetching,
    [getVmDataFetching, getVmDataLoading]
  );

  useEffect(() => {
    if (vmData?.datacenterId) {
      setDataCenter(vmData.datacenterId);
    }
  }, [setDataCenter, vmData]);

  const isActive = useMemo(() => vmData?.statusId === 2, [vmData?.statusId]);
  const powerOn = useMemo(
    () => vmData?.powerStatus === "POWERED_ON",
    [vmData?.powerStatus]
  );
  const isConnected = useMemo(
    () => vmData?.networkStatus === "CONNECTED",
    [vmData?.networkStatus]
  );

  return (
    <Grid2
      container
      spacing={3}
      justifyContent="space-between"
      alignItems="stretch"
    >
      <Grid2 xs={12} md={6}>
        <Paper
          component={Stack}
          rowGap={2}
          elevation={0}
          sx={{ borderRadius: BORDER_RADIUS_4, p: { xs: 2.5 }, height: "100%" }}
        >
          <Typography align="right" fontWeight={700} fontSize={18}>
            Virtual Machine
          </Typography>
          <Divider />
          <BoxRow
            title="Status"
            component={
              <Chip
                label={vmData?.status}
                sx={{
                  bgcolor: ({ palette }) =>
                    isActive ? palette.success.light : palette.error.light,
                  color: ({ palette }) =>
                    isActive ? palette.success.main : palette.error.main,
                  borderRadius: BORDER_RADIUS_1,
                }}
              />
            }
            isLoading={isLoading}
          />
          <BoxRow
            title="Server Name"
            value={vmData?.name}
            isLoading={isLoading}
          />
          <BoxRow
            title="Operating System"
            value={vmData?.operatingSystem}
            isLoading={isLoading}
          />
          <BoxRow
            title="Power Status"
            component={
              <Typography color={powerOn ? "success.main" : "error.main"}>
                {vmData?.powerStatus}
              </Typography>
            }
            isLoading={isLoading}
          />
          <BoxRow
            title="Network Status"
            component={
              <Typography color={isConnected ? "success.main" : "error.main"}>
                {vmData?.networkStatus}
              </Typography>
            }
            isLoading={isLoading}
          />
        </Paper>
      </Grid2>
      <Grid2 xs={12} md={6}>
        <Paper
          component={Stack}
          rowGap={2}
          elevation={0}
          sx={{ borderRadius: BORDER_RADIUS_4, p: { xs: 2.5 }, height: "100%" }}
        >
          <Typography align="right" fontWeight={700} fontSize={18}>
            Hardware
          </Typography>
          <Divider />
          <BoxRow
            title="CPU"
            value={`${vmData?.cpu} Core`}
            isLoading={isLoading}
          />
          <BoxRow
            title="Memory"
            value={`${vmData?.memory} G`}
            isLoading={isLoading}
          />
          <BoxRow
            title="Disk"
            value={`${vmData?.disk} GB`}
            isLoading={isLoading}
          />
          <BoxRow
            title="IP Address"
            value={vmData?.ip}
            isLoading={isLoading}
          />
          <BoxRow
            title="MAC Address"
            value={vmData?.macAddress}
            isLoading={isLoading}
          />
        </Paper>
      </Grid2>
    </Grid2>
  );
};
