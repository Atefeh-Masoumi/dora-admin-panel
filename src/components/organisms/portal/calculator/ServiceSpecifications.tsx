import type { Dispatch, FC, SetStateAction } from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { BORDER_RADIUS_4 } from "src/configs/theme";
import ReverseSlider from "src/components/atoms/ReverseSlider";

type ServiceSpecificationsPropsType = {
  serverCount: number;
  cpuCount: number;
  memoryCount: number;
  diskCount: number;
  ipv4Count: number;
  ipv6Count: number;
  setServerCount: Dispatch<SetStateAction<number>>;
  setCpuCount: Dispatch<SetStateAction<number>>;
  setMemoryCount: Dispatch<SetStateAction<number>>;
  setDiskCount: Dispatch<SetStateAction<number>>;
  setIpv4Count: Dispatch<SetStateAction<number>>;
  setIpv6Count: Dispatch<SetStateAction<number>>;
};

const ServiceSpecifications: FC<ServiceSpecificationsPropsType> = ({
  serverCount,
  cpuCount,
  memoryCount,
  diskCount,
  ipv4Count,
  ipv6Count,
  setServerCount,
  setCpuCount,
  setMemoryCount,
  setDiskCount,
  setIpv4Count,
  setIpv6Count,
}) => {
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
    <Paper
      elevation={0}
      sx={{
        direction: "ltr !important",
        bgcolor: "#FBFCFF",
        border: "1px solid #DCE7FD",
        borderRadius: BORDER_RADIUS_4,
        p: { xs: 2, md: 2.5, lg: 3 },
        flexGrow: 1,
        height: { xs: "auto", md: "659px" },
      }}
    >
      <Box sx={{ mb: 6.9 }}>
        <Typography
          variant="title5"
          sx={{ mb: 1.5 }}
          fontWeight={700}
          align="center"
          color={({ palette }) => palette.secondary.main}
        >
          مشخصات سرویس مورد نظر را انتخاب کنید
        </Typography>
        <Typography
          variant="button1"
          align="center"
          color={({ palette }) => palette.grey[700]}
        >
          بعد از ایجاد سرویس می توانید مشخصات سرویس مورد نیاز خود را تغییر دهید.
        </Typography>
      </Box>
      <Stack rowGap={{ xs: 3, md: 7.4 }}>
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
    </Paper>
  );
};

export default ServiceSpecifications;
