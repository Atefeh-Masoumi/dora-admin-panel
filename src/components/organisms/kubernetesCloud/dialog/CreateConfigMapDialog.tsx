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
import { FC, useState } from "react";
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
  envs: any;
};

const formValidation = yup.object().shape({
  name: yup.string().nullable().required("نام را وارد کنید"),
});

type CreateVpcLoadBalancerDialogPropsType = {
  onClose: () => void;
  openDialog: boolean;
};

export const CreateConfigMapDialog: FC<
  CreateVpcLoadBalancerDialogPropsType
> = ({ onClose, openDialog }) => {
  const { id: namespaceId } = useParams();
  const [envs, setEnvs] = useState<any[]>([]);

  const [createConfigMap, { isLoading: createConfigMapLoading }] =
    usePostApiMyKubernetesCloudConfigmapCreateMutation();

  const formik = useFormik<InitialValuesType>({
    initialValues: {
      name: null,
      alias: null,
      namespaceId: Number(namespaceId),
      envs: [],
    },
    validationSchema: formValidation,
    onSubmit: (values, { setSubmitting }) => {
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
          alias: values.alias as string,
          namespaceId: Number(namespaceId),
          envs: processedEnvsToObject,
        },
      })
        .unwrap()
        .then(() => {
          toast.success("Config Map با موفقیت ساخته شد");
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
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: { borderRadius: BORDER_RADIUS_1 },
        }}
      >
        <DialogTitle fontWeight="bold" variant="text1">
          ایجاد Config Map
        </DialogTitle>
        <form onSubmit={formik.handleSubmit} autoComplete="on">
          <Stack p={{ xs: 1.8, md: 3 }} spacing={{ xs: 2, md: 5 }}>
            <Grid2 container spacing={3}>
              <Grid2 xs={12}>
                <DorsaTextField
                  fullWidth
                  label="*name"
                  error={Boolean(formik.errors.name && formik.touched.name)}
                  helperText={formik.errors.name}
                  {...formik.getFieldProps("name")}
                  inputProps={{
                    maxLength: 5,
                  }}
                />
              </Grid2>
              <Grid2 xs={12}>
                <DorsaTextField
                  fullWidth
                  label="alias"
                  {...formik.getFieldProps("alias")}
                  inputProps={{
                    maxLength: 5,
                  }}
                />
              </Grid2>
            </Grid2>
            <Divider />
            <Stack spacing={3}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography sx={{ color: ({ palette }) => palette.grey[800] }}>
                  Envs
                </Typography>
                <Button
                  variant="text"
                  color="secondary"
                  sx={{
                    color: "primary.main",
                    justifyContent: "space-between",
                    py: 1,
                    fontSize: "16px",
                  }}
                  startIcon={<Add />}
                  onClick={addEnvsInput}
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
                  <>
                    <Grid item xs={5} mb={2}>
                      <DorsaTextField
                        inputProps={{
                          maxLength: 5,
                        }}
                        fullWidth
                        label="key"
                        value={formik.values.envs[index]?.key || ""}
                        onChange={(e) =>
                          handleKeyChange(index, String(e.target.value))
                        }
                      />
                    </Grid>
                    <Grid item xs={5} mb={2}>
                      <DorsaTextField
                        inputProps={{
                          maxLength: 5,
                        }}
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
                      xs={2}
                      mb={2}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
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
