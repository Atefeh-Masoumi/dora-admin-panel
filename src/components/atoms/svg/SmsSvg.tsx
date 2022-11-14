import type { FC } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

type CloudConnectionProps = { mode: "default" | "selected" | "fill" };

const SmsSvg: FC<SvgIconProps & CloudConnectionProps> = ({
  mode,
  ...props
}) => {
  return (
    <SvgIcon {...props} sx={{ fill: "none", ...props.sx }}>
      <path
        d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z"
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
              stroke: "#9F45FF",
            }
          : { fill: "#3C8AFF" })}
      />
      <path
        d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9"
        stroke={
          mode === "selected"
            ? "#3C8AFF"
            : mode === "fill"
            ? "#9F45FF"
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

export default SmsSvg;
