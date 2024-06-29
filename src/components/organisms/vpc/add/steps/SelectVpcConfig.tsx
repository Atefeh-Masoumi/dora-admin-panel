import { Box, Stack, Typography } from "@mui/material";
import { FC, useMemo } from "react";
import { useGetApiMyPortalProductBundleListByProductIdQuery } from "src/app/services/api.generated";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { AddVpcTableRow } from "../tables/AddVpcTableRow";
import { addVpcTableStruct } from "../tables/struct";
import { PRODUCT_CATEGORY_ENUM } from "src/constant/productCategoryEnum";

type SelectVpcConfigPropsType = {};

export const SelectVpcConfig: FC<SelectVpcConfigPropsType> = () => {
  const { data: bundleList = [], isLoading } =
    useGetApiMyPortalProductBundleListByProductIdQuery({
      productId: PRODUCT_CATEGORY_ENUM.VPC,
    });

  const configsList = useMemo(() => {
    if (!bundleList) return [];
    return bundleList.map(({ id, name, price, configurations }) => {
      const ipv4 =
        configurations?.find((item) => item.name === "IPV4")?.quantity || 0;
      const rules10Vpc =
        configurations?.find((item) => item.name === "Rules10VPC")?.quantity ||
        0;

      return {
        id,
        name,
        price,
        ipv4,
        rules10Vpc,
      };
    });
  }, [bundleList]);

  const table = useMemo(
    () => (
      <BaseTable
        struct={addVpcTableStruct}
        RowComponent={AddVpcTableRow}
        rows={configsList || []}
        text=""
        isLoading={isLoading}
      />
    ),
    [bundleList, isLoading]
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
