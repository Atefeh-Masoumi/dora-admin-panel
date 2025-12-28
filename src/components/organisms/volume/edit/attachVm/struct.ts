import { columnType } from "src/components/organisms/tables/table.types";

export const attchVmTableStruct: columnType[] = [
  // { id: "id", label: "" },
  { id: "vmHost", label: "نام سرور ابری" },
  { id: "isConnected", label: "وضعیت اتصال" },
  { id: "statusId", label: "وضعیت" },
  { id: "createDate", label: "تاریخ ایجاد" },
  { id: "control", label: "", disableSort: true },
]; 