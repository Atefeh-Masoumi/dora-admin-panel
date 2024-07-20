import { priceToPersian } from "src/utils/priceToPersian";
import { columnType } from "../../../tables/table.types";

export const productBundleTableStruct: columnType[] = [
  { id: "id", label: "" },
  { id: "name", label: "نام سروریس" },
  { id: "vCpu", label: "CPU" },
  { id: "vMemory", label: "Memory" },
  { id: "vDisk", label: "Disk" },
  { id: "ipv4", label: "IPv4" },
  {
    id: "price",
    label: "قیمت (ماهیانه)",
    format: (x) => priceToPersian(x),
  },
];
