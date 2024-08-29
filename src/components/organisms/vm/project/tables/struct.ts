import { columnType } from "../../../tables/table.types";

export const hostProjectTableStruct: columnType[] = [
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
    label: "نام پروژه",
  },
  {
    id: "hypervisorType",
    label: "نوع زیرساخت",
  },
  { id: "control", label: "", disableSort: true },
];
