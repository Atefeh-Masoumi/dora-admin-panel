import { columnType } from "src/components/organisms/tables/table.types";

export const snapShotTableStruct: columnType[] = [
  { id: "id", label: "شناسه" },
  { id: "name", label: "نام" },
  { id: "isActive", label: "وضعیت فعال بودن" },
  { id: "isCreated", label: "وضعیت ایجاد" },
  { id: "description", label: "توضیحات" },
  { id: "createDate", label: "تاریخ ایجاد" },
  { id: "control", label: "", disableSort: true },
];
