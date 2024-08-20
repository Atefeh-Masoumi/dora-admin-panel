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
import { FC, MouseEventHandler } from "react";
import { useParams } from "react-router";
import { usePostApiMyVpcNetworkCreateMutation } from "src/app/services/api.generated";
import { AlphaNumericTextField } from "src/components/atoms/AlphaNumericTextField";
import { formikOnSubmitType } from "src/types/form.type";
import { maskRegexOnly24 } from "src/utils/regex.utils";
import * as yup from "yup";

export type NetworkItemsType = {
  id?: number;
  gatewayCidr: string;
  name: string;
};

export const CreateNetworkRecordModal: FC<DialogProps> = ({ ...props }) => {
  const { vpcId } = useParams();
  const vpcHostId = Number(vpcId) || 0;
  const [callCreateNetwork, { isLoading }] =
    usePostApiMyVpcNetworkCreateMutation();
  const cancelBtnOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (!props.onClose) return;
    props.onClose(event, "backdropClick");
    formik.resetForm();
  };

  const closeHandler: DialogProps["onClose"] = (event) => {
    props.onClose && props.onClose(event, "escapeKeyDown");
    formik.resetForm();
  };

  const onSubmit: formikOnSubmitType<NetworkItemsType> = (
    { name, gatewayCidr },
    { resetForm }
  ) => {
    callCreateNetwork({
      createVpcNetworkModel: {
        name,
        gatewayCidr,
        vpcHostId,
      },
    })
      .unwrap()
      .then(() => {
        closeHandler(new Event("submit"), "escapeKeyDown");
        resetForm();
      })
      .catch(() => {});
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
    <Dialog {...props} onClose={closeHandler}>
      <DialogTitle align="center">ایجاد Network جدید</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Stack direction="column" rowGap={3} pt={2}>
            <DialogContentText textAlign="center">
              یک نام برای شناسایی Network خود مشخص کنید.
            </DialogContentText>

            <AlphaNumericTextField
              formik={formik}
              id="name"
              size="small"
              fullWidth
              error={Boolean(formik.errors.name && formik.touched.name)}
              helperText={formik.touched.name && formik.errors.name}
              placeholder="نام موردنظر را وارد کنید"
            />
            <TextField
              placeholder="مثال: 192.168.1.0/24"
              {...formik.getFieldProps("gatewayCidr")}
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
            />
            <Stack
              direction={{ xs: "column", md: "row" }}
              alignItems="center"
              gap={2}
            >
              <LoadingButton
                fullWidth
                type="submit"
                variant="contained"
                disabled={isLoading}
              >
                ایجاد
              </LoadingButton>
              <Button onClick={cancelBtnOnClick} fullWidth variant="outlined">
                انصراف
              </Button>
            </Stack>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};
