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
import { FC } from "react";
import { usePutApiMyKubernetesCloudSecretEditMutation } from "src/app/services/api.generated";
import { BlurBackdrop } from "src/components/atoms/BlurBackdrop";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { decodebase64 } from "src/utils/decodebase64";
import { secretTypesConstants } from "../../home/constants/secretTypesConstants";
import { toast } from "react-toastify";

type InitialValuesType = {
  alias?: string | null;
  description?: string | null;
  envs: any;
  secretId: number;
};

type CreateVpcLoadBalancerDialogPropsType = {
  onClose: () => void;
  openDialog: boolean;
  secretData: any;
};

export const EditSecretMapDialog: FC<CreateVpcLoadBalancerDialogPropsType> = ({
  onClose,
  openDialog,
  secretData,
}) => {
  const [editSecretMap, { isLoading: editSecretMapLoading }] =
    usePutApiMyKubernetesCloudSecretEditMutation();
  const processedSecretData = decodebase64(secretData?.secrets);

  const formik = useFormik<InitialValuesType>({
    initialValues: {
      alias: null,
      envs: processedSecretData || [{ key: "", value: "" }],
      secretId: secretData?.id,
    },
    onSubmit: (values, { setSubmitting, resetForm }) => {
      const submittedConfigMapsArray = values?.envs;
      const configDataConfigMapsArray = processedSecretData;

      const compareConfigMaps = (
        originalArray: { id: number; key: string; value: string }[],
        submittedArray: { key: string; value: string }[]
      ) => {
        let removeEnvIds: number[] = [];
        let envs: { [key: string]: any } = {};

        const originalLookup: {
          [key: string]: { id: number; key: string; value: string };
        } = originalArray.reduce(
          (acc, item) => ({
            ...acc,
            [item.key]: item,
          }),
          {} as { [key: string]: { id: number; key: string; value: string } }
        );

        submittedArray.forEach((submittedItem) => {
          const originalItem = originalLookup[submittedItem.key];

          if (originalItem) {
            if (originalItem.value !== submittedItem.value) {
              envs[originalItem.id] = {
                [submittedItem.key]: submittedItem.value,
              };
            }
          } else {
            envs["0"] = envs["0"] || {};
            envs["0"][submittedItem.key] = submittedItem.value;
          }
        });

        originalArray.forEach((originalItem) => {
          const isKeyDeleted = !submittedArray.some(
            (submittedItem) => submittedItem.key === originalItem.key
          );
          if (isKeyDeleted) {
            removeEnvIds.push(originalItem.id);
          }
        });

        return { removeEnvIds, envs };
      };

      const updatedConfigmap = compareConfigMaps(
        configDataConfigMapsArray,
        submittedConfigMapsArray
      );

      const processedEnvsToObjectBase64: any = {};

      Object.keys(updatedConfigmap.envs).forEach((key) => {
        processedEnvsToObjectBase64[key] = {};
        Object.keys(updatedConfigmap.envs[key]).forEach((innerKey) => {
          processedEnvsToObjectBase64[key][innerKey] = btoa(
            updatedConfigmap.envs[key][innerKey]
          );
        });
      });

      editSecretMap({
        editKuberCloudSecretModel: {
          alias: values.alias as string,
          envs: processedEnvsToObjectBase64,
          secretId: Number(values.secretId),
          removeEnvIds: updatedConfigmap?.removeEnvIds,
        },
      })
        .unwrap()
        .then(() => {
          toast.success("با موفقیت ایجاد شد");
          resetForm();
          onClose();
        })
        .catch(() => {});

      setSubmitting(false);
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
              ویرایش Secret
            </DialogTitle>
            <Divider sx={{ marginTop: "20px !important" }} />
            <Grid2 container spacing={1}>
              <Grid2 xs={12} md={6}>
                <DorsaTextField
                  disabled
                  fullWidth
                  label="*name"
                  size="small"
                  value={secretData?.name}
                />
              </Grid2>
              <Grid2 xs={12} md={6}>
                <Select
                  disabled
                  size="small"
                  value={secretData?.secretTypeId}
                  onChange={(event) => {
                    formik.setFieldValue(
                      "secretTypeId",
                      Number(event.target.value)
                    );
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
            {secretData?.secretTypeId === 1 && (
              <Stack spacing={3} sx={{ marginRight: "12px !important" }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography fontWeight={600} mb={1} ml={1}>
                    ویرایش اطلاعات
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
                  {formik.values.envs.map((env: any, index: any) => (
                    <>
                      <Grid item xs={4} mb={2} key={`key-${index}`}>
                        <DorsaTextField
                          fullWidth
                          label="key"
                          value={env.key}
                          onChange={(e) =>
                            handleKeyForOpaque(index, e.target.value)
                          }
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={7} mb={2} key={`value-${index}`}>
                        <DorsaTextField
                          fullWidth
                          label="value"
                          value={env.value}
                          onChange={(e) =>
                            handleValueForOpaque(index, e.target.value)
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
            )}
            {secretData?.secretTypeId === 2 && (
              <Stack spacing={3} sx={{ marginRight: "12px !important" }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography fontWeight={600} mb={1} ml={1}>
                    ویرایش اطلاعات
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
            {secretData?.secretTypeId === 3 && (
              <Stack spacing={3} sx={{ marginRight: "12px !important" }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography fontWeight={600} mb={1} ml={1}>
                    ویرایش اطلاعات
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
            {secretData?.secretTypeId === 4 && (
              <Stack spacing={3} sx={{ marginRight: "12px !important" }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography fontWeight={600} mb={1} ml={1}>
                    ویرایش اطلاعات
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
                loading={editSecretMapLoading}
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
