import { FC, useContext, useMemo } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useGetApiMyPortalProductBundleListByProductIdQuery } from "src/app/services/api.generated";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { ProductBundleTableRow } from "src/components/organisms/vm/add/tables/ProductBundleTableRow";
import { productBundleTableStruct } from "src/components/organisms/vm/add/tables/struct";
import { PRODUCT_CATEGORY_ENUM } from "src/constant/productCategoryEnum";
import { AddServerContext } from "../contexts/AddVmContext";
import ReverseSlider from "src/components/atoms/ReverseSlider";

type SelectConfigPropsType = {};

export const SelectConfig: FC<SelectConfigPropsType> = () => {
  const { data, isLoading } =
    useGetApiMyPortalProductBundleListByProductIdQuery({
      productId: PRODUCT_CATEGORY_ENUM.VM,
    });

  const { isPredefined, customConfig, setCustomConfig } =
    useContext(AddServerContext);

  const customConfigItems = [
    {
      id: "Disk",
      label: "Disk (GB)",
      min: 25,
      max: 1000,
      step: 25,
      value: customConfig.disk,
      onChange: (newValue: number) => {
        setCustomConfig && setCustomConfig({ ...customConfig, disk: newValue });
      },
    },
    {
      id: "Memory",
      label: "Memory (GB)",
      min: 1,
      max: 128,
      step: 1,
      value: customConfig.memory,
      onChange: (newValue: number) => {
        setCustomConfig &&
          setCustomConfig({ ...customConfig, memory: newValue });
      },
    },
    {
      id: "CPU",
      label: "CPU (Core)",
      min: 1,
      max: 48,
      step: 1,
      value: customConfig.cpu,
      onChange: (newValue: number) => {
        setCustomConfig && setCustomConfig({ ...customConfig, cpu: newValue });
      },
    },

    {
      id: "IpV4",
      label: "Public IpV4",
      min: 1,
      max: 10,
      step: 1,
      value: customConfig.IPV4,
      onChange: (newValue: number) => {
        setCustomConfig && setCustomConfig({ ...customConfig, IPV4: newValue });
      },
    },
  ];

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
        RowComponent={ProductBundleTableRow}
        rows={configsList || []}
        text=""
        isLoading={isLoading}
        rowsPerPage={5}
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
      <Box sx={{ px: { lg: 5 }, pt: 5 }}>
        {isPredefined ? (
          table
        ) : (
          <Stack gap={2}>
            {customConfigItems.map((item, index) => (
              <Stack
                key={index}
                direction={{ xs: "column-reverse", md: "row" }}
                rowGap={1}
                columnGap={1}
                alignItems={{ xs: "center", md: "end" }}
                justifyContent="center"
                sx={{
                  fontFamily: "roboto",
                }}
              >
                <ReverseSlider
                  value={item.id === "IpV4" ? 1 : Number(item.value)}
                  valueLabelDisplay="on"
                  onChange={(_, value) =>
                    item.id === "IpV4" ? "" : item.onChange(value as number)
                  }
                  min={item.min}
                  max={item.max}
                  step={item.step}
                  sx={{
                    width: { xs: "90%", md: "70%" },
                  }}
                />
                <Stack width={{ xs: "90%", md: "15%" }}>
                  <Typography
                    variant="text8"
                    textAlign={{ xs: "start", md: "end" }}
                  >
                    {item.label}
                  </Typography>
                </Stack>
              </Stack>
            ))}
          </Stack>
        )}
      </Box>
    </>
  );
};
