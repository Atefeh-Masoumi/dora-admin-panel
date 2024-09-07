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
import { FC, useState } from "react";
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

const formValidation = yup.object().shape({
  name: yup.string().nullable().required("نام را وارد کنید"),
});

type CreateVpcLoadBalancerDialogPropsType = {
  onClose: () => void;
  openDialog: boolean;
};

export const CreateSecretMapDialog: FC<
  CreateVpcLoadBalancerDialogPropsType
> = ({ onClose, openDialog }) => {
  const charToBits = (char: string) => {
    const charCode = char.charCodeAt(0);
    return Array.from({ length: 8 }, (_, i) => (charCode >> (7 - i)) & 1);
  };

  const stringToBitArray = (text: string) => {
    return Array.from(text).flatMap(charToBits);
  };

  //////////////////////////////////////////

  const { id: namespaceId } = useParams();
  const [envs, setEnvs] = useState<any[]>([{ key: null, value: null }]);

  const [createSecretMap, { isLoading: createSecretMapLoading }] =
    usePostApiMyKubernetesCloudSecretCreateMutation();

  const formik = useFormik<InitialValuesType>({
    initialValues: {
      name: null,
      alias: null,
      namespaceId: Number(namespaceId),
      envs: [],
      secretTypeId: 1,
    },
    validationSchema: formValidation,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      const processedEnvsToObject = values.envs.reduce(
        (acc: any, item: any) => {
          console.log(item.value, stringToBitArray(item.value).join(""));
          acc[item.key] = stringToBitArray(item.value).join("");

          return acc;
        },
        {}
      );

      createSecretMap({
        createKuberCloudSecretModel: {
          name: values.name as string,
          alias: values.alias as string,
          namespaceId: Number(namespaceId),
          envs: processedEnvsToObject,
          secretTypeId: 1,
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

  const handleKeyChangeForOpaque = (index: number, key: string) => {
    const updatedEnvs = [...formik.values.envs];
    updatedEnvs[index] = { ...updatedEnvs[index], key };
    formik.setFieldValue("envs", updatedEnvs);
  };

  const handleValueChangeForOpaque = (index: number, value: string) => {
    const updatedEnvs = [...formik.values.envs];
    updatedEnvs[index] = { ...updatedEnvs[index], value };
    formik.setFieldValue("envs", updatedEnvs);
  };

  const handleCertificateChangeForTlsInformation = (
    index: number,
    value: string
  ) => {};

  const handlePrivateKeyChangeTlsInformation = (
    index: number,
    value: string
  ) => {};

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
                    <>
                      <Grid item xs={4} mb={2}>
                        <DorsaTextField
                          fullWidth
                          label="key"
                          value={formik.values.envs[index]?.key || ""}
                          onChange={(e) =>
                            handleKeyChangeForOpaque(
                              index,
                              String(e.target.value)
                            )
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
                            handleValueChangeForOpaque(
                              index,
                              String(e.target.value)
                            )
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
                    </>
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
                  {envs.map((_: any, index: any) => (
                    <>
                      <Grid item xs={12} mb={2}>
                        <DorsaTextField
                          fullWidth
                          label="Certificate *"
                          value={formik.values.envs[index]?.value || ""}
                          onChange={(e) =>
                            handleCertificateChangeForTlsInformation(
                              index,
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
                          value={""}
                          onChange={(e) =>
                            handlePrivateKeyChangeTlsInformation(
                              index,
                              String(e.target.value)
                            )
                          }
                          size="small"
                          multiline
                          rows={4}
                        />
                      </Grid>
                    </>
                  ))}
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
                      value={""}
                      onChange={(e) => console.log(e.target.value)}
                      size="small"
                      placeholder="https://...."
                    />
                  </Grid>
                  <Grid item xs={6} mb={2}>
                    <DorsaTextField
                      fullWidth
                      label="Username *"
                      value={""}
                      onChange={(e) => console.log(e.target.value)}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6} mb={2}>
                    <DorsaTextField
                      fullWidth
                      label="Password *"
                      value={""}
                      onChange={(e) => console.log(e.target.value)}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6} mb={2}>
                    <DorsaTextField
                      fullWidth
                      label="Email"
                      value={""}
                      onChange={(e) => console.log(e.target.value)}
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
                      value={""}
                      onChange={(e) => console.log(e.target.value)}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6} mb={2}>
                    <DorsaTextField
                      fullWidth
                      label="Password *"
                      value={""}
                      onChange={(e) => console.log(e.target.value)}
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
