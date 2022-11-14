import { columnType } from "../table.types";

export const supportTableStruct: columnType[] = [
  {
    id: "id",
    label: "شماره تیکت",
  },
  { id: "supportDate", label: "تاریخ", type: "date" },
  {
    id: "businessUnit",
    label: "واحد",
  },
  { id: "supportSubject", label: "عنوان" },
  {
    id: "supportStatus",
    label: "وضعیت",
  },
];
