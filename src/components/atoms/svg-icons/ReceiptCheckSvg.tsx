import { FC } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

export const ReceiptCheckSvg: FC<SvgIconProps> = (props) => {
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
        d="M7.50004 9.25L9.16671 10.9167L12.9167 7.16667M16.6667 18V7C16.6667 5.59987 16.6667 4.8998 16.3942 4.36502C16.1545 3.89462 15.7721 3.51217 15.3017 3.27248C14.7669 3 14.0668 3 12.6667 3H7.33337C5.93324 3 5.23318 3 4.6984 3.27248C4.22799 3.51217 3.84554 3.89462 3.60586 4.36502C3.33337 4.8998 3.33337 5.59987 3.33337 7V18L5.62504 16.3333L7.70837 18L10 16.3333L12.2917 18L14.375 16.3333L16.6667 18Z"
        stroke="#C1C1C1"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};
