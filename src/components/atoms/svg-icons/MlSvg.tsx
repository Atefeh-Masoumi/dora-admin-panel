import { FC } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

export const MlSvg: FC<SvgIconProps> = (props) => {
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
        d="M17.5 17.6001L6.5 17.6001M7.8 3.00008H16.2C17.8802 3.00008 18.7202 3.00008 19.362 3.32706C19.9265 3.61468 20.3854 4.07362 20.673 4.6381C21 5.27984 21 6.11992 21 7.80008V16.2001C21 17.8802 21 18.7203 20.673 19.362C20.3854 19.9265 19.9265 20.3855 19.362 20.6731C18.7202 21.0001 17.8802 21.0001 16.2 21.0001H7.8C6.11984 21.0001 5.27976 21.0001 4.63803 20.6731C4.07354 20.3855 3.6146 19.9265 3.32698 19.362C3 18.7203 3 17.8802 3 16.2001V7.80008C3 6.11992 3 5.27984 3.32698 4.6381C3.6146 4.07362 4.07354 3.61468 4.63803 3.32706C5.27976 3.00008 6.11984 3.00008 7.8 3.00008Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};
