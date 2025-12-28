import { columnType } from "src/components/organisms/tables/table.types";

export const volumeTableStruct: columnType[] = [
  // { id: "id", label: "" },
  { id: "name", label: "نام" },
  { id: "volumeSize", label: "حجم (GB)" },
  { id: "rootDisk", label: "نوع دیسک" },
  {id:"isAutoBackup", label:"پشتیبان گیری خودکار"},
  {id:"isAutoSnapshot", label:"اسنپ شات خودکار"},
  {id:"calculateTypeId", label:" زمانبندی پشتیبان گیری"},
  { id: "createDate", label: "تاریخ ایجاد" },
  { id: "control", label: "", disableSort: true },
];
