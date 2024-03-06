import { FC, useMemo } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useGetApiMyPortalProductBundleListByProductIdQuery } from "src/app/services/api.generated";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { productBundleTableStruct } from "src/components/organisms/vm/add/tables/struct";
import { KuberServerConfigTableRow } from "../tables/KuberServerConfigTableRow";

type SelectKuberConfigPropsType = {};

export const SelectKuberConfig: FC<SelectKuberConfigPropsType> = () => {
  const { data, isLoading } =
    useGetApiMyPortalProductBundleListByProductIdQuery({ productId: 17 });

  const configsList = useMemo(() => {
    if (!data) return [];
    return data.map(({ id, name, price, configurations }) => {
      const cpu =
        configurations?.find((item) => item.name === "CPU")?.quantity || 0;
      const memory =
        configurations?.find((item) => item.name === "Memory")?.quantity || 0;
      const disk =
        configurations?.find((item) => item.name === "Disk")?.quantity || 0;
      const ipv4 =
        configurations?.find((item) => item.name === "IPV4")?.quantity || 0;

      return {
        id,
        name,
        cpu,
        memory,
        disk,
        ipv4,
        price,
      };
    });
  }, [data]);

  const table = useMemo(
    () => (
      <BaseTable
        struct={productBundleTableStruct}
        RowComponent={KuberServerConfigTableRow}
        rows={configsList}
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
