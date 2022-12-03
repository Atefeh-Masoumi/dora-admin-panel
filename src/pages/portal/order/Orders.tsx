import { FC } from "react";
import { Divider, Stack, Typography } from "@mui/material";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { CartTableRow } from "src/components/organisms/portal/order/tables/CartTableRow";
import { cartTableStruct } from "src/components/organisms/portal/order/tables/struct";
import { useGetUserV2PortalInvoiceNotPaidListQuery } from "src/app/services/api.generated";

const Cart: FC = () => {
  const { data, isLoading } = useGetUserV2PortalInvoiceNotPaidListQuery();

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
      </Stack>
      <Divider variant="middle" sx={{ my: 2 }} />
      <Stack>
        <BaseTable
          struct={cartTableStruct}
          RowComponent={CartTableRow}
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
