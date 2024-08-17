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
import { DorsaTextField } from "src/components/atoms/DorsaTextField";

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

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  });

  const theme = useTheme(),
    isMd = useMediaQuery(theme.breakpoints.up("md"));
  // isMd = useMediaQuery(theme.breakpoints.up("lg"));

  if (kuberCloudImageLoading) return <PageLoading />;

  return (
    <>
      <Typography
        variant="title6"
        color="secondary"
        fontWeight="700"
        sx={{ mb: 3 }}
      >
        ایجاد App جدید
      </Typography>

      <Paper>
        <Stack
          direction="column"
          sx={{
            width: { xs: "100%" },
            px: { xs: 1.8, lg: 2 },
            py: { xs: 1.8, lg: 2.25 },
          }}
          gap={2}
        >
          {false ? (
            <PageLoading />
          ) : (
            <AppImageListCard
              loading={kuberCloudImageLoading}
              list={kuberCloudImageList || []}
              formik={formik}
            />
          )}

          <Divider sx={{ margin: "50px 10px" }} />

          <SelectDeploymentInfo formik={formik} />

          <Divider sx={{ margin: "50px 10px" }} />

          <Stack direction="column" sx={{ width: "100%" }}>
            <Typography fontSize={24} fontWeight="bold" textAlign="center">
              Environment Variable
            </Typography>
            <Typography
              align="center"
              sx={{ color: ({ palette }) => palette.grey[700] }}
            >
              ویژگی های موردنظر را به container اضافه کنید.
            </Typography>
            <Stack
              direction="column"
              justifyContent="space-between"
              alignItems="center"
            >
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
                          <Stack direction="row" gap={1}>
                            <IconButton>
                              <DeleteOutline color="error" />
                            </IconButton>
                            <DorsaTextField
                              sx={{
                                background: ({ palette }) =>
                                  palette.primary.contrastText,
                              }}
                              dir="ltr"
                              size="medium"
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
                          <FormControl fullWidth size="medium">
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
                          size="medium"
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
                          <FormControl fullWidth size="medium">
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
                          <Stack direction="row" gap={1}>
                            <IconButton>
                              <DeleteOutline color="error" />
                            </IconButton>
                            <DorsaTextField
                              sx={{
                                background: ({ palette }) =>
                                  palette.primary.contrastText,
                              }}
                              dir="ltr"
                              size="medium"
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
        </Stack>
      </Paper>
    </>
  );
};

export default AddKubernetesCloudApp;
