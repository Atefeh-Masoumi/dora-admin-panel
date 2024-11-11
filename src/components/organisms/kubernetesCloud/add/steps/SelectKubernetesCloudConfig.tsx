import { Box, Stack, Typography } from "@mui/material";
import { FC, useContext, useMemo } from "react";
import { useGetApiMyPortalProductBundleKuberCloudListQuery } from "src/app/services/api.generated";
import ReverseSlider from "src/components/atoms/ReverseSlider";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { PRODUCT_ITEM_ENUM } from "src/constant/productItemEnum";
import { AddKubernetesCloudContext } from "../context/AddKubernetesCloudContext";
import KubernetesCloudServerConfigTableRow from "../tables/KubernetesCloudServerConfigTableRow";
import { productBundleTableStruct } from "../tables/struct";

type SelectKubernetesCloudConfigPropsType = {};

export const SelectKubernetesCloudConfig: FC<
  SelectKubernetesCloudConfigPropsType
> = () => {
  const {
    data: KubernetesCloudBundleList,
    isLoading: KubernetesCloudBundlesListLoading,
  } = useGetApiMyPortalProductBundleKuberCloudListQuery();

  const { isPredefined, customConfig, setCustomConfig } = useContext(
    AddKubernetesCloudContext
  );

  const customConfigItem = [
    {
      id: PRODUCT_ITEM_ENUM.VDisk,
      label: "Disk (GB)",
      min: 25,
      max: 1024,
      step: 25,
      value: customConfig.disk,
      onChange: (newValue: number) => {
        setCustomConfig && setCustomConfig({ ...customConfig, disk: newValue });
      },
    },
    {
      id: PRODUCT_ITEM_ENUM.VMemory,
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
      id: PRODUCT_ITEM_ENUM.VCpu,
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
      id: PRODUCT_ITEM_ENUM.Kuber10Pods,
      label: "Pods",
      min: 10,
      max: 100,
      step: 10,
      value: customConfig.pods10,
      onChange: (newValue: number) => {
        setCustomConfig &&
          setCustomConfig({ ...customConfig, pods10: newValue });
      },
    },
  ];
  const table = useMemo(
    () => (
      <BaseTable
        struct={productBundleTableStruct}
        RowComponent={KubernetesCloudServerConfigTableRow}
        rows={KubernetesCloudBundleList as any}
        text=""
        isLoading={KubernetesCloudBundlesListLoading}
      />
    ),
    [KubernetesCloudBundlesListLoading]
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
            {customConfigItem.map((item, index) => {
              return (
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
                    onChange={(_, value) =>
                      item.id === PRODUCT_ITEM_ENUM.Ipv4
                        ? ""
                        : item.onChange(value as number)
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
              );
            })}
          </Stack>
        )}
      </Box>
    </>
  );
};
