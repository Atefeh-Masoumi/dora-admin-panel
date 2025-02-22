import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { Add } from "src/components/atoms/svg-icons/AddSvg";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { CreateFirewallDialog } from "src/components/organisms/vm/edit/firewall/create/CreateFirewallDialog";
import { firewallTableStruct } from "./table/struct";
import FirewallTableRow from "./table/FirewallTableRow";
import {
  useGetApiMyVmFirewallListByVmHostIdQuery,
  VmFirewallListResponse,
} from "src/app/services/api.generated";

type FirewallPropsType = {};

enum DIALOG_TYPE_ENUM {
  CREATE = "CREATE",
  DELETE = "DELETE",
}

export const Firewall: FC<FirewallPropsType> = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [dialogType, setDialogType] = useState<DIALOG_TYPE_ENUM | null>(null);
  useState<VmFirewallListResponse | null>(null);

  const { id } = useParams();
  const { data: firewallList = [], isLoading: getFirewallLoading, refetch} =
    useGetApiMyVmFirewallListByVmHostIdQuery(
      { vmHostId: Number(id) },
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
      <Typography
        color="grey.700"
        fontSize={24}
        fontWeight={700}
        sx={{ mb: 2 }}
      >
        مدیریت رول ها
      </Typography>
      <Paper
        elevation={0}
        sx={{ overflow: "hidden", px: { xs: 2, sm: 3, md: 4, lg: 5 }, py: 5 }}
      >
        <Stack
          pb={2}
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent="end"
          gap={1}
        >
          <Stack direction={{ xs: "column", sm: "row" }} gap={1}>
            <Button
              onClick={openCreateDialogHandler}
              variant="outlined"
              startIcon={
                <Add sx={{ "& path": { stroke: "rgba(60, 138, 255, 1)" } }} />
              }
            >
              افزودن رول
            </Button>
          </Stack>
        </Stack>
        <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
        <Stack>
          <BaseTable
            struct={firewallTableStruct}
            RowComponent={FirewallTableRow}
            rows={firewallList}
            text="در حال حاضر رکورد وجود ندارد"
            isLoading={getFirewallLoading}
            initialOrder={2}
          />
        </Stack>
      </Paper>
      <CreateFirewallDialog
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
