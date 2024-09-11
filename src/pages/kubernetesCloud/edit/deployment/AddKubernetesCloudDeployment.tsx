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
import * as yup from "yup";
import {
  useGetApiMyKubernetesCloudImageListQuery,
  usePostApiMyKubernetesCloudDeploymentCreateMutation,
} from "src/app/services/api.generated";
import PageLoading from "src/components/atoms/PageLoading";
import AppImageListCard from "src/components/organisms/kubernetesCloud/edit/deployment/add/AppImageListCard";
import { SelectDeploymentInfo } from "src/components/organisms/kubernetesCloud/edit/deployment/add/SelectDeploymentInfo";
import { SelectEnvironmentVariable } from "src/components/organisms/kubernetesCloud/edit/deployment/add/SelectEnvironmentVariable";
import { LoadingButton } from "@mui/lab";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { groupedByVariableType } from "src/utils/groupedByVariableType.utils";
import InfoSvg from "src/components/atoms/svg-icons/InfoSvg";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { kuberCloudNameRegex } from "src/utils/regex.utils";
import { KuberCloudNamespaceImageType } from "src/types/kubernetesCloud.types";
const title =
  "ایجاد متغیرهای محیطی: کلید (مانند DB_HOST)، مقدار (مثلاً localhost)، و منبع اختیاری (مانند ConfigMap یا Secret) برای هر requirement.";
const AddKubernetesCloudDeployment: FC = () => {
  const [environmentVariableList, setEnvironmentVariableList] = useState<
    {
      variableType: number;
      envKey: string;
      value: string;
    }[]
  >([]);

  const navigate = useNavigate();
  const { kubernetesCloudId } = useParams();

  const { data: kuberCloudImageList, isLoading: kuberCloudImageLoading } =
    useGetApiMyKubernetesCloudImageListQuery();

  const [createDeployment, { isLoading: createDeploymentLoading }] =
    usePostApiMyKubernetesCloudDeploymentCreateMutation();

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

  const onSubmit: formikOnSubmitType<KuberCloudNamespaceImageType> = (
    values
  ) => {
    let errorMessage = "";

    if (!values.imageId) {
      errorMessage = "image مورد نظر را انتخاب کنید.";
    } else if (!values.imageTagId) {
      errorMessage = "ورژن image خودرا انتخاب نمایید.";
    } else if (!values.name) {
      errorMessage = "نام سرویس خودرا وارد نمایید.";
    }

    if (errorMessage !== "") {
      toast.error(errorMessage);
    } else {
      createDeployment({
        createKuberCloudDeploymentModel: {
          name: values.name,
          imageTagId: Number(values.imageTagId!),
          namespaceId: values.namespaceId!,
          keyValue: groupedByVariableType(values),
          replicaNumber: values.replicaNumber,
          isPublic: values.isPublic,
        },
      })
        .unwrap()
        .then((res) => {
          toast.success("کانتینر با موفقیت ایجاد شد");
          navigate("/kubernetes-cloud/" + kubernetesCloudId);
        })
        .catch((err) => {});
    }
  };

  const initialValues: KuberCloudNamespaceImageType = {
    imageId: null,
    imageTagId: "",
    name: "",
    replicaNumber: 1,
    namespaceId: Number(kubernetesCloudId),
    keyValue: [],
    isPublic: false,
  };

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .matches(
        kuberCloudNameRegex,
        "نام نامعتبر نام فقط می تواند شامل حروف کوچک، اعداد و خط تیره (-) باشد. و باید با یک حرف یا عدد کوچک شروع و پایان یابد. حداکثر طول 63 کاراکتر است."
      ),
  });

  const formik = useFormik<KuberCloudNamespaceImageType>({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  });

  useEffect(() => {
    const imageItem = kuberCloudImageList?.find(
      (item) => item.id === formik.values.imageId
    );

    const requiredKeyList = imageItem?.keys || [];
    let result: {
      variableType: number;
      envKey: string;
      value: string;
    }[] = [];

    requiredKeyList?.forEach((item) =>
      result.push({ variableType: 1, envKey: item.name || "---", value: "" })
    );
    result = result.filter((item) => item && item.variableType !== undefined);

    setEnvironmentVariableList(result);
    formik.setFieldValue("keyValue", result);
  }, [formik.values.imageId]);

  if (kuberCloudImageLoading) return <PageLoading />;

  return (
    <>
      <Typography
        variant="title6"
        color="secondary"
        fontWeight="700"
        sx={{ mb: 3 }}
      >
        ایجاد Deployment جدید
      </Typography>

      <Paper sx={{ p: 2 }}>
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
            {false ? (
              <PageLoading />
            ) : (
              <AppImageListCard
                loading={kuberCloudImageLoading}
                list={kuberCloudImageList || []}
                formik={formik}
              />
            )}

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
                <SelectDeploymentInfo formik={formik} />
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
                    متغیرهای موردنظر را اضافه کنید.
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
                          <SelectEnvironmentVariable
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
                  navigate("/kubernetes-cloud/" + kubernetesCloudId)
                }
              >
                انصراف
              </Button>
              <LoadingButton
                loading={createDeploymentLoading}
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
                ایجاد سرویس
              </LoadingButton>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </>
  );
};

export default AddKubernetesCloudDeployment;
