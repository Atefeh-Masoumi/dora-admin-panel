import { Button, Divider, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useFormik } from "formik";
import { FC, useState } from "react";
import { formikOnSubmitType } from "src/types/form.type";
import AddIcon from "@mui/icons-material/Add";
import * as yup from "yup";
import {
  useGetApiMyKubernetesCloudImageListQuery,
  usePostApiMyKubernetesCloudDeploymentCreateMutation,
} from "src/app/services/api.generated";
import PageLoading from "src/components/atoms/PageLoading";
import AppImageListCard from "src/components/organisms/kubernetesCloud/edit/deployment/AppImageListCard";
import {
  KuberCloudAppImageType,
  VariableEnvironment,
} from "src/types/kubernetesCloud.types";
import { SelectDeploymentInfo } from "src/components/organisms/kubernetesCloud/edit/deployment/SelectDeploymentInfo";
import { SelectEnvironmentVariable } from "src/components/organisms/kubernetesCloud/edit/deployment/SelectEnvironmentVariable";
import { LoadingButton } from "@mui/lab";

const AddKubernetesCloudApp: FC = () => {
  const [keyValues, setKeyValues] = useState<VariableEnvironment[]>([]);

  const { data: kuberCloudImageList, isLoading: kuberCloudImageLoading } =
    useGetApiMyKubernetesCloudImageListQuery();

  const [createDeployment, { isLoading: createDeploymentLoading }] =
    usePostApiMyKubernetesCloudDeploymentCreateMutation();

  const onSubmit: formikOnSubmitType<KuberCloudAppImageType> = ({
    imageId,
    tagId,
  }) => {
    // createDeployment({
    //   createKuberCloudDeploymentModel: {
    //   },
    // });
  };

  const initialValues: KuberCloudAppImageType = {
    imageId: null,
    tagId: "",
    name: "",
    replicaNumber: 1,
    namespaceId: null,
    keyValues: [{ variableType: 1, key: "", value: "" }],
  };

  const validationSchema = yup.object().shape({
    tagId: yup.number().typeError("").nullable(),
    name: yup.string().required().min(5, ""),
  });

  const formik = useFormik<KuberCloudAppImageType>({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  });

  const addEnvironmentVariable = () => {
    formik.setFieldValue("keyValues", [
      ...formik.values.keyValues,
      { variableType: 1, key: "", value: "" },
    ]);
  };

  console.log(formik.values.keyValues);
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

            <Button
              sx={{ alignSelf: "center", width: 100 }}
              variant="text"
              startIcon={<AddIcon />}
              onClick={addEnvironmentVariable}
            >
              افزودن
            </Button>

            <Stack
              sx={{
                width: "100%",
                alignSelf: "center",
              }}
            >
              <Stack
                gap={2}
                // py={5}
                // bgcolor="red"

                direction="column"
                sx={{ width: "100%", justifyContent: "center", pb: 5 }}
              >
                {/* {formik.values.keyValues.map((item, index) => (
                  <SelectEnvironmentVariable
                    key={index}
                    item={item}
                    formik={formik}
                    outerIndex={index}
                  />
                ))} */}

                {Array.isArray(formik.values.keyValues) &&
                formik.values.keyValues.length > 0 ? (
                  formik.values.keyValues.map((item, index) => (
                    <SelectEnvironmentVariable
                      key={index}
                      item={item}
                      formik={formik}
                      outerIndex={index}
                    />
                  ))
                ) : (
                  <></>
                )}
              </Stack>
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
              {/* {step === 1 ? "انصراف" : "مرحله قبل"} */}
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
              // onClick={goNextStep}
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
