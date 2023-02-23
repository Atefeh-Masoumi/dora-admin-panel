import { priceToPersian } from "src/utils/priceToPersian";
import { columnType } from "../../../tables/table.types";

export const productBundleTableStruct: columnType[] = [
  { id: "productBundleId", label: "" },
  { id: "name", label: "نام سروریس" },
  { id: "description", label: "توضیحات" },
  {
    id: "price",
    label: "قیمت (ماهیانه)",
    format: (x) => priceToPersian(x),
  },
];
