import { Box, Grid, Paper, Stack, Typography } from "@mui/material";

type StatBoxProps = {
  title: string;
  value: string | number;
  unit?: string;
  color?: string;
  img?: string;
};

export const StatBox = ({ title, value, unit, color, img }: StatBoxProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: "1px solid rgba(0,0,0,0.08)",
        flex: 1,
        direction: "rtl",
      }}
    >
      <Stack spacing={1}>
        <Typography color="grey.700" fontSize={24} fontWeight={500}>
          {title}
        </Typography>
        <Stack direction="row" alignItems="center" justifyContent="space-between">

        <Typography fontSize={28} fontWeight={700} color={ "black"}>
          {value}
          <Typography fontSize={18} fontWeight={500} sx={{ display: "inline-block", padding:3}} color="black">
            {unit}
          </Typography>
        </Typography>
        <img
              src={img}
              alt="stat box"
              style={{ width: "200px", height: "100px", margin: "0" }}
            />
        </Stack>
      </Stack>
    </Paper>
  );
};
