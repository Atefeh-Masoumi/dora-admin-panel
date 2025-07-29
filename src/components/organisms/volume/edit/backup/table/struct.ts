import { columnType } from "src/components/organisms/tables/table.types";

export const volumeBackupTableStruct: columnType[] = [
  { id: "id", label: "" },
  { id: "name", label: "نام" },
  { id: "statusId", label: "وضعیت" },
  { id: "description", label: "توضیحات" },
  { id: "createDate", label: "تاریخ ایجاد" },
  { id: "control", label: "", disableSort: true },
]; 