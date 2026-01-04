import {
  Button,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  DialogActions,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { FC, MouseEventHandler } from "react";
import { toast } from "react-toastify";
import {
  CreateVmFirewallRuleModel,
  usePostApiMyVmByProjectIdFirewallAndVmFirewallIdRuleCreateMutation,
} from "src/app/services/api.generated";
import { formikOnSubmitType } from "src/types/form.type";
import * as yup from "yup";
import LoadingButton from "src/components/atoms/LoadingButton";
import { useParams } from "react-router-dom";

import {
  dialogSx,
  dialogTitleSx,
  dialogContentSx,
  dialogFormStackSx,
  dialogActionsSx,
  dialogButtonSx,
} from "src/configs/dialogStyles";

type AddFirewallRuleDialogPropsType = DialogProps & {
  forceClose: () => void;
  refetch: () => void;
};

const protocolOptions = [
  { id: 1, label: "TCP" },
  { id: 2, label: "UDP" },
  { id: 3, label: "ICMP" },
  { id: 5, label: "GRE" },
  { id: 4, label: "Any" },
];

const directionOptions = [
  { id: 1, label: "ورودی", value: true },
  { id: 2, label: "خروجی", value: false },
];

export const AddFirewallRuleDialog: FC<AddFirewallRuleDialogPropsType> = ({
  forceClose,
  refetch,
  ...props
}) => {
  const { projectId, firewallId } = useParams();

  const [createRule, { isLoading: createRuleLoading }] =
    usePostApiMyVmByProjectIdFirewallAndVmFirewallIdRuleCreateMutation();

  const initialValues: CreateVmFirewallRuleModel = {
    firewallProtocolId: 1,
    directionId: 1,
    remoteIp: "0.0.0.0/0",
    minPort: 22,
    maxPort: 22,
    isIpV4: true,
  };

  const validationSchema = yup.object().shape({
    firewallProtocolId: yup.number().required("این بخش الزامی می‌باشد"),
    directionId: yup.number().required("این بخش الزامی می‌باشد"),
    remoteIp: yup.string().required("این بخش الزامی می‌باشد"),
    minPort: yup
      .number()
      .when("firewallProtocolId", {
        is: (value: number) => value !== 4, // 4 is "Any"
        then: (schema) =>
          schema
            .min(1, "پورت نمی‌تواند کمتر از 1 باشد")
            .max(65535, "پورت نمی‌تواند بیشتر از 65535 باشد")
            .required("این بخش الزامی می‌باشد"),
        otherwise: (schema) => schema.nullable().notRequired(),
      }),
    maxPort: yup
      .number()
      .when("firewallProtocolId", {
        is: (value: number) => value !== 4, // 4 is "Any"
        then: (schema) =>
          schema
            .min(1, "پورت نمی‌تواند کمتر از 1 باشد")
            .max(65535, "پورت نمی‌تواند بیشتر از 65535 باشد")
            .required("این بخش الزامی می‌باشد")
            .test(
              "max-greater-than-min",
              "پورت حداکثر باید بزرگتر یا مساوی پورت حداقل باشد",
              function (value) {
                const { minPort } = this.parent;
                return Boolean(value && value >= (minPort ?? 0));
              }
            ),
        otherwise: (schema) => schema.nullable().notRequired(),
      }),
  });

  const onSubmit: formikOnSubmitType<CreateVmFirewallRuleModel> = (
    values,
    { setSubmitting }
  ) => {
    createRule({
      projectId: Number(projectId),
      vmFirewallId: Number(firewallId),
      createVmFirewallRuleModel: values,
    })
      .unwrap()
      .then(() => {
        toast.success("رول جدید با موفقیت ایجاد شد");
        forceClose();
        refetch();
        formik.resetForm();
      })
      .catch(() => { })
      .finally(() => setSubmitting(false));
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit,
  });

  const isAnyProtocol = formik.values.firewallProtocolId === 4;

  const closeDialogHandler: MouseEventHandler<HTMLButtonElement> &
    ((event: any) => void) = (event: any) => {
      props.onClose?.(event, "escapeKeyDown");
      formik.resetForm();
    };

  return (
    <Dialog {...props} sx={dialogSx} onClose={props.onClose} fullWidth>
      <DialogTitle sx={dialogTitleSx}>ایجاد رول جدید</DialogTitle>

      <form onSubmit={formik.handleSubmit}>
        <DialogContent sx={dialogContentSx}>
          <Stack sx={dialogFormStackSx}>
            {/* Protocol */}
            <FormControl fullWidth size="small">
              <InputLabel>نوع پروتکل</InputLabel>
              <Select
                {...formik.getFieldProps("firewallProtocolId")}
                label="نوع پروتکل"
                error={Boolean(
                  formik.touched.firewallProtocolId &&
                  formik.errors.firewallProtocolId
                )}
                onChange={(e) => {
                  const protocolId = Number(e.target.value);
                  formik.setFieldValue("firewallProtocolId", protocolId);
                  // Clear port values when "Any" is selected
                  if (protocolId === 4) {
                    formik.setFieldValue("minPort", null);
                    formik.setFieldValue("maxPort", null);
                  }
                }}
              >
                {protocolOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.firewallProtocolId &&
                formik.errors.firewallProtocolId && (
                  <Typography color="error" fontSize={12} mt={0.5}>
                    {String(formik.errors.firewallProtocolId)}
                  </Typography>
                )}
            </FormControl>

            {/* Direction */}
            <FormControl component="fieldset">
              <FormLabel component="legend">جهت</FormLabel>
              <RadioGroup
                row
                {...formik.getFieldProps("directionId")}
                value={formik.values.directionId}
              >
                {directionOptions.map((option) => (
                  <FormControlLabel
                    key={option.id}
                    value={option.id}
                    control={<Radio />}
                    label={option.label}
                  />
                ))}
              </RadioGroup>
              {formik.touched.directionId && formik.errors.directionId && (
                <Typography color="error" fontSize={12} mt={0.5}>
                  {String(formik.errors.directionId)}
                </Typography>
              )}
            </FormControl>
            <Stack>
              <InputLabel>نسخه IP</InputLabel>
              <Select
                name="isIpV4"
                size="small"
                fullWidth
                value={formik.values.isIpV4 ? "true" : "false"}
                onChange={(e) =>
                  formik.setFieldValue("isIpV4", e.target.value === "true")
                }
              >
                <MenuItem value="true">IPv4</MenuItem>
                <MenuItem value="false">IPv6</MenuItem>
              </Select>
            </Stack>
            {/* Remote IP */}
            <Stack>
              <InputLabel>آدرس IP</InputLabel>
              <TextField
                {...formik.getFieldProps("remoteIp")}
                fullWidth
                error={Boolean(formik.touched.remoteIp && formik.errors.remoteIp)}
                helperText={formik.touched.remoteIp && formik.errors.remoteIp}
                placeholder="مثال: 0.0.0.0/0"
                size="small"
                inputProps={{ dir: "ltr" }}
              />
            </Stack>

            {/* Ports */}
            <Stack direction="row" spacing={2}>
              <Stack sx={{ flex: 1 }}>
                <InputLabel>از پورت</InputLabel>
                <TextField
                  {...formik.getFieldProps("minPort")}
                  fullWidth
                  type="number"
                  disabled={isAnyProtocol}
                  error={Boolean(formik.touched.minPort && formik.errors.minPort)}
                  helperText={formik.touched.minPort && formik.errors.minPort}
                  inputProps={{ min: 1, max: 65535, dir: "ltr" }}
                  size="small"
                />
              </Stack>

              <Stack sx={{ flex: 1 }}>
                <InputLabel>تا پورت</InputLabel>
                <TextField
                  {...formik.getFieldProps("maxPort")}
                  fullWidth
                  type="number"
                  disabled={isAnyProtocol}
                  error={Boolean(formik.touched.maxPort && formik.errors.maxPort)}
                  helperText={formik.touched.maxPort && formik.errors.maxPort}
                  inputProps={{ min: 1, max: 65535, dir: "ltr" }}
                  size="small"
                />
              </Stack>
            </Stack>
          </Stack>
        </DialogContent>

        <DialogActions sx={dialogActionsSx}>
          <Stack direction="row" justifyContent="end" spacing={1} width="100%">
            <Button
              variant="outlined"
              color="secondary"
              sx={dialogButtonSx}
              onClick={closeDialogHandler}
            >
              انصراف
            </Button>

            <LoadingButton
              type="submit"
              loading={createRuleLoading}
              variant="contained"
              sx={dialogButtonSx}
            >
              ایجاد
            </LoadingButton>
          </Stack>
        </DialogActions>
      </form>
    </Dialog>
  );
};
