import { columnType } from "../../tables/table.types";

export const kubernetesTableStruct: columnType[] = [
  { id: "id", label: "شناسه", invisibility: true, disableSort: true },
  { id: "datacenter", label: "مرکز داده" },
  { id: "name", label: "نام ماشین" },
  { id: "statusId", label: "وضعیت" },
  { id: "expireDate", label: "تاریخ انقضا" },
  { id: "createDate", label: "تاریخ ایجاد" },
  { id: "control", label: "", disableSort: true },
];
