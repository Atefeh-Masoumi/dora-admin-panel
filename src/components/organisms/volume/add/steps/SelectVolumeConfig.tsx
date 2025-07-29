import { Box, Stack, Typography } from "@mui/material";
import { FC, useContext, useMemo } from "react";
import { useGetApiMyPortalProductBundleVolumeListQuery } from "src/app/services/api.generated";
import ReverseSlider from "src/components/atoms/ReverseSlider";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { AddVolumeContext } from "../contexts/AddVolumeContext";
import VolumeProductBundleTableRow from "../tables/VolumeProductBundleTableRow";
import { volumeProductBundleTableStruct } from "../tables/struct";
import { PRODUCT_ITEM_ENUM } from "src/constant/productItemEnum";

type SelectVolumeConfigPropsType = {};

export const SelectVolumeConfig: FC<SelectVolumeConfigPropsType> = () => {
  const { data: volumeBundleList, isLoading: volumeBundleListLoading } =
    useGetApiMyPortalProductBundleVolumeListQuery();

  const { isPredefined, customConfig, setCustomConfig } =
    useContext(AddVolumeContext);

  const customConfigItems = [
    {
      id: PRODUCT_ITEM_ENUM.CloudDisk,
      label: "Disk (GB)",
      min: 50,
      max: 5000,
      step: 50,
      value: customConfig.disk,
      onChange: (newValue: number) => {
        setCustomConfig && setCustomConfig({ ...customConfig, disk: newValue });
      },
    },
  ];

  const table = useMemo(
    () => (
      <BaseTable
        struct={volumeProductBundleTableStruct}
        RowComponent={VolumeProductBundleTableRow}
        rows={volumeBundleList || []}
        text=""
        isLoading={volumeBundleListLoading}
        rowsPerPage={5}
      />
    ),
    [volumeBundleList, volumeBundleListLoading]
  );

  return (
    <>
      <Stack spacing={2}>
        <Typography fontSize={24} fontWeight="bold" align="center">
          مشخصات دیسک را انتخاب کنید
        </Typography>
        <Typography
          align="center"
          fontSize={16}
          sx={{ color: ({ palette }) => palette.grey[700] }}
        >
          بعد از ایجاد دیسک می توانید حجم مورد نیاز خود را تغییر دهید.
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