import { priceToPersian } from "src/utils/priceToPersian";
import { columnType } from "src/components/organisms/tables/table.types";

export const addVpcTableStruct: columnType[] = [
  { id: "productBundleId", label: "" },
  { id: "name", label: "نام سرویس" },
  { id: "disk", label: "Disk" },
  {
    id: "price",
    label: "قیمت (ماهیانه)",
    format: (x) => priceToPersian(x),
  },
];
