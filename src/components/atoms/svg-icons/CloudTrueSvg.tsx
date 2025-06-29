import type { FC } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

export const CloudTrue: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props} sx={{ fill: "none", ...props.sx }}>
      <path
        d="M5.53997 11.12C0.859968 11.45 0.859968 18.26 5.53997 18.59H7.46001"
        stroke="#40BF6A"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.59003 11.12C2.38003 2.18999 15.92 -1.38001 17.47 7.99999C21.8 8.54999 23.55 14.32 20.27 17.19C19.27 18.1 17.98 18.6 16.63 18.59H16.54"
        stroke="#40BF6A"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 16.53C17 17.27 16.84 17.97 16.54 18.59C16.46 18.77 16.37 18.94 16.27 19.1C15.41 20.55 13.82 21.53 12 21.53C10.18 21.53 8.58998 20.55 7.72998 19.1C7.62998 18.94 7.54002 18.77 7.46002 18.59C7.16002 17.97 7 17.27 7 16.53C7 13.77 9.24 11.53 12 11.53C14.76 11.53 17 13.77 17 16.53Z"
        stroke="#40BF6A"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.44 16.53L11.43 17.52L13.56 15.55"
        stroke="#40BF6A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};
