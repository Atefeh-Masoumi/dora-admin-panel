import type { FC } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

const LoginSvg: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon
      width={24}
      height={24}
      viewBox="0 0 24 24"
      sx={{
        fill: "none",
      }}
      {...props}
    >
      <path
        d="M15.1001 16.4398C14.7901 20.0398 12.9401 21.5098 8.8901 21.5098L8.7601 21.5098C4.2901 21.5098 2.5001 19.7198 2.5001 15.2498L2.5001 8.72977C2.5001 4.25977 4.2901 2.46977 8.7601 2.46977L8.8901 2.46977C12.9101 2.46976 14.7601 3.91976 15.0901 7.45976"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 12L9.12 12"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.3501 15.3496L8.0001 11.9996L11.3501 8.64961"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};

export default LoginSvg;
