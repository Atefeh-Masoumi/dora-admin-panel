import type { FC } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

export const WindowsSvg: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props} sx={{ fill: "none", ...props.sx }}>
      <path
        opacity="0.4"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.8 2.24144L12.8 3.84144C12.33 3.93144 12 4.34144 12 4.82144V10.0014C12 10.5514 12.45 11.0014 13 11.0014H21C21.55 11.0014 22 10.5514 22 10.0014V3.22144C22 2.59144 21.42 2.12144 20.8 2.24144Z"
        fill="#6E768A"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.8 21.76L12.8 20.16C12.33 20.07 12 19.66 12 19.18V14C12 13.45 12.45 13 13 13H21C21.55 13 22 13.45 22 14V20.78C22 21.41 21.42 21.88 20.8 21.76Z"
        fill="#6E768A"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.78998 4.55959L2.78998 5.83959C2.32998 5.93959 2 6.34959 2 6.81959V9.99959C2 10.5496 2.45 10.9996 3 10.9996H9C9.55 10.9996 10 10.5496 10 9.99959V5.52959C10 4.89959 9.40998 4.41959 8.78998 4.55959Z"
        fill="#6E768A"
      />
      <path
        opacity="0.4"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.78998 19.44L2.78998 18.16C2.32998 18.06 2 17.65 2 17.18V14C2 13.45 2.45 13 3 13H9C9.55 13 10 13.45 10 14V18.47C10 19.1 9.40998 19.58 8.78998 19.44Z"
        fill="#6E768A"
      />
    </SvgIcon>
  );
};
