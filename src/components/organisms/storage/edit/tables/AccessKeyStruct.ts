import { columnType } from "src/components/organisms/tables/table.types";

export const accessKeyTableStruct: columnType[] = [
  { id: "id", label: "شناسه کلید" },
  { id: "accessKey", label: "کلید دسترسی" },
  { id: "createDate", label: "تاریخ ایجاد" },
  { id: "control", label: "", disableSort: true },
];
