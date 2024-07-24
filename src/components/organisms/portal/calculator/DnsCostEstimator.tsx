import { Box, Grid, Stack } from "@mui/material";
import { FC, useState } from "react";
import ServiceSpecifications from "./ServiceSpecifications";
import DnsReceipt from "./DnsReceipt";

export const DnsCostEstimator: FC = () => {
  const [dnsRecord, setDnsRecord] = useState(10000);

  const resourceList = [
    {
      name: "DNS رکورد",
      value: dnsRecord,
      onChange: setDnsRecord,
      min: 10000,
      max: 1000000,
      step: 10000,
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
            <DnsReceipt dnsRecord={dnsRecord} />
          </Box>
        </Stack>
      </Box>
    </Grid>
  );
};
