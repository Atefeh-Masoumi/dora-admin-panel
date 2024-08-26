import {
  SecretKeyValuePairsResponse,
  GetApiMyKubernetesCloudConfigmapListByNamespaceIdApiResponse,
  GetApiMyKubernetesCloudSecretListByNamespaceIdApiResponse,
} from "src/app/services/api.generated";

export type EnvironmentVariablesType = {
  keyValue?: {
    [key: string]: {
      [key: string]: string;
    } | null;
  } | null;
};

export type KubernetesCloudAppImageType = {
  imageId: number | null;
  tagId: number | "";
  name: string | "";
  replicaNumber: number;
  namespaceId: number | null;
  keyValue: EnvironmentVariablesType;
};

export type VariableEnvironment = {
  variableType: number;
  key: string;
  value: string;
  resource?: string;
};
export type KuberCloudAppImageType = {
  imageId: number | null;
  imageTagId: number | "";
  name: string | "";
  replicaNumber: number;
  namespaceId: number | null;
  keyValue: {
    variableType: number;
    envKey: string;
    value: string;
    resource?: string;
  }[];
};

export type ResourceListType =
  | GetApiMyKubernetesCloudConfigmapListByNamespaceIdApiResponse
  | GetApiMyKubernetesCloudSecretListByNamespaceIdApiResponse;

export type KeyListInResourceType =
  | SecretKeyValuePairsResponse
  | SecretKeyValuePairsResponse;
