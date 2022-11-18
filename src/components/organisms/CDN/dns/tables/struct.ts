import { columnType } from "../../../tables/table.types";

export const zoneTableStruct: columnType[] = [
  { id: "name", label: "Name" },
  { id: "type", label: "Type" },
  { id: "ttl", label: "TTL" },
  {
    id: "value",
    label: "Content",
  },
  { id: "useProxy", label: "Proxy Status" },
  { id: "control", label: "", disableSort: true },
];
