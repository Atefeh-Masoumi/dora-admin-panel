import { columnType } from "../../tables/table.types";

export const snapshotTableStruct: columnType[] = [
  { label: "نام اسنپ شات", id: "name" },
  { label: "نام دیسک", id: "vmVolumeHost" },
  { label: "وضعیت", id: "statusId" },
  { label: "تاریخ ایجاد", id: "createDate" },
  { label: "", id: "control" },
];

