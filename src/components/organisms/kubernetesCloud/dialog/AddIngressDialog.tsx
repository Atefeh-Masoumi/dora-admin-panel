import { Add } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
  Grid,
  Link,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { FC, Fragment, MouseEventHandler, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import {
  RuleModelRequest,
  useGetApiMyKubernetesCloudSecretListByNamespaceIdQuery,
  usePostApiMyKubernetesCloudIngressCreateMutation,
} from "src/app/services/api.generated";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import PageLoading from "src/components/atoms/PageLoading";
import * as yup from "yup";
import { SECRET_TYPES_ENUM } from "../../home/constants/secretTypesConstants";
import { SelectIngressRule } from "../edit/ingress/SelectIngressRule";

const ProtocolTypeItems = [
  { id: 4, name: "HTTP" },
  { id: 3, name: "HTTPS" },
];

export type CustomRuleModelRequest = {
  path: string | null;
  kuberCloudDeployPortId: number | null;
};
export type CreateIngressTypes = {
  name: string | null;
  domainName: string | null;
  protocolTypeId: 3 | 4;
  secretId?: number | null;
  rules: CustomRuleModelRequest[];
};

const formValidation = yup.object().shape({
  name: yup.string().required("نام الزامی می باشد"),
  domainName: yup.string().required("دامنه الزامی می باشد"),
  rules: yup.array().of(
    yup.object().shape({
      path: yup.string().required(" الزامی می باشد path"),
      kuberCloudDeployPortId: yup.number().nullable().required("پورت الزامیست"),
    })
  ),
});

type AddIngressDialogPropsType = DialogProps & {};

export const AddIngressDialog: FC<AddIngressDialogPropsType> = ({
  onClose,
  ...props
}) => {
  const { kubernetesCloudId } = useParams();
  const [rules, setRules] = useState<CustomRuleModelRequest[]>([]);

  const [createIngress, { isLoading: createIngressLoading }] =
    usePostApiMyKubernetesCloudIngressCreateMutation();

  const { data: tLSSecretList } =
    useGetApiMyKubernetesCloudSecretListByNamespaceIdQuery(
      {
        namespaceId: Number(kubernetesCloudId),
        secretTypeId: SECRET_TYPES_ENUM.TLS,
      },
      { skip: !kubernetesCloudId }
    );

  const closeDialogHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (!onClose) return;
    onClose(event, "backdropClick");
    setRules([]);
    formik.resetForm();
  };

  const closeHandler: DialogProps["onClose"] = (event) => {
    onClose && onClose(event, "escapeKeyDown");
    formik.resetForm();
  };

  const formik = useFormik<CreateIngressTypes>({
    initialValues: {
      name: "",
      domainName: "",
      protocolTypeId: 4,
      secretId: null,
      rules: [],
    },
    validationSchema: formValidation,
    onSubmit: (
      { domainName, name, protocolTypeId, secretId, rules },
      { setSubmitting, resetForm }
    ) => {
      createIngress({
        createKuberCloudIngressModel: {
          name: name!,
          domainName: domainName!,
          protocolTypeId: protocolTypeId,
          secretId: protocolTypeId === 3 ? secretId! : null,
          rules: rules as RuleModelRequest[],
        },
      })
        .unwrap()
        .then(() => {
          toast.success("Configmap با موفقیت ساخته شد");
          closeHandler(new Event("submit"), "escapeKeyDown");
        })
        .catch(() => {});
      setSubmitting(false);
    },
    enableReinitialize: true,
  });

  const addRules = () => {
    setRules((prevState) => {
      let result = [...prevState];
      result.push({ kuberCloudDeployPortId: null, path: "" });
      return result;
    });
    formik.setFieldValue("rules", [
      ...formik.values.rules,
      { kuberCloudDeployPortId: 0, path: "" },
    ]);
  };

  return (
    <Dialog sx={{ p: 4 }} onClose={closeDialogHandler} {...props} fullWidth>
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

            <Grid container rowSpacing={2} columnSpacing={1}>
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
                <DorsaTextField
                  dir="ltr"
                  fullWidth
                  label="Domain Name"
                  error={Boolean(
                    formik.errors.domainName && formik.touched.domainName
                  )}
                  helperText={formik.errors.domainName}
                  disabled={false}
                  {...formik.getFieldProps("domainName")}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DorsaTextField
                  dir="ltr"
                  select
                  error={Boolean(
                    formik.errors.protocolTypeId &&
                      formik.touched.protocolTypeId
                  )}
                  helperText={formik.errors.protocolTypeId}
                  disabled={false}
                  label="Protocol Type"
                  fullWidth
                  {...formik.getFieldProps("protocolTypeId")}
                >
                  {ProtocolTypeItems &&
                    ProtocolTypeItems.map((item, index) => (
                      <MenuItem dir="ltr" key={index} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                </DorsaTextField>
              </Grid>
              {formik.values.protocolTypeId === 3 && (
                <Grid item xs={12} sm={6}>
                  {tLSSecretList && tLSSecretList.length > 0 ? (
                    <DorsaTextField
                      dir="ltr"
                      select
                      error={Boolean(
                        formik.errors.secretId && formik.touched.secretId
                      )}
                      helperText={formik.errors.secretId}
                      disabled={false}
                      label="TLS Secret"
                      fullWidth
                      {...formik.getFieldProps("secretId")}
                    >
                      {tLSSecretList &&
                        tLSSecretList.map((item, index) => (
                          <MenuItem dir="ltr" key={index} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                    </DorsaTextField>
                  ) : (
                    <Alert severity="warning" variant="outlined">
                      <Typography justifyItems="center" textAlign="center">
                        ابتدا secret از نوع TLS بسازید
                      </Typography>
                    </Alert>
                  )}
                </Grid>
              )}
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
                  startIcon={<Add />}
                  onClick={addRules}
                  disabled={false}
                >
                  اضافه کردن
                </Button>
              </Stack>
              <Grid container spacing={1}>
                {rules.map((rule, ruleIndex) => (
                  <Fragment key={ruleIndex}>
                    <SelectIngressRule
                      setRules={setRules}
                      mainIndex={ruleIndex}
                      formik={formik}
                    />
                  </Fragment>
                ))}
              </Grid>
            </Stack>
          </Stack>

          <DialogActions sx={{ px: 0, py: 4 }}>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ px: 3, py: 0.8 }}
              onClick={closeDialogHandler}
            >
              انصراف
            </Button>
            <LoadingButton
              type="submit"
              loading={createIngressLoading}
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
