import { LoadingButton } from "@mui/lab";
import { Paper, Stack, Typography } from "@mui/material";
import { FC, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { useLazyGetApiMyKubernetesCloudHostGetByIdQuery } from "src/app/services/api";
import {
  useGetApiMyPortalProductItemListByProductIdQuery,
  usePutApiMyKubernetesCloudHostEditByIdMutation,
} from "src/app/services/api.generated";
import ReverseSlider from "src/components/atoms/ReverseSlider";
import {
  PRODUCT_CATEGORY_ENUM,
  PRODUCT_ITEMS_ENUM,
} from "src/constant/productCategoryEnum";
import { priceToPersian } from "src/utils/priceToPersian.utils";

export const KubernetesCloudServerConfig: FC = () => {
  const [memory, setMemory] = useState(1);
  const [cpu, setCpu] = useState(1);
  const [disk, setDisk] = useState(25);
  const [tenPods, setTenPods] = useState(1);
  const [memoryUnitPrice, setMemoryUnitPrice] = useState(0);
  const [cpuUnitPrice, setCpuUnitPrice] = useState(0);
  const [diskUnitPrice, setDiskUnitPrice] = useState(0);
  const [tenPodsUnitPrice, setTenPodsUnitPrice] = useState(0);
  const { kubernetesCloudId } = useParams();

  const { data: unitsPrice, isLoading: getUnitsPrice } =
    useGetApiMyPortalProductItemListByProductIdQuery({
      productId: PRODUCT_CATEGORY_ENUM.KubernetesCloud,
    });

  const [getData] = useLazyGetApiMyKubernetesCloudHostGetByIdQuery();

  const [sendNewConfig, { isLoading: sendNewConfigLoading }] =
    usePutApiMyKubernetesCloudHostEditByIdMutation();

  useEffect(() => {
    if (kubernetesCloudId) {
      getData({ id: Number(kubernetesCloudId) })
        .unwrap()
        .then((res) => {
          if (res) {
            setMemory(res.memory || 0);
            setCpu(res.cpu || 0);
            setDisk(res.disk || 0);
          }
        })
        .catch(() => {});
    }
  }, [getData, kubernetesCloudId]);

  useEffect(() => {
    if (
      memoryUnitPrice ||
      cpuUnitPrice ||
      diskUnitPrice ||
      tenPodsUnitPrice ||
      !unitsPrice
    )
      return;

    setMemoryUnitPrice(
      unitsPrice.find((item) => item.id === PRODUCT_ITEMS_ENUM.KuberMemory)
        ?.price || 0
    );
    setCpuUnitPrice(
      unitsPrice.find((item) => item.id === PRODUCT_ITEMS_ENUM.KuberCpu)
        ?.price || 0
    );
    setDiskUnitPrice(
      unitsPrice.find((item) => item.id === PRODUCT_ITEMS_ENUM.KuberDisk)
        ?.price || 0
    );
    setTenPodsUnitPrice(
      unitsPrice.find((item) => item.id === PRODUCT_ITEMS_ENUM.Kuber10Pods)
        ?.price || 0
    );
  }, [
    cpuUnitPrice,
    diskUnitPrice,
    memoryUnitPrice,
    tenPodsUnitPrice,
    unitsPrice,
  ]);

  const resourceList = [
    {
      name: "Memory (GB)",
      value: memory,
      onChange: setMemory,
      min: 1,
      max: 128,
      step: 1,
    },
    {
      name: "CPU (Core)",
      value: cpu,
      onChange: setCpu,
      min: 1,
      max: 48,
      step: 1,
    },
    {
      name: "Disk (GB)",
      value: disk,
      onChange: setDisk,
      min: 25,
      max: 1000,
      step: 25,
    },
    {
      name: "TenPods",
      value: tenPods,
      onChange: setTenPods,
      min: 1,
      max: 5,
      step: 1,
    },
  ];

  const totalPrice = useMemo(() => {
    const m = memoryUnitPrice * memory;
    const c = cpuUnitPrice * cpu;
    const d = diskUnitPrice * disk;
    const t = tenPodsUnitPrice * tenPods;
    return m + c + d + t;
  }, [
    cpu,
    cpuUnitPrice,
    disk,
    diskUnitPrice,
    memory,
    memoryUnitPrice,
    tenPods,
    tenPodsUnitPrice,
  ]);

  const submitClickHandler = () => {
    if (!kubernetesCloudId) return;
    sendNewConfig({
      id: Number(kubernetesCloudId),
      editKuberCloudHostModel: {
        cpu,
        memory,
        disk,
        tenPods,
      },
    })
      .unwrap()
      .then(() => toast.success("تغییرات جدید با موفقیت اعمال شد"))
      .catch(() => {});
  };

  return (
    <Stack width="100%">
      <Typography
        color="grey.700"
        fontSize={24}
        fontWeight={700}
        sx={{ mb: 2 }}
      >
        تغییر مشخصات سخت افزاری
      </Typography>
      <Paper elevation={0} sx={{ px: { xs: 2, sm: 3, md: 4, lg: 5 }, py: 5 }}>
        <Stack rowGap={{ xs: 3, md: 7.4 }} sx={{ p: 4 }}>
          {resourceList.map(
            ({ name, value, onChange, min, max, step }, index) => (
              <Stack
                key={index}
                direction={{ xs: "column-reverse", md: "row" }}
                rowGap={5}
                columnGap={4}
                alignItems="end"
              >
                <ReverseSlider
                  value={value}
                  valueLabelDisplay="on"
                  onChange={(_, value) => onChange(value as number)}
                  min={min}
                  max={max}
                  step={step}
                />
                <Typography
                  color={({ palette }) => palette.grey[700]}
                  sx={{ width: "125px" }}
                  align="right"
                >
                  {name}
                </Typography>
              </Stack>
            )
          )}
        </Stack>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          sx={{ mt: 6 }}
          alignItems="center"
          justifyContent="space-between"
          rowGap={3}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography color="grey.700">تخمین هزینه ماهیانه:</Typography>
            <Typography color="grey.700" fontWeight={700}>
              {priceToPersian(totalPrice)} ریال
            </Typography>
          </Stack>
          <LoadingButton
            loading={sendNewConfigLoading}
            onClick={submitClickHandler}
            variant="contained"
            sx={{
              px: { xs: 3, sm: 7 },
              py: 2,
              width: { xs: "100%", sm: "auto" },
            }}
          >
            تغییر سخت افزار ماشین
          </LoadingButton>
        </Stack>
      </Paper>
    </Stack>
  );
};
