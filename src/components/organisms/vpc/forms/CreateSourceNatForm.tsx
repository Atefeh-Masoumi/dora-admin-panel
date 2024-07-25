import { FC, useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useParams } from "react-router";
import { FormikProps, useFormik } from "formik";
import { formikOnSubmitType } from "src/types/form.type";
import {
  GetVpcGatewayNatResponse,
  useGetApiMyVpcIpListByVpcHostIdQuery,
  useGetApiMyVpcNetworkShortListByVpcHostIdQuery,
  usePostApiMyVpcNatCreateSnatMutation,
} from "src/app/services/api.generated";
import {
  NAT_TYPE,
  customCreate_S_NatInitialValueSchema,
  customCreate_S_NatInitialValueType,
  natFormikInitialValuesType,
} from "src/constant/vpc";

type CreateSourceNatFormPropsType = {
  selectedNat: GetVpcGatewayNatResponse | null;
  forceClose: () => void;
  natFormik: FormikProps<natFormikInitialValuesType>;
};

export const CreateSourceNatForm: FC<CreateSourceNatFormPropsType> = ({
  natFormik,
  forceClose,
  selectedNat,
}) => {
  const [vpcNetworkId, setVpcNetworkId] = useState<number | "">("");
  const [vpcIp, setVpcIp] = useState<string | "">("");
  const { vpcId } = useParams();
  const { name: natName } = natFormik.values;

  const { data: vpcNetworkList, isLoading: vpcNetworkListLoading } =
    useGetApiMyVpcNetworkShortListByVpcHostIdQuery({
      vpcHostId: Number(vpcId),
    });
  const { data: vpcIpList, isLoading: vpcIpListLoading } =
    useGetApiMyVpcIpListByVpcHostIdQuery({
      vpcHostId: Number(vpcId),
    });
  const [createVpcNat, { isLoading: isLoading }] =
    usePostApiMyVpcNatCreateSnatMutation();

  const initialValues: customCreate_S_NatInitialValueType = {
    vpcHostId: Number(vpcId!),
    natTypeId: NAT_TYPE.S_NAT,
    name: selectedNat?.name || natName || "",
    sourceIp: selectedNat?.sourceIp || "",
    destinationIp: selectedNat?.destinationIp || null,
    destinationPort: selectedNat?.destinationPort || null,
    translateIp: selectedNat?.translateIp || vpcIp,
    description: selectedNat?.description || "",
    isDisabled: false, // TODO : need change
    vpcNetworkId: selectedNat ? 1 : Number(vpcNetworkId),
  };

  const onSubmit: formikOnSubmitType<customCreate_S_NatInitialValueType> = (
    values,
    { resetForm }
  ) => {
    if (selectedNat) {
      createVpcNat({
        createVpcGatewaySnatModel: {
          ...values,
          vpcHostServiceId: null,
        },
      })
        .unwrap()
        .then((res) => {
          resetForm();
          natFormik.resetForm();
          forceClose();
        })
        .catch((err) => {});
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: customCreate_S_NatInitialValueSchema,
    onSubmit,
    enableReinitialize: true,
  });

  useEffect(() => {
    if (vpcNetworkListLoading) return;
    if (vpcNetworkList && vpcNetworkList?.length > 0) {
      setVpcNetworkId(vpcNetworkList?.[0].id);
    }
  }, [vpcNetworkListLoading, vpcIpListLoading, vpcNetworkList]);

  useEffect(() => {
    if (vpcIpListLoading) return;
    if (vpcIpList && vpcIpList?.[0].ip) {
      setVpcIp(vpcIpList?.[0].ip);
    }
  }, [vpcIpList, vpcIpListLoading]);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid container pt={2} rowGap={2} justifyContent="space-between">
          <Grid item xs={12} md={5.8} lg={3.5}>
            <Stack
              pt={0}
              mt={0}
              rowGap={3}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Stack
                justifyContent="center"
                width="100%"
                borderBottom="1px solid rgba(0, 0, 0, 0.23)"
              >
                <Typography variant="text4" textAlign="end">
                  Source
                </Typography>
                {/* <Chip label="Gateway" sx={{ width: "100%" }} /> */}
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
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          border: ` rgba(0, 0, 0, 0.23) 1px solid`,
                        },
                      },
                    }}
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
          <Grid item xs={12} md={5.8} lg={3.5}>
            <Stack
              pt={0}
              mt={0}
              rowGap={3}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Stack
                justifyContent="center"
                width="100%"
                borderBottom="1px solid rgba(0, 0, 0, 0.23)"
              >
                <Typography variant="text4" textAlign="end">
                  Gateway
                </Typography>
                {/* <Chip label="Gateway" sx={{ width: "100%" }} /> */}
              </Stack>
              <Stack width="100%" direction="column" rowGap={2}>
                <FormControl>
                  <InputLabel id="translate-select">Translate Ip</InputLabel>
                  <Select
                    {...formik.getFieldProps("translateIp")}
                    size="small"
                    labelId="translate-select"
                    id="translate-select"
                    label="Translate Ip"
                    sx={{ paddingBottom: "3.5px" }}
                  >
                    {vpcIpList?.map((item, index) => (
                      <MenuItem key={index} value={item.ip!}>
                        {item.ip}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} md={12} lg={3.5}>
            <Stack
              pt={0}
              mt={0}
              rowGap={3}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Stack
                justifyContent="center"
                width="100%"
                borderBottom="1px solid rgba(0, 0, 0, 0.23)"
              >
                <Typography variant="text4" textAlign="end">
                  Destination
                </Typography>
              </Stack>
              <Stack
                width="100%"
                direction={{ xs: "column", md: "row", lg: "column" }}
                rowGap={2}
                columnGap={3}
              >
                <FormControl fullWidth>
                  <TextField
                    {...formik.getFieldProps("destinationIp")}
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
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          border: ` rgba(0, 0, 0, 0.23) 1px solid`,
                        },
                      },
                    }}
                  />
                </FormControl>

                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    {...formik.getFieldProps("destinationPort")}
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
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          border: ` rgba(0, 0, 0, 0.23) 1px solid`,
                        },
                      },
                    }}
                  />
                </FormControl>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
        <Grid
          justifyContent={{ xs: "center", md: "start", lg: "start" }}
          sx={{ mt: { xs: 1, lg: 1 } }}
          container
          rowSpacing={{ xs: 2, md: 3 }}
          columnSpacing={1}
        >
          <Grid item xs={12} md={2.9} lg={1.8}>
            <LoadingButton
              loading={isLoading}
              fullWidth
              type="submit"
              variant="contained"
            >
              {selectedNat?.id ? "ویرایش" : "ایجاد"}
            </LoadingButton>
          </Grid>

          <Grid item xs={12} md={2.9} lg={1.8}>
            <Button onClick={forceClose} fullWidth variant="outlined">
              انصراف
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
