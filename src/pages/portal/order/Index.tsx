import { FC } from "react";
import { Button, Divider, Stack, Typography } from "@mui/material";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { OrderTableRow } from "src/components/organisms/portal/order/tables/OrderTableRow";
import { orderTableStruct } from "src/components/organisms/portal/order/tables/struct";
import { useGetPortalPanelOrderListQuery } from "src/app/services/api.generated";
import { RefreshSvg } from "src/components/atoms/svg/RefreshSvg";
import { BORDER_RADIUS_5 } from "src/configs/theme";

const Cart: FC = () => {
  const { data, refetch, isLoading } = useGetPortalPanelOrderListQuery();

  const refetchOnClick = () => refetch();

  return (
    <Stack borderRadius={2} bgcolor="white" p={{ xs: 1.8, lg: 3 }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems={{ xs: "start", md: "center" }}
        justifyContent="space-between"
        spacing={2}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems={{ xs: "start", md: "center" }}
          width="100%"
        >
          <Typography variant="text1" color="secondary" whiteSpace="nowrap">
            لیست سبد خرید
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Button
            onClick={refetchOnClick}
            variant="outlined"
            size="large"
            sx={{
              whiteSpace: "nowrap",
              px: 1.2,
              borderRadius: BORDER_RADIUS_5,
            }}
            startIcon={<RefreshSvg sx={{ width: 20, height: 20 }} />}
          >
            بازخوانی
          </Button>
        </Stack>
      </Stack>
      <Divider variant="middle" sx={{ my: 2 }} />
      <Stack>
        <BaseTable
          struct={orderTableStruct}
          RowComponent={OrderTableRow}
          rows={data || []}
          text="سبد خرید شما خالی است"
          isLoading={isLoading}
          initialOrder={1}
        />
      </Stack>
    </Stack>
  );
};
export default Cart;
