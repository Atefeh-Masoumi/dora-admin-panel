import { FC } from "react";
import { svgDefaultType } from "src/types/svgDefault.type";

export const TwoDashSvg: FC<svgDefaultType> = (props) => {
  return (
    <svg
      style={props.svgStyle}
      className={"svg-default-class " + props.className}
      width="16"
      height="8"
      viewBox="0 0 16 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        style={props.pathsStyle}
        stroke={props.strokeColor}
        d="M1 1H15M1 7H15"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
