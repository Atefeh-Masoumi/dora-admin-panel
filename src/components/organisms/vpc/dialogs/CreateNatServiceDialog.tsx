import {
  Button,
  Chip,
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
import { FC, MouseEventHandler } from "react";
import { useParams } from "react-router";
import * as yup from "yup";
import { formikOnSubmitType } from "src/types/form.type";
import { Stack } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import OutlinedInput from "@mui/material/OutlinedInput";
import { usePostApiMyVpcTranslateCreateMutation } from "src/app/services/api.generated";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";

type CreateVpcNatServiceType = {
  vpcHostId: number;
  serviceName: string | null;
  isTcp: number;
  port: number | null;
  description: string | null;
};
type CreateNatServiceDialogType = DialogProps & { forceClose: () => void };

const options = [
  { id: 1, label: "TCP Protocol", isTcp: true },
  { id: 2, label: "UDP Protocol", isTcp: false },
];

export const CreateNatServiceDialog: FC<CreateNatServiceDialogType> = ({
  forceClose,
  ...props
}) => {
  const [createVpcNatService, { isLoading: createVpcNatServiceLoading }] =
    usePostApiMyVpcTranslateCreateMutation();

  const cancelBtnOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (!props.onClose) return;
    props.onClose(event, "backdropClick");
    formik.resetForm();
  };

  const handleCloseDialog: DialogProps["onClose"] = (event) => {
    if (!props.onClose) return;
    props.onClose && props.onClose(event, "escapeKeyDown");
    formik.resetForm();
  };

  const { vpcId } = useParams();

  const onSubmit: formikOnSubmitType<CreateVpcNatServiceType> = (
    values,
    { resetForm, setSubmitting }
  ) => {
    if (createVpcNatServiceLoading) return;
    createVpcNatService({
      createVpcTranslateModel: {
        vpcHostId: values.vpcHostId!,
        serviceName: values.serviceName!,
        port: values.port || 0,
        isTcp: options.find(({ id }) => id === values.isTcp)?.isTcp || false,
        description: values.description,
      },
    })
      .unwrap()
      .then((res) => {
        resetForm();
        forceClose();
      })
      .catch((err) => {});
  };

  const initialValues: CreateVpcNatServiceType = {
    vpcHostId: Number(vpcId),
    serviceName: "",
    isTcp: 1,
    port: null,
    description: "",
  };

  const validationSchema = yup.object().shape({
    serviceName: yup.string().required("انتخاب نام الزامی است."),
    port: yup
      .number()
      .typeError("پورت باید عدد باشد.")
      .min(1, "پورت رقمی بیشتر از ۱ می باشد")
      .max(65535, "پورت رقمی کمتر از ۶۵۵۳۵ می باشد")
      .required("پورت الزامی است."),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit,
  });

  return (
    <Dialog {...props} onClose={handleCloseDialog}>
      <DialogTitle align="center">افزودن سرویس</DialogTitle>
      <DialogContent sx={{ p: 4 }}>
        <form onSubmit={formik.handleSubmit}>
          <Stack direction="row" columnGap={1} rowGap={2} sx={{ py: 2 }}>
            <Stack>
              <FormControl fullWidth>
                <DorsaTextField
                  {...formik.getFieldProps("serviceName")}
                  size="small"
                  label="نام"
                  error={Boolean(
                    formik.errors.serviceName && formik.touched.serviceName
                  )}
                  helperText={
                    formik.touched.serviceName && formik.errors.serviceName
                  }
                />
              </FormControl>
            </Stack>
            <Stack>
              <FormControl fullWidth>
                <DorsaTextField
                  {...formik.getFieldProps("port")}
                  size="small"
                  label="پورت"
                  error={Boolean(formik.errors.port && formik.touched.port)}
                  helperText={formik.touched.port && formik.errors.port}
                />
              </FormControl>
            </Stack>
          </Stack>
          <Stack>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-error-label">
                {"انتخاب پروتکل"}
              </InputLabel>
              <Select
                {...formik.getFieldProps("isTcp")}
                labelId="demo-simple-select-error-label"
                size="small"
                input={
                  <OutlinedInput
                    id="select-multiple-chip"
                    label="انتخاب پروتکل"
                  />
                }
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
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        <Stack direction="row" justifyContent="end" spacing={1}>
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
            loading={createVpcNatServiceLoading}
            variant="contained"
            sx={{ px: 3, py: 0.8 }}
          >
            ذخیره
          </LoadingButton>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};
