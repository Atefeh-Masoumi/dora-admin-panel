import { FC } from "react";

export type sidebarItemType = {
  title?: string;
  Icon: FC<any>;
  text?: string;
  subList?: {
    title: string;
    link: string;
  }[];
  link: string;
};
