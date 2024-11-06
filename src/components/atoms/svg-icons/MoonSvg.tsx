import { FC } from "react";
import { svgDefaultType } from "src/types/svgDefault.type";

export const MoonSvg: FC<svgDefaultType> = (props) => {
  return (
    <svg
      style={props.svgStyle}
      className={"svg-default-class " + props.className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="moon-01" opacity="0.3" clipPath="url(#clip0_661_5986)">
        <path
          style={props.pathsStyle}
          stroke={props.strokeColor}
          id="Icon"
          d="M14.6667 10.5629C13.7911 10.9588 12.8191 11.1793 11.7956 11.1793C7.94353 11.1793 4.82077 8.05651 4.82077 4.2044C4.82077 3.18094 5.0412 2.20897 5.43718 1.33337C3.01717 2.4278 1.33333 4.86317 1.33333 7.69183C1.33333 11.544 4.45609 14.6667 8.30821 14.6667C11.1369 14.6667 13.5722 12.9829 14.6667 10.5629Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_661_5986">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
