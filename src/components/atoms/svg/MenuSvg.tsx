import type { FC } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const MenuSvg: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon
      width="24"
      height="24"
      viewBox="0 0 24 24"
      sx={{ fill: "none" }}
      {...props}
    >
      <path
        d="M3 7H21"
        stroke="#6E768A"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8 12L21 12"
        stroke="#6E768A"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 17L21 17"
        stroke="#6E768A"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </SvgIcon>
  );
};

export default MenuSvg;
