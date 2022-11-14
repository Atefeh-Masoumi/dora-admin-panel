import type { FC } from "react";
import { Box, Stack, useTheme } from "@mui/material";
import BeatLoader from "react-spinners/BeatLoader";

const PageLoading: FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        position: "fixed",
        backdropFilter: "blur(5px)",
        zIndex: 1101,
      }}
    >
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{
          width: "100vw",
          height: "100vh",
        }}
      >
        <BeatLoader color={theme.palette.primary.main} loading size={50} />
      </Stack>
    </Box>
  );
};

export default PageLoading;
