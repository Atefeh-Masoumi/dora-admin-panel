import { KuberCloudAppImageType } from "src/types/kubernetesCloud.types";

interface GroupedVariables {
  [key: string]: { [key: string]: string } | null;
}

export const groupedByVariableType = (values: KuberCloudAppImageType) =>
  values.keyValue.reduce<GroupedVariables>((acc, item) => {
    const { variableType, envKey, value } = item;
    if (!acc[`${variableType}`]) {
      acc[`${variableType}`] = {};
    }
    (acc[`${variableType}`] ?? {})[envKey] = String(value);
    return acc;
  }, {});
