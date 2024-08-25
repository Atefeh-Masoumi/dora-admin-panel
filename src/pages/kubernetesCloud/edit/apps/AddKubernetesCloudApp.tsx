import { Button, Divider, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useFormik } from "formik";
import { FC, useState } from "react";
import { formikOnSubmitType } from "src/types/form.type";
import AddIcon from "@mui/icons-material/Add";
import * as yup from "yup";
import {
  useGetApiMyKuberCloudImageListQuery,
  usePostApiMyKuberCloudDeploymentCreateMutation,
} from "src/app/services/api.generated";
import PageLoading from "src/components/atoms/PageLoading";
import AppImageListCard from "src/components/organisms/kubernetesCloud/edit/deployment/AppImageListCard";
import {
  KuberCloudAppImageType,
  VariableEnvironment,
} from "src/types/kubernetesCloud.types";
import { SelectDeploymentInfo } from "src/components/organisms/kubernetesCloud/edit/deployment/SelectDeploymentInfo";
import { SelectEnvironmentVariable } from "src/components/organisms/kubernetesCloud/edit/deployment/SelectEnvironmentVariable";

const AddKubernetesCloudApp: FC = () => {
  const [keyValues, setKeyValues] = useState<VariableEnvironment[]>([]);

  const { data: kuberCloudImageList, isLoading: kuberCloudImageLoading } =
    useGetApiMyKuberCloudImageListQuery();

  const [createDeployment, { isLoading: createDeploymentLoading }] =
    usePostApiMyKuberCloudDeploymentCreateMutation();

  const initialValues: KuberCloudAppImageType = {
    imageId: null,
    tagId: "",
    name: "",
    replicaNumber: 1,
    namespaceId: null,
    keyValue: {},
  };

  const validationSchema = yup.object().shape({
    tagId: yup.number().typeError("").nullable(),
    name: yup.string().required().min(5, ""),
  });

  const addEnvironmentVariable = () => {
    setKeyValues((prevState) => {
      let result = [...prevState];
      result.push({ variableType: 1, key: "", value: "" });
      return result;
    });
    // formik.setFieldValue("keyValue", [
    //   ...formik.values.keyValue,
    //   { vmHostId: null, port: null },
    // ]);
  };

  const onSubmit: formikOnSubmitType<KuberCloudAppImageType> = ({
    imageId,
    tagId,
  }) => {
    // createDeployment({
    //   createKuberCloudDeploymentModel: {
    //   },
    // });
  };

  const formik = useFormik<KuberCloudAppImageType>({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  });

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
                sx={{ width: "100%", justifyContent: "center" }}
              >
                {keyValues.map((item, index) => (
                  <SelectEnvironmentVariable
                    key={index}
                    item={item}
                    keyValues={keyValues}
                    setKeyValues={setKeyValues}
                    formik={formik}
                    outerIndex={index}
                  />
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
