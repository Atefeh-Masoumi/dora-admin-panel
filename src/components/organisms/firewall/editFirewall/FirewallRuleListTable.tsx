import { Add } from "@mui/icons-material";
import { Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { RefreshButton } from "src/components/atoms/RefreshButton";
import {
  useGetApiMyVmByProjectIdFirewallAndVmFirewallIdRuleListQuery,
} from "src/app/services/api.generated";
import { firewallRuleTableStruct } from "./struct";
import FirewallRuleTableRow from "./FirewallRuleTableRow";
import { AddFirewallRuleDialog } from "./AddFirewallRuleDialog";

const FirewallRuleListTable: FC = () => {
  const { projectId, firewallId } = useParams();
  const [showAddDialog, setShowAddDialog] = useState(false);

  const {
    data: firewallRuleList = [],
    isLoading: getFirewallRuleListLoading,
    refetch,
    isFetching,
  } = useGetApiMyVmByProjectIdFirewallAndVmFirewallIdRuleListQuery({
    projectId: Number(projectId),
    vmFirewallId: Number(firewallId),
  });

  useEffect(() => {
    const getNotifInterval = setInterval(() => {
      refetch();
    }, 120 * 1000);
    return () => {
      clearInterval(getNotifInterval);
    };
  }, [refetch]);

  const openAddDialogHandler = () => {
    setShowAddDialog(true);
  };

  const closeAddDialogHandler = () => {
    setShowAddDialog(false);
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
              لیست رول فایروال
            </Typography>
            <RefreshButton isFetching={isFetching} refetchData={refetch} />
          </Stack>
          <Button
            onClick={openAddDialogHandler}
            variant="outlined"
            startIcon={<Add />}
          >
            ایجاد رول جدید
          </Button>
        </Stack>
        <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
        <Stack>
          <BaseTable
            struct={firewallRuleTableStruct}
            RowComponent={FirewallRuleTableRow}
            rows={firewallRuleList}
            text="در حال حاضر رولی وجود ندارد"
            isLoading={getFirewallRuleListLoading}
            initialOrder={0}
          />
        </Stack>
      </Paper>
      <AddFirewallRuleDialog
        maxWidth="sm"
        fullWidth
        open={showAddDialog}
        onClose={closeAddDialogHandler}
        forceClose={closeAddDialogHandler}
        refetch={refetch}
      />
    </>
  );
};

export default FirewallRuleListTable;

