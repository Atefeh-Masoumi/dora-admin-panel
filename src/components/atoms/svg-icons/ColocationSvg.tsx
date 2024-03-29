import { FC } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

export const ColocationSvg: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon
      className="svg-default-class"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 21H22.5V22.5H12V21ZM20.25 19.5H14.25C13.4227 19.5 12.75 18.8272 12.75 18V14.25C12.75 13.4227 13.4227 12.75 14.25 12.75H20.25C21.0772 12.75 21.75 13.4227 21.75 14.25V18C21.75 18.8272 21.0772 19.5 20.25 19.5ZM14.25 14.25V18H20.25V14.25H14.25ZM11.25 17.25H7.5C6.67275 17.25 6 16.5773 6 15.75V12.75H7.5V15.75H11.25V17.25ZM1.5 9.75H12V11.25H1.5V9.75ZM9.75 8.25H3.75C2.92275 8.25 2.25 7.57725 2.25 6.75V3C2.25 2.17275 2.92275 1.5 3.75 1.5H9.75C10.5773 1.5 11.25 2.17275 11.25 3V6.75C11.25 7.57725 10.5773 8.25 9.75 8.25ZM3.75 3V6.75H9.75V3H3.75Z"
        fill="black"
      />
    </SvgIcon>
  );
};
