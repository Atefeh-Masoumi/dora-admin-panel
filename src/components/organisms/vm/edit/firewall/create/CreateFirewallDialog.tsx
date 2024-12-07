import {
  Button,
  Chip,
  Dialog,
  Select,
  MenuItem,
  InputLabel,
  DialogTitle,
  DialogProps,
  FormControl,
  DialogActions,
  DialogContent,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useFormik } from "formik";
import { Stack } from "@mui/system";
import { FC, MouseEventHandler } from "react";
import { useParams } from "react-router";
import { LoadingButton } from "@mui/lab";
import * as yup from "yup";
import { formikOnSubmitType } from "src/types/form.type";
import {
  CreateVmFirewallModel,
  usePostApiMyVmFirewallCreateMutation,
} from "src/app/services/api.generated";
import { toast } from "react-toastify";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";

const options = [
  { id: 1, label: "TCP Protocol", firewallProtocolType: "TCP" },
  { id: 2, label: "UDP Protocol", firewallProtocolType: "UDP" },
  { id: 3, label: "ICMP Protocol", firewallProtocolType: "ICMP" },
  { id: 4, label: "Any", firewallProtocolType: "any" },
];

export const InitialValueSchema = yup.object().shape({
  // firewallProtocolTypeId: yup.number().required("Protocol type is required"),
  // directionId: yup.number().required("نوع درخواست را مشخص کنید."),
  // remoteIp: yup.string().required("Remote IP is required"),
  // minPort: yup.number().required("Minimum port الزامی است."),
  // maxPort: yup.number().required("Maximum port الزامی است."),
});

type CreateFirewallFormPropsType = DialogProps & {
  forceClose: () => void;
};

export const CreateFirewallDialog: FC<CreateFirewallFormPropsType> = ({
  onClose,
  forceClose,
  ...props
}) => {
  const { vmId } = useParams();

  const closeHandler: DialogProps["onClose"] = (event) => {
    onClose && onClose(event, "escapeKeyDown");
    formik.resetForm();
  };

  const [createFirewall, { isLoading }] =
    usePostApiMyVmFirewallCreateMutation();

  const initialValues: CreateVmFirewallModel = {
    vmHostId: 0,
    firewallProtocolTypeId: 1,
    directionId: 0,
    remoteIp: "0.0.0.0/0",
    minPort: 0,
    maxPort: 0,
  };

  const onSubmit: formikOnSubmitType<CreateVmFirewallModel> = (
    { firewallProtocolTypeId, directionId, remoteIp, minPort, maxPort },
    { setSubmitting }
  ) => {
    if (vmId === null || vmId === undefined || isNaN(Number(vmId))) return;
    createFirewall({
      createVmFirewallModel: {
        vmHostId: Number(vmId),
        firewallProtocolTypeId,
        directionId,
        remoteIp,
        minPort,
        maxPort,
      },
    })
      .unwrap()
      .then(() => {
        toast.success("رول جدید با موفقیت ایجاد شد");
        forceClose();
      })
      .catch((err) => {})
      .finally(() => {
        setSubmitting(false);
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema: InitialValueSchema,
    onSubmit,
    enableReinitialize: true,
  });

  const closeDialogHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (!onClose) return;
    onClose(event, "backdropClick");
    formik.resetForm();
  };

  return (
    <Dialog {...props} onClose={closeDialogHandler} maxWidth={"xs"}>
      <DialogTitle fontWeight={"700"}>ایجاد رول جدید</DialogTitle>
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
          <FormControl fullWidth sx={{ flexDirection: "row" }}>
            <FormLabel sx={{ paddingTop: "10px", paddingRight: "30px" }}>
              نوع درخواست
            </FormLabel>
            <RadioGroup
              row
              {...formik.getFieldProps("directionId")}
              onChange={(event) =>
                formik.setFieldValue("directionId", event.target.value)
              }
            >
              <FormControlLabel
                control={<Radio />}
                label="ترافیک ورودی"
                value="1"
              />
              <FormControlLabel
                control={<Radio />}
                label="ترافیک خروجی"
                value="2"
              />
            </RadioGroup>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="protocolSelection">انتخاب پروتکل</InputLabel>
            <Select
              labelId="protocolSelection"
              label="انتخاب پروتکل"
              value={formik.values.firewallProtocolTypeId}
              onChange={(event) =>
                formik.setFieldValue(
                  "firewallProtocolTypeId",
                  event.target.value
                )
              }
              renderValue={(selected: number) =>
                options.find((option) => option.id === selected)?.label
              }
            >
              {options.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <DorsaTextField
              sx={{ pb: 1 }}
              {...formik.getFieldProps("remoteIp")} // Bind to Formik value
              label="آدرس IP"
              defaultValue="0.0.0.0/0"
              error={Boolean(formik.errors.remoteIp && formik.touched.remoteIp)}
              helperText={formik.touched.remoteIp && formik.errors.remoteIp}
              inputProps={{ dir: "ltr" }}
            />
            <DorsaTextField
              sx={{ pb: 1 }}
              {...formik.getFieldProps("minPort")}
              focused
              label="از پورت"
              error={Boolean(formik.errors.minPort && formik.touched.minPort)}
              helperText={formik.touched.minPort && formik.errors.minPort}
              inputProps={{ dir: "ltr" }}
            />
            <DorsaTextField
              sx={{ pb: 1 }}
              {...formik.getFieldProps("maxPort")}
              focused
              label="تا پورت"
              error={Boolean(formik.errors.maxPort && formik.touched.maxPort)}
              helperText={formik.touched.maxPort && formik.errors.maxPort}
              inputProps={{ dir: "ltr" }}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Stack direction="row" justifyContent="end" spacing={1}>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ px: 3, py: 0.8 }}
              onClick={closeDialogHandler}
            >
              انصراف
            </Button>
            <LoadingButton
              component="button"
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
