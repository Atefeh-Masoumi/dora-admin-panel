import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { Stack } from "@mui/system";
import { FC, useMemo } from "react";
import { useParams } from "react-router";
import { LoadingButton } from "@mui/lab";
import * as yup from "yup";
import { formikOnSubmitType } from "src/types/form.type";
import {
  CreateKuberCloudFirewallModel,
  useGetApiMyKubernetesCloudHostPortListByNamespaceIdQuery,
  usePostApiMyKubernetesCloudFirewallCreateMutation,
} from "src/app/services/api.generated";

const options = [
  { id: 1, label: "TCP Protocol", isTcp: true },
  { id: 2, label: "UDP Protocol", isTcp: false },
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
  const { kubernetesCloudId } = useParams();

  const { data: kuberCloudObject } =
    useGetApiMyKubernetesCloudHostPortListByNamespaceIdQuery({
      namespaceId: Number(kubernetesCloudId),
    });

  const deployPortList = useMemo(() => {
    return kuberCloudObject?.flatMap((item) =>
      item.ports?.map((port) => ({
        id: port.portId,
        value: `${item.deployName}:${port.targetPort}`,
      }))
    );
  }, [kuberCloudObject]);

  const [createKubernetesCloudFirewall, { isLoading }] =
    usePostApiMyKubernetesCloudFirewallCreateMutation();

  const initialValues: CreateKuberCloudFirewallModel = {
    namespaceId: 0,
    firewallProtocolTypeId: 0,
    deployPortId: 0,
    sourceIp: null,
    description: null,
  };

  const onSubmit: formikOnSubmitType<CreateKuberCloudFirewallModel> = () =>
    // values
    {
      // createKubernetesCloudFirewall({
      //   createKuberCloudFirewallModel: {
      //     ...values,
      //   },
      // })
      //   .unwrap()
      //   .then((res) => {
      //     resetForm();
      //     formik.resetForm();
      //     forceClose();
      //   })
      //   .catch((err) => {});
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
      <DialogTitle fontWeight={"700"}>ایجاد Firewall جدید</DialogTitle>

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
          <FormControl size="small" fullWidth>
            <InputLabel id="protocolSelection">انتخاب پروتکل</InputLabel>
            <Select
              labelId="protocolSelection"
              label="انتخاب پروتکل"
              {...formik.getFieldProps("isTcp")}
              renderValue={(selected: number) => (
                <Chip
                  sx={{ width: "100%" }}
                  key={selected}
                  label={
                    options.find((option) => option.id === selected)?.label
                  }
                />
              )}
            >
              {[
                { id: 1, label: "TCP Protocol", isTcp: true },
                { id: 2, label: "UDP Protocol", isTcp: false },
              ].map((item, index) => (
                <MenuItem key={index} value={item.id}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" fullWidth>
            <InputLabel id="e">Deploy Port</InputLabel>
            <Select
              {...formik.getFieldProps("isTcp")}
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
          <FormControl sx={{ ":dir": "ltr" }} size="small" fullWidth>
            <TextField
              {...formik.getFieldProps("sourceIp")}
              focused
              label="Source IP"
              error={Boolean(formik.errors.sourceIp && formik.touched.sourceIp)}
              helperText={formik.touched.sourceIp && formik.errors.sourceIp}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              fullWidth
              multiline
              rows={4}
              {...formik.getFieldProps("sourceIp")}
              focused
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    border: "1px solid lightgray",
                  },
                },
              }}
              size="small"
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
        <DialogActions sx={{ pb: 3, px: 3 }}>
          <Grid container rowSpacing={2}>
            <Grid item xs={12} lg={12}>
              <Stack
                sx={{ width: "60%" }}
                direction={{ xs: "column", md: "row" }}
                gap={1}
              >
                <LoadingButton
                  loading={isLoading}
                  fullWidth
                  variant="contained"
                  type="submit"
                >
                  ایجاد
                </LoadingButton>
                <Button onClick={forceClose} fullWidth variant="outlined">
                  انصراف
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </DialogActions>
      </form>
    </Dialog>
  );
};
