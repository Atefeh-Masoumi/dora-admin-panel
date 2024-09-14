import { columnType } from "../../tables/table.types";

export const kubernetesCloudTableStruct: columnType[] = [
  { id: "id", label: "", invisibility: true, disableSort: true },
  { id: "datacenter", label: "مرکز داده" },
  { id: "name", label: "نام سرویس" },
  { id: "statusId", label: "وضعیت" },
  { id: "createDate", label: "تاریخ ایجاد" },
  { id: "control", label: "", disableSort: true },
];

export const kubernetesCloudDeploymentTableStruct: columnType[] = [
  { id: "id", label: "", invisibility: true, disableSort: true },
  { id: "name", label: "نام سرویس" },
  { id: "image", label: "نام image" },
  { id: "namespace", label: "نام namespace" },
  { id: "createDate", label: "تاریخ ایجاد" },
  { id: "control", label: "عملیات", disableSort: true },
];

export const kubernetesCloudConfigMapTableStruct: columnType[] = [
  { id: "id", label: "" },
  { id: "name", label: "نام" },
  { id: "createDate", label: "تاریخ ایجاد" },
  { id: "control", label: "عملیات", disableSort: true },
];

export const kubernetesCloudSecretMapTableStruct: columnType[] = [
  { id: "id", label: "" },
  { id: "name", label: "نام" },
  { id: "createDate", label: "تاریخ ایجاد" },
  { id: "control", label: "", disableSort: true },
];

export const kubernetesSecretListTableStruct: columnType[] = [
  { id: "id", label: "" },
  { id: "key", label: "key" },
  { id: "value", label: "value" },
  { id: "control", label: "", disableSort: true },
];

export const kubernetesConfigListTableStruct: columnType[] = [
  { id: "id", label: "" },
  { id: "key", label: "key" },
  { id: "value", label: "value" },
  { id: "control", label: "", disableSort: true },
];
