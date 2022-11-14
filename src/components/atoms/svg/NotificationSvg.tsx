import type { FC } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const NotificationSvg: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon
      width="20"
      height="20"
      viewBox="0 0 20 20"
      sx={{ opacity: 0.8, fill: "none" }}
      {...props}
    >
      <path
        d="M10.0167 2.4248C7.25841 2.4248 5.01674 4.66647 5.01674 7.4248V9.83314C5.01674 10.3415 4.80007 11.1165 4.54174 11.5498L3.58341 13.1415C2.99174 14.1248 3.40007 15.2165 4.48341 15.5831C8.07507 16.7831 11.9501 16.7831 15.5417 15.5831C16.5501 15.2498 16.9917 14.0581 16.4417 13.1415L15.4834 11.5498C15.2334 11.1165 15.0167 10.3415 15.0167 9.83314V7.4248C15.0167 4.6748 12.7667 2.4248 10.0167 2.4248Z"
        stroke="#6E768A"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M11.5584 2.6667C11.3001 2.5917 11.0334 2.53337 10.7584 2.50003C9.95843 2.40003 9.19176 2.45837 8.4751 2.6667C8.71676 2.05003 9.31676 1.6167 10.0168 1.6167C10.7168 1.6167 11.3168 2.05003 11.5584 2.6667Z"
        stroke="#6E768A"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5166 15.8833C12.5166 17.2583 11.3916 18.3833 10.0166 18.3833C9.33327 18.3833 8.69993 18.1 8.24993 17.65C7.79993 17.2 7.5166 16.5666 7.5166 15.8833"
        stroke="#6E768A"
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
    </SvgIcon>
  );
};

export default NotificationSvg;
