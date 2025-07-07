import { Add } from "@mui/icons-material";
import { Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { RefreshButton } from "src/components/atoms/RefreshButton";
import {
  VmNetworkNodeListResponse,
  useGetApiMyVmByProjectIdNetworkNodeListQuery,
} from "src/app/services/api.generated";
import { networkNodeTableStruct } from "./struct";
import NetworkNodeTableRow from "./NetworkNodeTableRow";
import { AttachNodeDialog } from "./AttachNodeDialog";

const NetworkNodelistTable: FC = () => {
  const { projectId, networkId, vmId } = useParams();
  const [showAttachDialog, setShowAttachDialog] = useState(false);

  const queryParams = {
    projectId: Number(projectId),
    ...(networkId && { vmNetworkId: Number(networkId) }),
    ...(vmId && { vmHostId: Number(vmId) })
  };

  const {
    data: networkNodeList = [],
    isLoading: getNetworkNodeListLoading,
    refetch,
    isFetching,
  } = useGetApiMyVmByProjectIdNetworkNodeListQuery(queryParams);

  useEffect(() => {
    const getNotifInterval = setInterval(() => {
      refetch();
    }, 120 * 1000);
    return () => {
      clearInterval(getNotifInterval);
    };
  }, [refetch]);

  const openAttachDialogHandler = () => {
    setShowAttachDialog(true);
  };

  const closeAttachDialogHandler = () => {
    setShowAttachDialog(false);
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
          <Stack direction={{ xs: "column", sm: "row" }} gap={1}>
            <Typography
              color="grey.700"
              fontSize={24}
              fontWeight={700}
              sx={{ mb: 2 }}
            >
              نودهای شبکه
            </Typography>
            <RefreshButton isFetching={isFetching} refetchData={refetch} />
          </Stack>
          <Button
            onClick={openAttachDialogHandler}
            variant="outlined"
            startIcon={
              <Add sx={{ "& path": { stroke: "rgba(60, 138, 255, 1)" } }} />
            }
          >
            اتصال نود
          </Button>
        </Stack>
        <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
        <Stack>
          <BaseTable
            struct={networkNodeTableStruct}
            RowComponent={NetworkNodeTableRow}
            rows={networkNodeList}
            text="در حال حاضر نودی وجود ندارد"
            isLoading={getNetworkNodeListLoading}
            initialOrder={0}
          />
        </Stack>
      </Paper>
      <AttachNodeDialog
        maxWidth="xs"
        fullWidth
        open={showAttachDialog}
        onClose={closeAttachDialogHandler}
        forceClose={closeAttachDialogHandler}
        refetch={refetch}
      />
    </>
  );
};

export default NetworkNodelistTable;
