import { Box, Grid, Stack } from "@mui/material";
import { FC, useState } from "react";
import ServiceSpecifications from "./ServiceSpecifications";
import StorageReceipt from "./StorageReceipt";

export const StorageCostEstimator: FC = () => {
  const [storageCount, setStorageCount] = useState(50);

  const resourceList = [
    {
      name: "Disk (GB)",
      value: storageCount,
      onChange: setStorageCount,
      min: 50,
      max: 5000,
      step: 50,
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
            <StorageReceipt storage={storageCount} />
          </Box>
        </Stack>
      </Box>
    </Grid>
  );
};
