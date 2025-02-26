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
import { Grid2 } from "@mui/material";
import { useFormik } from "formik";
import { FC, useMemo } from "react";
import {
  RulesModel,
  useGetApiMyKubernetesCloudHostPortListByNamespaceIdQuery,
  usePutApiMyKubernetesCloudIngressRuleEditMutation,
} from "src/app/services/api.generated";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import LoadingButton from "src/components/atoms/LoadingButton";

type InitialValuesType = {
  ingressRuleId: number;
  path: string;
  serviceName: string;
  kuberCloudDeployPortId: number;
};

type EditIngressRuleDialogPropsType = DialogProps & {
  data: RulesModel | null;
};

export const EditIngressRuleDialog: FC<EditIngressRuleDialogPropsType> = ({
  data,
  ...props
}) => {
  const { kubernetesCloudId } = useParams();

  const [editIngressRule, { isLoading: editIngressRuleLoading }] =
    usePutApiMyKubernetesCloudIngressRuleEditMutation();

  const { data: deploymentPortList } =
    useGetApiMyKubernetesCloudHostPortListByNamespaceIdQuery({
      namespaceId: Number(kubernetesCloudId),
    });

  const transformedPorts = useMemo(() => {
    return deploymentPortList?.flatMap((deployment) =>
      deployment.ports?.map((port) => ({
        portId: port.portId,
        nodePort: port.nodePort,
        name: deployment.deployName,
      }))
    );
  }, [deploymentPortList]);

  const formik = useFormik<InitialValuesType>({
    initialValues: {
      ingressRuleId: data?.id || 1,
      path: data?.path || "",
      serviceName: data?.serviceName || "",
      kuberCloudDeployPortId: data?.port || 1,
    },

    onSubmit: (
      { ingressRuleId, path, kuberCloudDeployPortId },
      { setSubmitting, resetForm }
    ) => {
      editIngressRule({
        editKuberCloudIngressRuleModel: {
          ingressRuleId,
          path,
          kuberCloudDeployPortId,
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
            ویرایش Rule
          </DialogTitle>
          <Divider sx={{ marginTop: "20px !important" }} />
          <Grid2 container spacing={1}>
            <Grid2 size={{xs:12,md:6}}>
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
                      {item?.name}:{item?.nodePort}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 size={{xs:12,md:6}}>
              <DorsaTextField
                dir="ltr"
                fullWidth
                label="*Path"
                size="small"
                {...formik.getFieldProps("serviceName")}
              />
            </Grid2>
          </Grid2>

          <DialogActions>
            <Stack direction="row" justifyContent="end" spacing={1}>
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
                type="submit"
                loading={editIngressRuleLoading}
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
  );
};
