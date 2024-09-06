import {
  SecretKeyValuePairsResponse,
  GetApiMyKubernetesCloudConfigmapListByNamespaceIdApiResponse,
  GetApiMyKubernetesCloudSecretListByNamespaceIdApiResponse,
  ConfigMapKeyValuePairsResponse,
} from "src/app/services/api.generated";

export type VariableEnvironmentType = {
  variableType: number;
  envKey: string;
  value: string;
  resource?: string;
};
export type KuberCloudAppImageType = {
  imageId: number | null;
  imageTagId: number | "";
  name: string | "";
  replicaNumber: number;
  namespaceId: number | null;
  keyValue: VariableEnvironmentType[];
  isPublic: boolean;
};

export type ResourceListType =
  | GetApiMyKubernetesCloudConfigmapListByNamespaceIdApiResponse
  | GetApiMyKubernetesCloudSecretListByNamespaceIdApiResponse;

export type KeyListInResourceType =
  | ConfigMapKeyValuePairsResponse[]
  | SecretKeyValuePairsResponse[];

export type CommonSelectPropsType = {
  value?: string | number;
  onChange?: (value: string | number) => void;
};
