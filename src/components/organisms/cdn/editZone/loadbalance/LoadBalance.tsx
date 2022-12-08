import { FC, useState } from "react";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useAppSelector } from "src/app/hooks";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { loadBalanceTableStruct } from "src/components/organisms/cdn/editZone/loadbalance/tables/struct";
import { LoadBalanceTableRow } from "src/components/organisms/cdn/editZone/loadbalance/tables/LoadBalanceTableRow";
import { AddLoadBalanceDialog } from "src/components/organisms/cdn/editZone/loadbalance/dialogs/AddLoadBalanceDialog";
import { useGetUserV2CdnLoadBalanceListByZoneNameQuery } from "src/app/services/api.generated";

type LoadBalancePropsType = {};

const LoadBalance: FC<LoadBalancePropsType> = () => {
  const [showDialog, setShowDialog] = useState(false);
  const selectedDomain = useAppSelector((state) => state.cdn.selectedDomain);

  const { data, isLoading } = useGetUserV2CdnLoadBalanceListByZoneNameQuery({
    zoneName: selectedDomain?.zoneName || "",
  });

  const openDialog = () => setShowDialog(true);
  const closeDialog = () => setShowDialog(false);

  return (
    <>
      <Stack
        bgcolor="white"
        py={3}
        px={3}
        width="100%"
        borderRadius={3}
        direction="column"
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography fontSize={18} color="secondary">
            لیست Load Balancer ابری
          </Typography>
          <Button
            onClick={openDialog}
            variant="outlined"
            size="large"
            sx={{ whiteSpace: "nowrap", px: 1.2 }}
            startIcon={
              <Add sx={{ "& path": { stroke: "rgba(60, 138, 255, 1)" } }} />
            }
          >
            افزودن کلاستر جدید
          </Button>
        </Stack>
        <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
        <Box width="100%" sx={{ pt: 1.5 }}>
          <BaseTable
            struct={loadBalanceTableStruct}
            RowComponent={LoadBalanceTableRow}
            rows={data || []}
            text="در حال حاضر Load Balancer وجود ندارد"
            isLoading={isLoading}
          />
        </Box>
      </Stack>
      {showDialog && <AddLoadBalanceDialog onClose={closeDialog} />}
    </>
  );
};

export default LoadBalance;
