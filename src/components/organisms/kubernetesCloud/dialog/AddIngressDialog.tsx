import { Add, Info, Warning } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  AlertTitle,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Link,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { FormikErrors, useFormik } from "formik";
import { FC, MouseEventHandler, useMemo, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import {
  RuleModelRequest,
  useGetApiMyKubernetesCloudHostPortListByNamespaceIdQuery,
  useGetApiMyKubernetesCloudSecretListByNamespaceIdQuery,
  usePostApiMyKubernetesCloudIngressCreateMutation,
} from "src/app/services/api.generated";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import PageLoading from "src/components/atoms/PageLoading";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import * as yup from "yup";
import { SECRET_TYPES_ENUM } from "../../home/constants/secretTypesConstants";
import { SelectIngressRule } from "../edit/ingress/SelectIngressRule";

export type CreateIngressTypes = {
  name: string | null;
  rules: {
    domainName: string | null;
    protocolTypeId: 3 | 4;
    secretId?: number | null;
    service: number | null;
    path: string | null;
    kuberCloudDeployPortId: number;
  }[];
};

const formValidation = yup.object().shape({
  name: yup.string().required("نام الزامی می باشد"),
  // ProtocolTypeList: yup.number().required("نوع protocol را انتخاب کنید"),
  // serverPoolPort: yup.number().nullable().required("Port را وارد کنید"),
  rules: yup.array().of(
    yup.object().shape({
      domainName: yup.string().required("name را وارد کنید"),
      path: yup.string().required("path را وارد کنید"),
    })
  ),
});

type AddIngressDialogPropsType = DialogProps & {};

export const AddIngressDialog: FC<AddIngressDialogPropsType> = ({
  ...props
}) => {
  const { kubernetesCloudId } = useParams();
  const [rules, setRules] = useState<RuleModelRequest[]>([]);

  const [createIngress, { isLoading: createIngressLoading }] =
    usePostApiMyKubernetesCloudIngressCreateMutation();

  const cancelBtnOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (!props.onClose) return;
    props.onClose(event, "backdropClick");
  };
  // const isEmptyTLSSecretList = useMemo(() => {
  //   return tLSSecretList && tLSSecretList?.length <= 0;
  // }, [tLSSecretList]);

  const formik = useFormik<CreateIngressTypes>({
    initialValues: {
      name: "",
      // protocolTypeId: 3,
      // secretId: null,
      rules: [
        {
          domainName: "",
          protocolTypeId: 3,
          secretId: 0,
          service: 0,
          path: "",
          kuberCloudDeployPortId: 0,
        },
      ],
    },
    validationSchema: formValidation,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      //   const processedEnvsToObject = values?.rules?.reduce(
      //     (acc: any, item: any) => {
      //       acc[item.key] = item.value;
      //       return acc;
      //     },
      //     {}
      //   );

      //   createIngress({
      //     createKuberCloudIngressModel: {
      //       name: values.name as string,
      //       protocolTypeId : ,
      //       rules :"",
      //         secretId : ""
      //     },
      //   })
      //     .unwrap()
      //     .then(() => {
      //       toast.success("Configmap با موفقیت ساخته شد");
      //       resetForm();
      //       onClose();
      //     })
      //     .catch(() => {});

      setSubmitting(false);
    },
    enableReinitialize: true,
  });

  const addRules = () => {
    setRules((prevState) => {
      let result = [...prevState];
      result.push({ domainName: "", kuberCloudDeployPortId: 0, path: "" });
      return result;
    });
    formik.setFieldValue("rules", [
      ...formik.values.rules,
      { domainName: "", kuberCloudDeployPortId: 0, path: "" },
    ]);
  };

  const removeRules = (index: number) => {
    setRules((prevState) => {
      let result = [...prevState];
      result.splice(index, 1);
      return result;
    });
    formik.setFieldValue(
      "rules",
      formik.values.rules.filter((_, i) => i !== index)
    );
  };

  const handleVmChange = (index: number, vmHostId: number) => {
    // const updatedPoolMembers = [...formik.values.poolMembers];
    // updatedPoolMembers[index] = { ...updatedPoolMembers[index], vmHostId };
    // formik.setFieldValue("poolMembers", updatedPoolMembers);
  };

  const handlePortChange = (index: number, port: number) => {
    // const updatedPoolMembers = [...formik.values.poolMembers];
    // updatedPoolMembers[index] = { ...updatedPoolMembers[index], port };
    // formik.setFieldValue("poolMembers", updatedPoolMembers);
  };

  const getAvailableVms = (index: number) => {
    // const selectedVmIds = formik.values.poolMembers.map(
    //   (member) => member.vmHostId
    // );
    // return vmHostList?.filter(
    //   (vm) =>
    //     !selectedVmIds.includes(Number(vm.id)) ||
    //     vm.id === formik.values.poolMembers[index]?.vmHostId
    // );
  };

  return (
    <Dialog sx={{ p: 4 }} {...props} fullWidth>
      {false && <PageLoading />}
      <DialogTitle fontWeight="bold" variant="text1">
        ایجاد اینگرس
      </DialogTitle>
      <form onSubmit={formik.handleSubmit} autoComplete="on">
        <DialogContent>
          <Stack rowGap={3}>
            {false && (
              <Alert sx={{ width: "100%" }} severity="warning">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span>لازم است ابتدا</span>
                  &nbsp;
                  <span>
                    <Link
                      href={`/kubernetes-cloud/${kubernetesCloudId}/secret`}
                      rel="noopener"
                    >
                      TLS Secret
                    </Link>
                  </span>
                  &nbsp;
                  <span>خود را ایجاد نمایید.</span>
                </div>
              </Alert>
            )}
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <DorsaTextField
                  dir="ltr"
                  fullWidth
                  label="Name"
                  error={Boolean(formik.errors.name && formik.touched.name)}
                  helperText={formik.errors.name}
                  disabled={false}
                  {...formik.getFieldProps("name")}
                />
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <DorsaTextField
                  select
                  dir="ltr"
                  fullWidth
                  label="type"
                  error={Boolean(
                    formik.errors.protocolTypeId &&
                      formik.touched.protocolTypeId
                  )}
                  helperText={formik.errors.protocolTypeId}
                  disabled={isEmptyTLSSecretList}
                  {...formik.getFieldProps("protocolTypeId")}
                >
                  {ProtocolTypeList.map(({ id, name }) => (
                    <MenuItem
                      dir="ltr"
                      key={id}
                      value={id}
                      sx={{
                        borderRadius: 1,
                        backgroundColor: "#F3F4F6",
                        m: 0.5,
                        py: 1.5,
                        color: "secondary",
                        "&: focus": {
                          color: "rgba(60, 138, 255, 1)",
                          backgroundColor: "rgba(60, 138, 255, 0.1)",
                        },
                      }}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </DorsaTextField>
              </Grid> */}
              {/* {formik.values.protocolTypeId === 3 && (
                <Grid item xs={12}>
                  <DorsaTextField
                    select
                    dir="ltr"
                    fullWidth
                    label="Secret Type Id"
                    error={Boolean(
                      formik.errors.secretId && formik.touched.secretId
                    )}
                    helperText={formik.errors.secretId}
                    disabled={isEmptyTLSSecretList}
                    {...formik.getFieldProps("secretId")}
                    inputProps={{
                      maxLength: 5,
                    }}
                  >
                    {tLSSecretList?.map(({ id, name }) => (
                      <MenuItem
                        dir="ltr"
                        key={id}
                        value={id}
                        sx={{
                          borderRadius: 1,
                          backgroundColor: "#F3F4F6",
                          m: 0.5,
                          py: 1.5,
                          color: "secondary",
                          "&: focus": {
                            color: "rgba(60, 138, 255, 1)",
                            backgroundColor: "rgba(60, 138, 255, 0.1)",
                          },
                        }}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </DorsaTextField>
                </Grid>
              )} */}
            </Grid>

            <Divider />

            <Stack gap={3}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography sx={{ color: ({ palette }) => palette.grey[800] }}>
                  rules
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
                  onClick={addRules}
                  disabled={false}
                >
                  اضافه کردن
                </Button>
              </Stack>
              {rules.map((rule, ruleIndex) => (
                <SelectIngressRule mainIndex={ruleIndex} formik={formik} />
              ))}
            </Stack>
          </Stack>

          <DialogActions sx={{ px: 0 }}>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ px: 3, py: 0.8 }}
              onClick={cancelBtnOnClick}
            >
              انصراف
            </Button>
            <LoadingButton
              component="button"
              type="submit"
              // loading={createVpcLoadBalancerLoading}
              variant="contained"
              sx={{ px: 3, py: 0.8 }}
            >
              ذخیره
            </LoadingButton>
          </DialogActions>
        </DialogContent>
      </form>
    </Dialog>
  );
};
