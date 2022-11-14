import type { FC } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

export const PlaySvg: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon
      width="18"
      height="20"
      viewBox="0 0 18 20"
      {...props}
      sx={{ fill: "none", ...props.sx }}
    >
      <path
        d="M1 9.99941V6.43941C1 2.01941 4.13 0.209407 7.96 2.41941L11.05 4.19941L14.14 5.97941C17.97 8.18941 17.97 11.8094 14.14 14.0194L11.05 15.7994L7.96 17.5794C4.13 19.7894 1 17.9794 1 13.5594V9.99941Z"
        stroke="#3C8AFF"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};
