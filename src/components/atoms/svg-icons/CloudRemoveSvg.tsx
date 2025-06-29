import type { FC } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

export const CloudRemoveSvg: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
      sx={{ fill: "none", ...props.sx }}
    >
      <path
        d="M12.9699 17.61L10.8599 15.5"
        stroke="#3C8AFF"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.9501 15.5195L10.8301 17.6395"
        stroke="#3C8AFF"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.53978 11.1172C0.859785 11.4472 0.859785 18.2572 5.53978 18.5872H7.45978"
        stroke="#3C8AFF"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.59003 11.1187C2.38003 2.18868 15.92 -1.38132 17.47 7.99868C21.8 8.54868 23.55 14.3187 20.27 17.1887C19.27 18.0987 17.98 18.5987 16.63 18.5887H16.54"
        stroke="#3C8AFF"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 16.5312C17 17.2713 16.84 17.9712 16.54 18.5912C16.46 18.7712 16.37 18.9413 16.27 19.1013C15.41 20.5513 13.82 21.5312 12 21.5312C10.18 21.5312 8.59 20.5513 7.73 19.1013C7.63 18.9413 7.54 18.7712 7.46 18.5912C7.16 17.9712 7 17.2713 7 16.5312C7 13.7713 9.24 11.5312 12 11.5312C14.76 11.5312 17 13.7713 17 16.5312Z"
        stroke="#3C8AFF"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};
