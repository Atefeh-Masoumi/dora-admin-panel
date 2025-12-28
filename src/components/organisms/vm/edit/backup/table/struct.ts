import { columnType } from "src/components/organisms/tables/table.types";

export const BackupTableStruct: columnType[] = [
  // { id: "id", label: "" },
  { id: "name", label: "نام" },
  { id: "statusId", label: "وضعیت" },
  { id: "vmVolumeHost", label: "نام دیسک" },
  { id: "createDate", label: "تاریخ ایجاد" },
  { id: "control", label: "", disableSort: true },
]; 