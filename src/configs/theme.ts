import { createTheme } from "@mui/material";
import React from "react";
import { breakpointGenerator } from "src/utils/breakpointGenerator";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    title0: React.CSSProperties;
    title1: React.CSSProperties;
    title2: React.CSSProperties;
    title3: React.CSSProperties;
    title4: React.CSSProperties;
    title5: React.CSSProperties;
    title6: React.CSSProperties;
    title7: React.CSSProperties;
    title8: React.CSSProperties;
    title9: React.CSSProperties;
    text1: React.CSSProperties;
    text2: React.CSSProperties;
    text3: React.CSSProperties;
    text4: React.CSSProperties;
    text5: React.CSSProperties;
    text6: React.CSSProperties;
    text7: React.CSSProperties;
    text8: React.CSSProperties;
    text9: React.CSSProperties;
    text10: React.CSSProperties;
    text11: React.CSSProperties;
    text12: React.CSSProperties;
    text13: React.CSSProperties;
    text14: React.CSSProperties;
    text15: React.CSSProperties;
    button1: React.CSSProperties;
    button2: React.CSSProperties;
    button3: React.CSSProperties;
    button4: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    title0?: React.CSSProperties;
    title1?: React.CSSProperties;
    title2?: React.CSSProperties;
    title3?: React.CSSProperties;
    title4?: React.CSSProperties;
    title5?: React.CSSProperties;
    title6?: React.CSSProperties;
    title7?: React.CSSProperties;
    title8?: React.CSSProperties;
    title9?: React.CSSProperties;
    text1?: React.CSSProperties;
    text2?: React.CSSProperties;
    text3?: React.CSSProperties;
    text4?: React.CSSProperties;
    text5?: React.CSSProperties;
    text6?: React.CSSProperties;
    text7?: React.CSSProperties;
    text8?: React.CSSProperties;
    text9?: React.CSSProperties;
    text10?: React.CSSProperties;
    text11?: React.CSSProperties;
    text12?: React.CSSProperties;
    text13?: React.CSSProperties;
    text14?: React.CSSProperties;
    text15?: React.CSSProperties;
    button1?: React.CSSProperties;
    button2?: React.CSSProperties;
    button3?: React.CSSProperties;
    button4?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    title0: true;
    title1: true;
    title2: true;
    title3: true;
    title4: true;
    title5: true;
    title6: true;
    title7: true;
    title8: true;
    title9: true;
    text1: true;
    text2: true;
    text3: true;
    text4: true;
    text5: true;
    text6: true;
    text7: true;
    text8: true;
    text9: true;
    text10: true;
    text11: true;
    text12: true;
    text13: true;
    text14: true;
    text15: true;
    button1: true;
    button2: true;
    button3: true;
    button4: true;
    h6: false;
    h5: false;
    h4: false;
    h3: false;
    h2: false;
    h1: true;
    subtitle1: false;
    subtitle2: false;
    body1: false;
    body2: false;
    button: false;
    caption: false;
    overline: false;
  }
}

export const customBreakpoints = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1344,
};

export const BORDER_RADIUS_1 = "8px";
export const BORDER_RADIUS_2 = "16px";
export const BORDER_RADIUS_3 = "32px";
export const BORDER_RADIUS_4 = "24px";
export const BORDER_RADIUS_5 = "12px";

const theme = createTheme({
  direction: "rtl",
  breakpoints: { values: customBreakpoints },
  palette: {
    primary: { main: "#5188F7", light: "#97B8FA" },
    secondary: {
      main: "rgba(110, 118, 138, 1)",
      light: "rgba(110, 118, 138, 0.4)",
    },
    grey: { 600: "#797979", 700: "#6E768A" },
    error: { main: "rgb(244, 95, 80)", light: "rgba(244, 95, 80, 0.12)" },
    success: { main: "rgba(13, 191, 102, 1)", light: "rgba(218, 246, 232, 1)" },
    warning: { main: "rgba(255, 147, 68, 1)", light: "rgba(255, 233, 218, 1)" },
  },
  typography: {
    // htmlFontSize: 16 (MUI default),
    fontFamily: "dana",
    button: { ...breakpointGenerator([12, 16]), textTransform: "capitalize" },
    title0: { ...breakpointGenerator([22, 36]) },
    title1: { ...breakpointGenerator([18, 40]) },
    title2: { ...breakpointGenerator([14, 32]) },
    title3: { ...breakpointGenerator([14, 28]) },
    title4: { ...breakpointGenerator([18, 26]) },
    title5: { ...breakpointGenerator([18, 24]) },
    title6: { ...breakpointGenerator([14, 24]) },
    title7: { ...breakpointGenerator([24, 48]) },
    title8: { ...breakpointGenerator([18, 36]) },
    title9: { ...breakpointGenerator([24, 36]) },
    text1: { ...breakpointGenerator([14, 18]) },
    text2: { ...breakpointGenerator([12, 18]) },
    text3: { ...breakpointGenerator([10, 18]) },
    text4: { ...breakpointGenerator([10, 16]) },
    text5: { ...breakpointGenerator([24, 40]) },
    text6: { ...breakpointGenerator([6.5, 14]) },
    text7: { ...breakpointGenerator([6.5, 12]) },
    text8: { ...breakpointGenerator([10, 12]) },
    text9: { ...breakpointGenerator([10, 14]) },
    text10: { ...breakpointGenerator([20, 28]) },
    text11: { ...breakpointGenerator([20, 28]) },
    text12: { ...breakpointGenerator([14, 20]) },
    text13: { ...breakpointGenerator([12, 14]) },
    text14: { ...breakpointGenerator([14, 16]) },
    text15: { ...breakpointGenerator([12, 16]) },
    button1: { ...breakpointGenerator([12, 16]) },
    button2: { ...breakpointGenerator([16, 24]) },
    button3: { ...breakpointGenerator([13, 18]) },
    button4: { ...breakpointGenerator([8, 16]) },
  },
  shape: { borderRadius: Number(BORDER_RADIUS_1.replace("px", "")) },
  components: {
    MuiTypography: { styleOverrides: { root: { display: "block" } } },
    MuiContainer: { defaultProps: { maxWidth: "xl" } },
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "capitalize", boxShadow: "none" },
      },
    },
    MuiPaper: { styleOverrides: { root: { borderRadius: BORDER_RADIUS_1 } } },
    MuiSkeleton: { defaultProps: { animation: "wave" } },
  },
});

export default theme;
