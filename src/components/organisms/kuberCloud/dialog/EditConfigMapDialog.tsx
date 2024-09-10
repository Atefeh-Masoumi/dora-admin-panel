import { Add } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useFormik } from "formik";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { usePostApiMyKubernetesCloudConfigmapCreateMutation } from "src/app/services/api.generated";
import { BlurBackdrop } from "src/components/atoms/BlurBackdrop";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import * as yup from "yup";

type InitialValuesType = {
  name: string | null;
  alias?: string | null;
  description?: string | null;
  namespaceId: number;
  envs: { key: string; value: string }[];
};

const formValidation = yup.object().shape({
  name: yup.string().nullable().required("نام را وارد کنید"),
});

type EditConfigmapDialogPropsType = {
  onClose: () => void;
  openDialog: boolean;
  configData: any;
};

export const EditConfigMapDialog: FC<EditConfigmapDialogPropsType> = ({
  onClose,
  openDialog,
  configData,
}) => {
  const { kubernetesCloudId } = useParams();

  const [createConfigMap, { isLoading: createConfigMapLoading }] =
    usePostApiMyKubernetesCloudConfigmapCreateMutation();

  const formik = useFormik<InitialValuesType>({
    initialValues: {
      name: configData?.name || "",
      alias: null,
      namespaceId: Number(kubernetesCloudId),
      envs: configData?.configMaps || [{ key: "", value: "" }],
    },
    validationSchema: formValidation,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      console.log(values);
      const processedEnvsToObject = values.envs.reduce(
        (acc: any, item: any) => {
          acc[item.key] = item.value;
          return acc;
        },
        {}
      );

      //   createConfigMap({
      //     createKuberCloudConfigmapModel: {
      //       name: values.name as string,
      //       namespaceId: Number(kubernetesCloudId),
      //       envs: processedEnvsToObject,
      //     },
      //   })
      //     .unwrap()
      //     .then(() => {
      //       toast.success("Configmap با موفقیت ساخته شد");
      //       resetForm();
      //       onClose();
      //     })
      //     .catch(() => {});

      //   setSubmitting(false);
    },
    enableReinitialize: true,
  });

  const addEnvsInput = () => {
    formik.setFieldValue("envs", [
      ...formik.values.envs,
      { key: "", value: "" },
    ]);
  };

  const removeEnvsInput = (index: number) => {
    formik.setFieldValue(
      "envs",
      formik.values.envs.filter((_, i) => i !== index)
    );
  };

  const handleKeyChange = (index: number, key: string) => {
    const updatedEnvs = [...formik.values.envs];
    updatedEnvs[index] = { ...updatedEnvs[index], key };
    formik.setFieldValue("envs", updatedEnvs);
  };

  const handleValueChange = (index: number, value: string) => {
    const updatedEnvs = [...formik.values.envs];
    updatedEnvs[index] = { ...updatedEnvs[index], value };
    formik.setFieldValue("envs", updatedEnvs);
  };

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={onClose}
        components={{ Backdrop: BlurBackdrop }}
        fullWidth
        PaperProps={{
          sx: { borderRadius: BORDER_RADIUS_1 },
        }}
      >
        <form onSubmit={formik.handleSubmit} autoComplete="on">
          <Stack
            px={{ xs: 1.8, md: 2 }}
            py={{ xs: 1.8, md: 1 }}
            spacing={{ xs: 2, md: 5 }}
          >
            <DialogTitle
              fontWeight="bold"
              variant="text1"
              sx={{ padding: "10px 5px" }}
            >
              ویرایش Configmap
            </DialogTitle>
            <Divider sx={{ marginTop: "20px !important" }} />
            <Grid2 container>
              <Grid2 xs={12} md={6}>
                <DorsaTextField
                  fullWidth
                  label="*name"
                  size="small"
                  error={Boolean(formik.errors.name && formik.touched.name)}
                  helperText={formik.errors.name}
                  {...formik.getFieldProps("name")}
                />
              </Grid2>
            </Grid2>

            <Stack spacing={3}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography fontWeight={600} mb={1}>
                  افزودن Envs
                </Typography>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{
                    color: "primary.main",
                    justifyContent: "space-between",
                    py: 1,
                    fontSize: "15px !important",
                    mb: 1,
                    border: "1px solid",
                  }}
                  startIcon={<Add />}
                  onClick={addEnvsInput}
                  size="small"
                >
                  اضافه کردن
                </Button>
              </Stack>
              <Grid
                container
                columnSpacing={1}
                alignItems={"center"}
                justifyContent={"center"}
                sx={{ direction: "rtl", margin: "0 auto" }}
              >
                {formik.values.envs.map((env, index) => (
                  <>
                    <Grid item xs={4} mb={2} key={`key-${index}`}>
                      <DorsaTextField
                        fullWidth
                        label="key"
                        value={env.key}
                        onChange={(e) => handleKeyChange(index, e.target.value)}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={7} mb={2} key={`value-${index}`}>
                      <DorsaTextField
                        fullWidth
                        label="value"
                        value={env.value}
                        onChange={(e) =>
                          handleValueChange(index, e.target.value)
                        }
                        size="small"
                      />
                    </Grid>
                    <Grid
                      item
                      xs={1}
                      mb={1}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        paddingRight: "0 !important",
                        margin: 0,
                        padding: 0,
                        marginBottom: "15px !important",
                      }}
                    >
                      <IconButton onClick={() => removeEnvsInput(index)}>
                        <TrashSvg />
                      </IconButton>
                    </Grid>
                  </>
                ))}
              </Grid>
            </Stack>
            <DialogActions>
              <Button
                variant="outlined"
                color="secondary"
                sx={{ px: 3, py: 0.8 }}
                onClick={onClose}
              >
                انصراف
              </Button>
              <LoadingButton
                component="button"
                type="submit"
                loading={createConfigMapLoading}
                variant="contained"
                sx={{ px: 3, py: 0.8 }}
              >
                ذخیره
              </LoadingButton>
            </DialogActions>
          </Stack>
        </form>
      </Dialog>
    </>
  );
};
