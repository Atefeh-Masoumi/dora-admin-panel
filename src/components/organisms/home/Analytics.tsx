import {
  Box,
  Divider,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { analyticsCategories } from "src/components/organisms/home/constants/homeAnalyticsConstant";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { SampleChart } from "./charts/SampleChart";

export const Analytics: FC = () => {
  const [categoryId, setCategoryId] = useState(1);

  const handleChange = (event: SelectChangeEvent) => {
    setCategoryId(+event.target.value);
  };
  return (
    <Grid
      item
      xs={12}
      md
      sx={{
        width: "100%",
        bgcolor: "white",
        borderRadius: { xs: BORDER_RADIUS_1, md: BORDER_RADIUS_1 },
        px: { xs: 1.5, lg: 2 },
        py: { xs: 2, lg: 2.5 },
        overflow: "hidden",
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="text1" color="rgba(110, 118, 138, 1)" >
          مصرف ۳۰ روز اخیر
        </Typography>
        <Select
          size="small"
          type="number"
          value={"" + categoryId}
          onChange={handleChange}
          sx={{
            width: 185,
            color: "secondary",
            borderRadius: BORDER_RADIUS_1,
            borderColor: "rgba(110, 118, 138, 0.06)",
          }}
        >
          {analyticsCategories.map(({ category, id }) => (
            <MenuItem
              sx={{
                mx: 0.5,
                my: 1,
                borderRadius: 1,
              }}
              key={id}
              value={id}
            >
              {category}
            </MenuItem>
          ))}
        </Select>
      </Stack>
      <Divider
        sx={{
          borderColor: "rgba(110, 118, 138, 0.08)",
          mt: 1.5,
          mb: { xs: 1.4, md: 2.3 },
        }}
      />
      <Box sx={{ height: 170 }}>
        <SampleChart categoryId={categoryId + 1} />
      </Box>
    </Grid>
  );
};
