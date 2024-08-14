import { Tag } from "@mui/icons-material";
import {
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box, Stack, useTheme } from "@mui/system";
import { useFormik } from "formik";
import { FC } from "react";
import { formikOnSubmitType } from "src/types/form.type";
import { DeleteOutline } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import * as yup from "yup";
import {
  useGetApiMyKubernetesCloudImageListQuery,
  usePostApiMyKubernetesCloudDeploymentCreateMutation,
} from "src/app/services/api.generated";
import PageLoading from "src/components/atoms/PageLoading";
import AppImageListCard from "src/components/organisms/kubernetesCloud/edit/deployment/AppImageListCard";
import { KuberCloudAppImageType } from "src/types/kubernetesCloud.types";
import { SelectDeploymentInfo } from "src/components/organisms/kubernetesCloud/edit/deployment/SelectDeploymentInfo";

const AddKubernetesCloudApp: FC = () => {
  const { data: kuberCloudImageList, isLoading: kuberCloudImageLoading } =
    useGetApiMyKubernetesCloudImageListQuery();

  const [createDeployment, { isLoading: createDeploymentLoading }] =
    usePostApiMyKubernetesCloudDeploymentCreateMutation();

  const initialValues: KuberCloudAppImageType = {
    imageId: null,
    tagId: "",
    name: "",
    replicaNumber: 1,
    namespaceId: null,
    keyValue: [],
  };

  const validationSchema = yup.object().shape({
    tagId: yup.number().typeError("").nullable(),
    name: yup.string().required().min(5, ""),
  });

  const onSubmit: formikOnSubmitType<KuberCloudAppImageType> = ({
    imageId,
    tagId,
  }) => {
    // createDeployment({
    //   createKuberCloudDeploymentModel: {
    //   },
    // });
  };

  // export type CreateKuberCloudDeploymentModel = {
  //   name: string;
  //   imageTagId: number;
  //   namespaceId: number;
  //   keyValue?: {
  //     [key: string]: {
  //       [key: string]: string;
  //     } | null;
  //   } | null;
  //   replicaNumber?: number;
  // };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  });

  const theme = useTheme(),
    isMd = useMediaQuery(theme.breakpoints.up("md"));

  if (kuberCloudImageLoading) return <PageLoading />;

  return (
    <Stack direction="column" rowGap={3} p={2}>
      <Typography variant="title2">انتخاب Image</Typography>

      <Stack direction="column" gap={2}>
        {false ? (
          <PageLoading />
        ) : (
          <AppImageListCard
            loading={kuberCloudImageLoading}
            list={kuberCloudImageList || []}
            formik={formik}
          />
        )}

        <Stack>
          <SelectDeploymentInfo formik={formik} />
          {/* <SelectEnvironmentVariable formik={formik} /> */}
        </Stack>
        <Paper sx={{ p: 2, width: "100%" }}>
          <Stack gap={2} direction="column" sx={{ width: "100%" }}>
            <Typography textAlign="center" variant="title2">
              Environment Variable
            </Typography>
            <Stack
              direction="column"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                align="center"
                sx={{ color: ({ palette }) => palette.grey[700] }}
              >
                ویژگی های موردنظر را به container اضافه کنید.
              </Typography>
              <Button
                sx={{ alignItems: "start" }}
                variant="text"
                startIcon={<AddIcon />}
              >
                افزودن
              </Button>
            </Stack>

            <Stack
              sx={{
                width: "100%",
                // border: ({ palette }) =>
                //   `1px solid ${palette.customColor.neutralLighter}`,
                alignSelf: "center",
              }}
            >
              <Stack
                gap={2}
                py={5}
                direction="column"
                sx={{ width: "100%", justifyContent: "center" }}
              >
                {[1, 2, 3].map((item, index) => (
                  <Box
                    key={index}
                    bgcolor={{
                      xs: "customColor.primaryMaxLight",
                      md: "inherit",
                    }}
                    alignSelf="center"
                    px={0}
                    py={{ xs: 2, md: 0 }}
                    width="90%"
                  >
                    <Grid
                      justifyContent="center"
                      container
                      width="100%"
                      gap={2}
                    >
                      {isMd && (
                        <Grid item xs={10} md={5} lg={7}>
                          <Stack gap={1}>
                            <IconButton>
                              <DeleteOutline color="error" />
                            </IconButton>
                            <TextField
                              sx={{
                                background: ({ palette }) =>
                                  palette.primary.contrastText,
                              }}
                              dir="ltr"
                              size="small"
                              fullWidth
                              value="zahra"
                            />
                          </Stack>
                        </Grid>
                      )}
                      {!isMd && (
                        <Grid
                          item
                          xs={10}
                          md={3}
                          lg={2}
                          sx={{
                            background: ({ palette }) =>
                              palette.primary.contrastText,
                          }}
                        >
                          <FormControl fullWidth size="small">
                            <Select dir="ltr" value={1}>
                              <MenuItem
                                sx={{
                                  justifyContent: "end",
                                  bgColor: "primary.contrastText",
                                }}
                                value={1}
                              >
                                Custom
                              </MenuItem>
                              <MenuItem
                                sx={{ justifyContent: "end" }}
                                value={2}
                              >
                                Config
                              </MenuItem>
                              <MenuItem
                                sx={{ justifyContent: "end" }}
                                value={3}
                              >
                                Secret
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                      )}

                      <Grid
                        sx={{
                          background: ({ palette }) =>
                            palette.primary.contrastText,
                        }}
                        item
                        xs={10}
                        md={3}
                        lg={2}
                      >
                        <FormControl
                          sx={{ bgColor: "primary.contrastText" }}
                          dir="ltr"
                          size="small"
                          fullWidth
                        >
                          <Select value={2} placeholder="Key">
                            <MenuItem sx={{ justifyContent: "end" }} value={1}>
                              DbName
                            </MenuItem>
                            <MenuItem sx={{ justifyContent: "end" }} value={2}>
                              DbPort
                            </MenuItem>
                            <MenuItem sx={{ justifyContent: "end" }} value={4}>
                              RootName
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      {isMd && (
                        <Grid
                          item
                          xs={10}
                          md={3}
                          lg={2}
                          sx={{
                            background: ({ palette }) =>
                              palette.primary.contrastText,
                          }}
                        >
                          <FormControl fullWidth size="small">
                            <Select dir="ltr" value={1}>
                              <MenuItem
                                sx={{
                                  justifyContent: "end",
                                  bgColor: "primary.contrastText",
                                }}
                                value={1}
                              >
                                Custom
                              </MenuItem>
                              <MenuItem
                                sx={{ justifyContent: "end" }}
                                value={2}
                              >
                                Config
                              </MenuItem>
                              <MenuItem
                                sx={{ justifyContent: "end" }}
                                value={3}
                              >
                                Secret
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                      )}

                      {!isMd && (
                        <Grid item xs={10} md={5} lg={7}>
                          <Stack gap={1}>
                            <IconButton>
                              <DeleteOutline color="error" />
                            </IconButton>
                            <TextField
                              sx={{
                                background: ({ palette }) =>
                                  palette.primary.contrastText,
                              }}
                              dir="ltr"
                              size="small"
                              fullWidth
                              value="zahra"
                            />
                          </Stack>
                        </Grid>
                      )}
                    </Grid>
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Stack>
        </Paper>
      </Stack>
    </Stack>
  );
};

export default AddKubernetesCloudApp;
