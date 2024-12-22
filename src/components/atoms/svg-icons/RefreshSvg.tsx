import type { FC } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

export const RefreshSvg: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props} sx={{ fill: "none", ...props.sx }}>
      <path
        d="M21 11C21 16.52 16.52 21 11 21C5.48 21 2.11 15.44 2.11 15.44M2.11 15.44H6.63M2.11 15.44V20.44M1 11C1 5.48 5.44 1 11 1C17.67 1 21 6.56 21 6.56M21 6.56V1.56M21 6.56H16.56"
        stroke="#00a651"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};
