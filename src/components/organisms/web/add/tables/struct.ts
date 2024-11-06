import { priceToPersian } from "src/utils/priceToPersian";
import { columnType } from "src/components/organisms/tables/table.types";

export const addWebTableStruct: columnType[] = [
  { id: "id", label: "" },
  { id: "name", label: "نام سرویس" },
  {
    id: "price",
    label: "قیمت (ماهیانه)",
    format: (x) => priceToPersian(x),
  },
];
