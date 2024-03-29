import type { FC } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

export const CloudConnectionSvg: FC<SvgIconProps> = ({ mode, ...props }) => {
  return (
    <SvgIcon {...props} sx={{ fill: "none", ...props.sx }}>
      <path
        opacity={mode === "selected" ? "0.4" : ""}
        d="M6.36997 9.51017C2.28997 9.80017 2.29997 15.7102 6.36997 16.0002H16.03C17.2 16.0102 18.33 15.5702 19.2 14.7802C22.06 12.2802 20.53 7.28015 16.76 6.80015C15.41 -1.33985 3.61998 1.75017 6.40998 9.51017"
        stroke={mode === "selected" ? "#3C8AFF" : "#6E768A"}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...(mode === "selected" && { fill: "#3C8AFF" })}
      />
      <path
        d="M12 16V19"
        stroke={mode === "selected" ? "#3C8AFF" : "#6E768A"}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...(mode === "selected" && { fill: "#3C8AFF" })}
      />
      <path
        d="M12 23C13.1046 23 14 22.1046 14 21C14 19.8954 13.1046 19 12 19C10.8954 19 10 19.8954 10 21C10 22.1046 10.8954 23 12 23Z"
        stroke={mode === "selected" ? "#3C8AFF" : "#6E768A"}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 21H14"
        stroke={mode === "selected" ? "#3C8AFF" : "#6E768A"}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...(mode === "selected" && { fill: "#3C8AFF" })}
      />
      <path
        d="M10 21H6"
        stroke={mode === "selected" ? "#3C8AFF" : "#6E768A"}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...(mode === "selected" && { fill: "#3C8AFF" })}
      />
    </SvgIcon>
  );
};
