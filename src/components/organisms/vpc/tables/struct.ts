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

export const vpcNatTableStruct: columnType[] = [
  { id: "name", label: "نام" },
  { id: "natTypeName", label: "نوع NAT" },
  { id: "sourceIp", label: "ip مبدا" },
  { id: "destinationIp", label: "ip مقصد" },
  { id: "destinationPort", label: "port مقصد" },
  { id: "translateIp", label: "ip برگردان" },
  { id: "createDate", label: "تاریخ ایجاد" },
  { id: "control", label: "عملیات" },
];

export const vpcNetworkStruct: columnType[] = [
  { id: "id", label: "شماره شناسه", disableSort: true },
  { id: "name", label: "نام شبکه", disableSort: true },
  { id: "subnetCidr", label: "Network CIDR", disableSort: true },
  { id: "subnetMask", label: "Subnet Mask", disableSort: true },
  { id: "gatewayCidr", label: "Gateway IP", disableSort: true },
  { id: "datacenter", label: "دیتاسنتر", disableSort: true },
  { id: "createDate", label: "تاریخ ایجاد", disableSort: true },
  { id: "control", label: "عملیات", disableSort: true },
];
