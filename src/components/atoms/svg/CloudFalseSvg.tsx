import type { FC } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

export const CloudFalse: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props} sx={{ fill: "none", ...props.sx }}>
      <path
        d="M12.97 18.11L10.86 16"
        stroke="#EA6C80"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.95 16.02L10.83 18.14"
        stroke="#EA6C80"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.54 11.62C0.859999 11.95 0.859999 18.76 5.54 19.09H7.46"
        stroke="#EA6C80"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.59 11.62C2.38 2.68999 15.92 -0.880007 17.47 8.49999C21.8 9.04999 23.55 14.82 20.27 17.69C19.27 18.6 17.98 19.1 16.63 19.09H16.54"
        stroke="#EA6C80"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 17.03C17 17.77 16.84 18.47 16.54 19.09C16.46 19.27 16.37 19.44 16.27 19.6C15.41 21.05 13.82 22.03 12 22.03C10.18 22.03 8.59 21.05 7.73 19.6C7.63 19.44 7.54 19.27 7.46 19.09C7.16 18.47 7 17.77 7 17.03C7 14.27 9.24 12.03 12 12.03C14.76 12.03 17 14.27 17 17.03Z"
        stroke="#EA6C80"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};
