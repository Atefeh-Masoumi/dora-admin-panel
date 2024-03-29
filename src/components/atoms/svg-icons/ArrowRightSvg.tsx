import type { FC } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

export const ArrowRight: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props} sx={{ fill: "none", ...props.sx }}>
      <path
        d="M12.43 0.93L18.5 7L12.43 13.07"
        stroke="#6E768A"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.5 7H18.33"
        stroke="#6E768A"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};
