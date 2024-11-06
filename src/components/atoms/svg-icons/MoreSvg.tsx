import type { FC } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const MoreSvg: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon
      width="24"
      height="24"
      viewBox="0 0 24 24"
      sx={{ fill: "none" }}
      {...props}
    >
      <path
        d="M12 15.9965L12 16.0054"
        stroke="#8B91A1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 11.9955L12 12.0045"
        stroke="#8B91A1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 7.99451L12 8.00349"
        stroke="#8B91A1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};

export default MoreSvg;
