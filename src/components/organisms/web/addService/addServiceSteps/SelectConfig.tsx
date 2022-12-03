import { FC, useMemo } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { PRODUCT_CATEGORY_ENUM } from "src/constant/productCategoryEnum";
import { useGetUserV2PortalProductBundleListByProductCategoryIdQuery } from "src/app/services/api.generated";
import { AddWabHostTableRow } from "../tables/AddWabHostTableRow";
import { addRabbitTableStruct } from "../tables/struct";

type SelectConfigPropsType = {};

export const SelectConfig: FC<SelectConfigPropsType> = () => {
  const { data: configsList, isLoading } =
    useGetUserV2PortalProductBundleListByProductCategoryIdQuery({
      productCategoryId: PRODUCT_CATEGORY_ENUM.WEB,
    });

  const table = useMemo(
    () => (
      <BaseTable
        struct={addRabbitTableStruct}
        RowComponent={AddWabHostTableRow}
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
          مشخصات هاست مورد نظر را انتخاب کنید
        </Typography>
        <Typography
          align="center"
          fontSize={16}
          sx={{ color: ({ palette }) => palette.grey[700] }}
        >
          بعد از ایجاد امکان تغییر سرویس وجود دارد.
        </Typography>
      </Stack>
      <Box sx={{ px: { lg: 5 }, pt: 5 }}>{table}</Box>
    </>
  );
};
