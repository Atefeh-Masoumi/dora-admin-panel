import { FC } from "react";
import { ServerInfoActions } from "./serverInfoSections/ServerInfoActions";
import { ServerInfoBoxes } from "./serverInfoSections/ServerInfoBoxes";

type ServerInfoPropsType = {};

export const ServerInfo: FC<ServerInfoPropsType> = () => {
  return (
    <>
      <ServerInfoActions />
      <br />
      <ServerInfoBoxes />
    </>
  );
};
