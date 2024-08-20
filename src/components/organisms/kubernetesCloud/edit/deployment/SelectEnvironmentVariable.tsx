import { DeleteOutline } from "@mui/icons-material";
import {
  Box,
  Grid,
  IconButton,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FormikProps } from "formik";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { ENVIRONMENT_TYPES } from "src/constant/kubernetesCloud.constant";
import {
  KeyListInResourceType,
  KuberCloudAppImageType,
  ResourceListType,
  VariableEnvironment,
} from "src/types/kubernetesCloud.types";
import { SelectEnvType } from "./envVariable/SelectEnvType";
import { SelectEnvKey } from "./envVariable/SelectEnvKey";
import { SelectEnvValue } from "./envVariable/SelectEnvValue";
import { SelectEnvResource } from "./envVariable/SelectEnvResource";
import {
  useGetApiMyKubernetesCloudConfigmapListByIdQuery,
  useGetApiMyKubernetesCloudSecretListByIdQuery,
} from "src/app/services/api.generated";
import { useParams } from "react-router";

type SelectEnvironmentVariablePropsType = {
  outerIndex: number;
  item: any;
  formik: FormikProps<KuberCloudAppImageType>;
};

export const SelectEnvironmentVariable: FC<
  SelectEnvironmentVariablePropsType
> = ({ item, formik, outerIndex }) => {
  const [resourceList, setResourceList] = useState<ResourceListType>();
  const [keyListInResource, setKeyListInResource] = useState<any>();
  const [environmentVariable, setEnvironmentVariable] =
    useState<VariableEnvironment>({
      variableType: 1,
      key: "",
      value: "",
    });
  const [needToResourceSelect, setNeedToResourceSelect] =
    useState<boolean>(false);
  const [selectedResourceItem, setSelectedResourceItem] = useState<
    number | null
  >(null);

  const theme = useTheme(),
    isMd = useMediaQuery(theme.breakpoints.up("md"));
  const { id: kubernetesCloudNameSpaceId } = useParams();

  const { data: configmapList } =
    useGetApiMyKubernetesCloudConfigmapListByIdQuery(
      {
        id: Number(kubernetesCloudNameSpaceId),
      },
      { skip: !kubernetesCloudNameSpaceId }
    );

  const { data: secretList } = useGetApiMyKubernetesCloudSecretListByIdQuery(
    {
      id: Number(kubernetesCloudNameSpaceId),
    },
    { skip: !kubernetesCloudNameSpaceId }
  );

  const removeDestinationInput = (index: number) => {
    formik.setFieldValue("keyValues", (prevState: VariableEnvironment[]) => {
      let result = [...prevState];
      result.splice(index, 1);
      return result;
    });
    // formik.setFieldValue(
    //   "keyValue",
    //   formik.values.keyValue.keyValue.filter((_, i) => i !== index)
    // );
  };

  useEffect(() => {
    switch (environmentVariable.variableType) {
      case ENVIRONMENT_TYPES.CONFIG_MAP:
        setNeedToResourceSelect(true);
        setResourceList(configmapList);
        const configMapList = configmapList?.find(
          (item) => item.id === selectedResourceItem
        )?.configMaps;
        setKeyListInResource(configMapList);
        break;
      case ENVIRONMENT_TYPES.SECRET_MAP:
        setNeedToResourceSelect(true);
        setResourceList(secretList);
        break;
      default:
        setNeedToResourceSelect(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [environmentVariable.variableType, selectedResourceItem]);

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
              <IconButton onClick={() => removeDestinationInput(outerIndex)}>
                <DeleteOutline color="error" />
              </IconButton>
              {needToResourceSelect ? (
                <SelectEnvValue
                  environmentVariable={environmentVariable}
                  setEnvironmentVariable={setEnvironmentVariable}
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
                  value={environmentVariable.value}
                  onChange={(e) =>
                    setEnvironmentVariable((prevState) => ({
                      ...prevState,
                      value: e.target.value,
                    }))
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
              setSelectedResourceItem={setSelectedResourceItem}
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
              environmentVariable={environmentVariable}
              setEnvironmentVariable={setEnvironmentVariable}
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
            environmentVariable={environmentVariable}
            setEnvironmentVariable={setEnvironmentVariable}
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
              environmentVariable={environmentVariable}
              setEnvironmentVariable={setEnvironmentVariable}
            />
          </Grid>
        )}

        {!isMd && needToResourceSelect && (
          <Grid item xs={10} md={5} lg={needToResourceSelect ? 3 : 7}>
            <SelectEnvResource
              resourceList={resourceList}
              selectedResourceItem={selectedResourceItem}
              setSelectedResourceItem={setSelectedResourceItem}
            />
          </Grid>
        )}

        {!isMd && (
          <Grid item xs={10} md={5} lg={needToResourceSelect ? 3 : 7}>
            <Stack direction="row" gap={1}>
              <IconButton onClick={() => removeDestinationInput(outerIndex)}>
                <DeleteOutline color="error" />
              </IconButton>

              {needToResourceSelect ? (
                <SelectEnvValue
                  environmentVariable={environmentVariable}
                  setEnvironmentVariable={setEnvironmentVariable}
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
                  value={environmentVariable.value}
                  onChange={(e) =>
                    setEnvironmentVariable((prevState) => ({
                      ...prevState,
                      value: e.target.value,
                    }))
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
