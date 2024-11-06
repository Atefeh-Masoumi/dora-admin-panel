import { FC } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

export const CalculatorSvg: FC<SvgIconProps> = ({ mode, ...props }) => {
  return (
    <SvgIcon
      className="svg-default-class"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      sx={{ fill: "none", ...props.sx }}
    >
      <path
        d="M21 7V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7Z"
        stroke={mode === "selected" ? "#3C8AFF" : "#6E768A"}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.25 11H7.75C6.79 11 6 10.21 6 9.25V6.75C6 5.79 6.79 5 7.75 5H16.25C17.21 5 18 5.79 18 6.75V9.25C18 10.21 17.21 11 16.25 11Z"
        stroke={mode === "selected" ? "#3C8AFF" : "#6E768A"}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.4902 17.5V14M7.49023 17.5V17M7.49023 14.5V14M10.4902 14.5V14M13.4902 14.5V14M13.4902 17.5V17M10.4902 17.5V17"
        stroke={mode === "selected" ? "#3C8AFF" : "#6E768A"}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};
