import { priceToPersian } from "src/utils/priceToPersian";
import { columnType } from "src/components/organisms/tables/table.types";

export const addStorageTableStruct: columnType[] = [
  { id: "productBundleId", label: "" },
  { id: "name", label: "نام سرویس" },
  { id: "vDisk", label: "Disk" },
  {
    id: "price",
    label: "قیمت (ماهیانه)",
    format: (x) => priceToPersian(x),
  },
];
