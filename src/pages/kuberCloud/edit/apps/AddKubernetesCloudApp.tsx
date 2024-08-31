import {
  Button,
  Divider,
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
import AppImageListCard from "src/components/organisms/kuberCloud/edit/deployment/AppImageListCard";
import { KuberCloudAppImageType } from "src/types/kuberCloud.types";
import { SelectDeploymentInfo } from "src/components/organisms/kuberCloud/edit/deployment/SelectDeploymentInfo";
import { SelectEnvironmentVariable } from "src/components/organisms/kuberCloud/edit/deployment/SelectEnvironmentVariable";
import { LoadingButton } from "@mui/lab";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { groupedByVariableType } from "src/utils/groupedByVariableType.utils";
import InfoSvg from "src/components/atoms/svg-icons/InfoSvg";
const title =
  "ایجاد متغیرهای محیطی: کلید (مانند DB_HOST)، مقدار (مثلاً localhost)، و منبع اختیاری (مانند ConfigMap یا Secret) برای هر requirement.";
const AddKubernetesCloudApp: FC = () => {
  const [environmentVariableList, setEnvironmentVariableList] = useState<
    {
      variableType: number;
      envKey: string;
      value: string;
    }[]
  >([]);

  const navigate = useNavigate();
  const { id: kubernetesCloudId } = useParams();

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

  const onSubmit: formikOnSubmitType<KuberCloudAppImageType> = (values) => {
    let errorMessage = "";

    if (!values.imageId) {
      errorMessage = "image مورد نظر را انتخاب کنید.";
    } else if (!values.imageTagId) {
      errorMessage = "ورژن image خودرا انتخاب نمایید.";
    } else if (!values.name) {
      errorMessage = "نام سرویس خودرا وارد نمایید.";
    } else if (values.name.trim().length < 5 || values.name.length > 50) {
      errorMessage = "طول کارکترها باید بین ۵ تا ۵۰ کارکتر باشد";
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
          isPublic: true,
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

  const initialValues: KuberCloudAppImageType = {
    imageId: null,
    imageTagId: "",
    name: "",
    replicaNumber: 1,
    namespaceId: Number(kubernetesCloudId),
    keyValue: [],
  };

  const validationSchema = yup.object().shape({});

  const formik = useFormik<KuberCloudAppImageType>({
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
        ایجاد App جدید
      </Typography>

      <Paper>
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

            <Divider sx={{ margin: "50px 10px" }} />

            <SelectDeploymentInfo formik={formik} />

            <Divider sx={{ margin: "50px 10px" }} />

            <Stack
              gap={2}
              direction="column"
              sx={{
                width: "100%",
                alignSelf: "center",
                justifyContent: "center",
                p: 5,
              }}
            >
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
              <Stack rowGap={{ xs: 5, sm: 2 }}>
                {environmentVariableList.length > 0 &&
                  environmentVariableList.map((item, index) => {
                    if (!item) return null;
                    return (
                      <SelectEnvironmentVariable
                        key={index}
                        onDelete={removeEnvironmentVariable}
                        formik={formik}
                        mainIndex={index}
                      />
                    );
                  })}
              </Stack>
            </Stack>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={1}
              px={2}
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

export default AddKubernetesCloudApp;
