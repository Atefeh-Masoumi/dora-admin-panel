import { FC } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

export const CodeCircleSvg: FC<SvgIconProps> = (props) => {
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
        id="Vector"
        d="M8 10L6 12L8 14"
        stroke="#202020"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        id="Vector_2"
        d="M16 10L18 12L16 14"
        stroke="#202020"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        id="Vector_3"
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        stroke="#202020"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        id="Vector_4"
        d="M13 9.66992L11 14.33"
        stroke="#202020"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};
