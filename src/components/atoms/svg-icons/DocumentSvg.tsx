import type { FC } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

export const Document: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props} sx={{ fill: "none", ...props.sx }}>
      <path
        d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 10H18C15 10 14 9 14 6V2L22 10Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 13H13"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 17H11"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};
