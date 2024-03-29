import { FC } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

export const TwoEmptyCircleSvg: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon
      className="svg-default-class"
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      {...props}
    >
      <path
        d="M8.41747 3.83341C9.46959 2.80243 10.9105 2.16675 12.5 2.16675C15.7216 2.16675 18.3333 4.77842 18.3333 8.00008C18.3333 9.58953 17.6976 11.0305 16.6666 12.0826M13.3333 13.0001C13.3333 16.2217 10.7216 18.8334 7.49996 18.8334C4.2783 18.8334 1.66663 16.2217 1.66663 13.0001C1.66663 9.77842 4.2783 7.16675 7.49996 7.16675C10.7216 7.16675 13.3333 9.77842 13.3333 13.0001Z"
        stroke="#C1C1C1"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};
