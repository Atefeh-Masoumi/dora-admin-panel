import { columnType } from "../table.types";

export const loadBalanceTableStruct: columnType[] = [
  {
    id: "host",
    label: "نام هاست",
  },
  {
    id: "loadBalancingPolicy",
    label: "نحوه توزیع بار",
  },
  {
    id: "maxConnectionsPerServer",
    label: "تعداد کانکشن",
  },
  { id: "control", label: "", disableSort: true },
];
