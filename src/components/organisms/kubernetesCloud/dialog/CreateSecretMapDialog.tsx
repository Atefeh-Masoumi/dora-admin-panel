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
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useFormik } from "formik";
import { FC, Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { usePostApiMyKubernetesCloudSecretCreateMutation } from "src/app/services/api.generated";
import { BlurBackdrop } from "src/components/atoms/BlurBackdrop";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import * as yup from "yup";
import { secretTypesConstants } from "../../home/constants/secretTypesConstants";

type InitialValuesType = {
  name: string | null;
  alias?: string | null;
  description?: string | null;
  namespaceId: number;
  envs: any;
  secretTypeId: number | null;
};

type CreateSecretDialogPropsType = {
  onClose: () => void;
  openDialog: boolean;
};

export const CreateSecretMapDialog: FC<CreateSecretDialogPropsType> = ({
  onClose,
  openDialog,
}) => {
  const { kubernetesCloudId } = useParams();
  const [envs, setEnvs] = useState<any[]>([{ key: null, value: null }]);

  const [createSecretMap, { isLoading: createSecretMapLoading }] =
    usePostApiMyKubernetesCloudSecretCreateMutation();

  const formValidation = yup.object().shape({
    name: yup.string().nullable().required("نام را وارد کنید"),
    secretTypeId: yup.number().required(),
    envs: yup
      .array()
      .when("secretTypeId", {
        is: 1, // Opaque Secret
        then: yup
          .array()
          .of(
            yup.object().shape({
              key: yup
                .string()
                .nullable()
                .required("Key is required for secret type 1"),
              value: yup
                .string()
                .nullable()
                .required("Value is required for secret type 1"),
            })
          )
          .min(1, "At least one key-value pair is required"),
      })
      .when("secretTypeId", {
        is: 2, // TLS Secret
        then: yup
          .array()
          .of(
            yup.object().shape({
              key: yup.string().oneOf(["tls.crt", "tls.key"]),
              value: yup
                .string()
                .nullable()
                .required("Certificate and private key are required"),
            })
          )
          .min(2, "Certificate and private key are required"),
      })
      .when("secretTypeId", {
        is: 3, // Registry Secret
        then: yup
          .array()
          .of(
            yup.object().shape({
              key: yup
                .string()
                .oneOf(["registryAddress", "username", "password", "email"]),
              value: yup
                .string()
                .nullable()
                .when("key", {
                  is: "email",
                  then: yup.string().nullable(),
                  otherwise: yup
                    .string()
                    .nullable()
                    .required("This field is required for secret type 3"),
                }),
            })
          )
          .min(3, "Registry address, username, and password are required"),
      })
      .when("secretTypeId", {
        is: 4, // Username & Password Secret
        then: yup
          .array()
          .of(
            yup.object().shape({
              key: yup.string().oneOf(["username", "password", "email"]),
              value: yup
                .string()
                .nullable()
                .when("key", {
                  is: "email",
                  then: yup.string().nullable(),
                  otherwise: yup
                    .string()
                    .nullable()
                    .required(
                      "Username and password are required for secret type 4"
                    ),
                }),
            })
          )
          .min(2, "Username and password are required"),
      }),
  });

  const formik = useFormik<InitialValuesType>({
    initialValues: {
      name: null,
      alias: null,
      namespaceId: Number(kubernetesCloudId),
      envs: [],
      secretTypeId: 1,
    },
    validationSchema: formValidation,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      const processedEnvsToObject = values.envs.reduce(
        (acc: any, item: any) => {
          acc[item.key] = btoa(item.value);

          return acc;
        },
        {}
      );

      createSecretMap({
        createKuberCloudSecretModel: {
          name: values.name as string,
          alias: values.alias as string,
          namespaceId: Number(kubernetesCloudId),
          envs: processedEnvsToObject,
          secretTypeId: Number(values.secretTypeId),
        },
      })
        .unwrap()
        .then(() => {
          toast.success("Secret با موفقیت ساخته شد");
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

  // Opaque Secret Key
  const handleKeyForOpaque = (index: number, key: string) => {
    const updatedEnvs = [...formik.values.envs];
    updatedEnvs[index] = { ...updatedEnvs[index], key };
    formik.setFieldValue("envs", updatedEnvs);
  };

  const handleValueForOpaque = (index: number, value: string) => {
    const updatedEnvs = [...formik.values.envs];
    updatedEnvs[index] = { ...updatedEnvs[index], value };
    formik.setFieldValue("envs", updatedEnvs);
  };

  // TLS Information Secret Key
  const handleCertificateForTlsInformation = (value: string) => {
    const updatedEnvs = [...formik.values.envs];
    updatedEnvs[0] = { key: "tls.crt", value };
    formik.setFieldValue("envs", updatedEnvs);
  };

  const handlePrivateKeyForTlsInformation = (value: string) => {
    const updatedEnvs = [...formik.values.envs];
    updatedEnvs[1] = { key: "tls.key", value };
    formik.setFieldValue("envs", updatedEnvs);
  };

  //  Image Registry Information Secret Key
  const handleRegistryAddressForImageRegistry = (value: string) => {
    const updatedEnvs = [...formik.values.envs];
    updatedEnvs[0] = { key: "registryAddress", value };
    formik.setFieldValue("envs", updatedEnvs);
  };

  const handleUsernameForImageRegistry = (value: string) => {
    const updatedEnvs = [...formik.values.envs];
    updatedEnvs[1] = { key: "username", value };
    formik.setFieldValue("envs", updatedEnvs);
  };

  const handlePasswordForImageRegistry = (value: string) => {
    const updatedEnvs = [...formik.values.envs];
    updatedEnvs[2] = { key: "password", value };
    formik.setFieldValue("envs", updatedEnvs);
  };

  const handleEmailForImageRegistry = (value: string) => {
    const updatedEnvs = [...formik.values.envs];
    updatedEnvs[3] = { key: "email", value };
    formik.setFieldValue("envs", updatedEnvs);
  };

  //  Username and Password Secret Key
  const handleUsernameForUsernameAndPassword = (value: string) => {
    const updatedEnvs = [...formik.values.envs];
    updatedEnvs[0] = { key: "username", value };
    formik.setFieldValue("envs", updatedEnvs);
  };

  const handlePasswordUsernameAndPassword = (value: string) => {
    const updatedEnvs = [...formik.values.envs];
    updatedEnvs[1] = { key: "password", value };
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
              ایجاد Secret
            </DialogTitle>
            <Divider sx={{ marginTop: "20px !important" }} />
            <Grid2 container spacing={1}>
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
              <Grid2 xs={12} md={6}>
                <Select
                  size="small"
                  value={formik.values.secretTypeId}
                  onChange={(event) => {
                    formik.setFieldValue(
                      "secretTypeId",
                      Number(event.target.value)
                    );
                    setEnvs([{ key: null, value: null }]);
                    formik.setFieldValue("envs", [{ key: null, value: null }]);
                  }}
                  sx={{
                    width: "100%",
                    "& .MuiSelect-select": {
                      bgcolor: "rgba(110, 118, 138, 0.06)",
                      border: "none !important",
                      padding: "7px !important",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none !important",
                    },
                  }}
                >
                  {secretTypesConstants.map(({ category, id }) => (
                    <MenuItem
                      sx={{
                        mx: 0.5,
                        my: 1,
                        borderRadius: 1,
                        direction: "ltr",
                      }}
                      key={id}
                      value={id}
                    >
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </Grid2>
            </Grid2>
            {formik.values.secretTypeId === 1 && (
              <Stack spacing={3} sx={{ marginRight: "12px !important" }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography fontWeight={600} mb={1} ml={1}>
                    افزودن اطلاعات
                  </Typography>
                  <Button
                    variant="outlined"
                    color="secondary"
                    sx={{
                      color: "primary.main",
                      justifyContent: "space-between",
                      py: 1,
                      fontSize: "15px !important",
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
                  spacing={1}
                  alignItems={"center"}
                  justifyContent={"center"}
                  sx={{ direction: "rtl" }}
                >
                  {envs.map((_: any, index: any) => (
                    <Fragment key={index}>
                      <Grid item xs={4} mb={2}>
                        <DorsaTextField
                          fullWidth
                          label="key"
                          value={formik.values.envs[index]?.key || ""}
                          onChange={(e) =>
                            handleKeyForOpaque(index, String(e.target.value))
                          }
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={7} mb={2}>
                        <DorsaTextField
                          fullWidth
                          label="value"
                          value={formik.values.envs[index]?.value || ""}
                          onChange={(e) =>
                            handleValueForOpaque(index, String(e.target.value))
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
                          justifyContent: "flex-end",
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
            )}
            {formik.values.secretTypeId === 2 && (
              <Stack spacing={3} sx={{ marginRight: "12px !important" }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography fontWeight={600} mb={1} ml={1}>
                    افزودن اطلاعات
                  </Typography>
                </Stack>
                <Grid
                  container
                  spacing={1}
                  alignItems={"center"}
                  justifyContent={"center"}
                  sx={{ direction: "rtl" }}
                >
                  <Grid item xs={12} mb={2}>
                    <DorsaTextField
                      fullWidth
                      label="Certificate *"
                      value={formik.values.envs[0]?.value || ""}
                      onChange={(e) =>
                        handleCertificateForTlsInformation(
                          String(e.target.value)
                        )
                      }
                      size="small"
                      multiline
                      rows={4}
                    />
                  </Grid>
                  <Grid item xs={12} mb={2}>
                    <DorsaTextField
                      fullWidth
                      label="Private Key *"
                      value={formik.values.envs[1]?.value || ""}
                      onChange={(e) =>
                        handlePrivateKeyForTlsInformation(
                          String(e.target.value)
                        )
                      }
                      size="small"
                      multiline
                      rows={4}
                    />
                  </Grid>
                </Grid>
              </Stack>
            )}
            {formik.values.secretTypeId === 3 && (
              <Stack spacing={3} sx={{ marginRight: "12px !important" }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography fontWeight={600} mb={1} ml={1}>
                    افزودن اطلاعات
                  </Typography>
                </Stack>
                <Grid
                  container
                  spacing={1}
                  alignItems={"center"}
                  justifyContent={"center"}
                  sx={{ direction: "rtl" }}
                >
                  <Grid item xs={6} mb={2}>
                    <DorsaTextField
                      fullWidth
                      label="Registry Address *"
                      value={formik.values.envs[0]?.value || ""}
                      onChange={(e) =>
                        handleRegistryAddressForImageRegistry(
                          String(e.target.value)
                        )
                      }
                      size="small"
                      placeholder="https://...."
                    />
                  </Grid>
                  <Grid item xs={6} mb={2}>
                    <DorsaTextField
                      fullWidth
                      label="Username *"
                      value={formik.values.envs[1]?.value || ""}
                      onChange={(e) =>
                        handleUsernameForImageRegistry(String(e.target.value))
                      }
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6} mb={2}>
                    <DorsaTextField
                      fullWidth
                      label="Password *"
                      value={formik.values.envs[2]?.value || ""}
                      onChange={(e) =>
                        handlePasswordForImageRegistry(String(e.target.value))
                      }
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6} mb={2}>
                    <DorsaTextField
                      fullWidth
                      label="Email"
                      value={formik.values.envs[3]?.value || ""}
                      onChange={(e) =>
                        handleEmailForImageRegistry(String(e.target.value))
                      }
                      size="small"
                    />
                  </Grid>
                </Grid>
              </Stack>
            )}
            {formik.values.secretTypeId === 4 && (
              <Stack spacing={3} sx={{ marginRight: "12px !important" }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography fontWeight={600} mb={1} ml={1}>
                    افزودن اطلاعات
                  </Typography>
                </Stack>
                <Grid
                  container
                  spacing={1}
                  alignItems={"center"}
                  justifyContent={"center"}
                  sx={{ direction: "rtl" }}
                >
                  <Grid item xs={6} mb={2}>
                    <DorsaTextField
                      fullWidth
                      label="Username *"
                      value={formik.values.envs[0]?.value || ""}
                      onChange={(e) =>
                        handleUsernameForUsernameAndPassword(
                          String(e.target.value)
                        )
                      }
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6} mb={2}>
                    <DorsaTextField
                      fullWidth
                      label="Password *"
                      value={formik.values.envs[1]?.value || ""}
                      onChange={(e) =>
                        handlePasswordUsernameAndPassword(
                          String(e.target.value)
                        )
                      }
                      size="small"
                    />
                  </Grid>
                </Grid>
              </Stack>
            )}
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
                loading={createSecretMapLoading}
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
