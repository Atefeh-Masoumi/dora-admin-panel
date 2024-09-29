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
import { usePostApiMyKubernetesCloudConfigmapCreateMutation } from "src/app/services/api.generated";
import { BlurBackdrop } from "src/components/atoms/BlurBackdrop";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import * as yup from "yup";

type InitialValuesType = {
  name: string | null;
  protocolTypeId: number | null;
  secretId?: number | null;
  rules: any;
};

const ProtocolTypeList: { id: number; name: string }[] = [
  { id: 1, name: "HTTP" },
  { id: 2, name: "HTTPS" },
];

const formValidation = yup.object().shape({
  name: yup.string().nullable().required("نام را وارد کنید"),
});

type CreateVpcLoadBalancerDialogPropsType = {
  onClose: () => void;
  openDialog: boolean;
};

export const CreateIngressDialog: FC<CreateVpcLoadBalancerDialogPropsType> = ({
  onClose,
  openDialog,
}) => {
  const { kubernetesCloudId } = useParams();
  const [rules, setRules] = useState<any[]>([
    { domainName: "", path: "", kuberCloudDeployPortId: "" },
  ]);

  const [createConfigMap, { isLoading: createConfigMapLoading }] =
    usePostApiMyKubernetesCloudConfigmapCreateMutation();

  const formik = useFormik<InitialValuesType>({
    initialValues: {
      name: null,
      protocolTypeId: null,
      secretId: null,
      rules: [],
    },
    validationSchema: formValidation,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      const processedEnvsToObject = values?.rules?.reduce(
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

  const addRulesInput = () => {
    setRules((prevState: any) => [
      ...prevState,
      { domainName: "", path: "", kuberCloudDeployPortId: "" },
    ]);
    formik.setFieldValue("rules", [
      ...formik.values.rules,
      { domainName: "", path: "", kuberCloudDeployPortId: "" },
    ]);
  };

  const removeRulesInput = (index: number) => {
    setRules((prevState: any) =>
      prevState.filter((_: any, i: any) => i !== index)
    );
    formik.setFieldValue(
      "rules",
      formik.values.rules.filter((_: any, i: any) => i !== index)
    );
  };
  const handleKeyChange = (index: number, key: string) => {
    const updatedRules = [...formik.values.rules];
    updatedRules[index] = { ...updatedRules[index], key };
    formik.setFieldValue("rules", updatedRules);
  };

  const handleValueChange = (index: number, value: string) => {
    const updatedRules = [...formik.values.rules];
    updatedRules[index] = { ...updatedRules[index], value };
    formik.setFieldValue("rules", updatedRules);
  };

  const handleProtocolTypeChange = (e: any) => {
    console.log(e.target.value);
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
              ایجاد اینگرس
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
                  value={formik.values.protocolTypeId}
                  onChange={(event) => {
                    formik.setFieldValue(
                      "protocolTypeId",
                      Number(event.target.value)
                    );
                    setRules([
                      {
                        domainName: null,
                        path: null,
                        kuberCloudDeployPortId: null,
                      },
                    ]);
                    formik.setFieldValue("envs", [
                      {
                        domainName: null,
                        path: null,
                        kuberCloudDeployPortId: null,
                      },
                    ]);
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
                  {ProtocolTypeList.map(({ name, id }) => (
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
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid2>
            </Grid2>

            <Stack spacing={3}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography fontWeight={600} mb={1}>
                  افزودن Rules
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
                  onClick={addRulesInput}
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
                {formik.values.rules &&
                  rules.map((_: any, index: any) => (
                    <>
                      <Grid item xs={3} mb={2}>
                        <DorsaTextField
                          fullWidth
                          label="domainName"
                          value={formik?.values?.rules[index]?.domainName || ""}
                          onChange={(e) =>
                            handleKeyChange(index, String(e.target.value))
                          }
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={3} mb={2}>
                        <DorsaTextField
                          fullWidth
                          label="path"
                          value={formik?.values?.rules[index]?.path || ""}
                          onChange={(e) =>
                            handleValueChange(index, String(e.target.value))
                          }
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={5} mb={2}>
                        <DorsaTextField
                          fullWidth
                          label="kuberCloudDeployPortId"
                          value={
                            formik?.values?.rules[index]
                              ?.kuberCloudDeployPortId || ""
                          }
                          onChange={(e) =>
                            handleValueChange(index, String(e.target.value))
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
                        <IconButton onClick={() => removeRulesInput(index)}>
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
