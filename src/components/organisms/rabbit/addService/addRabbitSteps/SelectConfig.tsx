import { FC, useMemo } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { PRODUCT_CATEGORY_ENUM } from "src/constant/productCategoryEnum";
import { useGetApiV2PortalProductBundleListByProductCategoryIdQuery } from "src/app/services/api.generated";
import { AddRabbitTableRow } from "../tables/AddRabbitTableRow";
import { AddRabbitTableStruct } from "../tables/struct";

type SelectConfigPropsType = {};

export const SelectConfig: FC<SelectConfigPropsType> = () => {
  const { data: configsList, isLoading } =
    useGetApiV2PortalProductBundleListByProductCategoryIdQuery({
      productCategoryId: PRODUCT_CATEGORY_ENUM.RABBIT_MQ,
    });

  const table = useMemo(
    () => (
      <BaseTable
        struct={AddRabbitTableStruct}
        RowComponent={AddRabbitTableRow}
        rows={configsList || []}
        text=""
        isLoading={isLoading}
      />
    ),
    [configsList, isLoading]
  );

  return (
    <>
      <Stack spacing={2}>
        <Typography fontSize={24} fontWeight="bold" align="center">
          مشخصات سرور را انتخاب کنید
        </Typography>
        <Typography
          align="center"
          fontSize={16}
          sx={{ color: ({ palette }) => palette.grey[700] }}
        >
          بعد از ایجاد سرور می توانید سخت افزار مورد نیاز خود را تغییر دهید.
        </Typography>
      </Stack>
      <Box sx={{ px: { lg: 5 }, pt: 5 }}>{table}</Box>
    </>
  );
};
