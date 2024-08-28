import { columnType } from "../../tables/table.types";

export const kubernetesTableStruct: columnType[] = [
  { id: "id", label: "شناسه", invisibility: true, disableSort: true },
  { id: "name", label: "نام سرویس" },
  { id: "datacenter", label: "نام دیتاسنتر" },
  { id: "createDate", label: "تاریخ ایجاد" },
  { id: "control", label: "عملیات", disableSort: true },
];
