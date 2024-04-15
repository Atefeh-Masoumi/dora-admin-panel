import { FC, useMemo } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { AddStorageTableRow } from "../tables/AddStorageTableRow";
import { addStorageTableStruct } from "../tables/struct";
import {
  useGetApiMyPortalProductBundleListByProductIdQuery,
  useGetApiMyPortalProductBundleStorageListQuery,
} from "src/app/services/api.generated";
import { PRODUCT_CATEGORY_ENUM } from "src/constant/productCategoryEnum";

type SelectConfigPropsType = {};

export const SelectConfig: FC<SelectConfigPropsType> = () => {
  const { data, isLoading } =
    useGetApiMyPortalProductBundleListByProductIdQuery({
      productId: PRODUCT_CATEGORY_ENUM.STORAGE,
    });

  const configsList = useMemo(() => {
    if (!data) return [];
    return data.map(({ id, name, price, configurations }) => {
      const disk =
        configurations?.find((item) => item.name === "Disk")?.quantity || 0;

      return {
        id,
        name,
        disk,
        price,
      };
    });
  }, [data]);

  const table = useMemo(
    () => (
      <BaseTable
        struct={addStorageTableStruct}
        RowComponent={AddStorageTableRow}
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
