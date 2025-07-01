import { columnType } from "src/components/organisms/tables/table.types";

export const VmnetworkTableTableStruct: columnType[] = [
    { id: "id", label: "شناسه" },
    { id: "vmHost", label: "سرور" },
    { id: "vmNetwork", label: "شبکه" },
    { id: "ipAddress", label: "آدرس IP" },
    { id: "isV4", label: "نوع IP" },
    { id: "statusId", label: "وضعیت" },
    {id:"macAddress", label:"آدرس Mac"},
    { id: "control", label: "", disableSort: true },
];

