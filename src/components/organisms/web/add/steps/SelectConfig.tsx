import { Box, Stack, Typography } from "@mui/material";
import { FC, useMemo } from "react";
import { useGetApiMyPortalProductBundleWebListQuery } from "src/app/services/api.generated";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { AddWabHostTableRow } from "../tables/AddWabTableRow";
import { addWebTableStruct } from "../tables/struct";

type SelectConfigPropsType = {};

export const SelectConfig: FC<SelectConfigPropsType> = () => {
  const { data: configsList, isLoading } =
    useGetApiMyPortalProductBundleWebListQuery();

  const table = useMemo(
    () => (
      <BaseTable
        struct={addWebTableStruct}
        RowComponent={AddWabHostTableRow}
        rows={configsList || []}
        text=""
        isLoading={isLoading}
      />
    ),
    [isLoading]
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
