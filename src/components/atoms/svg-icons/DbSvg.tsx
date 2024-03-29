import { FC } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

export const DbSvg: FC<SvgIconProps> = (props) => {
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
        d="M6 8.00012H6.01M6 16.0001H6.01M6 12.0001H18M6 12.0001C3.79086 12.0001 2 10.2093 2 8.00012C2 5.79098 3.79086 4.00012 6 4.00012H18C20.2091 4.00012 22 5.79098 22 8.00012C22 10.2093 20.2091 12.0001 18 12.0001M6 12.0001C3.79086 12.0001 2 13.791 2 16.0001C2 18.2093 3.79086 20.0001 6 20.0001H18C20.2091 20.0001 22 18.2093 22 16.0001C22 13.791 20.2091 12.0001 18 12.0001"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};
