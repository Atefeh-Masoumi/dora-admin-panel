import { FC, memo, useMemo, useState } from "react";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { FormikProps } from "formik";
import { ENVIRONMENT_TYPES } from "src/constant/kubernetesCloud.constant";

import { SelectEnvType } from "./envVariable/SelectEnvType";
import { SelectEnvKey } from "./envVariable/SelectEnvKey";
import { SelectEnvValue } from "./envVariable/SelectEnvValue";
import {
  useGetApiMyKubernetesCloudConfigmapListByNamespaceIdQuery,
  useGetApiMyKubernetesCloudSecretListByNamespaceIdQuery,
} from "src/app/services/api.generated";
import { useParams } from "react-router";
import { getResourceItems } from "src/utils/getResourceItems.utils";
import {
  KeyListInResourceType,
  KuberCloudNamespaceImageType,
} from "src/types/kubernetesCloud.types";

type SelectEnvironmentVariablePropsType = {
  mainIndex: number;
  onDelete: () => void;
  formik: FormikProps<KuberCloudNamespaceImageType>;
};

export const SelectEnvironmentVariable: FC<SelectEnvironmentVariablePropsType> =
  memo(({ formik, onDelete, mainIndex }) => {
    const [keyListInResource, setKeyListInResource] =
      useState<KeyListInResourceType>();
    const [selectedResourceItem, setSelectedResourceItem] = useState<
      number | null
    >(null);
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.up("sm"));
    const { kubernetesCloudId } = useParams();
    const namespaceId = Number(kubernetesCloudId);

    const { data: configmapList = [] } =
      useGetApiMyKubernetesCloudConfigmapListByNamespaceIdQuery(
        { namespaceId },
        { skip: !namespaceId }
      );

    const { data: secretList = [] } =
      useGetApiMyKubernetesCloudSecretListByNamespaceIdQuery(
        { namespaceId },
        { skip: !namespaceId }
      );

    const isResourceSelectionRequired = useMemo(
      () => {
        const keyValueItem = formik.values.keyValue[mainIndex];
        return keyValueItem
          ? keyValueItem.variableType !== ENVIRONMENT_TYPES.CUSTOM
          : false;
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [formik.values.keyValue[mainIndex]]
    );

    const resourceList = useMemo(() => {
      if (!formik.values.keyValue[mainIndex]) return [];
      const variableType = formik.values.keyValue[mainIndex].variableType;
      return isResourceSelectionRequired
        ? variableType === ENVIRONMENT_TYPES.CONFIG_MAP
          ? configmapList
          : secretList
        : [];
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      isResourceSelectionRequired,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      formik.values.keyValue[mainIndex],
      configmapList,
      secretList,
    ]);

    const handleResourceOnChange = (resourceId: number) => {
      const resourceType = formik.values.keyValue[mainIndex].variableType;
      const resourceItems = getResourceItems(
        resourceType,
        resourceId,
        configmapList,
        secretList
      );

      if (resourceItems) {
        setKeyListInResource(resourceItems);
      }

      setSelectedResourceItem(resourceId);
    };

    const inputItems = [
      {
        Input: SelectEnvType,
        type: "input",
        xs: 12,
        sm: 2.5,
        md: 2.5,
        lg: 2.5,
        value: formik.values.keyValue[mainIndex]?.variableType || "",
        onChange: (newValue: string | number) =>
          formik.setFieldValue(`keyValue[${mainIndex}].variableType`, newValue),
      },
      {
        Input: SelectEnvKey,
        type: "input",
        xs: 12,
        sm: 2.5,
        md: 2.5,
        lg: 2.5,
        value: formik.values.keyValue[mainIndex]?.envKey || "",
        onChange: (newValue: string | number) =>
          formik.setFieldValue(`keyValue[${mainIndex}].envKey`, newValue),
      },
      {
        Input: SelectEnvValue,
        type: "input",
        xs: 12,
        sm: 7,
        md: 7,
        lg: 7,
        value: formik.values.keyValue[mainIndex]?.value || "",
        onChange: (newValue: string | number) =>
          formik.setFieldValue(`keyValue[${mainIndex}].value`, newValue),
        otherProps: {
          keyListInResource: keyListInResource || [],
          isResourceSelectionRequired: isResourceSelectionRequired || false,
          selectedResourceItem: selectedResourceItem,
          resourceList: resourceList || [],
          handleResourceOnChange,
          onDelete: onDelete,
        },
      },
    ];

    return (
      <Grid spacing={2} container>
        {[...(!isSm ? inputItems.reverse() : inputItems)]
          .reverse()
          .map(
            ({ Input, value, onChange, otherProps, xs, sm, md, lg }, index) => (
              <Grid key={index} item xs={xs} sm={sm} md={md} lg={lg}>
                <Input
                  value={value}
                  onChange={onChange}
                  {...(otherProps || undefined)}
                />
              </Grid>
            )
          )}
      </Grid>
    );
  });
