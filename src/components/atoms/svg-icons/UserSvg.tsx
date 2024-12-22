import type { FC } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

type UserProps = { status: "Active" | "Inactive" };

export const User: FC<SvgIconProps & UserProps> = ({ status, ...props }) => {
  return (
    <SvgIcon {...props} sx={{ fill: "none", ...props.sx }}>
      <path
        opacity="0.4"
        d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
        fill={status === "Active" ? "#00a651" : "#6E768A"}
      />
      <path
        d="M12 14.5C6.99 14.5 2.91 17.86 2.91 22C2.91 22.28 3.13 22.5 3.41 22.5H20.59C20.87 22.5 21.09 22.28 21.09 22C21.09 17.86 17.01 14.5 12 14.5Z"
        fill={status === "Active" ? "#00a651" : "#6E768A"}
      />
    </SvgIcon>
  );
};
