import { FC, useState } from "react";
import {
  Box,
  Grid,
  IconButton,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FormikProps } from "formik";
import { DeleteOutline } from "@mui/icons-material";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { ENVIRONMENT_TYPES } from "src/constant/kubernetesCloud.constant";
import {
  KuberCloudAppImageType,
  ResourceListType,
} from "src/types/kubernetesCloud.types";
import { SelectEnvType } from "./envVariable/SelectEnvType";
import { SelectEnvKey } from "./envVariable/SelectEnvKey";
import { SelectEnvValue } from "./envVariable/SelectEnvValue";
import { SelectEnvResource } from "./envVariable/SelectEnvResource";
import {
  useGetApiMyKubernetesCloudConfigmapListByNamespaceIdQuery,
  useGetApiMyKubernetesCloudSecretListByNamespaceIdQuery,
} from "src/app/services/api.generated";
import { useParams } from "react-router";

type SelectEnvironmentVariablePropsType = {
  mainIndex: number;
  onDelete: (itemIndex: number) => void;
  formik: FormikProps<KuberCloudAppImageType>;
};

export const SelectEnvironmentVariable: FC<
  SelectEnvironmentVariablePropsType
> = ({ formik, onDelete, mainIndex }) => {
  const [resourceList, setResourceList] = useState<ResourceListType>();
  const [keyListInResource, setKeyListInResource] = useState<any>();
  const [needToResourceSelect, setNeedToResourceSelect] =
    useState<boolean>(false);
  const [selectedResourceItem, setSelectedResourceItem] = useState<
    number | null
  >(null);

  const theme = useTheme(),
    isMd = useMediaQuery(theme.breakpoints.up("md"));
  const { id: kubernetesCloudNameSpaceId } = useParams();

  const { data: configmapList } =
    useGetApiMyKubernetesCloudConfigmapListByNamespaceIdQuery(
      {
        namespaceId: Number(kubernetesCloudNameSpaceId),
      },
      { skip: !kubernetesCloudNameSpaceId }
    );
  const { data: secretList } =
    useGetApiMyKubernetesCloudSecretListByNamespaceIdQuery(
      {
        namespaceId: Number(kubernetesCloudNameSpaceId),
      },
      { skip: !kubernetesCloudNameSpaceId }
    );

  const handleChangeEnvType = (newValue: number) => {
    switch (newValue) {
      case ENVIRONMENT_TYPES.CONFIG_MAP:
        setNeedToResourceSelect(true);
        setResourceList(configmapList);
        break;
      case ENVIRONMENT_TYPES.SECRET_MAP:
        setNeedToResourceSelect(true);
        setResourceList(secretList);

        break;
    }

    formik.setFieldValue(`keyValue[${mainIndex}].variableType`, newValue);
  };

  const handleResourceOnChange = (resourceId: number) => {
    switch (formik.values.keyValue[mainIndex].variableType) {
      case ENVIRONMENT_TYPES.CONFIG_MAP:
        const configMapItems = configmapList?.find(
          (item) => item.id === resourceId
        )?.configMaps;
        setKeyListInResource(configMapItems);
        break;

      case ENVIRONMENT_TYPES.SECRET_MAP:
        const secrets = secretList?.find(
          (item) => item.id === resourceId
        )?.secrets;
        setKeyListInResource(secrets);
        break;
    }

    setSelectedResourceItem(resourceId);
  };

  return (
    <Box
      bgcolor={{
        md: "inherit",
      }}
      alignSelf="center"
      px={0}
      py={{ xs: 2, md: 0 }}
      width="90%"
    >
      <Grid justifyContent="center" container width="100%" gap={2}>
        {isMd && (
          <Grid
            item
            xs={10}
            md={needToResourceSelect ? 2.2 : 4}
            lg={needToResourceSelect ? 2.5 : 4.7}
          >
            <Stack direction="row" gap={1}>
              <IconButton onClick={() => onDelete(mainIndex)}>
                <DeleteOutline color="error" />
              </IconButton>
              {needToResourceSelect ? (
                <SelectEnvValue
                  value={formik.values.keyValue[mainIndex]?.value || ""}
                  setValue={(newValue: any) =>
                    formik.setFieldValue(
                      `keyValue[${mainIndex}].value`,
                      newValue
                    )
                  }
                  keyListInResource={keyListInResource || []}
                />
              ) : (
                <DorsaTextField
                  sx={{
                    background: ({ palette }) => palette.primary.contrastText,
                  }}
                  placeholder="zahra"
                  dir="ltr"
                  size="small"
                  fullWidth
                  value={formik.values.keyValue[mainIndex]?.value}
                  onChange={(e) =>
                    formik.setFieldValue(
                      `keyValue[${mainIndex}].value`,
                      e.target.value
                    )
                  }
                />
              )}
            </Stack>
          </Grid>
        )}

        {isMd && needToResourceSelect && (
          <Grid
            item
            xs={10}
            md={1.6}
            lg={2}
            sx={{
              background: ({ palette }) => palette.primary.contrastText,
            }}
          >
            <SelectEnvResource
              resourceList={resourceList}
              selectedResourceItem={selectedResourceItem}
              handleResourceOnChange={handleResourceOnChange}
            />
          </Grid>
        )}

        {!isMd && (
          <Grid
            item
            xs={10}
            md={3}
            lg={2}
            sx={{
              background: ({ palette }) => palette.primary.contrastText,
            }}
          >
            <SelectEnvType
              type={formik.values.keyValue[mainIndex]?.variableType || ""}
              setType={(newValue: any) => handleChangeEnvType(newValue)}
            />
          </Grid>
        )}

        <Grid
          sx={{
            background: ({ palette }) => palette.primary.contrastText,
          }}
          item
          xs={10}
          md={3}
          lg={needToResourceSelect ? 4.5 : 4.5}
        >
          <SelectEnvKey
            envKey={formik.values.keyValue[mainIndex]?.envKey || ""}
            setKey={(newValue: string) =>
              formik.setFieldValue(`keyValue[${mainIndex}].envKey`, newValue)
            }
          />
        </Grid>

        {isMd && (
          <Grid
            item
            xs={10}
            md={3}
            lg={2}
            sx={{
              background: ({ palette }) => palette.primary.contrastText,
            }}
          >
            <SelectEnvType
              type={formik.values.keyValue[mainIndex]?.variableType || ""}
              setType={(newValue: any) => handleChangeEnvType(newValue)}
            />
          </Grid>
        )}

        {!isMd && needToResourceSelect && (
          <Grid item xs={10} md={5} lg={needToResourceSelect ? 3 : 7}>
            <SelectEnvResource
              resourceList={resourceList}
              selectedResourceItem={selectedResourceItem}
              handleResourceOnChange={handleResourceOnChange}
            />
          </Grid>
        )}

        {!isMd && (
          <Grid item xs={10} md={5} lg={needToResourceSelect ? 3 : 7}>
            <Stack direction="row" gap={1}>
              <IconButton onClick={() => onDelete(mainIndex)}>
                <DeleteOutline color="error" />
              </IconButton>

              {needToResourceSelect ? (
                <SelectEnvValue
                  value={formik.values.keyValue[mainIndex]?.value || ""}
                  setValue={(newValue: any) =>
                    formik.setFieldValue(
                      `keyValue[${mainIndex}].value`,
                      newValue
                    )
                  }
                  keyListInResource={keyListInResource || []}
                />
              ) : (
                <DorsaTextField
                  sx={{
                    background: ({ palette }) => palette.primary.contrastText,
                  }}
                  placeholder="Value"
                  dir="ltr"
                  size="small"
                  fullWidth
                  value={formik.values.keyValue[mainIndex].value}
                  onChange={(e) =>
                    formik.setFieldValue(
                      `keyValue[${mainIndex}].value`,
                      e.target.value
                    )
                  }
                />
              )}
            </Stack>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
