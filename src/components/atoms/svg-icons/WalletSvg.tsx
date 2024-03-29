import type { FC } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

export const WalletSvg: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon
      width="20"
      height="20"
      viewBox="0 0 20 20"
      sx={{ fill: "none" }}
      {...props}
    >
      <path
        d="M10.8333 7.5H5.83325"
        stroke="#8B91A1"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.3333 9.14147V10.8582C18.3333 11.3165 17.9667 11.6915 17.5 11.7081H15.8667C14.9667 11.7081 14.1417 11.0498 14.0667 10.1498C14.0167 9.62482 14.2167 9.13315 14.5667 8.79148C14.875 8.47482 15.3 8.2915 15.7667 8.2915H17.5C17.9667 8.30817 18.3333 8.68314 18.3333 9.14147Z"
        stroke="#8B91A1"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5667 8.79149C14.2167 9.13316 14.0168 9.62483 14.0668 10.1498C14.1418 11.0498 14.9667 11.7082 15.8667 11.7082H17.5001V12.9165C17.5001 15.4165 15.8334 17.0832 13.3334 17.0832H5.83342C3.33341 17.0832 1.66675 15.4165 1.66675 12.9165V7.08317C1.66675 4.8165 3.03342 3.23317 5.15842 2.9665C5.37508 2.93317 5.60008 2.9165 5.83342 2.9165H13.3334C13.5501 2.9165 13.7584 2.92483 13.9584 2.95816C16.1084 3.20816 17.5001 4.79984 17.5001 7.08317V8.29151H15.7667C15.3001 8.29151 14.8751 8.47483 14.5667 8.79149Z"
        stroke="#8B91A1"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};
