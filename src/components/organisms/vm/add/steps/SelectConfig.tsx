import { FC, useMemo, useContext } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useGetApiCloudProductBundleListByProductIdQuery } from "src/app/services/api.generated";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { ProductBundleTableRow } from "src/components/organisms/vm/add/tables/ProductBundleTableRow";
import { productBundleTableStruct } from "src/components/organisms/vm/add/tables/struct";
import { PRODUCT_CATEGORY_ENUM } from "src/constant/productCategoryEnum";
import { AddServerContext } from "../contexts/AddVmContext";

type SelectConfigPropsType = {};

export const SelectConfig: FC<SelectConfigPropsType> = () => {
  const { data: configsList, isLoading } =
    useGetApiCloudProductBundleListByProductIdQuery({
      productId: PRODUCT_CATEGORY_ENUM.VM,
    });

  const { step, setStep } = useContext(AddServerContext);

  const table = useMemo(
    () => (
      <BaseTable
        struct={productBundleTableStruct}
        RowComponent={ProductBundleTableRow}
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
