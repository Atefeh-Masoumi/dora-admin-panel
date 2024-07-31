import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";

import { useFormik } from "formik";
import { FC, useCallback } from "react";
import { useParams } from "react-router";
import * as yup from "yup";
import {
  CreateVpcGatewaySnatModel,
  useGetApiMyVpcIpListByVpcHostIdQuery,
  useGetApiMyVpcNetworkShortListByVpcHostIdQuery,
  usePostApiMyVpcNatCreateSnatMutation,
} from "src/app/services/api.generated";

import { AlphaNumericTextField } from "src/components/atoms/AlphaNumericTextField";
import { formikOnSubmitType } from "src/types/form.type";
import { ipValidation } from "src/utils/regex.utils";

const VALIDATION_REQUIRED_ERROR_MESSAGE = "فیلد الزامیست";

export const sNatInitialValueSchema = yup.object().shape({
  name: yup.string().required(VALIDATION_REQUIRED_ERROR_MESSAGE),
  vpcNetworkId: yup.number(),
  vpcHostGatewayIpId: yup.number().required(VALIDATION_REQUIRED_ERROR_MESSAGE),
  sourceIp: yup
    .string()
    .matches(
      ipValidation,
      "آدرس IP که وارد کردید یک آدرس IPv4 معتبر نیست. لطفاً قالب را بررسی کنید (به عنوان مثال، 192.168.1.1)."
    )
    .required(VALIDATION_REQUIRED_ERROR_MESSAGE),
  destinationIp: yup
    .string()
    .matches(
      ipValidation,
      "آدرس IP که وارد کردید یک آدرس IPv4 معتبر نیست. لطفاً قالب را بررسی کنید (به عنوان مثال، 192.168.1.1)."
    )
    .nullable(),
  destinationPort: yup
    .number()
    .typeError("مقدار را به عدد وارد کنید")
    .nullable(),
  description: yup.string(),
});

type CreateSourceNatFormPropsType = DialogProps & {
  forceClose: () => void;
};

export const CreateSourceNatDialog: FC<CreateSourceNatFormPropsType> = ({
  forceClose,
  ...props
}) => {
  const { vpcId } = useParams();

  const { data: vpcNetworkList } =
    useGetApiMyVpcNetworkShortListByVpcHostIdQuery({
      vpcHostId: Number(vpcId),
    });
  const { data: vpcHostGatewayList } = useGetApiMyVpcIpListByVpcHostIdQuery({
    vpcHostId: Number(vpcId),
  });
  const [createVpcNat, { isLoading }] = usePostApiMyVpcNatCreateSnatMutation();

  const initialValues: CreateVpcGatewaySnatModel = {
    vpcHostId: Number(vpcId!),
    name: "",
    vpcNetworkId: vpcNetworkList?.length ? vpcNetworkList[0].id : 1,
    vpcHostGatewayIpId: vpcHostGatewayList?.length
      ? vpcHostGatewayList[0].id
      : 1,
    sourceIp: "",
    destinationIp: null,
    destinationPort: null,
    description: "",
  };

  const onSubmit: formikOnSubmitType<CreateVpcGatewaySnatModel> = (
    values,
    { resetForm }
  ) => {
    createVpcNat({
      createVpcGatewaySnatModel: {
        ...values,
      },
    })
      .unwrap()
      .then((res) => {
        resetForm();
        formik.resetForm();
        forceClose();
      })
      .catch((err) => {});
  };

  const formik = useFormik({
    initialValues,
    validationSchema: sNatInitialValueSchema,
    onSubmit,
    enableReinitialize: true,
  });

  const dialogCloseHandler: DialogProps["onClose"] = (event) => {
    props.onClose && props.onClose(event, "escapeKeyDown");
    formik.resetForm();
  };

  return (
    <Dialog {...props} onClose={dialogCloseHandler}>
      <DialogTitle textAlign="center">ایجاد Source Nat جدید</DialogTitle>
      {vpcHostGatewayList &&
      vpcHostGatewayList?.length > 0 &&
      vpcNetworkList &&
      vpcNetworkList?.length > 0 ? (
        <form onSubmit={formik.handleSubmit}>
          <DialogContent sx={{ py: 4 }}>
            <Grid
              container
              columnSpacing={1}
              rowSpacing={2}
              sx={{ mt: { xs: 1, lg: 0 } }}
            >
              <Grid item xs={12} md={6} lg={3.6}>
                <FormControl
                  fullWidth
                  error={Boolean(formik.errors.name && formik.touched.name)}
                >
                  <Typography>نام سرویس</Typography>
                  <AlphaNumericTextField
                    formik={formik}
                    id="name"
                    size="small"
                    fullWidth
                    placeholder="نام موردنظر را وارد کنید"
                  />
                </FormControl>
              </Grid>
            </Grid>

            <Divider sx={{ py: 1 }} />

            <Grid container pt={2} rowGap={2} justifyContent="space-between">
              <Grid item xs={12} md={12} lg={3.5}>
                <Stack
                  pt={0}
                  mt={0}
                  rowGap={3}
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Stack justifyContent="center" width="100%">
                    <Chip label="Destination" sx={{ width: "100%" }} />
                  </Stack>
                  <Stack width="100%" direction="column" rowGap={2}>
                    <FormControl fullWidth>
                      <TextField
                        {...formik.getFieldProps("destinationIp")}
                        value={formik.values.destinationIp ?? ""}
                        size="small"
                        label="Destination IP"
                        focused
                        error={Boolean(
                          formik.errors.destinationIp &&
                            formik.touched.destinationIp
                        )}
                        helperText={
                          formik.touched.destinationIp &&
                          formik.errors.destinationIp
                        }
                        fullWidth
                        // sx={{
                        //   "& .MuiOutlinedInput-root": {
                        //     "&.Mui-focused fieldset": {
                        //       border: ({ palette }) =>
                        //         `${palette.customColor.neutralLighter} 1px solid`,
                        //     },
                        //   },
                        // }}
                      />
                    </FormControl>

                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        {...formik.getFieldProps("destinationPort")}
                        value={formik.values.destinationPort ?? ""}
                        size="small"
                        label="Destination Port"
                        focused
                        error={Boolean(
                          formik.errors.destinationPort &&
                            formik.touched.destinationPort
                        )}
                        helperText={
                          formik.touched.destinationPort &&
                          formik.errors.destinationPort
                        }
                        // sx={{
                        //   "& .MuiOutlinedInput-root": {
                        //     "&.Mui-focused fieldset": {
                        //       border: ({ palette }) =>
                        //         `${palette.customColor.neutralLighter} 1px solid`,
                        //     },
                        //   },
                        // }}
                      />
                    </FormControl>
                  </Stack>
                </Stack>
              </Grid>

              <Grid item xs={12} md={5.8} lg={3.5}>
                <Stack
                  pt={0}
                  mt={0}
                  rowGap={3}
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Stack justifyContent="center" width="100%">
                    <Chip label="Gateway" sx={{ width: "100%" }} />
                  </Stack>
                  <Stack width="100%" direction="column" rowGap={1}>
                    <FormControl size="small">
                      <InputLabel id="gateway-select">Gateway Ip</InputLabel>
                      <Select
                        {...formik.getFieldProps("vpcHostGatewayIpId")}
                        size="small"
                        labelId="gateway-select"
                        id="gateway-select"
                        label="Gateway Ip"
                        sx={{ paddingBottom: "3.5px" }}
                      >
                        {vpcHostGatewayList?.map((item, index) => (
                          <MenuItem key={index} value={item.id!}>
                            {item.ip}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={12} md={5.8} lg={3.5}>
                <Stack
                  pt={0}
                  mt={0}
                  rowGap={3}
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Stack justifyContent="center" width="100%">
                    <Chip label="Source" sx={{ width: "100%" }} />
                  </Stack>
                  <Stack width="100%" direction="column" rowGap={2}>
                    <FormControl>
                      <InputLabel id="network-select">Network</InputLabel>
                      <Select
                        {...formik.getFieldProps("vpcNetworkId")}
                        size="small"
                        labelId="network-select"
                        id="network-select"
                        label="Network"
                        sx={{ paddingBottom: "3.5px" }}
                      >
                        {vpcNetworkList?.map((item, index) => (
                          <MenuItem key={index} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        {...formik.getFieldProps("sourceIp")}
                        focused
                        // sx={{
                        //   "& .MuiOutlinedInput-root": {
                        //     "&.Mui-focused fieldset": {
                        //       border: ({ palette }) =>
                        //         `${palette.customColor.neutralLighter} 1px solid`,
                        //     },
                        //   },
                        // }}
                        size="small"
                        label="Source IP"
                        error={Boolean(
                          formik.errors.sourceIp && formik.touched.sourceIp
                        )}
                        helperText={
                          formik.touched.sourceIp && formik.errors.sourceIp
                        }
                      />
                    </FormControl>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Grid container rowSpacing={2}>
              <Grid item xs={12} lg={6}>
                <Stack
                  sx={{ width: "100%" }}
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
      ) : (
        <Alert severity="info">
          <Typography>لطفا ابتدا شبکه ایجاد کنید</Typography>
        </Alert>
      )}
    </Dialog>
  );
};
