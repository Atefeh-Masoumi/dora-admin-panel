import { DeleteOutline } from "@mui/icons-material";
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FormikProps } from "formik";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import {
  ENVIRONMENT_TYPES,
  EnvironmentType,
} from "src/constant/kubernetesCloud.constant";
import {
  KuberCloudAppImageType,
  VariableEnvironment,
} from "src/types/kubernetesCloud.types";

type SelectEnvironmentVariablePropsType = {
  outerIndex: number;
  item: any;
  formik: FormikProps<KuberCloudAppImageType>;
  keyValues: VariableEnvironment[];
  setKeyValues: Dispatch<SetStateAction<VariableEnvironment[]>>;
};

export const SelectEnvironmentVariable: FC<
  SelectEnvironmentVariablePropsType
> = ({ item, formik, outerIndex, keyValues, setKeyValues }) => {
  const [environmentVariable, setEnvironmentVariable] =
    useState<VariableEnvironment>({
      variableType: 1,
      key: "",
      value: "",
    });
  const [needToResourceSelect, setNeedToResourceSelect] =
    useState<boolean>(false);
  const theme = useTheme(),
    isMd = useMediaQuery(theme.breakpoints.up("md"));

  const removeDestinationInput = (index: number) => {
    setKeyValues((prevState) => {
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
      case ENVIRONMENT_TYPES.SECRET_MAP:
        setNeedToResourceSelect(true);
        break;
      default:
        setNeedToResourceSelect(false);
    }
  }, [environmentVariable.variableType]);

  console.log({ variableType: environmentVariable.variableType });

  return (
    <Box
      bgcolor={{
        xs: "customColor.primaryMaxLight",
        md: "inherit",
      }}
      alignSelf="center"
      px={0}
      py={{ xs: 2, md: 0 }}
      width="90%"
    >
      <Grid justifyContent="center" container width="100%" gap={2}>
        {isMd && (
          <Grid item xs={10} md={4} lg={needToResourceSelect ? 4 : 4.7}>
            <Stack direction="row" gap={1}>
              <IconButton onClick={() => removeDestinationInput(outerIndex)}>
                <DeleteOutline color="error" />
              </IconButton>
              {needToResourceSelect ? (
                <FormControl fullWidth size="medium">
                  <Select dir="ltr" value="test">
                    {[1, 2, 3].map((item, index) => (
                      <MenuItem
                        key={index}
                        sx={{
                          justifyContent: "end",
                          bgColor: "primary.contrastText",
                        }}
                        value={item}
                      >
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <DorsaTextField
                  sx={{
                    background: ({ palette }) => palette.primary.contrastText,
                  }}
                  placeholder="Value"
                  dir="ltr"
                  size="medium"
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

        {needToResourceSelect && (
          <Grid
            item
            xs={10}
            md={3}
            lg={2}
            sx={{
              background: ({ palette }) => palette.primary.contrastText,
            }}
          >
            <FormControl fullWidth size="medium">
              <Select dir="ltr" value="test">
                {[1, 2, 3].map((item, index) => (
                  <MenuItem
                    key={index}
                    sx={{
                      justifyContent: "end",
                      bgColor: "primary.contrastText",
                    }}
                    value={item}
                  >
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
            <FormControl fullWidth size="medium">
              <Select dir="ltr" value={environmentVariable?.variableType || 1}>
                {EnvironmentType.map((item, index) => (
                  <MenuItem
                    key={index}
                    sx={{
                      justifyContent: "end",
                      bgColor: "primary.contrastText",
                    }}
                    value={item.id}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}

        <Grid
          sx={{
            background: ({ palette }) => palette.primary.contrastText,
          }}
          item
          xs={10}
          md={4}
          lg={needToResourceSelect ? 4 : 4.5}
        >
          <DorsaTextField
            sx={{
              background: ({ palette }) => palette.primary.contrastText,
            }}
            dir="ltr"
            size="medium"
            fullWidth
            placeholder="Key"
            value={environmentVariable.key}
            onChange={(e) =>
              setEnvironmentVariable((prevState) => ({
                ...prevState,
                key: e.target.value,
              }))
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
            <FormControl fullWidth size="medium">
              <Select
                dir="ltr"
                onChange={(e) =>
                  setEnvironmentVariable({
                    variableType: Number(e.target.value),
                    key: "",
                    value: "",
                  })
                }
                value={environmentVariable.variableType}
              >
                {EnvironmentType.map((item, index) => (
                  <MenuItem
                    key={index}
                    sx={{
                      justifyContent: "end",
                      bgColor: "primary.contrastText",
                    }}
                    value={item.id}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}

        {!isMd && (
          <Grid item xs={10} md={5} lg={needToResourceSelect ? 3 : 7}>
            <Stack direction="row" gap={1}>
              <IconButton onClick={() => removeDestinationInput(outerIndex)}>
                <DeleteOutline color="error" />
              </IconButton>
              {needToResourceSelect ? (
                <></>
              ) : (
                <DorsaTextField
                  sx={{
                    background: ({ palette }) => palette.primary.contrastText,
                  }}
                  placeholder="Value"
                  dir="ltr"
                  size="medium"
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
