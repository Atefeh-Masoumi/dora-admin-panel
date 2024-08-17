import { columnType } from "../../tables/table.types";

export const kubernetesCloudTableStruct: columnType[] = [
  { id: "id", label: "شناسه", invisibility: true, disableSort: true },
  { id: "datacenter", label: "مرکز داده" },
  { id: "name", label: "نام سرویس" },
  { id: "statusId", label: "وضعیت" },
  { id: "createDate", label: "تاریخ ایجاد" },
  { id: "control", label: "عملیات", disableSort: true },
];

export const kubernetesCloudConfigMapTableStruct: columnType[] = [
  { id: "id", label: "شناسه" },
  { id: "name", label: "نام" },
  { id: "createDate", label: "تاریخ ایجاد" },
  { id: "control", label: "عملیات", disableSort: true },
];

export const kubernetesCloudSecretMapTableStruct: columnType[] = [
  { id: "id", label: "شناسه" },
  { id: "name", label: "نام" },
  { id: "secretTypeId", label: "تاریخ ایجاد" },
  { id: "createDate", label: "عملیات", disableSort: true },
  { id: "control", label: "عملیات", disableSort: true },
];
