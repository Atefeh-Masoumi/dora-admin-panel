import { columnType } from "src/components/organisms/tables/table.types";

export const FirewalStruct: columnType[] = [

    { id: "vmHostName", label: "سرور" },
    { id: "firewall", label: "فایروال" },
    { id: "isSecurityEnabled", label: "پورت امنیتی " },
  
];


export const IpTableTableStruct: columnType[] = [
  { id: "ipAddress", label: "آدرس IP" },
  { id: "macAddress", label: "آدرس MAC" },
  { id: "isPrimary", label: " Primary" },
  { id: "isFloating", label: "Floating " },
  { id: "isV4", label: "نوع IP" },
  { id: "createDate", label: "تاریخ ایجاد" },
  { id: "control", label: "", disableSort: true },
];