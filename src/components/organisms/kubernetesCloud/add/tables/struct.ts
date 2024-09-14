import { priceToPersian } from "src/utils/priceToPersian";
import { columnType } from "../../../tables/table.types";

export const productBundleTableStruct: columnType[] = [
  { id: "id", label: "" },
  { id: "name", label: "نام سروریس" },
  { id: "kuberCpu", label: "CPU" },
  { id: "kuberMemory", label: "Memory" },
  { id: "kuberDisk", label: "Disk" },
  { id: "kuber10Pods", label: "TenPods" },
  {
    id: "price",
    label: "قیمت (ماهیانه)",
    format: (x) => priceToPersian(x),
  },
];
