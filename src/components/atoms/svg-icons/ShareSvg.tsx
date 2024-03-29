import type { FC } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

export const Share: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props} sx={{ fill: "none", ...props.sx }}>
      <path
        d="M16.96 6.16992C18.96 7.55992 20.34 9.76992 20.62 12.3199"
        stroke="#6E768A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.49023 12.3697C3.75023 9.82973 5.11023 7.61973 7.09023 6.21973"
        stroke="#6E768A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.18994 20.9404C9.34994 21.5304 10.6699 21.8604 12.0599 21.8604C13.3999 21.8604 14.6599 21.5604 15.7899 21.0104"
        stroke="#6E768A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.0598 7.69965C13.5951 7.69965 14.8398 6.455 14.8398 4.91965C14.8398 3.3843 13.5951 2.13965 12.0598 2.13965C10.5244 2.13965 9.27979 3.3843 9.27979 4.91965C9.27979 6.455 10.5244 7.69965 12.0598 7.69965Z"
        stroke="#6E768A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.8298 19.9204C6.36516 19.9204 7.60981 18.6757 7.60981 17.1404C7.60981 15.605 6.36516 14.3604 4.8298 14.3604C3.29445 14.3604 2.0498 15.605 2.0498 17.1404C2.0498 18.6757 3.29445 19.9204 4.8298 19.9204Z"
        stroke="#6E768A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.1701 19.9204C20.7055 19.9204 21.9501 18.6757 21.9501 17.1404C21.9501 15.605 20.7055 14.3604 19.1701 14.3604C17.6348 14.3604 16.3901 15.605 16.3901 17.1404C16.3901 18.6757 17.6348 19.9204 19.1701 19.9204Z"
        stroke="#6E768A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};
