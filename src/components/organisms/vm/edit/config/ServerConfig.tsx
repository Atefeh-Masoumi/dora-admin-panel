import { FC, useContext, useEffect, useState, useMemo } from "react";
import { Stack, Typography, Paper, useTheme } from "@mui/material";
import { useLazyGetApiMyVmHostGetByIdQuery } from "src/app/services/api";
import { EditServerContext } from "src/components/organisms/vm/edit/rebuild/contexts/EditServerContext";
import ReverseSlider from "src/components/atoms/ReverseSlider";
import { LoadingButton } from "@mui/lab";
import { priceToPersian } from "src/utils/priceToPersian";
import {
  useGetApiMyPortalProductItemListByProductIdQuery,
  usePutApiMyVmHostEditByIdMutation,
} from "src/app/services/api.generated";
import { toast } from "react-toastify";
import {
  PRODUCT_CATEGORY_ENUM,
  PRODUCT_ITEMS_ENUM,
} from "src/constant/productCategoryEnum";

// const memoryUnitPrice = 600000;
// const cpuUnitPrice = 500000;
// const diskUnitPrice = 45000;
// const ipAddress = 600000;

type ServerConfigPropsType = {};

export const ServerConfig: FC<ServerConfigPropsType> = () => {
  const { serverId } = useContext(EditServerContext);
  const [memory, setMemory] = useState(1);
  const [cpu, setCpu] = useState(1);
  const [disk, setDisk] = useState(25);
  const [memoryUnitPrice, setMemoryUnitPrice] = useState(0);
  const [cpuUnitPrice, setCpuUnitPrice] = useState(0);
  const [diskUnitPrice, setDiskUnitPrice] = useState(0);
  const [ipAddress, setIpAddress] = useState(0);
  const theme = useTheme()

  const { data: unitsPrice } =
    useGetApiMyPortalProductItemListByProductIdQuery({
      productId: PRODUCT_CATEGORY_ENUM.VM,
    });
  const [getData] = useLazyGetApiMyVmHostGetByIdQuery();

  const [sendNewConfig, { isLoading: sendNewConfigLoading }] =
    usePutApiMyVmHostEditByIdMutation();

  useEffect(() => {
    if (serverId) {
      getData({ id: serverId })
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
  }, [getData, serverId]);

  useEffect(() => {
    if (memoryUnitPrice || cpuUnitPrice || diskUnitPrice || !unitsPrice) return;

    setMemoryUnitPrice(
      unitsPrice.find((item) => item.id === PRODUCT_ITEMS_ENUM.VMemory)
        ?.price || 0
    );
    setCpuUnitPrice(
      unitsPrice.find((item) => item.id === PRODUCT_ITEMS_ENUM.VCpu)?.price || 0
    );
    setDiskUnitPrice(
      unitsPrice.find((item) => item.id === PRODUCT_ITEMS_ENUM.VDisk)?.price ||
        0
    );
    setIpAddress(
      unitsPrice.find((item) => item.id === PRODUCT_ITEMS_ENUM.Ipv4)?.price || 0
    );
  }, [cpuUnitPrice, diskUnitPrice, memoryUnitPrice, unitsPrice]);

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
  ];

  const totalPrice = useMemo(() => {
    const m = memoryUnitPrice * memory;
    const c = cpuUnitPrice * cpu;
    const d = diskUnitPrice * disk;
    return m + c + d + ipAddress;
  }, [cpu, cpuUnitPrice, disk, diskUnitPrice, memory, memoryUnitPrice]);

  const submitClickHandler = () => {
    if (!serverId) return;
    sendNewConfig({
      id: serverId,
      editVmModel: {
        cpu,
        memory,
        disk,
      },
    })
      .unwrap()
      .then(() => toast.success("تغییرات جدید با موفقیت اعمال شد"))
      .catch(() => {});
  };

  return (
    <>
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
                  color={theme.palette.grey[700]} 
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
    </>
  );
};
