import { priceToPersian } from "src/utils/priceToPersian";
import { columnType } from "src/components/organisms/tables/table.types";

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
    format: priceToPersian,
  },
  { id: "control", label: "", disableSort: true },
];
