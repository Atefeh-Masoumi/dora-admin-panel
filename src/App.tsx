import type { FC } from "react";
import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import createEmotionCache from "src/createEmotionCache";
import "react-toastify/dist/ReactToastify.css";
import Router from "src/routes/Router";
import { ToastContainer } from "react-toastify";
import theme from "src/configs/theme";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "src/configs/global.css";

export const App: FC = () => {
  return (
    <CacheProvider value={createEmotionCache()}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router />
        <ToastContainer
          limit={3}
          rtl
          autoClose={10000}
          theme="colored"
          position="top-center"
        />
      </ThemeProvider>
    </CacheProvider>
  );
};
