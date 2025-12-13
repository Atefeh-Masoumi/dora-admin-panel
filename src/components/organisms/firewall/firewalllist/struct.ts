import { columnType } from "../../tables/table.types";

export const firewallTableStruct: columnType[] = [
  { label: "شناسه", id: "id" },
  { label: "نام فایروال", id: "name" },
  { label: "تعداد قوانین", id: "vmFirewallCount" },
  { label: "وضعیت", id: "statusId" },
  { label: "تاریخ ایجاد", id: "createDate" },
  { label: "", id: "control" },
];

