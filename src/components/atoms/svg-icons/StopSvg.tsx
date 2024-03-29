import type { FC } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

export const StopSvg: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon
      width="20"
      height="20"
      viewBox="0 0 20 20"
      {...props}
      sx={{ fill: "none", ...props.sx }}
    >
      <path
        d="M7.3 19H12.7C17.2 19 19 17.2 19 12.7V7.3C19 2.8 17.2 1 12.7 1H7.3C2.8 1 1 2.8 1 7.3V12.7C1 17.2 2.8 19 7.3 19Z"
        stroke="#3C8AFF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};
