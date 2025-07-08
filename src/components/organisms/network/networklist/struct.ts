import { columnType } from "../../tables/table.types";

export const networkTableStruct: columnType[] = [
  { label: "شناسه", id: "id" },
  { label: "نام شبکه", id: "name" },
  { label: "CIDR", id: "cidr" },
  { label: "Subnet Mask", id: "subnetMask" },
  { label: "Gateway IP", id: "gatewayIp" },
  { label: "تاریخ ایجاد", id: "createDate" },
  { label: "", id: "control" },
];