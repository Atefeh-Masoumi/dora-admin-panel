import { useContext, FC, useMemo } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useGetApiV2PortalProductBundleListByProductCategoryIdQuery } from "src/app/services/api.generated";
import { AddServerContext } from "src/context/AddServerContext";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { AddCloudServerTableRow } from "src/components/organisms/tables/addCloudServer/AddCloudServerTableRow";
import { addCloudServerTableStruct } from "src/components/organisms/tables/addCloudServer/struct";
// import { serverConfigArrayNormalizerUtils } from "src/utils/serverConfigArrayNormalizerUtils";

type SelectConfigPropsType = {};

export const SelectConfig: FC<SelectConfigPropsType> = () => {
  const { osVersion } = useContext(AddServerContext);

  const { data: configsList, isLoading } =
    useGetApiV2PortalProductBundleListByProductCategoryIdQuery({
      productCategoryId: osVersion?.id || 0,
    });

  const table = useMemo(
    () => (
      <BaseTable
        struct={addCloudServerTableStruct}
        RowComponent={AddCloudServerTableRow}
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
