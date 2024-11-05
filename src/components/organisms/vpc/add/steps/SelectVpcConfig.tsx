import { Box, Stack, Typography } from "@mui/material";
import { FC, useMemo } from "react";
import { useGetApiMyPortalProductBundleVpcListQuery } from "src/app/services/api.generated";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import AddVpcTableRow from "../tables/AddVpcTableRow";
import { addVpcTableStruct } from "../tables/struct";

type SelectVpcConfigPropsType = {};

export const SelectVpcConfig: FC<SelectVpcConfigPropsType> = () => {
  const { data: bundleList = [], isLoading } =
    useGetApiMyPortalProductBundleVpcListQuery();

  const table = useMemo(
    () => (
      <BaseTable
        struct={addVpcTableStruct}
        RowComponent={AddVpcTableRow}
        rows={bundleList || []}
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
