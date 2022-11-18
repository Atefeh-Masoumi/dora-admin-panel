import { FC, useContext, useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Divider,
  IconButton,
  CircularProgress,
  Stack,
  Skeleton,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import {
  CheckCircleOutline as CheckCircleOutlineIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import { DeleteSvg } from "src/components/atoms/svg/DeleteSvg";
import {
  GetApiV2VmVmIpListByVmIdApiResponse,
  useDeleteApiV2VmVmIpDeleteByIdMutation,
  VmIpListResponse,
} from "src/app/services/api.generated";
import { useLazyGetApiV2VmVmIpListByVmIdQuery } from "src/app/services/api";
import { BORDER_RADIUS_5, BORDER_RADIUS_4 } from "src/configs/theme";
import { EditServerContext } from "src/components/organisms/vm/editVm/contexts/EditServerContext";

const IpRow: FC<VmIpListResponse> = ({ ip, isPrimary, id }) => {
  const [deleteIp, { isLoading }] = useDeleteApiV2VmVmIpDeleteByIdMutation();

  const onClick = () => id && deleteIp({ id });

  return (
    <Grid2
      container
      sx={{ bgcolor: "#F0F7FF", borderRadius: BORDER_RADIUS_5 }}
      alignItems="center"
    >
      <Grid2
        xs={6}
        sm={4}
        container
        alignItems="center"
        justifyContent="center"
      >
        <Typography maxWidth={125} textOverflow="ellipsis">
          {ip}
        </Typography>
      </Grid2>
      <Grid2
        xs={2.8}
        sm={3.9}
        container
        alignItems="center"
        justifyContent="center"
      >
        {isPrimary ? (
          <CheckCircleOutlineIcon sx={{ color: "grey.700" }} />
        ) : (
          <CancelIcon sx={{ color: "grey.700" }} />
        )}
      </Grid2>
      <Grid2
        xs={2.8}
        sm={3.9}
        container
        alignItems="center"
        justifyContent="center"
      >
        {isLoading ? (
          <IconButton disabled>
            <CircularProgress size={25} />
          </IconButton>
        ) : (
          <IconButton onClick={onClick}>
            <DeleteSvg />
          </IconButton>
        )}
      </Grid2>
    </Grid2>
  );
};

const LoadingSkeleton: FC = () => (
  <Grid2
    container
    sx={{ bgcolor: "#F0F7FF", borderRadius: BORDER_RADIUS_5 }}
    alignItems="center"
    height={56}
  >
    <Grid2 xs={6} sm={4} container alignItems="center" justifyContent="center">
      <Skeleton width={120} />
    </Grid2>
    <Grid2 xs={2.9} sm={4} container alignItems="center" justifyContent="center">
      <Skeleton variant="circular" width={25} height={25} />
    </Grid2>
    <Grid2 xs={2.9} sm={3.9} container alignItems="center" justifyContent="center">
      <Skeleton variant="circular" width={25} height={25} />
    </Grid2>
  </Grid2>
);

type ServerIpAddressPropsType = {};

export const ServerIpAddress: FC<ServerIpAddressPropsType> = () => {
  const { serverId } = useContext(EditServerContext);
  const [data, setData] = useState<GetApiV2VmVmIpListByVmIdApiResponse | null>(
    null
  );

  const [getData, { isLoading }] = useLazyGetApiV2VmVmIpListByVmIdQuery();

  useEffect(() => {
    if (serverId) {
      getData({ vmId: serverId })
        .unwrap()
        .then((res) => {
          res && setData(res);
        });
    }
  }, [getData, serverId]);

  return (
    <>
      <Typography color="grey.700" fontSize={24} fontWeight={700}>
        آدرس IP سرور
      </Typography>
      <br />
      <Grid2 container spacing={2} sx={{ p: 1 }}>
        <Grid2 xs={12} md={6}>
          <Paper
            component={Stack}
            direction="column"
            spacing={1}
            elevation={0}
            sx={{ p: 2.5, borderRadius: BORDER_RADIUS_4 }}
          >
            <Typography fontWeight={700} fontSize={18} align="right">
              IPv6
            </Typography>
            <Divider />
            <Grid2 container alignItems="center">
              <Grid2 xs={6} sm={4}>
                <Typography color="grey.700" align="center">
                  آدرس IP
                </Typography>
              </Grid2>
              <Grid2 xs={3} sm={3.9}>
                <Typography color="grey.700" align="center">
                  Primary
                </Typography>
              </Grid2>
              <Grid2 xs={3} sm={3.9} />
            </Grid2>
            {isLoading ? (
              <LoadingSkeleton />
            ) : (
              data
                ?.filter((item) => !item.isV4)
                .map((filteredItem, index) => {
                  return <IpRow key={index} {...filteredItem} />;
                })
            )}
          </Paper>
        </Grid2>
        <Grid2 xs={12} md={6}>
          <Paper
            component={Stack}
            direction="column"
            spacing={1}
            elevation={0}
            sx={{ p: 2.5, borderRadius: BORDER_RADIUS_4 }}
          >
            <Typography fontWeight={700} fontSize={18} align="right">
              IPv4
            </Typography>
            <Divider />
            <Grid2 container alignItems="center">
              <Grid2 xs={6} sm={4}>
                <Typography color="grey.700" align="center">
                  آدرس IP
                </Typography>
              </Grid2>
              <Grid2 xs={3} sm={3.9}>
                <Typography color="grey.700" align="center">
                  Primary
                </Typography>
              </Grid2>
              <Grid2 xs={3} sm={3.9} />
            </Grid2>
            {isLoading ? (
              <LoadingSkeleton />
            ) : (
              data
                ?.filter((item) => item.isV4)
                .map((filteredItem, index) => {
                  return <IpRow key={index} {...filteredItem} />;
                })
            )}
          </Paper>
        </Grid2>
      </Grid2>
    </>
  );
};
