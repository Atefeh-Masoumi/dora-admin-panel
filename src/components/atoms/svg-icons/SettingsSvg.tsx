import { FC } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

export const SettingsSvg: FC<SvgIconProps> = (props) => {
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
        d="M2.5 7.1665L12.5 7.1665M12.5 7.1665C12.5 8.54722 13.6193 9.6665 15 9.6665C16.3807 9.6665 17.5 8.54722 17.5 7.1665C17.5 5.78579 16.3807 4.6665 15 4.6665C13.6193 4.6665 12.5 5.78579 12.5 7.1665ZM7.5 13.8332L17.5 13.8332M7.5 13.8332C7.5 15.2139 6.38071 16.3332 5 16.3332C3.61929 16.3332 2.5 15.2139 2.5 13.8332C2.5 12.4525 3.61929 11.3332 5 11.3332C6.38071 11.3332 7.5 12.4525 7.5 13.8332Z"
        stroke="#202020"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};
