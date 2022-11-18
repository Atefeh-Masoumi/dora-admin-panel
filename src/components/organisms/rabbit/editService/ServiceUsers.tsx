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
import { BORDER_RADIUS_5, BORDER_RADIUS_4 } from "src/configs/theme";
import { EditRabbitContext } from "src/components/organisms/rabbit/context/EditRabbitContext";
import { DeleteSvg } from "src/components/atoms/svg/DeleteSvg";
import {
  GetApiV2RabbitRabbitUserListByRabbitHostIdApiResponse,
  RabbitHostUserListResponse,
  useDeleteApiV2RabbitRabbitUserDeleteByIdMutation,
} from "src/app/services/api.generated";
import { useLazyGetApiV2VmVmIpListByVmIdQuery } from "src/app/services/api";

const RabbitUsersRow: FC<RabbitHostUserListResponse> = ({ userName, id }) => {
  const [deleteUser, { isLoading }] = useDeleteApiV2RabbitRabbitUserDeleteByIdMutation();

  const onClick = () => id && deleteUser({ id });

  return (
    <Grid2
      sx={{ bgcolor: "#F0F7FF", borderRadius: BORDER_RADIUS_5 }}
      container
      spacing={3}
      alignItems="center"
      justifyContent="center"
    >
      <Grid2
        xs={6}
        sm={4}
        container
        alignItems="center"
        justifyContent="center"
      >
        <Typography maxWidth={125} textOverflow="ellipsis">
          {userName}
        </Typography>
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

type ServiceUsersPropsType = {};

export const ServiceUsers: FC<ServiceUsersPropsType> = () => {
  const { serverId } = useContext(EditRabbitContext);
  const [data, setData] = useState<GetApiV2RabbitRabbitUserListByRabbitHostIdApiResponse | null>(
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
        شناسه کاربری
      </Typography>
      <br />
      <Grid2 sx={{ p: 1 }} xs={12} md={8}>
        <Paper
          component={Stack}
          direction="column"
          spacing={1}
          elevation={0}
          sx={{ p: 2.5, borderRadius: BORDER_RADIUS_4 }}
        >
          <Typography fontWeight={700} fontSize={18} align="right">
            Users
          </Typography>
          <Divider />
          <Grid2 container alignItems="center">
            <Grid2 xs={6} sm={4}>
              <Typography color="grey.700" align="center">
                شناسه کاربری
              </Typography>
            </Grid2>
            <Grid2 xs={3} sm={3.9} />
          </Grid2>
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            data
              ?.filter((item) => item.userName)
              .map((filteredItem, index) => {
                return <RabbitUsersRow key={index} {...filteredItem} />;
              })
          )}
        </Paper>
      </Grid2>
    </>
  );
};
