import {
  Box,
  CircularProgress,
  CircularProgressProps,
  Typography,
} from "@mui/material";

export const CircularProgressWithLabel = (
  props: CircularProgressProps & { value: number; total: number }
) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          component="div"
          sx={{ color: "text.secondary", fontSize: "10px" }}
        >{`${Math.round(props.value * props.total) / 100}/${
          props.total
        }`}</Typography>
      </Box>
    </Box>
  );
};
