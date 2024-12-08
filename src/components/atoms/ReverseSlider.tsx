import type { FC } from "react";
import {
  createTheme,
  Slider,
  SliderProps,
  styled,
  ThemeProvider,
} from "@mui/material";
import { BORDER_RADIUS_1 } from "src/configs/theme";

const theme = createTheme({
  direction: "ltr",
  palette: {
    primary: { main: "#5188F7", light: "#97B8FA" },
    secondary: { main: "#202020", light: "#6F6F6F" },
    grey: {
      600: "#797979",
      700: "#6E768A",
    },
  },
  typography: {
    // htmlFontSize: 16 (MUI default),
    fontFamily: "dana",
  },
  shape: {
    borderRadius: Number(BORDER_RADIUS_1.replace("px", "")),
  },
});

const CustomSlider = styled(Slider)<SliderProps>(({ theme }) => ({
  "& .MuiSlider-root": {},
  "& .MuiSlider-rail": {
    backgroundColor: "#DCDEE3",
  },
  "& .MuiSlider-thumb": {
    marginRight: -12.5,
    marginLeft: 0,
    width: "12px",
    height: "12px",
    transition: "100ms",
    transformOrigin: "-450% 550%",
    "&:hover, &.Mui-focusVisible": {},
    "&.Mui-active": {
      transform: "scale(1.1)",
    },
    "&>.MuiSlider-valueLabel": {
      fontWeight: 700,
      fontSize: "12px",
      borderRadius: BORDER_RADIUS_1,
      backgroundColor: theme.palette.primary.main,
    },
  },
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-markLabel": {},
}));

const ReverseSlider: FC<SliderProps> = (props) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CustomSlider {...props} />
      </ThemeProvider>
    </>
  );
};

export default ReverseSlider;
