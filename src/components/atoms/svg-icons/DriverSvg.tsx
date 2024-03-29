import { FC } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

export const DriverSvg: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon
      className="svg-default-class"
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      {...props}
    >
      <path
        d="M19.82 10H5.19002C3.71002 10 2.51001 8.79001 2.51001 7.32001V4.69C2.51001 3.21 3.72002 2.00999 5.19002 2.00999H19.82C21.3 2.00999 22.5 3.22 22.5 4.69V7.32001C22.5 8.79001 21.29 10 19.82 10Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.82 22H5.19002C3.71002 22 2.51001 20.79 2.51001 19.32V16.69C2.51001 15.21 3.72002 14.01 5.19002 14.01H19.82C21.3 14.01 22.5 15.22 22.5 16.69V19.32C22.5 20.79 21.29 22 19.82 22Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 5V7"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 5V7"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 17V19"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 17V19"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5 6H18.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5 18H18.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};
