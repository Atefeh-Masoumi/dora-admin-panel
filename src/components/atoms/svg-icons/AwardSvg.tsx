import { FC } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

export const AwardSvg: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon
      className="svg-default-class"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      {...props}
    >
      <path
        d="M5.83333 13.0751V18.8332L9.75241 17.2655C9.84387 17.229 9.88961 17.2107 9.93683 17.2034C9.9787 17.197 10.0213 17.197 10.0632 17.2034C10.1104 17.2107 10.1561 17.229 10.2476 17.2655L14.1667 18.8332V13.0751M16.25 8.4165C16.25 11.8683 13.4518 14.6665 10 14.6665C6.54822 14.6665 3.75 11.8683 3.75 8.4165C3.75 4.96472 6.54822 2.1665 10 2.1665C13.4518 2.1665 16.25 4.96472 16.25 8.4165Z"
        stroke="#202020"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};
