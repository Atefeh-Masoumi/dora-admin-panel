import { columnType } from "../../tables/table.types";

export const kubernetesTableStruct: columnType[] = [
  { id: "id", label: "شناسه", invisibility: true, disableSort: true },
  { id: "name", label: "نام سرویس" },
  { id: "image", label: "image" },
  { id: "namespace", label: "nameSpace" },
  { id: "createDate", label: "تاریخ ایجاد" },
  { id: "control", label: "عملیات", disableSort: true },
];

export type KubernetesCloudHostListResponse = {
  id: number;
  datacenter: string | null;
  name: string | null;
  status: string | null;
  statusId: number;
  createDate: string;
};
