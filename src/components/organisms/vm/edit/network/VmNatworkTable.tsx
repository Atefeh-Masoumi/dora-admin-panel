import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { AttachNodeDialog } from "./AttachNodeDialog";
import { VmnetworkTableTableStruct } from "./struct";
import NetworkTableRow from "./VmNetworkTableRow";
import {
  useGetApiMyVmByProjectIdNetworkNodeListQuery,
  VmNetworkNodeListResponse,
} from "src/app/services/api.generated";
import { Add } from "@mui/icons-material";

type FirewallPropsType = {};

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

export const Network: FC<FirewallPropsType> = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  useState<VmNetworkNodeListResponse | null>(null);

  const { id, projectId } = useParams();
  const { data: firewallList = [], isLoading: getFirewallLoading, refetch } =
    useGetApiMyVmByProjectIdNetworkNodeListQuery(
      {
        projectId: Number(projectId),
        vmHostId: Number(id)
      },
      { skip: !id }
    );
  const openCreateDialogHandler = () => {
    setShowCreateDialog(true);
  };
  const closeDialogHandler = () => {
    setDialogType(null);
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
            sx={{ mb: 2 }}
          >
            مدیریت شبکه
          </Typography>

          <Button
            onClick={openCreateDialogHandler}
            variant="outlined"
            startIcon={
              <Add sx={{ "& path": { stroke: "rgba(60, 138, 255, 1)" } }} />
            }
          >
            اتصال به شبکه
          </Button>
        </Stack>
        <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
        <Stack>
          <BaseTable
            struct={VmnetworkTableTableStruct}
            RowComponent={NetworkTableRow}
            rows={firewallList}
            text="در حال حاضر رکورد وجود ندارد"
            isLoading={getFirewallLoading}
            initialOrder={2}
          />
        </Stack>
      </Paper>
      <AttachNodeDialog
        maxWidth="xs"
        fullWidth
        open={showCreateDialog}
        onClose={closeDialogHandler}
        forceClose={closeDialogHandler}
        refetch={refetch}
      />
    </>
  );
};
