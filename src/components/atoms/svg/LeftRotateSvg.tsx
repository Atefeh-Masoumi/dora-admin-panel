import type { FC } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

export const LeftRotateSvg: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
      sx={{ fill: "none", ...props.sx }}
    >
      <path
        d="M9.11008 5.07844C9.98008 4.81844 10.9401 4.64844 12.0001 4.64844C16.7901 4.64844 20.6701 8.52844 20.6701 13.3184C20.6701 18.1084 16.7901 21.9884 12.0001 21.9884C7.21008 21.9884 3.33008 18.1084 3.33008 13.3184C3.33008 11.5384 3.87008 9.87844 4.79008 8.49844"
        stroke="#3C8AFF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.87012 5.32L10.7601 2"
        stroke="#3C8AFF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.87012 5.32031L11.2401 7.78031"
        stroke="#3C8AFF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};
