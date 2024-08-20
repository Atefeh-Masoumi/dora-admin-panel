import {
  GetApiMyKubernetesCloudConfigmapListByIdApiResponse,
  GetApiMyKubernetesCloudSecretListByIdApiResponse,
  SecretKeyValuePairsResponse,
} from "src/app/services/api.generated";

export type EnvironmentVariablesType = {
  keyValue?: {
    [key: string]: {
      [key: string]: string;
    } | null;
  } | null;
};

export type KuberCloudAppImageType = {
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

export type ResourceListType =
  | GetApiMyKubernetesCloudConfigmapListByIdApiResponse
  | GetApiMyKubernetesCloudSecretListByIdApiResponse;

export type KeyListInResourceType =
  | SecretKeyValuePairsResponse
  | SecretKeyValuePairsResponse;
