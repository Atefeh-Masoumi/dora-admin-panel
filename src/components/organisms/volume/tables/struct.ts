import { columnType } from "../../tables/table.types";

export const volumeListTableStruct: columnType[] = [
  { id: "id", label: "", invisibility: true },
  { id: "name", label: "نام سرویس" },
  { id: "datacenter", label: "مرکز داده" },
  { id: "volumeSize", label: "حجم (GB)" },
  { id: "statusId", label: "وضعیت" },
  { id: "createDate", label: "تاریخ ایجاد" },
  { id: "control", label: "", disableSort: true },
]; 