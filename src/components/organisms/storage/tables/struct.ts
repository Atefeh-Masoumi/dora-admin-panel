import { columnType } from "../../tables/table.types";

export const storageTableStruct: columnType[] = [
  {
    id: "id",
    label: "",
    invisibility: true,
  },
  {
    id: "datacenter",
    label: "مرکز داده",
  },
  {
    id: "name",
    label: "نام سرویس",
  },
  {
    id: "statusId",
    label: "وضعیت",
  },
  {
    id: "createDate",
    label: "تاریخ ایجاد",
  },
  { id: "control", label: "", disableSort: true },
];
