import { Box, Grid, Stack } from "@mui/material";
import { FC, useEffect, useMemo, useState } from "react";
import { useLazyGetApiMyPortalProductItemKubernetesPriceByWorkerNodeCountQuery } from "src/app/services/api";
import KubernetesReceipt from "./KubernetesReceipt";
import ServiceSpecifications from "./ServiceSpecifications";
import { PRODUCT_ITEM_ENUM } from "src/constant/productItemEnum";

export const KubernetesCostEstimator: FC = () => {
  const [data, setData] = useState<any>([]);
  const [workerNodes, setWorkerNodes] = useState(3);
  const [cpuCount, setCpuCount] = useState(1);
  const [memoryCount, setMemoryCount] = useState(1);
  const [diskCount, setDiskCount] = useState(25);

  const [callKuberData] =
    useLazyGetApiMyPortalProductItemKubernetesPriceByWorkerNodeCountQuery();

  useEffect(() => {
    callKuberData({
      workerNodeCount: Number(workerNodes),
    })
      .then((res) => setData(res.data))
      .catch(() => {});
  }, [workerNodes]);

  // master cpu count
  const masterCpuCount = useMemo(
    () =>
      data?.masterNodesInfo?.masterVmSpecs?.find(
        (item: any) => item.productItemId === PRODUCT_ITEM_ENUM.VCpu
      )?.quantity || 0,
    [data]
  );

  // master memory count
  const masterMemoryCount = useMemo(
    () =>
      data?.masterNodesInfo?.masterVmSpecs?.find(
        (item: any) => item.productItemId === PRODUCT_ITEM_ENUM.VMemory
      )?.quantity || 0,
    [data]
  );

  // master disk count
  const masterDiskCount = useMemo(
    () =>
      data?.masterNodesInfo?.masterVmSpecs?.find(
        (item: any) => item.productItemId === PRODUCT_ITEM_ENUM.VDisk
      )?.quantity || 0,
    [data]
  );

  const resourceList = [
    {
      name: "تعداد نودهای worker",
      value: workerNodes,
      onChange: (value: any) => {
        setWorkerNodes(value);
      },
      min: 3,
      max: 15,
      step: 1,
    },
    {
      name: "CPU (Core)",
      value: cpuCount,
      onChange: setCpuCount,
      min: 1,
      max: 48,
      step: 1,
    },
    {
      name: "Memory (GB)",
      value: memoryCount,
      onChange: setMemoryCount,
      min: 1,
      max: 128,
      step: 1,
    },
    {
      name: "Disk (GB)",
      value: diskCount,
      onChange: setDiskCount,
      min: 25,
      max: 1000,
      step: 25,
    },
  ];

  const masterResourceList = [
    {
      name: "تعداد نودهای master",
      value: data?.masterNodesInfo?.masterNodeCount || 0,
      disabled: true,
      min: 1,
      max: 3,
      step: 1,
    },
    {
      name: "CPU (Core)",
      value: masterCpuCount,
      disabled: true,
      min: 2,
      max: 48,
      step: 1,
    },
    {
      name: "Memory (GB)",
      value: masterMemoryCount,
      disabled: true,
      min: 4,
      max: 128,
      step: 1,
    },
    {
      name: "Disk (GB)",
      value: masterDiskCount,
      disabled: true,
      min: 50,
      max: 1000,
      step: 25,
    },
  ];

  return (
    <Grid
      container
      mt={3}
      justifyContent="space-between"
      sx={{ margin: "0 auto" }}
    >
      <Box sx={{ overflow: "overlay" }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          gap={1}
          justifyContent="space-between"
          sx={{
            maxWidth: "1045px",
            mx: "auto",
          }}
        >
          <Box sx={{ width: { xs: "100%", md: "635px" } }}>
            <ServiceSpecifications
              resourceList={resourceList}
              masterResourceList={masterResourceList}
            />
          </Box>
          <Box sx={{ width: { xs: "100%", md: "378px", overflow: "hidden" } }}>
            <KubernetesReceipt
              workerNodes={workerNodes}
              memoryCount={memoryCount}
              cpuCount={cpuCount}
              diskCount={diskCount}
              masterCpuCount={masterCpuCount}
              masterMemoryCount={masterMemoryCount}
              masterDiskCount={masterDiskCount}
            />
          </Box>
        </Stack>
      </Box>
    </Grid>
  );
};
