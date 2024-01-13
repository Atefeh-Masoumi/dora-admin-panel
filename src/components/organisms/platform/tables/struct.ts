import { columnType } from "../../tables/table.types";

export const kubernetesTableStruct: columnType[] = [
  { id: "id", label: "", invisibility: true, disableSort: true },
  { id: "datacenter", label: "مرکز داده" },
  { id: "name", label: "نام ماشین" },
  { id: "statusId", label: "وضعیت" },
  { id: "createDate", label: "تاریخ انقضا" },
  { id: "expireDate", label: "تاریخ ایجاد" },
  { id: "control", label: "", disableSort: true },
];
