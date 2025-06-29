import { columnType } from "../../tables/table.types";

export const vpcTableStruct: columnType[] = [
  { id: "id", label: "", invisibility: true, disableSort: true },
  { id: "datacenter", label: "مرکز داده" },
  { id: "name", label: "نام سرویس" },
  { id: "statusId", label: "وضعیت" },
  { id: "createDate", label: "تاریخ ایجاد" },
  { id: "control", label: "", disableSort: true },
];

export const vpcIpTableStruct: columnType[] = [
  { id: "ip", label: "IP", disableSort: true },
  { id: "isV4", label: "Is V4", disableSort: true },
  { id: "isPrimary", label: "Is Primary", disableSort: true },
  { id: "control", label: "", disableSort: true },
];

export const vpcNatTableStruct: columnType[] = [
  { id: "name", label: "Name" },
  { id: "natTypeName", label: "Type" },
  { id: "sourceIp", label: "Source IP" },
  { id: "destinationIp", label: "Destination IP" },
  { id: "destinationPort", label: "Destination Port" },
  { id: "translateIp", label: "Gatway IP" },
  { id: "createDate", label: "Create Date" },
  { id: "control", label: "", disableSort: true },
];

export const vpcNetworkStruct: columnType[] = [
  { id: "name", label: "Network Name", disableSort: true },
  { id: "subnetCidr", label: "Network CIDR", disableSort: true },
  { id: "subnetMask", label: "Subnet Mask", disableSort: true },
  { id: "gatewayCidr", label: "Gateway IP", disableSort: true },
  { id: "datacenter", label: "Datacenter", disableSort: true },
  { id: "createDate", label: "تاریخ ایجاد", disableSort: true },
  { id: "control", label: "", disableSort: true },
];

export const vpcVmStruct: columnType[] = [
  { id: "name", label: "Name", disableSort: true },
  { id: "ipv4", label: "IP Address", disableSort: true },
  { id: "datacenter", label: "Datacenter", disableSort: true },
  { id: "createDate", label: "تاریخ ایجاد", disableSort: true },
  { id: "statusId", label: "وضعیت" },
  { id: "control", label: "عملیات", disableSort: true },
];

export const vpcLoadBalanceStruct: columnType[] = [
  { id: "ip", label: "IP" },
  { id: "name", label: "Name", disableSort: true },
  { id: "port", label: "PORT", disableSort: true },
  { id: "vpcHostLbType", label: "Type", disableSort: true },
  { id: "control", label: "عملیات", disableSort: true },
];

export const vpcLoadBalancerPollMembersTableStruct: columnType[] = [
  { id: "ip", label: "IP" },
  { id: "name", label: "Name" },
  { id: "port", label: "Port" },
];
