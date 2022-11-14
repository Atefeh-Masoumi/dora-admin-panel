import type { FC } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

type CloudConnectionProps = { mode?: "default" | "selected" | "fill" };

const DriverSvg: FC<SvgIconProps & CloudConnectionProps> = ({
  mode = "default",
  ...props
}) => {
  return (
    <SvgIcon {...props} sx={{ fill: "none", ...props.sx }}>
      <path
        d="M19.32 9.99977H4.69002C3.21002 9.99977 2.01001 8.78978 2.01001 7.31978V4.68977C2.01001 3.20977 3.22002 2.00977 4.69002 2.00977H19.32C20.8 2.00977 22 3.21977 22 4.68977V7.31978C22 8.78978 20.79 9.99977 19.32 9.99977Z"
        opacity={mode === "selected" ? "0.4" : ""}
        {...(mode === "default"
          ? {
              stroke: "#6E768A",
              strokeWidth: "1.5",
              strokeLinecap: "round",
              strokeLinejoin: "round",
            }
          : mode === "fill"
          ? {
              stroke: "#21A366",
            }
          : { fill: "#3C8AFF" })}
      />
      <path
        opacity={mode === "selected" ? "0.4" : ""}
        d="M19.32 21.9998H4.69002C3.21002 21.9998 2.01001 20.7898 2.01001 19.3198V16.6898C2.01001 15.2098 3.22002 14.0098 4.69002 14.0098H19.32C20.8 14.0098 22 15.2198 22 16.6898V19.3198C22 20.7898 20.79 21.9998 19.32 21.9998Z"
        {...(mode === "default"
          ? {
              stroke: "#6E768A",
              strokeWidth: "1.5",
              strokeLinecap: "round",
              strokeLinejoin: "round",
            }
          : mode === "fill"
          ? {
              stroke: "#21A366",
            }
          : { fill: "#3C8AFF" })}
      />
      <path
        d="M6 5V7"
        stroke={
          mode === "selected"
            ? "#3C8AFF"
            : mode === "fill"
            ? "#21A366"
            : "#6E768A"
        }
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 5V7"
        stroke={
          mode === "selected"
            ? "#3C8AFF"
            : mode === "fill"
            ? "#21A366"
            : "#6E768A"
        }
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 17V19"
        stroke={
          mode === "selected"
            ? "#3C8AFF"
            : mode === "fill"
            ? "#21A366"
            : "#6E768A"
        }
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 17V19"
        stroke={
          mode === "selected"
            ? "#3C8AFF"
            : mode === "fill"
            ? "#21A366"
            : "#6E768A"
        }
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 6H18"
        stroke={
          mode === "selected"
            ? "#3C8AFF"
            : mode === "fill"
            ? "#21A366"
            : "#6E768A"
        }
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 18H18"
        stroke={
          mode === "selected"
            ? "#3C8AFF"
            : mode === "fill"
            ? "#21A366"
            : "#6E768A"
        }
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};

export default DriverSvg;
