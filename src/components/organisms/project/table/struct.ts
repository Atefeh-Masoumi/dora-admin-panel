import { columnType } from "src/components/organisms/tables/table.types";

export const projectUserTableStruct: columnType[] = [
  { id: "id", label: "" },
  { id: "user", label: "کاربر" },
  { id: "email", label: "ایمیل" },
  { id: "role", label: "نقش" },
  { id: "createDate", label: "تاریخ اضافه شدن" },
  { id: "control", label: "", disableSort: true },
]; 