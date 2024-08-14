type EnvironmentVariablesType = {
  [key: string]: {
    [key: string]: string;
  } | null;
} | null;

export type KuberCloudAppImageType = {
  imageId: number | null;
  tagId: number | "";
  name: string | "";
  replicaNumber: number;
  namespaceId: number | null;
  keyValue: EnvironmentVariablesType[];
};
