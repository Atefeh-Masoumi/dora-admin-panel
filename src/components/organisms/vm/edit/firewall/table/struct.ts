import { columnType } from "src/components/organisms/tables/table.types";

export const firewallTableStruct: columnType[] = [
  { id: "id", label: "" },
  { id: "firewallProtocolType", label: "نوع" },
  { id: "isIngress", label: "ورودی/خروجی" },
  { id: "remoteIp", label: "آدرس IP" },
  { id: "minPort", label: "از پورت" },
  { id: "maxPort", label: "تا پورت" },
  { id: "createDate", label: "تاریخ ایجاد" },
  { id: "control", label: "", disableSort: true },
];
