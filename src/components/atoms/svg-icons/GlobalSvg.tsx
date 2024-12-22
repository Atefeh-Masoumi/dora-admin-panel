import type { FC } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

type CloudConnectionProps = { mode: "default" | "selected" | "fill" };

const GlobalSvg: FC<SvgIconProps & CloudConnectionProps> = ({
  mode,
  ...props
}) => {
  return (
    <SvgIcon
      width="24"
      height="24"
      viewBox="0 0 24 24"
      sx={{ fill: "none", opacity: 0.8 }}
      {...props}
    >
      <path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        stroke={
          mode === "selected"
            ? "#00a651"
            : mode === "fill"
            ? "#FF4550"
            : "#6E768A"
        }
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.0001 3H9.0001C7.0501 8.84 7.0501 15.16 9.0001 21H8.0001"
        stroke={
          mode === "selected"
            ? "#00a651"
            : mode === "fill"
            ? "#FF4550"
            : "#6E768A"
        }
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 3C16.95 8.84 16.95 15.16 15 21"
        stroke={
          mode === "selected"
            ? "#00a651"
            : mode === "fill"
            ? "#FF4550"
            : "#6E768A"
        }
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 16V15C8.84 16.95 15.16 16.95 21 15V16"
        stroke={
          mode === "selected"
            ? "#00a651"
            : mode === "fill"
            ? "#FF4550"
            : "#6E768A"
        }
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 9.0001C8.84 7.0501 15.16 7.0501 21 9.0001"
        stroke={
          mode === "selected"
            ? "#00a651"
            : mode === "fill"
            ? "#FF4550"
            : "#6E768A"
        }
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};

export default GlobalSvg;
