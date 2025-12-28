import { columnType } from "../../tables/table.types";

export const firewallRuleTableStruct: columnType[] = [
  // { label: "شناسه", id: "id" },
  { label: "پروتکل", id: "firewallProtocolType" },
  { label: "ورودی/خروجی", id: "isIngress" },
  { label: "آدرس IP", id: "remoteIp" },
  { label: "از پورت", id: "minPort" },
  { label: "تا پورت", id: "maxPort" },
  { label: "تاریخ ایجاد", id: "createDate" },
  { label: "وضعیت", id: "status" },
  { label: "", id: "control" },
];

