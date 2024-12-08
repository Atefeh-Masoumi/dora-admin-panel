import { columnType } from "../../../../tables/table.types";

export const notificationTableStruct: columnType[] = [
  { id: "notificationDate", label: "تاریخ" },
  {
    id: "subject",
    label: "موضوع",
  },
  {
    id: "content",
    label: "پیام",
  },
];
