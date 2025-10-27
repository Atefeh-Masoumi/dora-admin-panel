import {
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useFormik } from "formik";
import { FC, useEffect, useState } from "react";
import { formikOnSubmitType } from "src/types/form.type";
import AddIcon from "@mui/icons-material/Add";
import {
  useGetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployGetIdQuery,
  usePutApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployEditIdMutation,
  // useGetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployKuberDeployIdEnvListQuery,
  EditKuberDeployModel,
} from "src/app/services/api.generated";
import PageLoading from "src/components/atoms/PageLoading";
import { SelectEditDeploymentInfo } from "../edit/edit/SelectEditDeploymentInfo";
import { SelectEditEnvironmentVariable } from "../edit/edit/SelectEditEnvironmentVariable";
import { LoadingButton } from "@mui/lab";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import InfoSvg from "src/components/atoms/svg-icons/InfoSvg";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { ENVIRONMENT_TYPES } from "src/constant/kubernetesCloud.constant";

type EditDeploymentFormType = {
  replicaNumber: number;
  keyValue: {
    variableType: number;
    envKey: string;
    value: string;
    id?: number; // For existing env vars
  }[];
  envToDelete: number[]; // Track IDs to delete
};

const title =
  "ویرایش متغیرهای محیطی: کلید (مانند DB_HOST)، مقدار (مثلاً localhost)، و منبع اختیاری (مانند ConfigMap یا Secret) برای هر requirement.";

export const Settings: FC = () => {
  const [environmentVariableList, setEnvironmentVariableList] = useState<
    {
      variableType: number;
      envKey: string;
      value: string;
      id?: number;
    }[]
  >([]);

  const navigate = useNavigate();
  const { kubernetesCloudId, projectId, deploymentId } = useParams();

  const {
    data: deploymentData,
    isLoading: deploymentDataLoading,
    refetch,
  } = useGetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployGetIdQuery(
    {
      projectId: Number(projectId),
      kuberHostId: Number(kubernetesCloudId),
      id: Number(deploymentId),
    },
    { skip: !deploymentId }
  );

  // const {
  //   data: envListData,
  //   isLoading: envListLoading,
  //   refetch: refetchEnvList,
  // } = useGetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployKuberDeployIdEnvListQuery(
  //   {
  //     projectId: Number(projectId),
  //     kuberHostId: Number(kubernetesCloudId),
  //     kuberDeployId: Number(deploymentId),
  //   },
  //   { skip: !deploymentId }
  // );

  const [editDeployment, { isLoading: editDeploymentLoading }] =
    usePutApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployEditIdMutation();

  const addEnvironmentVariable = () => {
    setEnvironmentVariableList((prevState) => {
      let result = [...prevState];
      result.push({ variableType: 1, envKey: "", value: "" });
      return result;
    });
    formik.setFieldValue("keyValue", [
      ...formik.values.keyValue,
      { variableType: 1, envKey: "", value: "" },
    ]);
  };

  const removeEnvironmentVariable = (itemIndex: number) => {
    if (!formik.values.keyValue || !formik.values.keyValue[itemIndex]) {
      return;
    }

    const itemToRemove = formik.values.keyValue[itemIndex];

    // If item has an ID, mark it for deletion
    if (itemToRemove.id) {
      formik.setFieldValue("envToDelete", [
        ...formik.values.envToDelete,
        itemToRemove.id,
      ]);
    }

    setEnvironmentVariableList((prevState) => {
      let result = [...prevState];
      result.splice(itemIndex, 1);
      return result;
    });
    formik.setFieldValue(
      "keyValue",
      formik.values.keyValue.filter((_, i) => i !== itemIndex)
    );
  };

  const onSubmit: formikOnSubmitType<EditDeploymentFormType> = (values) => {
    // Group keyValue by variableType
    const groupedKeyValue = values.keyValue.reduce<{
      [key: string]: { [key: string]: string };
    }>((acc, item) => {
      const { variableType, envKey, value } = item;
      if (!acc[variableType]) {
        acc[variableType] = {};
      }
      acc[variableType][envKey] = String(value);
      return acc;
    }, {});

    // Group envToDelete by variableType - using first ID per type
    const envToDeleteGrouped = values.envToDelete.reduce<{
      [key: string]: number;
    }>((acc, id) => {
      // Find the variable type for this ID from original env list
      let envItem = null;
      // if (envListData && Array.isArray(envListData)) {
      //   for (const envGroup of envListData) {
      //     if (envGroup.envs) {
      //       envItem = envGroup.envs.find((env: any) => env.id === id);
      //       if (envItem) break;
      //     }
      //   }
      // }
      if (envItem || id) {
        // Use variable type 1 as default if not available
        const typeKey = "1";
        if (!acc[typeKey]) {
          acc[typeKey] = id;
        }
      }
      return acc;
    }, {});

    const payload: EditKuberDeployModel = {
      replicaNumber: values.replicaNumber,
      keyValue: Object.keys(groupedKeyValue).length > 0 ? groupedKeyValue : null,
      envToDelete: Object.keys(envToDeleteGrouped).length > 0 ? envToDeleteGrouped : null,
    };

    editDeployment({
      editKuberDeployModel: payload,
      projectId: Number(projectId),
      kuberHostId: Number(kubernetesCloudId),
      id: Number(deploymentId),
    })
      .unwrap()
      .then(() => {
        toast.success("دیپلویمنت با موفقیت ویرایش شد");
        refetch();
        formik.setFieldValue("envToDelete", []);
      })
      .catch(() => {});
  };

  const initialValues: EditDeploymentFormType = {
    replicaNumber: deploymentData?.replica || 1,
    keyValue: [],
    envToDelete: [],
  };

  const formik = useFormik<EditDeploymentFormType>({
    initialValues,
    onSubmit,
    enableReinitialize: true,
  });

  // Load existing environment variables when env list data is available
  // useEffect(() => {
  //   if (envListData && Array.isArray(envListData) && envListData.length > 0) {
  //     const existingEnvs: any[] = [];
      
  //     // Flatten all envs from all groups
  //     envListData.forEach((envGroup) => {
  //       if (envGroup.envs && Array.isArray(envGroup.envs)) {
  //         envGroup.envs.forEach((env: any) => {
  //           existingEnvs.push({
  //             variableType: ENVIRONMENT_TYPES.CUSTOM, // Default to custom since API doesn't provide type
  //             envKey: env.key || "",
  //             value: env.value || "",
  //             id: env.id,
  //           });
  //         });
  //       }
  //     });

  //     setEnvironmentVariableList(existingEnvs);
  //     formik.setFieldValue("keyValue", existingEnvs);
  //   }
  // }, [envListData]);

  // Load replica number when deployment data is available
  useEffect(() => {
    if (deploymentData?.replica) {
      formik.setFieldValue("replicaNumber", deploymentData.replica);
    }
  }, [deploymentData]);

  if (deploymentDataLoading) return <PageLoading />;

  return (
    <>
      <Paper sx={{ p: 2, width: "100%" }}>
        <form onSubmit={formik.handleSubmit}>
          <Stack
            direction="column"
            sx={{
              width: { xs: "100%" },
              px: { xs: 1.8, lg: 2 },
              py: { xs: 1.8, lg: 2.25 },
            }}
            gap={2}
          >
            <Typography
              variant="title6"
              color="secondary"
              fontWeight="700"
              // sx={{ mb: 2 }}
            >
              ویرایش تنظیمات دیپلویمنت
            </Typography>

            <Divider sx={{ margin: "20px 10px" }} />

            <Grid justifyContent="space-between" container>
              <Grid
                bgcolor="#e7f0fd"
                sx={{ borderRadius: BORDER_RADIUS_1, p: 2 }}
                item
                xs={12}
                sm={12}
                md={4}
                lg={4.5}
              >
                <SelectEditDeploymentInfo formik={formik} />
              </Grid>

              <Grid item xs={12} sm={12} md={8} lg={7}>
                <Stack
                  gap={2}
                  direction="column"
                  sx={{
                    width: "100%",
                    alignSelf: "start",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="text9"
                    align="center"
                    sx={{ color: ({ palette }) => palette.grey[700] }}
                  >
                    متغیرهای موردنظر را ویرایش کنید.
                  </Typography>

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Stack direction="row" gap={1} alignItems="center">
                      <Tooltip sx={{ p: 0 }} placement="top" title={title}>
                        <IconButton>
                          <InfoSvg />
                        </IconButton>
                      </Tooltip>
                      <Typography>لیست Variable ها</Typography>
                    </Stack>
                    <Button
                      sx={{ alignSelf: "center", width: 100 }}
                      variant="outlined"
                      startIcon={<AddIcon />}
                      onClick={addEnvironmentVariable}
                    >
                      افزودن
                    </Button>
                  </Stack>
                  <Stack
                    sx={{ maxHeight: "280px", overflow: "auto", pt: 1 }}
                    rowGap={{ xs: 5, sm: 2 }}
                  >
                    {environmentVariableList.length > 0 &&
                      environmentVariableList.map((item, index) => {
                        if (!item) return null;
                        return (
                          <SelectEditEnvironmentVariable
                            key={index}
                            onDelete={() => removeEnvironmentVariable(index)}
                            formik={formik}
                            mainIndex={index}
                          />
                        );
                      })}
                  </Stack>
                </Stack>
              </Grid>
            </Grid>

            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={1}
              pt={6}
              pb={2}
            >
              <Button
                fullWidth
                disableElevation
                sx={{
                  height: 58,
                  maxWidth: { xs: "50%", sm: 200 },
                  borderRadius: "10px",
                  border: "1px solid rgba(110, 118, 138, 0.32)",
                  color: "rgba(110, 118, 138, 1)",
                  fontSize: "16px !important",
                }}
                onClick={() =>
                  navigate(
                    `/kubernetes-cloud/${projectId}/${kubernetesCloudId}/deployment/${deploymentId}/overview`
                  )
                }
              >
                انصراف
              </Button>
              <LoadingButton
                loading={editDeploymentLoading}
                fullWidth
                disableElevation
                variant="contained"
                type="submit"
                sx={{
                  height: 58,
                  maxWidth: { xs: "50%", sm: 200 },
                  borderRadius: "10px",
                  fontSize: "16px !important",
                }}
              >
                ذخیره تغییرات
              </LoadingButton>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </>
  );
};
