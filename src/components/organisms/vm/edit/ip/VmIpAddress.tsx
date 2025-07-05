import { FC, useState } from "react";
import {
  Typography,
  Paper,
  Divider,
  Stack,
  Skeleton,
  Button,
} from "@mui/material";
import { Grid2 } from "@mui/material";
import { useGetApiMyVmByProjectIdHostAndVmHostIdIpListQuery } from "src/app/services/api.generated";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import IpRow from "./IPRow";
import { Add } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import AddIpDialog from "./dialog/AddIpDialog";

const LoadingSkeleton: FC = () => (
  <Grid2
    container
    sx={{ bgcolor: "#F0F7FF", borderRadius: BORDER_RADIUS_1 }}
    alignItems="center"
    height={56}
  >
    <Grid2 size={{ xs: 6, sm: 4 }} container alignItems="center" justifyContent="center">
      <Skeleton width={120} />
    </Grid2>
    <Grid2
      size={{ xs: 2.9, sm: 4 }}
      container
      alignItems="center"
      justifyContent="center"
    >
      <Skeleton variant="circular" width={25} height={25} />
    </Grid2>
    <Grid2
      size={{ xs: 2.9, sm: 3.9 }}
      container
      alignItems="center"
      justifyContent="center"
    >
      <Skeleton variant="circular" width={25} height={25} />
    </Grid2>
  </Grid2>
);

export const VmIpAddress: FC = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const { projectId, id } = useParams();
  const { data, refetch, isLoading } =
    useGetApiMyVmByProjectIdHostAndVmHostIdIpListQuery({ projectId: Number(projectId), vmHostId: Number(id) })

  const openCreateDialogHandler = () => {
    setShowCreateDialog(true);
  };

  const closeDialogHandler = () => {
    setShowCreateDialog(false);
  };

  return (
    <>
      <Paper
        elevation={0}
        sx={{ overflow: "hidden", px: { xs: 2, sm: 3, md: 4, lg: 5 }, py: 5 }}
      >
        <Stack
          pb={2}
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent="space-between"
          gap={1}
        >
          <Typography
            color="grey.700"
            fontSize={24}
            fontWeight={700}
          >
            آدرس IP سرور
          </Typography>
          <Button
            onClick={openCreateDialogHandler}
            variant="outlined"
            startIcon={<Add />}
          >
            افزودن IP
          </Button>
        </Stack>
        <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
        <Stack>
          <Paper
            component={Stack}
            direction="column"
            spacing={1}
            elevation={0}
            sx={{ p: 2.5, borderRadius: BORDER_RADIUS_1 }}
          >
            <Grid2 container alignItems="center">
              <Grid2 size={{ xs: 6, sm: 4 }}>
                <Typography color="grey.700" align="center">
                  آدرس IP
                </Typography>
              </Grid2>
              <Grid2 size={{ xs: 3, sm: 3.9 }}>
                <Typography color="grey.700" align="center">
                  نوع
                </Typography>
              </Grid2>
              <Grid2 size={{ xs: 3, sm: 3.9 }}>
                <Typography color="grey.700" align="center">
                  Primary
                </Typography>
              </Grid2>
              <Grid2 size={{ xs: 0, sm: 0.2 }} />
            </Grid2>
            {isLoading ? (
              <LoadingSkeleton />
            ) : (
              data
                ?.map((item, index) => {
                  return <IpRow key={index} {...item} vmHostId={Number(id)} refetch={refetch} />;
                })
            )}
          </Paper>
        </Stack>
      </Paper>
      <AddIpDialog
        maxWidth="xs"
        fullWidth
        vmId={Number(id)}
        open={showCreateDialog}
        onClose={closeDialogHandler}
        forceClose={closeDialogHandler}
        refetch={refetch}
      />
    </>
  );
};
