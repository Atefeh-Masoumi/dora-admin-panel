import { Backdrop } from "@mui/material";
import { styled } from "@mui/material/styles";

export const BlurBackdrop = styled(Backdrop, {
  name: "MuiModal",
  slot: "Backdrop",
  overridesResolver: (styles) => {
    return styles.backdrop;
  },
})({ zIndex: -1, backdropFilter: "blur(15px)" });
