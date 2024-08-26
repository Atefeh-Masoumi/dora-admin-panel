import AddIcon from "@mui/icons-material/Add";
import { LoadingButton } from "@mui/lab";
import { Button, Divider, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useFormik } from "formik";
import { FC, useState } from "react";
import { useParams } from "react-router";
import {
  useGetApiMyKubernetesCloudImageListQuery,
  usePostApiMyKubernetesCloudDeploymentCreateMutation,
} from "src/app/services/api.generated";
import PageLoading from "src/components/atoms/PageLoading";
import AppImageListCard from "src/components/organisms/kubernetesCloud/edit/deployment/AppImageListCard";
import { SelectDeploymentInfo } from "src/components/organisms/kubernetesCloud/edit/deployment/SelectDeploymentInfo";
import { SelectEnvironmentVariable } from "src/components/organisms/kubernetesCloud/edit/deployment/SelectEnvironmentVariable";
import { formikOnSubmitType } from "src/types/form.type";
import { KuberCloudAppImageType } from "src/types/kubernetesCloud.types";
import * as yup from "yup";

interface GroupedVariables {
  [key: number]: {
    [envKey: string]: any;
  };
}

const AddKubernetesCloudApp: FC = () => {
  const [environmentVariableList, setEnvironmentVariableList] = useState<
    {
      variableType: number;
      envKey: string;
      value: string;
    }[]
  >([]);

  const { id: kubernetesCloudId } = useParams();

  const {
    data: KubernetesCloudImageList,
    isLoading: KubernetesCloudImageLoading,
  } = useGetApiMyKubernetesCloudImageListQuery();

  const [createDeployment, { isLoading: createDeploymentLoading }] =
    usePostApiMyKubernetesCloudDeploymentCreateMutation();

  const handleFormikOnSubmit: formikOnSubmitType<KuberCloudAppImageType> = (
    values
  ) => {
    const groupedByVariableType = values.keyValue.reduce<GroupedVariables>(
      (acc, item) => {
        const { variableType, envKey, value } = item;
        if (!acc[variableType]) {
          acc[variableType] = {};
        }
        acc[variableType][envKey] = value;
        return acc;
      },
      {}
    );

    console.log(groupedByVariableType);
    // createDeployment({
    //   createKuberCloudDeploymentModel: {
    //     name: values.name,
    //     imageTagId: Number(values.imageTagId!),
    //     namespaceId: values.namespaceId!,
    //     keyValue: values.keyValue!,
    //     replicaNumber: values.replicaNumber,
    //   },
    // })
    //   .unwrap()
    //   .then((res) => {
    //     toast.success("کانتینر با موفقیت ایجاد شد");
    //     navigate("/");
    //   })
    //   .catch((err) => {});
  };

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

  const initialValues: KuberCloudAppImageType = {
    imageId: null,
    imageTagId: "",
    name: "",
    replicaNumber: 1,
    namespaceId: Number(kubernetesCloudId),
    keyValue: [],
  };

  // name: string;
  // imageTagId: number;
  // namespaceId: number;
  // keyValue?: {
  //   [key: string]: {
  //     [key: string]: string;
  //   } | null;
  // } | null;
  // replicaNumber?: number;

  const validationSchema = yup.object().shape({
    imageTagId: yup.number().typeError("").nullable(),
    name: yup.string().required().min(5, ""),
  });

  const formik = useFormik<KuberCloudAppImageType>({
    initialValues,
    validationSchema,
    onSubmit: handleFormikOnSubmit,
    enableReinitialize: true,
  });

  if (createDeploymentLoading) return <PageLoading />;

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
              loading={KubernetesCloudImageLoading}
              list={KubernetesCloudImageList || []}
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

            <Button
              sx={{ alignSelf: "center", width: 100 }}
              variant="text"
              startIcon={<AddIcon />}
              onClick={addEnvironmentVariable}
            >
              افزودن
            </Button>

            <Stack
              gap={2}
              direction="column"
              sx={{
                width: "100%",
                alignSelf: "center",
                justifyContent: "center",
                pb: 5,
              }}
            >
              {environmentVariableList.map((item, index) => {
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
              // onClick={goPreviousStep}
            >
              انصراف
            </Button>
            <LoadingButton
              // loading={isLoading || createCdnLoading}
              fullWidth
              disableElevation
              variant="contained"
              sx={{
                height: 58,
                maxWidth: { xs: "50%", sm: 200 },
                borderRadius: "10px",
                fontSize: "16px !important",
              }}
              onClick={() => handleFormikOnSubmit}
            >
              ایجاد سرویس
            </LoadingButton>
          </Stack>
        </Stack>
      </Paper>
    </>
  );
};

export default AddKubernetesCloudApp;
