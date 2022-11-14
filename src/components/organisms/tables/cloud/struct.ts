import { columnType } from "../table.types";

export const cloudTableStruct: columnType[] = [
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
    label: "نام ماشین",
  },
  {
    id: "operatingSystem",
    label: "سیستم عامل",
  },
  { id: "ipv4", label: "IPv4" },
  { id: "cpu", label: "CPU" },
  {
    id: "memory",
    label: "Memory",
  },
  { id: "disk", label: "Disk" },
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
