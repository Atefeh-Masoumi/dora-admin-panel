import { columnType } from "../../tables/table.types";

export const addVmTableStruct: columnType[] = [
  { id: "id", label: "", invisibility: true },
  { id: "name", label: "نام ماشین" },
  { id: "operatingSystem", label: "سیستم عامل" },
  { id: "ipv4", label: "IPv4" },
  { id: "statusId", label: "وضعیت" },
  { id: "createDate", label: "تاریخ ایجاد" },
  { id: "control", label: "", disableSort: true },
];

export const addVmProjectTableStruct = [
  {
    id: "id",
    label: "id",
    invisibility: true,
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
