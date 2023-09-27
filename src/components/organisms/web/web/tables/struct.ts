import { columnType } from "../../../tables/table.types";

export const webTableStruct: columnType[] = [
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
    id: "domainName",
    label: "نام سرویس",
  },
  {
    id: "createDate",
    label: "تاریخ ایجاد",
  },
  {
    id: "expireDate",
    label: "تاریخ انقضا",
  },
  {
    id: "statusId",
    label: "وضعیت",
  },
  { id: "control", label: "", disableSort: true },
];
