import { Box, Divider, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useParams } from "react-router";
import { useGetApiMyDnsCdnRouteListByDnsCdnHostIdQuery } from "src/app/services/api.generated";
import { CreateLoadBalanceDialog } from "src/components/organisms/cdn/edit/loadbalance/dialogs/CreateLoadBalanceDialog";
import LoadBalanceTableRow from "src/components/organisms/cdn/edit/loadbalance/tables/LoadBalanceTableRow";
import { loadBalanceTableStruct } from "src/components/organisms/cdn/edit/loadbalance/tables/struct";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { BORDER_RADIUS_1 } from "src/configs/theme";

type LoadBalancePropsType = {};

const LoadBalance: FC<LoadBalancePropsType> = () => {
  const [showDialog, setShowDialog] = useState(false);
  const { id } = useParams();
  const dnsId = Number(id) || 0;

  const { data, isLoading } = useGetApiMyDnsCdnRouteListByDnsCdnHostIdQuery({
    dnsCdnHostId: dnsId,
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
        borderRadius={BORDER_RADIUS_1}
        direction="column"
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography fontSize={18} color="secondary">
            لیست Load Balance ابری
          </Typography>
          {/* <Button
            onClick={openDialog}
            variant="outlined"
            size="large"
            sx={{ whiteSpace: "nowrap", px: 1.2 }}
            startIcon={
              <Add sx={{ "& path": { stroke: "rgba(60, 138, 255, 1)" } }} />
            }
          >
            افزودن کلاستر جدید
          </Button> */}
        </Stack>
        <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
        <Box width="100%" sx={{ pt: 1.5 }}>
          <BaseTable
            struct={loadBalanceTableStruct}
            RowComponent={LoadBalanceTableRow}
            rows={data || []}
            text="در حال حاضر Load Balance وجود ندارد"
            isLoading={isLoading}
          />
        </Box>
      </Stack>
      <CreateLoadBalanceDialog
        openDialog={showDialog}
        onClose={closeDialog}
        dnsId={dnsId}
      />
    </>
  );
};

export default LoadBalance;
