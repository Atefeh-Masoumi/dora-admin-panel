import { FC, useContext, useMemo } from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import AddStorageTableRow from "../tables/AddStorageTableRow";
import { addStorageTableStruct } from "../tables/struct";
import { useGetApiMyPortalProductBundleStorageListQuery } from "src/app/services/api.generated";
import { AddStorageContext } from "../contexts/AddStorageContext";
import ReverseSlider from "src/components/atoms/ReverseSlider";
import { PRODUCT_ITEM_ENUM } from "src/constant/productItemEnum";

type SelectConfigPropsType = {};

export const SelectConfig: FC<SelectConfigPropsType> = () => {
  const { data: bundleList, isLoading } =
    useGetApiMyPortalProductBundleStorageListQuery();

  const { isPredefined, customConfig, setCustomConfig } =
    useContext(AddStorageContext);

  const customConfigItems = [
    {
      id: PRODUCT_ITEM_ENUM.VDisk,
      label: "Disk (GB)",
      min: 50,
      max: 5000,
      step: 50,
      value: customConfig.disk,
      onChange: (newValue: number) => [
        setCustomConfig && setCustomConfig({ disk: newValue }),
      ],
    },
  ];

  const table = useMemo(
    () => (
      <BaseTable
        struct={addStorageTableStruct}
        RowComponent={AddStorageTableRow}
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
                alignItems={{ xs: "center" }}
                justifyContent="center"
                sx={{ fontFamily: "roboto" }}
              >
                <ReverseSlider
                  value={Number(item.value)}
                  valueLabelDisplay="on"
                  onChange={(_, value) => item.onChange(value as number)}
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
