import { columnType } from "../../tables/table.types";

export const kubernetesCloudTableStruct: columnType[] = [
  { id: "id", label: "پاد", invisibility: true, disableSort: true },
  { id: "datacenter", label: "مرکز داده" },
  { id: "name", label: "نام سرویس" },
  { id: "statusId", label: "وضعیت" },
  { id: "createDate", label: "تاریخ ایجاد" },
  { id: "control", label: "", disableSort: true },
];

export const kubernetesCloudDeploymentTableStruct: columnType[] = [
  { id: "id", label: "", invisibility: true, disableSort: true },
  { id: "name", label: "نام" },
  { id: "image", label: "image" },
  { id: "namespace", label: "namespace" },
  { id: "createDate", label: "تاریخ ایجاد" },
  { id: "control", label: "", disableSort: true },
];

export const kubernetesCloudDeploymentInnerListTableStruct: columnType[] = [
  // { id: "id", label: "" },
  { id: "nodePort", label: "Node port" },
  { id: "targetPort", label: "Target port" },
];

export const kubernetesCloudConfigMapTableStruct: columnType[] = [
  { id: "id", label: "" },
  { id: "name", label: "نام" },
  { id: "createDate", label: "تاریخ ایجاد" },
  { id: "control", label: "", disableSort: true },
];

export const kubernetesCloudFireWallTableStruct: columnType[] = [
  { id: "id", label: "" },
  { id: "sourceIp", label: "آی پی مبدا" },
  { id: "targetPort", label: "پورت مقصد" },
  { id: "protocol", label: "پروتکل" },
  { id: "createDate", label: "تاریخ ایجاد" },
  { id: "control", label: "", disableSort: true },
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

export const kubernetesCloudIngressTableStruct: columnType[] = [
  { id: "id", label: "" },
  { id: "name", label: "نام" },
  { id: "ruleCount", label: "ruleCount" },
  { id: "createDate", label: "تاریخ ایجاد" },
  { id: "modifyDate", label: "تاریخ تغییر" },
  { id: "control", label: "", disableSort: true },
];

export const kubernetesCloudIngressRuleTableStruct: columnType[] = [
  { id: "id", label: "" },
  { id: "port", label: "پورت" },
  { id: "path", label: "Path" },
  { id: "serviceName", label: "نام سرویس" },
  { id: "control", label: "", disableSort: true },
];
