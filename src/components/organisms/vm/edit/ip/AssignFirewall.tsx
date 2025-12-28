import { Divider, Paper, Skeleton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import LoadingButton from "src/components/atoms/LoadingButton";
import { RefreshButton } from "src/components/atoms/RefreshButton";
import { AssignFirewallDialog } from "./dialog/AssignFirewallDialog";
import { useGetApiMyVmByProjectIdHostAndVmHostIdFirewallListQuery } from "src/app/services/api.generated";
import { useParams } from "react-router";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { FirewalStruct } from "./struct";
import { FirewalTableRow } from "./FirewallTableRow";

export const AssignFirewall = () => {
  const { projectId, id: vmHostId } = useParams();

  const { data, isLoading, refetch } =
    useGetApiMyVmByProjectIdHostAndVmHostIdFirewallListQuery({
      projectId: Number(projectId),
      vmHostId: Number(vmHostId),
    });

  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <Paper
        elevation={0}
        sx={{ overflow: "hidden", px: { xs: 2, sm: 3, md: 4, lg: 5 }, pt: 5 }}
      >
        <Stack
          pb={0}
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
            <Typography color="grey.700" fontSize={24} fontWeight={700}>
              فایروال
            </Typography>
            <RefreshButton isFetching={isLoading} refetchData={refetch} />
          </Stack>

          <Stack
            direction={{ xs: "column", md: "row" }}
            alignItems="center"
            justifyContent={{ xs: "center", md: "space-between" }}
          >
            <LoadingButton variant="outlined" onClick={() => setOpenDialog(true)}>
              تغییر فایروال
            </LoadingButton>
          </Stack>
        </Stack>

        <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />

        <Stack mt={6} mb={1} px={3} direction="column" rowGap={{ xs: 3, md: 6.5 }}>
          {isLoading ? (
            <Skeleton variant="text" width="100%" height={40} />
          ) : (
            <BaseTable
              struct={FirewalStruct}
              RowComponent={FirewalTableRow}
              rows={data ?? []}
              text="در حال حاضر رکورد وجود ندارد"
              isLoading={isLoading}
              initialOrder={2}
            />
          )}
        </Stack>
      </Paper>

      <AssignFirewallDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        forceClose={() => setOpenDialog(false)}
      />
    </>
  );
};
