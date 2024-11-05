import { SvgIconProps } from "@mui/material";
import { FC } from "react";

// export type sidebarItemType = {
//   title?: string;
//   Icon: FC<SvgIconProps>;
//   text?: string;
//   subList?: {
//     title: string;
//     link: string;
//   }[];
//   link: string;
// };

export type sidebarSubItemType = {
  title: string;
  link: string;
};

export type sidebarItemType = {
  title?: string;
  text?: string;
  link: string;
  Icon: FC<SvgIconProps>;
  subList?: sidebarSubItemType[];
};
