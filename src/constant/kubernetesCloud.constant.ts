export const kubernetesAppTableHeadCells = [
  { id: "id", label: "شماره شناسه" },
  { id: "ip", label: "IP" },
  { id: "isV4", label: "Is V4" },
  { id: "isPrimary", label: "Is Primary" },
  { label: "عملیات" },
];

export const appImageList = [
  { id: 1, name: "mysql", src: "/assets/icons/mysql.svg" },
  { id: 2, name: "nginx", src: "/assets/icons/nginx.svg" },
  { id: 4, name: "mongoDb", src: "/assets/icons/mongodb.svg" },
  { id: 5, name: ".net", src: "/assets/icons/dotnet.svg" },
  { id: 6, name: "php", src: "/assets/icons/php.svg" },
];

//Todo : mayBe The first and second items should change their IDs
export const staticImageCategoryList: { id: number; name: string }[] = [
  // { id: 3, name: "All" },
  { id: 1, name: "اپلیکیشن های آماده" },
  { id: 2, name: "اختصاصی" },
];

export enum ENVIRONMENT_TYPES {
  CUSTOM = 1,
  CONFIG_MAP = 2,
  SECRET = 3,
}

export const environmentType = [
  { id: 1, label: "Custom" },
  { id: 2, label: "Configmap" },
  { id: 3, label: "Secret" },
];
