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
} from "@mui/material";
import { useFormik } from "formik";
import { FC } from "react";
import { toast } from "react-toastify";
import {
  CreateVmFirewallRuleModel,
  usePostApiMyVmByProjectIdFirewallAndVmFirewallIdRuleCreateMutation,
} from "src/app/services/api.generated";
import { formikOnSubmitType } from "src/types/form.type";
import * as yup from "yup";
import LoadingButton from "src/components/atoms/LoadingButton";
import { useParams } from "react-router-dom";

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
    remoteIp: yup
      .string()
      .required("این بخش الزامی می‌باشد"),
    minPort: yup
      .number()
      .min(1, "پورت نمی‌تواند کمتر از 1 باشد")
      .max(65535, "پورت نمی‌تواند بیشتر از 65535 باشد")
      .required("این بخش الزامی می‌باشد"),
    maxPort: yup
      .number()
      .min(1, "پورت نمی‌تواند کمتر از 1 باشد")
      .max(65535, "پورت نمی‌تواند بیشتر از 65535 باشد")
      .required("این بخش الزامی می‌باشد")
      .test("max-greater-than-min", "پورت حداکثر باید بزرگتر یا مساوی پورت حداقل باشد", function(value) {
        const { minPort } = this.parent;
        return Boolean(value && value >= (minPort ?? 0));
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
        toast.success("قانون جدید با موفقیت ایجاد شد");
        forceClose();
        refetch();
        formik.resetForm();
      })
      .catch(() => { })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit,
  });

  const closeDialogHandler = (event: {}) => {
    if (!props.onClose) return;
    props.onClose(event, "escapeKeyDown");
    formik.resetForm();
  };

  return (
    <Dialog
      {...props}
      onClose={closeDialogHandler}
      fullWidth
    >
      <DialogTitle textAlign="left">
        ایجاد قانون جدید
      </DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Stack direction="column" rowGap={2} sx={{ pt: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>نوع پروتکل</InputLabel>
              <Select
                {...formik.getFieldProps("firewallProtocolId")}
                label="نوع پروتکل"
                error={Boolean(formik.errors.firewallProtocolId && formik.touched.firewallProtocolId)}
              >
                {protocolOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

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
            </FormControl>

            <Stack direction="column" rowGap={1}>
              <InputLabel>آدرس IP</InputLabel>
              <TextField
                {...formik.getFieldProps("remoteIp")}
                fullWidth
                error={Boolean(formik.errors.remoteIp && formik.touched.remoteIp)}
                helperText={formik.touched.remoteIp && formik.errors.remoteIp}
                placeholder="مثال: 0.0.0.0/0"
                size="small"
                inputProps={{ dir: "ltr" }}
              />
            </Stack>

            <Stack direction="row" spacing={2}>
              <Stack direction="column" rowGap={1} sx={{ flex: 1 }}>
                <InputLabel>از پورت</InputLabel>
                <TextField
                  {...formik.getFieldProps("minPort")}
                  fullWidth
                  type="number"
                  error={Boolean(formik.errors.minPort && formik.touched.minPort)}
                  helperText={formik.touched.minPort && formik.errors.minPort}
                  inputProps={{
                    min: 1,
                    max: 65535,
                    dir: "ltr"
                  }}
                  size="small"
                />
              </Stack>
              <Stack direction="column" rowGap={1} sx={{ flex: 1 }}>
                <InputLabel>تا پورت</InputLabel>
                <TextField
                  {...formik.getFieldProps("maxPort")}
                  fullWidth
                  type="number"
                  error={Boolean(formik.errors.maxPort && formik.touched.maxPort)}
                  helperText={formik.touched.maxPort && formik.errors.maxPort}
                  inputProps={{
                    min: 1,
                    max: 65535,
                    dir: "ltr"
                  }}
                  size="small"
                />
              </Stack>
            </Stack>

            <Stack direction="row" justifyContent="end" spacing={1} sx={{ pt: 2 }}>
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
                loading={createRuleLoading}
                variant="contained"
                sx={{ px: 3, py: 0.8 }}
              >
                ایجاد
              </LoadingButton>
            </Stack>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};

