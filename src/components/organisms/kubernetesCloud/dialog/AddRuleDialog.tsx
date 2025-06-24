import {
  Button,
  Dialog,
  DialogActions,
  DialogProps,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { useFormik } from "formik";
import { FC, useMemo, useState } from "react";
import {
  CreateKuberIngressRuleItemModel,
  useGetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployPortListQuery,
  usePostApiMyKubernetesCloudByProjectIdHostAndKuberHostIdIngressKuberIngressIdRuleCreateMutation
} from "src/app/services/api.generated";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { Add, DeleteOutline } from "@mui/icons-material";
import LoadingButton from "src/components/atoms/LoadingButton";

type InitialValuesType = {
  ingressId: number;
  rules: CreateKuberIngressRuleItemModel[];
};

type AddRuleDialogPropsType = DialogProps & {
  ingressId: number;
};

export const AddRuleDialog: FC<AddRuleDialogPropsType> = ({
  ingressId,
  ...props
}) => {
  const { kubernetesCloudId, projectId } = useParams();
  const [rules, setRules] = useState<CreateKuberIngressRuleItemModel[]>([
    {
      kuberCloudDeployPortId: 0,
      path: "",
    },
  ]);
  const [createIngressRule, { isLoading: createIngressRuleLoading }] =
  usePostApiMyKubernetesCloudByProjectIdHostAndKuberHostIdIngressKuberIngressIdRuleCreateMutation();

  const { data: deploymentPortList } =
  useGetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployPortListQuery({
    projectId: Number(projectId), kuberHostId: Number(kubernetesCloudId)
    });

  const transformedPorts = useMemo(() => {
    return deploymentPortList?.flatMap((deployment) =>
      deployment.ports?.map((port) => ({
        portId: port.portId,
        nodePort: port.nodePort,
        name: deployment.name,
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

  const formik = useFormik<InitialValuesType>({
    initialValues: {
      ingressId,
      rules: [],
    },

    onSubmit: ({ ingressId, rules }, { setSubmitting, resetForm }) => {
      createIngressRule({
        createKuberIngressRuleModel: {
          rules: rules || [],
        },
        projectId: Number(projectId),
         kuberHostId: Number(kubernetesCloudId),
        kuberIngressId:ingressId,
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
    <Dialog
      open={props.open}
      onClose={() => {
        props.onClose && props.onClose({}, "backdropClick");
        formik.resetForm();
      }}
      fullWidth
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
            افزودن رول
          </DialogTitle>
          <Divider sx={{ marginTop: "20px !important" }} />
          <Stack
            sx={{ width: "100%" }}
            justifyContent="center"
            alignItems="end"
          >
            <Button
              sx={{ maxWidth: "max-content" }}
              variant="text"
              color="secondary"
              startIcon={<Add />}
              onClick={addRules}
              disabled={false}
            >
              ایجاد رول جدید
            </Button>
          </Stack>

          <Stack direction="column" rowGap={{ xs: 4, md: 2 }}>
            {rules.map((rule, ruleIndex) => (
              <Grid
                direction={{ xs: "column-reverse", md: "row" }}
                key={ruleIndex}
                container
                spacing={1}
              >
                <Grid item xs={12} md={6}>
                  <Stack direction="row">
                    <IconButton onClick={() => removeRules(ruleIndex)}>
                      <DeleteOutline color="error" />
                    </IconButton>
                    <FormControl fullWidth size="small">
                      <InputLabel>Port</InputLabel>
                      <Select
                        label="Port"
                        size="small"
                        {...formik.getFieldProps(
                          `rules[${ruleIndex}].kuberCloudDeployPortId`
                        )}
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
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <DorsaTextField
                    dir="ltr"
                    fullWidth
                    label="*Path"
                    size="small"
                    {...formik.getFieldProps(`rules[${ruleIndex}].path`)}
                  />
                </Grid>
              </Grid>
            ))}
          </Stack>
          <DialogActions>
            <Stack direction="row" justifyContent="end" spacing={1}>
              <Button
                variant="outlined"
                color="secondary"
                sx={{ px: 3, py: 0.8 }}
                onClick={(e) => {
                  props.onClose && props.onClose(e, "escapeKeyDown");
                  formik.resetForm();
                }}
              >
                انصراف
              </Button>
              <LoadingButton
                type="submit"
                loading={createIngressRuleLoading}
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
