import type { FC } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

export const Edit: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props} sx={{ fill: "none", ...props.sx }}>
      <path
        d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13"
        stroke="#6E768A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.04 3.02L8.16 10.9C7.86 11.2 7.56 11.79 7.5 12.22L7.07 15.23C6.91 16.32 7.68 17.08 8.77 16.93L11.78 16.5C12.2 16.44 12.79 16.14 13.1 15.84L20.98 7.96C22.34 6.6 22.98 5.02 20.98 3.02C18.98 1.02 17.4 1.66 16.04 3.02Z"
        stroke="#6E768A"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.91 4.15C15.58 6.54 17.45 8.41 19.85 9.09"
        stroke="#6E768A"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};
