import { FC } from "react";
import { ServerInfoActions } from "./serverInfoSections/ServerInfoActions";
import { ServerInfoBoxes } from "./serverInfoSections/ServerInfoBoxes";

type VmInfoPropsType = {};

export const VmInfo: FC<VmInfoPropsType> = () => {
  return (
    <>
      <ServerInfoActions />
      <br />
      <ServerInfoBoxes />
    </>
  );
};
