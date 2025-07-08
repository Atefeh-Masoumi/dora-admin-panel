import { columnType } from "src/components/organisms/tables/table.types";

export const accessKeyTableStruct: columnType[] = [
  { id: "id", label: "" },
  { id: "accessKey", label: "کلید " },
  // { id: "secretKey", label: "secret key" },
  { id: "createDate", label: "تاریخ ایجاد" },
  { id: "control", label: "", disableSort: true },
];
