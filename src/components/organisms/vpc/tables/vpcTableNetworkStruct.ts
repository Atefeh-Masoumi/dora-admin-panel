import { columnType } from "../../tables/table.types";

export const vpcTableNetworkStruct: columnType[] = [
  { id: "name", label: "Network Name" },
  { id: "gatewayCidr", label: "IP Gateway" },
  { id: "control", label: "", disableSort: true },
];
