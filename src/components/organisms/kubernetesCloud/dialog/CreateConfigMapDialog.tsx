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
import { FC, Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BlurBackdrop } from "src/components/atoms/BlurBackdrop";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import * as yup from "yup";
import { usePostApiMyKubernetesCloudConfigmapCreateMutation } from "src/app/services/api.generated";

type InitialValuesType = {
  name: string | null;
  alias?: string | null;
  description?: string | null;
  namespaceId: number;
  envs: any;
};

const formValidation = yup.object().shape({
  name: yup.string().nullable().required("نام را وارد کنید"),
});

type CreateConfigmapDialogPropsType = {
  onClose: () => void;
  openDialog: boolean;
};

export const CreateConfigMapDialog: FC<CreateConfigmapDialogPropsType> = ({
  onClose,
  openDialog,
}) => {
  const { kubernetesCloudId } = useParams();
  const [envs, setEnvs] = useState<any[]>([{ key: null, value: null }]);

  const [createConfigMap, { isLoading: createConfigMapLoading }] =
    usePostApiMyKubernetesCloudConfigmapCreateMutation();

  const formik = useFormik<InitialValuesType>({
    initialValues: {
      name: null,
      alias: null,
      namespaceId: Number(kubernetesCloudId),
      envs: [],
    },
    validationSchema: formValidation,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      const processedEnvsToObject = values?.envs?.reduce(
        (acc: any, item: any) => {
          acc[item.key] = item.value;
          return acc;
        },
        {}
      );

      createConfigMap({
        createKuberCloudConfigmapModel: {
          name: values.name as string,
          // alias: values.alias as string,
          namespaceId: Number(kubernetesCloudId),
          envs: processedEnvsToObject,
        },
      })
        .unwrap()
        .then(() => {
          toast.success("Configmap با موفقیت ساخته شد");
          resetForm();
          onClose();
        })
        .catch(() => {});

      setSubmitting(false);
    },
    enableReinitialize: true,
  });

  const addEnvsInput = () => {
    setEnvs((prevState: any) => {
      let result = [...prevState];
      result.push({ envs: "" });
      return result;
    });
    formik.setFieldValue("envs", [
      ...formik.values.envs,
      { key: null, value: null },
    ]);
  };

  const removeEnvsInput = (index: number) => {
    setEnvs((prevState: any) => {
      let result = [...prevState];
      result.splice(index, 1);
      return result;
    });
    formik.setFieldValue(
      "envs",
      formik.values.envs.filter((_: any, i: any) => i !== index)
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
              ایجاد Configmap
            </DialogTitle>
            <Divider sx={{ marginTop: "20px !important" }} />
            <Grid2 container>
              <Grid2 xs={12} md={6}>
                <DorsaTextField
                  fullWidth
                  label="*name"
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
                {envs.map((_: any, index: any) => (
                  <Fragment key={index}>
                    <Grid item xs={4} mb={2}>
                      <DorsaTextField
                        fullWidth
                        label="key"
                        value={formik.values.envs[index]?.key || ""}
                        onChange={(e) =>
                          handleKeyChange(index, String(e.target.value))
                        }
                      />
                    </Grid>
                    <Grid item xs={7} mb={2}>
                      <DorsaTextField
                        fullWidth
                        label="value"
                        value={formik.values.envs[index]?.value || ""}
                        onChange={(e) =>
                          handleValueChange(index, String(e.target.value))
                        }
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
                  </Fragment>
                ))}
              </Grid>
            </Stack>
            <DialogActions>
              <Stack direction="row" justifyContent="end" spacing={1}>
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
              </Stack>
            </DialogActions>
          </Stack>
        </form>
      </Dialog>
    </>
  );
};
