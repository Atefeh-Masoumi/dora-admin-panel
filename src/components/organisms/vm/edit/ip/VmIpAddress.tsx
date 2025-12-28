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
import { Add } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import AddIpDialog from "./dialog/AddIpDialog";
import { RefreshButton } from "src/components/atoms/RefreshButton";
import { Network } from "../network/VmNatworkTable";
import { AssignFirewall } from "./AssignFirewall";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { IpTableTableStruct } from "./struct";
import IpTableRow from "./IpTableRow";

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
  const { data, refetch, isLoading, isFetching } =
    useGetApiMyVmByProjectIdHostAndVmHostIdIpListQuery({ projectId: Number(projectId), vmHostId: Number(id) })

  const openCreateDialogHandler = () => {
    setShowCreateDialog(true);
  };

  const closeDialogHandler = () => {
    setShowCreateDialog(false);
  };

  return (
    <>
    <AssignFirewall/>
      <Paper
        elevation={0}
        sx={{ overflow: "hidden", px: { xs: 2, sm: 3, md: 4, lg: 5 }, py: 5, my:"20px" }}
      >
        <Stack
          pb={2}
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent="space-between"
          gap={1}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems="center"
            spacing={2}
          >
            <Typography
              color="grey.700"
              fontSize={24}
              fontWeight={700}
            >
             شبکه عمومی
            </Typography>
            <RefreshButton isFetching={isFetching} refetchData={refetch} />
          </Stack>
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
          <Stack>
          <BaseTable
            struct={IpTableTableStruct}
            RowComponent={IpTableRow}
            rows={
              data?? []
            }
            text="در حال حاضر رکورد وجود ندارد"
            isLoading={isLoading}
            initialOrder={2}
          />
        </Stack>
        </Stack>
      </Paper>
      <Network/>
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
