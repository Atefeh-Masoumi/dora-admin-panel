import { columnType } from "../../tables/table.types";

export const networkNodeTableStruct: columnType[] = [
  { label: "شناسه", id: "id" },
  { label: "سرور", id: "vmHost" },
  { label: "شبکه", id: "vmNetwork" },
  { label: "آدرس IP", id: "ipAddress" },
  { label: "نوع IP", id: "isV4" },
  { label: "وضعیت", id: "status" },
  { label: "آدرس Mac", id: "macAddress" },
  { label: "عملیات", id: "control" },
];
