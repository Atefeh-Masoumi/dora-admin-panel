import { FC } from "react";
import { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import Receipt from "src/components/organisms/portal/calculator/Receipt";
import ServiceSpecifications from "src/components/organisms/portal/calculator/ServiceSpecifications";

const servicesList = [
  "Server",
  "Storage",
  "Kubernetes",
  "DNS",
  "CDN",
  "Domain",
  "Web Host",
];

const Calculator: FC = () => {
  const [selectedService, setSelectedService] = useState("Server");
  const [serverCount, setServerCount] = useState(1);
  const [cpuCount, setCpuCount] = useState(1);
  const [memoryCount, setMemoryCount] = useState(1);
  const [diskCount, setDiskCount] = useState(25);
  const [ipv4Count, setIpv4Count] = useState(1);
  const [ipv6Count, setIpv6Count] = useState(1);

  const servicesClickHandler = (service: string) => setSelectedService(service);

  return (
    <Stack
      bgcolor="white"
      py={1}
      px={1}
      width="100%"
      borderRadius={3}
      direction="column"
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        columnGap={1}
        sx={{ mb: 1 }}
      >
        <Typography variant="title7" fontWeight={700} color="#202020">
          ماشین حساب
        </Typography>
        <Typography variant="title7" fontWeight={700} color="primary">
          خدمات ابری
        </Typography>
      </Stack>
      <Typography
        variant="text2"
        fontWeight={500}
        color="#797979"
        align="center"
      >
        سرویس مورد نیاز خود را انتخاب و فقط برای چیزی که واقعا استفاده می کنید
        هزینه کنید.
      </Typography>
      <Box sx={{ width: "100%", overflow: "overlay" }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{
            width: {
              xs: "620px",
              sm: "550px",
              md: "580px",
              lg: "610px",
              xl: "650px",
            },
            border: "1px solid #E6E6E6",
            borderRadius: BORDER_RADIUS_1,
            p: 0.5,
            mx: "auto",
            mt: 8,
            mb: 7,
          }}
          columnGap={1}
        >
          {servicesList.map((item, index) => {
            const isSelected = item === selectedService;
            return (
              <Button
                disabled={index !== 0}
                onClick={() => servicesClickHandler(item)}
                size="large"
                key={index}
                variant={index === 0 ? "contained" : "text"}
                sx={{
                  py: 2,
                  color: isSelected ? "white" : "#6E768ACC",
                  bgcolor: isSelected ? undefined : "transparent",
                  boxShadow: isSelected ? undefined : "none",
                  "&:hover": {
                    bgcolor: ({ palette }) =>
                      isSelected ? palette.primary.main : "transparent",
                    boxShadow: isSelected ? undefined : "none",
                  },
                }}
              >
                {item}
              </Button>
            );
          })}
        </Stack>
      </Box>
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
              serverCount={serverCount}
              cpuCount={cpuCount}
              memoryCount={memoryCount}
              diskCount={diskCount}
              ipv4Count={ipv4Count}
              ipv6Count={ipv6Count}
              setServerCount={setServerCount}
              setCpuCount={setCpuCount}
              setMemoryCount={setMemoryCount}
              setDiskCount={setDiskCount}
              setIpv4Count={setIpv4Count}
              setIpv6Count={setIpv6Count}
            />
          </Box>
          <Box sx={{ width: { xs: "100%", md: "378px", overflow: "hidden" } }}>
            <Receipt
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
    </Stack>
  );
};

export default Calculator;
