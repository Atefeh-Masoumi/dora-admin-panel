import React from "react";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

export const RockyOSIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props} viewBox="0 0 96 96">
    <rect width="96" height="96" rx="15%" fill="none" />
    <g id="g">
      <rect x="118" y="118" fill="#9ccd2a" width="124" height="124" />
      <rect x="270" y="118" fill="#932279" width="124" height="124" />
      <rect x="270" y="270" fill="#efa724" width="124" height="124" />
      <rect x="118" y="270" fill="#262577" width="124" height="124" />
    </g>
    <use xlinkHref="#g" transform="rotate(225 256 256)" />
    <path
      fill="#10B981"
      d="M92.3846 63.4992C94.0791 58.6465 95 53.4309 95 48 95 22.0423 73.9572 1 48 1 22.0423 1 1 22.0423 1 48c0 12.8437 5.15189 24.4846 13.5017 32.9676l47.6757 -47.6757 11.7705 11.7706 18.4367 18.4367Zm-8.5853 14.9553L62.1774 56.8331 28.3178 90.6926C34.3049 93.4573 40.972 95 48 95c14.3389 0 27.1787 -6.4214 35.7993 -16.5455Z"
      strokeWidth="1"
    />
  </SvgIcon>
);
