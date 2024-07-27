import { Box, Grid, Stack } from "@mui/material";
import { FC, useState } from "react";
import ServiceSpecifications from "./ServiceSpecifications";
import VmReceipt from "./VmReceipt";

export const VmCostEstimator: FC = () => {
  const [serverCount, setServerCount] = useState(1);
  const [cpuCount, setCpuCount] = useState(1);
  const [memoryCount, setMemoryCount] = useState(1);
  const [diskCount, setDiskCount] = useState(25);
  const [ipv4Count, setIpv4Count] = useState(1);
  const [ipv6Count, setIpv6Count] = useState(1);

  const resourceList = [
    {
      name: "تعداد سرور",
      value: serverCount,
      onChange: setServerCount,
      min: 1,
      max: 20,
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
      name: "CPU (Core)",
      value: cpuCount,
      onChange: setCpuCount,
      min: 1,
      max: 48,
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
    {
      name: "Public IPv4",
      value: ipv4Count,
      onChange: setIpv4Count,
      min: 1,
      max: 10,
      step: 1,
    },
    {
      name: "Public IPv6",
      value: ipv6Count,
      onChange: setIpv6Count,
      min: 1,
      max: 10,
      step: 1,
    },
  ];

  return (
    <Grid
      container
      mt={3}
      justifyContent="space-between"
      sx={{ width: "90%", margin: "0 auto" }}
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
            <ServiceSpecifications resourceList={resourceList} />
          </Box>
          <Box sx={{ width: { xs: "100%", md: "378px", overflow: "hidden" } }}>
            <VmReceipt
              server={serverCount}
              memory={memoryCount}
              cpu={cpuCount}
              disk={diskCount}
              ipv4={ipv4Count}
              ipv6={ipv6Count}
            />
          </Box>
        </Stack>
      </Box>
    </Grid>
  );
};
