import type { FC } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

type CloudConnectionProps = { mode: "default" | "selected" | "fill" };

const CodeCircleSvg: FC<SvgIconProps & CloudConnectionProps> = ({
  mode,
  ...props
}) => {
  return (
    <SvgIcon {...props} sx={{ fill: "none", ...props.sx }}>
      <path
        d="M8 10L6 12L8 14"
        stroke={
          mode === "selected"
            ? "#3C8AFF"
            : mode === "fill"
            ? "#FF45F2"
            : "#6E768A"
        }
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 10L18 12L16 14"
        stroke={
          mode === "selected"
            ? "#3C8AFF"
            : mode === "fill"
            ? "#FF45F2"
            : "#6E768A"
        }
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
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
              stroke: "#FF45F2",
            }
          : { fill: "#3C8AFF" })}
      />
      <path
        d="M13 9.66992L11 14.33"
        stroke={
          mode === "selected"
            ? "#3C8AFF"
            : mode === "fill"
            ? "#FF45F2"
            : "#6E768A"
        }
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};

export default CodeCircleSvg;
