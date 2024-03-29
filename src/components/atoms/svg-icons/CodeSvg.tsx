import { FC } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

export const CodeSvg: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon
      className="svg-default-class"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        id="Icon"
        d="M17 17.0001L22 12.0001L17 7.00009M7 7.00009L2 12.0001L7 17.0001M14 3.00009L10 21.0001"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};
