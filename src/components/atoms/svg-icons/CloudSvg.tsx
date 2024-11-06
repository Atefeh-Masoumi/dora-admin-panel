import { FC } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

export const CloudSvg: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="32"
        viewBox="0 0 50 32"
        fill="none"
        {...props}
      >
        <path
          d="M37 17C35.5612 22.2322 31.5539 26 26.8404 26C25.4918 26 24.1945 25.6872 23 25.1185"
          stroke="#1890FF"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M31 15.3642C25.6009 18.3753 20.2018 21 14.1941 21C10.1312 21 5.76425 19.7476 4.46726 17.0696C2.21792 12.4597 8.37132 6.31756 16.8801 3"
          stroke="#1890FF"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M20 1.74187C21.5115 1.26755 23.1369 1 24.8263 1C31.2018 1 36.6633 4.70943 39 10"
          stroke="#1890FF"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M33 31H10.8339C7.82307 31 5.24953 28.9895 3.85671 27.6491C2.09262 25.941 -0.524638 20.4686 2.13461 17"
          stroke="#1890FF"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
        <path
          d="M34 12.5649C35.5358 11.5703 37.3404 11 39.2859 11C44.8018 11 49 16.5172 49 22.2333C49 22.8434 48.9874 23.0821 48.8975 23.6657C48.1806 28.1484 44.7765 31 40.2969 31H35.459"
          stroke="#1890FF"
          strokeWidth="2"
          strokeMiterlimit="10"
          strokeLinecap="round"
        />
      </svg>
    </SvgIcon>
  );
};
