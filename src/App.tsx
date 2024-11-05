import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import type { FC } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import theme from "src/configs/theme";
import createEmotionCache from "src/createEmotionCache";
import Router from "src/routes/Router";
import "./assets/css/style.css";

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
