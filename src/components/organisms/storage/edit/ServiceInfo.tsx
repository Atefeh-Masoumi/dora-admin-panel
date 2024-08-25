import { FC, useMemo } from "react";
import { Chip, Divider, Paper, Stack, Typography } from "@mui/material";
import { useParams } from "react-router";
import Grid2 from "@mui/material/Unstable_Grid2";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { useGetApiMyObjectStorageHostGetByIdQuery } from "src/app/services/api.generated";
import { BoxRow } from "src/components/molecules/BoxRow";

type ServiceInfoPropsType = {};

export const ServiceInfo: FC<ServiceInfoPropsType> = () => {
  const { id } = useParams();

  const {
    data: storageData,
    isLoading: getStorageDataLoading,
    isFetching: getStorageDataFetching,
  } = useGetApiMyObjectStorageHostGetByIdQuery({
    id: Number(id)!,
  });

  const isLoading = useMemo(
    () => getStorageDataLoading || getStorageDataFetching,
    [getStorageDataFetching, getStorageDataLoading]
  );

  const isActive = useMemo(
    () => storageData?.statusId === 2,
    [storageData?.statusId]
  );

  return (
    <Grid2 container spacing={3} alignItems="center" justifyContent="center">
      <Grid2 xs={12} md={10}>
        <Paper
          component={Stack}
          rowGap={2}
          elevation={0}
          sx={{
            borderRadius: BORDER_RADIUS_1,
            p: { xs: 2.5 },
            height: "100%",
          }}
        >
          <Typography align="center" fontWeight={700} fontSize={18}>
            فضای ابری
          </Typography>
          <Divider />
          <BoxRow
            title="Status"
            component={
              <Chip
                label={storageData?.status}
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
            title="Object Storage Name"
            component={
              <Chip
                label={storageData?.name}
                sx={{
                  borderRadius: BORDER_RADIUS_1,
                }}
              />
            }
            isLoading={isLoading}
          />
          <BoxRow
            title="DataCenter"
            value={storageData?.datacenter}
            isLoading={isLoading}
          />

          <BoxRow
            title="Disk Capacity"
            value={storageData?.disk}
            isLoading={isLoading}
          />
          <BoxRow
            title="Access"
            value={storageData?.public}
            isLoading={isLoading}
          />
          <BoxRow
            title="Create Date"
            value={storageData?.createDate}
            isLoading={isLoading}
          />
        </Paper>
      </Grid2>
    </Grid2>
  );
};
