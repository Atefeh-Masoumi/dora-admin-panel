import { useParams } from "react-router";
import { FC, useContext, useEffect, useState, useMemo } from "react";
import { Stack, Typography, Paper, useTheme, Divider } from "@mui/material";
import { EditServerContext } from "src/components/organisms/vm/edit/rebuild/contexts/EditServerContext";
import ReverseSlider from "src/components/atoms/ReverseSlider";
import { LoadingButton } from "@mui/lab";
import { priceToPersian } from "src/utils/priceToPersian";
import { toast } from "react-toastify";
import {
  useGetApiMyPortalProductItemListByProductIdQuery,
  useGetApiMyVmByProjectIdHostGetAndIdQuery,
  usePutApiMyVmByProjectIdHostEditAndIdMutation,
} from "src/app/services/api.generated";
import { RefreshButton } from "src/components/atoms/RefreshButton";

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
  const [ipv4, setIpv4] = useState(0);
  const [ipv6, setIpv6] = useState(0);
  const [memoryUnitPrice, setMemoryUnitPrice] = useState(0);
  const [cpuUnitPrice, setCpuUnitPrice] = useState(0);
  const [diskUnitPrice, setDiskUnitPrice] = useState(0);
  const [ipv4UnitPrice, setIpv4UnitPrice] = useState(0);
  const [ipv6UnitPrice, setIpv6UnitPrice] = useState(0);
  const theme = useTheme()

  const { data: unitsPrice } =
    useGetApiMyPortalProductItemListByProductIdQuery({
      productId: PRODUCT_CATEGORY_ENUM.VM,
    });

  const { projectId } = useParams();

  const { data: getData, refetch, isFetching } = useGetApiMyVmByProjectIdHostGetAndIdQuery({
    projectId: Number(projectId),
    id: serverId || 0
  });

  const [sendNewConfig, { isLoading: sendNewConfigLoading }] =
    usePutApiMyVmByProjectIdHostEditAndIdMutation();

  useEffect(() => {
    if (!getData) return

    setMemory(getData?.memory || 0);
    setCpu(getData?.cpu || 0);
    setDisk(getData?.disk || 0);
    setIpv4(getData?.ipV4 || 0);
    setIpv6(getData?.ipV6 || 0);

  }, [getData, serverId,refetch]);

  useEffect(() => {
    if (memoryUnitPrice || cpuUnitPrice || diskUnitPrice || ipv4UnitPrice || ipv6UnitPrice || !unitsPrice) return;

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
    setIpv4UnitPrice(
      unitsPrice.find((item) => item.id === PRODUCT_ITEMS_ENUM.IPV4)?.price || 0
    );
    setIpv6UnitPrice(
      unitsPrice.find((item) => item.id === PRODUCT_ITEMS_ENUM.IPV6)?.price || 0
    );
  }, [cpuUnitPrice, diskUnitPrice, memoryUnitPrice, ipv4UnitPrice, ipv6UnitPrice, unitsPrice]);

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
      name: "IPv4",
      value: ipv4,
      onChange: () => {},
      min: 0,
      max: 10,
      step: 1,
      price: ipv4UnitPrice,
    },
    {
      name: "IPv6",
      value: ipv6,
      onChange: () => {},
      min: 0,
      max: 10,
      step: 1,
      price: ipv6UnitPrice,
    },
  ];

  const totalPrice = useMemo(() => {
    const m = memoryUnitPrice * memory;
    const c = cpuUnitPrice * cpu;
    const d = diskUnitPrice * disk;
    const ip4 = ipv4UnitPrice;
    const ip6 = ipv6UnitPrice;
    return m + c + d + ip4 + ip6;
  }, [cpu, cpuUnitPrice, disk, diskUnitPrice, memory, memoryUnitPrice, ipv4UnitPrice, ipv6UnitPrice]);

  const submitClickHandler = () => {
    if (!serverId) return;
    sendNewConfig({
      editVmModel: {
        cpu,
        memory,
        disk,
      },
      projectId: Number(projectId),
      id: serverId,
    })
      .unwrap()
      .then(() => toast.success("تغییرات جدید با موفقیت اعمال شد"))
      .catch(() => { });
  };

  return (
    <>
      <Paper
        elevation={0}
        sx={{ overflow: "hidden", px: { xs: 2, sm: 3, md: 4, lg: 5 }, py: 5 }}
      >
        <Stack
          pb={2}
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent="space-between"
          gap={1}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems="center"
            spacing={2}
          >
            <Typography
              color="grey.700"
              fontSize={24}
              fontWeight={700}
            >
              تغییر مشخصات سخت افزاری
            </Typography>
            <RefreshButton isFetching={isFetching} refetchData={refetch} />
          </Stack>
        </Stack>
        <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
        <Stack>
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
        </Stack>
      </Paper>

    </>
  );
};
