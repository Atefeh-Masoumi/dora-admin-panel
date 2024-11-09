import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogProps,
  DialogTitle,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useFormik } from "formik";
import { FC, useMemo, useState } from "react";
import {
  IngressRuleModelRequest,
  useGetApiMyKubernetesCloudHostPortListByNamespaceIdQuery,
  usePostApiMyKubernetesCloudIngressRuleCreateMutation,
} from "src/app/services/api.generated";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import { Add } from "@mui/icons-material";

type InitialValuesType = {
  ingressId: number;
  rules: IngressRuleModelRequest[];
};

type AddRuleDialogPropsType = DialogProps & {
  ingressId: number;
};

export const AddRuleDialog: FC<AddRuleDialogPropsType> = ({
  ingressId,
  ...props
}) => {
  const { kubernetesCloudId } = useParams();
  const [rules, setRules] = useState<IngressRuleModelRequest[]>([]);

  const [createIngressRule, { isLoading: createIngressRuleLoading }] =
    usePostApiMyKubernetesCloudIngressRuleCreateMutation();

  const { data: deploymentPortList } =
    useGetApiMyKubernetesCloudHostPortListByNamespaceIdQuery({
      namespaceId: Number(kubernetesCloudId),
    });

  const transformedPorts = useMemo(() => {
    return deploymentPortList?.flatMap((deployment) =>
      deployment?.ports?.map((port) => ({
        portId: port.portId,
        nodePort: port.nodePort,
      }))
    );
  }, [deploymentPortList]);

  const addRules = () => {
    setRules((prevState) => {
      let result = [...prevState];
      result.push({ kuberCloudDeployPortId: 0, path: "" });
      return result;
    });
    formik.setFieldValue("rules", [
      ...formik.values.rules,
      { kuberCloudDeployPortId: 0, path: "" },
    ]);
  };

  const formik = useFormik<InitialValuesType>({
    initialValues: {
      ingressId,
      rules: [],
    },

    onSubmit: ({ ingressId, rules }, { setSubmitting, resetForm }) => {
      createIngressRule({
        createKuberCloudIngressRuleModel: {
          ingressId,
          rules: rules || [],
        },
      })
        .unwrap()
        .then(() => {
          toast.success("با موفقیت ایجاد شد");
          resetForm();
          props.onClose && props.onClose({}, "backdropClick");
        })
        .catch(() => {});

      setSubmitting(false);
    },
    enableReinitialize: true,
  });

  return (
    <Dialog open={props.open} onClose={props.onClose} fullWidth>
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
            افزودن Rule
          </DialogTitle>
          <Divider sx={{ marginTop: "20px !important" }} />
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

          <Grid2 container spacing={1}>
            {rules.map((rule, ruleIndex) => (
              <>
                <Grid2 xs={12} md={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Port</InputLabel>
                    <Select
                      label="Port"
                      size="small"
                      {...formik.getFieldProps("kuberCloudDeployPortId")}
                    >
                      {transformedPorts?.map((item, index) => (
                        <MenuItem
                          sx={{
                            mx: 0.5,
                            my: 1,
                            borderRadius: 1,
                            direction: "ltr",
                          }}
                          key={index}
                          value={item?.portId}
                        >
                          {item?.nodePort}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid2>
                <Grid2 xs={12} md={6}>
                  <DorsaTextField
                    dir="ltr"
                    fullWidth
                    label="*name"
                    size="small"
                    {...formik.getFieldProps("serviceName")}
                  />
                </Grid2>
              </>
            ))}
          </Grid2>

          <DialogActions>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ px: 3, py: 0.8 }}
              onClick={(e) =>
                props.onClose && props.onClose(e, "escapeKeyDown")
              }
            >
              انصراف
            </Button>
            <LoadingButton
              component="button"
              type="submit"
              variant="contained"
              sx={{ px: 3, py: 0.8 }}
              loading={createIngressRuleLoading}
            >
              ایجاد
            </LoadingButton>
          </DialogActions>
        </Stack>
      </form>
    </Dialog>
  );
};
