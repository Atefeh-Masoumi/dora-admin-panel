import { FC, useMemo } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { PRODUCT_CATEGORY_ENUM } from "src/constant/productCategoryEnum";
import { useGetApiV2PortalProductBundleListByProductCategoryIdQuery } from "src/app/services/api.generated";
import { AddRabbitTableRow } from "../tables/AddRabbitTableRow";
import { addRabbitTableStruct } from "../tables/struct";

type SelectConfigPropsType = {};

export const SelectConfig: FC<SelectConfigPropsType> = () => {
  const { data: configsList, isLoading } =
    useGetApiV2PortalProductBundleListByProductCategoryIdQuery({
      productCategoryId: PRODUCT_CATEGORY_ENUM.RABBIT_MQ,
    });

  const table = useMemo(
    () => (
      <BaseTable
        struct={addRabbitTableStruct}
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
          مشخصات سرویس را انتخاب کنید
        </Typography>
        <Typography
          align="center"
          fontSize={16}
          sx={{ color: ({ palette }) => palette.grey[700] }}
        >
          بعد از ایجاد سرویس می توانید تنظیمات مورد نیاز خود را تغییر دهید.
        </Typography>
      </Stack>
      <Box sx={{ px: { lg: 5 }, pt: 5 }}>{table}</Box>
    </>
  );
};
