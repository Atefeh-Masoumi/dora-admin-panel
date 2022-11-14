import type { FC } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

export const CalendarSvg: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props} sx={{ fill: "none", ...props.sx }}>
      <path
        d="M6.66667 1.66667V4.16667"
        stroke="#3C8AFF"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3333 1.66667V4.16667"
        stroke="#3C8AFF"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.91667 7.575H17.0833"
        stroke="#3C8AFF"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 7.08333V14.1667C17.5 16.6667 16.25 18.3333 13.3333 18.3333H6.66667C3.75 18.3333 2.5 16.6667 2.5 14.1667V7.08333C2.5 4.58333 3.75 2.91667 6.66667 2.91667H13.3333C16.25 2.91667 17.5 4.58333 17.5 7.08333Z"
        stroke="#3C8AFF"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.0789 11.4167H13.0864"
        stroke="#3C8AFF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.0789 13.9167H13.0864"
        stroke="#3C8AFF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.99624 11.4167H10.0037"
        stroke="#3C8AFF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.99624 13.9167H10.0037"
        stroke="#3C8AFF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.91193 11.4167H6.91941"
        stroke="#3C8AFF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.91193 13.9167H6.91941"
        stroke="#3C8AFF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};
