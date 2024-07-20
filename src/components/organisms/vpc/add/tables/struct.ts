import { priceToPersian } from "src/utils/priceToPersian";
import { columnType } from "src/components/organisms/tables/table.types";

export const addVpcTableStruct: columnType[] = [
  { id: "id", label: "" },
  { id: "name", label: "نام سرویس" },
  { id: "ipv4", label: "IPV4" },
  {
    id: "rules10",
    label: "Rule(10)",
  },
  {
    id: "price",
    label: "قیمت (ماهیانه)",
    format: (x) => priceToPersian(x),
  },
];
