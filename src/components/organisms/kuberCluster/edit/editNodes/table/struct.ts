import { columnType } from "src/components/organisms/tables/table.types";

export const kubernetesNodesTableStruct: columnType[] = [
  { id: "hostId", label: "شناسه" },
  { id: "ip", label: "ip" },
  { id: "name", label: "نام نود" },
  { id: "statusId", label: "وضعیت" },
  { id: "kubernetesNodeType", label: "نوع نود" },
  { id: "control", label: "عملیات", disableSort: true },
];
