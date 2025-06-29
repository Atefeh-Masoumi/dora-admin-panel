import type { FC } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

type CloudConnectionProps = { mode: "default" | "selected" | "fill" };

const DeviceMessageSvg: FC<SvgIconProps & CloudConnectionProps> = ({
  mode,
  ...props
}) => {
  return (
    <SvgIcon {...props} sx={{ fill: "none", ...props.sx }}>
      <path
        opacity={mode === "selected" ? "0.4" : ""}
        d="M18.04 13.55C17.62 13.96 17.38 14.55 17.44 15.18C17.53 16.26 18.52 17.05 19.6 17.05H21.5V18.24C21.5 20.31 19.81 22 17.74 22H6.26C4.19 22 2.5 20.31 2.5 18.24V11.51C2.5 9.44001 4.19 7.75 6.26 7.75H17.74C19.81 7.75 21.5 9.44001 21.5 11.51V12.95H19.48C18.92 12.95 18.41 13.17 18.04 13.55Z"
        stroke={mode === "selected" ? "#3C8AFF" : "#6E768A"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...(mode === "selected" && { fill: "#3C8AFF" })}
      />
      <path
        d="M2.5 12.41V7.84004C2.5 6.65004 3.23 5.59 4.34 5.17L12.28 2.17C13.52 1.7 14.85 2.62003 14.85 3.95003V7.75002"
        stroke={mode === "selected" ? "#3C8AFF" : "#6E768A"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.5588 13.9702V16.0302C22.5588 16.5802 22.1188 17.0302 21.5588 17.0502H19.5988C18.5188 17.0502 17.5288 16.2602 17.4388 15.1802C17.3788 14.5502 17.6188 13.9602 18.0388 13.5502C18.4088 13.1702 18.9188 12.9502 19.4788 12.9502H21.5588C22.1188 12.9702 22.5588 13.4202 22.5588 13.9702Z"
        {...(mode === "default"
          ? {
              stroke: "#6E768A",
              strokeWidth: "1.5",
              strokeLinecap: "round",
              strokeLinejoin: "round",
            }
          : { fill: "#3C8AFF" })}
      />
      <path
        d="M7 12H14"
        stroke={mode === "selected" ? "#3C8AFF" : "#6E768A"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};

export default DeviceMessageSvg;
