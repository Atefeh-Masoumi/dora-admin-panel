  import { columnType } from "../../tables/table.types";

export const backupTableStruct: columnType[] = [
  { label: "نام بکاپ", id: "name" },
  { label: "نام دیسک", id: "vmVolumeHost" },
  { label: "وضعیت", id: "statusId" },
  { label: "تاریخ ایجاد", id: "createDate" },
  { label: "", id: "control" },
];

