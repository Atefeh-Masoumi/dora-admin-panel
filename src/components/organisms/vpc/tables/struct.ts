import { columnType } from "../../tables/table.types";

export const vpcTableStruct: columnType[] = [
  { id: "id", label: "شناسه", invisibility: true, disableSort: true },
  { id: "datacenter", label: "مرکز داده" },
  { id: "name", label: "نام ماشین" },
  { id: "statusId", label: "وضعیت" },
  { id: "createDate", label: "تاریخ ایجاد" },
  { id: "control", label: "عملیات", disableSort: true },
];

export const vpcIpTableStruct: columnType[] = [
  { id: "id", label: "شماره شناسه", disableSort: true },
  { id: "ip", label: "IP", disableSort: true },
  { id: "isV4", label: "Is V4", disableSort: true },
  { id: "isPrimary", label: "Is Primary", disableSort: true },
  { id: "control", label: "عملیات", disableSort: true },
];
