import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { Dispatch, FC, MouseEventHandler, SetStateAction } from "react";
import { AlphaNumericTextField } from "src/components/atoms/AlphaNumericTextField";
import { formikOnSubmitType } from "src/types/form.type";
import { maskRegexOnly24 } from "src/utils/regex.utils";
import * as yup from "yup";

export type NetworkItemsType = {
  id?: number;
  gatewayCidr: string;
  name: string;
};

type CreateNetworkDialogPropsType = DialogProps & {
  selectedNetworkList: NetworkItemsType[];
  setSelectedNetworkList: Dispatch<SetStateAction<NetworkItemsType[]>>;
};

export const CreateNetworkModal: FC<CreateNetworkDialogPropsType> = ({
  selectedNetworkList,
  setSelectedNetworkList,
  ...props
}) => {
  const cancelBtnOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (!props.onClose) return;
    props.onClose(event, "backdropClick");
    formik.resetForm();
  };

  const onClosegg: DialogProps["onClose"] = (event) => {
    props.onClose && props.onClose(event, "escapeKeyDown");
    formik.resetForm();
  };

  const closeDialogHandler = (
    event: {},
    reason: "backdropClick" | "escapeKeyDown"
  ) => {
    if (!props.onClose) return;
    formik.resetForm();
    props.onClose(event, reason);
  };

  const onSubmit: formikOnSubmitType<NetworkItemsType> = (values) => {
    setSelectedNetworkList([...selectedNetworkList, { ...values }]);
    closeDialogHandler({}, "escapeKeyDown" || "backdropClick");
  };

  const initialValues: NetworkItemsType = {
    name: "",
    gatewayCidr: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: yup.object().shape({
      name: yup.string().required("این بخش الزامی می‌باشد"),
      gatewayCidr: yup
        .string()
        .matches(maskRegexOnly24, {
          message: "Ip طبق الگو و maskBits=24 باشد.",
        })
        .required("این بخش الزامی می‌باشد"),
    }),
    onSubmit,
  });

  return (
    <Dialog {...props} onClose={onClosegg}>
      <DialogTitle align="center">ایجاد Network جدید</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Stack direction="column" rowGap={3} pt={2}>
            <DialogContentText textAlign="center">
              یک نام برای شبکه خود وارد کنید.
            </DialogContentText>

            <AlphaNumericTextField
              formik={formik}
              id="name"
              size="small"
              dir="ltr"
              fullWidth
              error={Boolean(formik.errors.name && formik.touched.name)}
              helperText={formik.touched.name && formik.errors.name}
              placeholder="Name"
            />
            <TextField
              {...formik.getFieldProps("gatewayCidr")}
              dir="ltr"
              placeholder="e.g: 192.168.1.0/24"
              error={Boolean(
                formik.errors.gatewayCidr && formik.touched.gatewayCidr
              )}
              helperText={formik.errors.gatewayCidr}
              focused
              size="small"
              label="GatewayCIDR"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    border: ({ palette }) => `#ccc 1px solid`,
                  },
                },
              }}
              FormHelperTextProps={{
                style: {
                  textAlign: "start",
                },
              }}
            />
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
                variant="contained"
                sx={{ px: 3, py: 0.8 }}
              >
                ذخیره
              </LoadingButton>
            </Stack>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};
