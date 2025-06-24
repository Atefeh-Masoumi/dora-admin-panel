import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useFormik } from "formik";
import { Stack } from "@mui/system";
import { FC, useMemo } from "react";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { formikOnSubmitType } from "src/types/form.type";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import {
  CreateKuberFirewallModel,
  useGetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdFirewallListQuery,
  useGetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployPortListQuery,
  usePostApiMyKubernetesCloudByProjectIdHostAndKuberHostIdFirewallCreateMutation,
} from "src/app/services/api.generated";
import LoadingButton from "src/components/atoms/LoadingButton";

const options = [
  { id: 1, label: "TCP", isTcp: true },
  { id: 2, label: "UDP", isTcp: false },
];

export const InitialValueSchema = yup.object().shape({
  // name: yup.string().required(VALIDATION_REQUIRED_ERROR_MESSAGE),
});

type CreateFirewallFormPropsType = DialogProps & {
  forceClose: () => void;
};

export const CreateFirewallDialog: FC<CreateFirewallFormPropsType> = ({
  forceClose,
  ...props
}) => {
  const { kubernetesCloudId,projectId } = useParams();
  const { refetch } = useGetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdFirewallListQuery(
    {  projectId: Number(projectId),
      kuberHostId: Number(kubernetesCloudId) },
    { skip: !kubernetesCloudId }
  );
  const { data: kuberCloudObject } =
  useGetApiMyKubernetesCloudByProjectIdHostAndKuberHostIdDeployPortListQuery({
    projectId: Number(projectId),
    kuberHostId: Number(kubernetesCloudId),
  })
  const deployPortList = useMemo(() => {
    return kuberCloudObject?.flatMap((item) =>
      item.ports?.map((port) => ({
        id: port.portId,
        value: `${item.name}:${port.targetPort}`,
      }))
    );
  }, [kuberCloudObject]);

  const [createKubernetesCloudFirewall, { isLoading }] =
  usePostApiMyKubernetesCloudByProjectIdHostAndKuberHostIdFirewallCreateMutation();

  

  const initialValues: CreateKuberFirewallModel = {
    // namespaceId: namespaceid,
    firewallProtocolId: 0,
    deployPortId: 0,
    sourceIp: null,
    description: null,
  };

  const onSubmit: formikOnSubmitType<CreateKuberFirewallModel> = (
    values,
    { resetForm }
  ) => {
    createKubernetesCloudFirewall({
      createKuberFirewallModel: {
        ...values,
      },
      projectId: Number(projectId),
      kuberHostId: Number(kubernetesCloudId),
    })
      .unwrap()
      .then((res) => {
        resetForm();
        formik.resetForm();
        forceClose();
        refetch();
      })
      .catch((err) => {});
  };

  const formik = useFormik({
    initialValues,
    validationSchema: InitialValueSchema,
    onSubmit,
    enableReinitialize: true,
  });

  const dialogCloseHandler: DialogProps["onClose"] = (event) => {
    props.onClose && props.onClose(event, "escapeKeyDown");
    formik.resetForm();
  };

  return (
    <Dialog {...props} onClose={dialogCloseHandler} maxWidth={"xs"}>
      <DialogTitle fontWeight={"700"}>افزودن رول</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent
          sx={{
            py: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            rowGap: 4,
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="protocolSelection">انتخاب پروتکل</InputLabel>
            <Select
              labelId="protocolSelection"
              label="انتخاب پروتکل"
              {...formik.getFieldProps("firewallProtocolTypeId")}
              renderValue={(selected: number) =>
                options.find((option) => option.id === selected)?.label
              }
            >
              {[
                { id: 1, label: "TCP", isTcp: true },
                { id: 2, label: "UDP", isTcp: false },
              ].map((item, index) => (
                <MenuItem key={index} value={item.id}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="e">Deploy Port</InputLabel>
            <Select
              {...formik.getFieldProps("deployPortId")}
              labelId="e"
              label="Deploy Port"
            >
              {deployPortList?.map((item, index) => (
                <MenuItem key={index} value={item?.id}>
                  {item?.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <DorsaTextField
              {...formik.getFieldProps("sourceIp")}
              focused
              label="Source IP"
              error={Boolean(formik.errors.sourceIp && formik.touched.sourceIp)}
              helperText={formik.touched.sourceIp && formik.errors.sourceIp}
            />
          </FormControl>
          <FormControl fullWidth>
            <DorsaTextField
              fullWidth
              multiline
              rows={4}
              {...formik.getFieldProps("description")}
              focused
              label="Description"
              error={Boolean(
                formik.errors.description && formik.touched.description
              )}
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Stack direction="row" justifyContent="end" spacing={1}>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ px: 3, py: 0.8 }}
              onClick={forceClose}
            >
              انصراف
            </Button>
            <LoadingButton
              type="submit"
              loading={isLoading}
              variant="contained"
              sx={{ px: 3, py: 0.8 }}
            >
              ذخیره
            </LoadingButton>
          </Stack>
        </DialogActions>
      </form>
    </Dialog>
  );
};
