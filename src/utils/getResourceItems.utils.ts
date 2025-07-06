import {
  KuberConfigListResponse,
  KuberSecretListResponse,
} from "src/app/services/api.generated";
import { ENVIRONMENT_TYPES } from "src/constant/kubernetesCloud.constant";
import { KeyListInResourceType } from "src/types/kubernetesCloud.types";

export const getResourceItems = (
  resourceType: number,
  resourceId: number,
  configmapList: KuberConfigListResponse[],
  secretList: KuberSecretListResponse[]
) => {
  const resourceRetrievers: Record<number, () => KeyListInResourceType> = {
    [ENVIRONMENT_TYPES.CONFIG_MAP]: () =>
      configmapList?.find((item) => item.id === resourceId)?.configMaps ?? [],
    [ENVIRONMENT_TYPES.SECRET]: () =>
      secretList?.find((item) => item.id === resourceId)?.secrets ?? [],
  };

  return resourceRetrievers[resourceType]?.();
};
