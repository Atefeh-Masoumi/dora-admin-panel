import { FC } from "react";
import { svgDefaultType } from "src/types/svgDefault.type";

export const SunSvg: FC<svgDefaultType> = (props) => {
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
      <g id="sun" clipPath="url(#clip0_662_6244)">
        <g id="Icon">
          <path
            style={props.pathsStyle}
            stroke={props.strokeColor}
            d="M8 11.3334C9.84095 11.3334 11.3333 9.84099 11.3333 8.00004C11.3333 6.15909 9.84095 4.66671 8 4.66671C6.15905 4.66671 4.66667 6.15909 4.66667 8.00004C4.66667 9.84099 6.15905 11.3334 8 11.3334Z"
          />
          <path
            style={props.pathsStyle}
            stroke={props.strokeColor}
            d="M8 1.33337V2.66671M8 13.3334V14.6667M2.66667 8.00004H1.33333M4.20941 4.20945L3.2666 3.26664M11.7906 4.20945L12.7334 3.26664M4.20941 11.7934L3.2666 12.7362M11.7906 11.7934L12.7334 12.7362M14.6667 8.00004H13.3333M11.3333 8.00004C11.3333 9.84099 9.84095 11.3334 8 11.3334C6.15905 11.3334 4.66667 9.84099 4.66667 8.00004C4.66667 6.15909 6.15905 4.66671 8 4.66671C9.84095 4.66671 11.3333 6.15909 11.3333 8.00004Z"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_662_6244">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
