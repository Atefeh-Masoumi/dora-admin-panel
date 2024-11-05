import type { FC } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

export const CalculateSvg: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props} sx={{ fill: "none", ...props.sx }}>
      <path
        d="M14.4207 5.63965H21.7007"
        stroke={props.stroke || "#6E768A"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.29956 5.64014H9.57956"
        stroke={props.stroke || "#6E768A"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.4207 15.3301H21.7007"
        stroke={props.stroke || "#6E768A"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.4207 21.3896H21.7007"
        stroke={props.stroke || "#6E768A"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.0894 9.27V2"
        stroke={props.stroke || "#6E768A"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.29956 22L9.57956 14.73"
        stroke={props.stroke || "#6E768A"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.57956 22L2.29956 14.73"
        stroke={props.stroke || "#6E768A"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};
