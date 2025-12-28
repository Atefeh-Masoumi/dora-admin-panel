import { columnType } from "../../tables/table.types";

export const volumeListTableStruct: columnType[] = [
  // { id: "id", label: "", invisibility: true },
  { id: "name", label: "نام سرویس" },
  { id: "datacenter", label: "مرکز داده" },
  { id: "volumeSize", label: "حجم (GB)" },
  {id:"isAutoBackup", label:"پشتیبان گیری خودکار"},
  {id:"isAutoSnapshot", label:"اسنپ شات خودکار"},
  {id:"calculateTypeId", label:" زمانبندی پشتیبان گیری"},
  { id: "statusId", label: "وضعیت" },
  { id: "createDate", label: "تاریخ ایجاد" },
  { id: "control", label: "" },
]; 