import type { FC } from "react";
import { Paper, Stack, Typography } from "@mui/material";
import { BORDER_RADIUS_5 } from "src/configs/theme";

type ChartTooltipPropsType = { categoryId: number; payload?: any };

export const ChartTooltip: FC<ChartTooltipPropsType> = ({
  categoryId,
  payload,
}) => {
  const category = categoryId === 1 ? "سرویس پیامک ابری" : "تعداد سرویس ها";
  const analyticsValue =
    payload?.[0]?.value === 0 ? "صفر" : Math.trunc(payload?.[0]?.value);
  return (
    <Paper
      component={Stack}
      alignItems='center'
      justifyContent='center'
      rowGap={1}
      sx={{ bgcolor: "#202020", borderRadius: BORDER_RADIUS_5, p: 1 }}
    >
      <Typography fontSize="12px" fontWeight={500} color="white">
        {category}
      </Typography>
      <Typography fontSize="12px" color="rgba(255, 255, 255, 0.8)">
        {analyticsValue} {categoryId === 2 && "ریال"}
      </Typography>
    </Paper>
  );
};
