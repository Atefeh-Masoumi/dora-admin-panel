import {
  KuberCloudConfigListResponse,
  KuberCloudSecretListResponse,
} from "src/app/services/api.generated";
import { ENVIRONMENT_TYPES } from "src/constant/kubernetesCloud.constant";
import { KeyListInResourceType } from "src/types/kuberCloud.types";

export const getResourceItems = (
  resourceType: number,
  resourceId: number,
  configmapList: KuberCloudConfigListResponse[],
  secretList: KuberCloudSecretListResponse[]
) => {
  const resourceRetrievers: Record<number, () => KeyListInResourceType> = {
    [ENVIRONMENT_TYPES.CONFIG_MAP]: () =>
      configmapList?.find((item) => item.id === resourceId)?.configMaps ?? [],
    [ENVIRONMENT_TYPES.SECRET]: () =>
      secretList?.find((item) => item.id === resourceId)?.secrets ?? [],
  };

  return resourceRetrievers[resourceType]?.();
};
