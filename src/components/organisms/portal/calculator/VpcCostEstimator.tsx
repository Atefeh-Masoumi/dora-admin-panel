import { Box, Grid, Stack } from "@mui/material";
import { FC, useState } from "react";
import ServiceSpecifications from "./ServiceSpecifications";
import VpcReceipt from "./VpcReceipt";

export const VpcCostEstimator: FC = () => {
  const [ipCount, setIpCount] = useState(1);
  const [rulesCount, setRulesCount] = useState(10);

  const resourceList = [
    {
      name: "IPV4",
      value: ipCount,
      onChange: setIpCount,
      min: 1,
      max: 10,
      step: 1,
    },
    {
      name: "Rules(10)",
      value: rulesCount,
      onChange: setRulesCount,
      min: 10,
      max: 100,
      step: 10,
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
            <ServiceSpecifications resourceList={resourceList} />
          </Box>
          <Box sx={{ width: { xs: "100%", md: "378px", overflow: "hidden" } }}>
            <VpcReceipt ipCount={ipCount} rulesCount={rulesCount} />
          </Box>
        </Stack>
      </Box>
    </Grid>
  );
};
