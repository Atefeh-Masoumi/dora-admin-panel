import { Paper, Stack, Typography, Box } from "@mui/material";

type StatBoxProps = {
  title: string;
  value: string | number;
  unit?: string;
  img?: string;
  color?:string;
};

export const StatBox = ({ title, value, unit, img }: StatBoxProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 1.5,
        borderRadius: 2,
        border: "1px solid rgba(0,0,0,0.08)",
        direction: "rtl",
        flex: 1,
        minWidth: 180,
      }}
    >
      <Stack spacing={0.5}>
        <Typography fontSize={14} fontWeight={500} color="grey.700">
          {title}
        </Typography>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box display={"flex"}>
            <Typography fontSize={20} fontWeight={700} color="black">
              {value}
            </Typography>
              {unit && (
                <Typography
                  component="span"
                  fontSize={12}
                  fontWeight={500}
                  sx={{ m: 1.5 }}
                >
                  {unit}
                </Typography>
              )}
          </Box>

          {img && (
            <Box
              component="img"
              src={img}
              alt="stat"
              sx={{ width: 40, height: 40 }}
            />
          )}
        </Stack>
      </Stack>
    </Paper>
  );
};
