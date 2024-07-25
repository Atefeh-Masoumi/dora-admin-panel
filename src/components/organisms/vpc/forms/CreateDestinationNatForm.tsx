import { FC, useEffect, useMemo, useState } from "react";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Chip,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Stack } from "@mui/system";
import { FormikProps, useFormik } from "formik";
import { useParams } from "react-router";
// import { SelectNatService } from "./SelectNatService";
import {
  GetVpcGatewayNatResponse,
  useGetApiMyVpcIpListByVpcHostIdQuery,
  useGetApiMyVpcNatServiceListQuery,
  useGetApiMyVpcNetworkShortListByVpcHostIdQuery,
  usePostApiMyVpcNatCreateDnatMutation,
  usePutApiMyVpcNatEditMutation,
} from "src/app/services/api.generated";
import {
  CustomCreate_D_NatInitialValueType,
  NAT_TYPE,
  customCreate_D_NatInitialValueSchema,
  natFormikInitialValuesType,
} from "src/constant/vpc";
import { SelectNatService } from "../nat/SelectNatService";

type CreateDestinationNatFormPropsType = {
  selectedNat: GetVpcGatewayNatResponse | null;
  natFormik: FormikProps<natFormikInitialValuesType>;
  forceClose: () => void;
};

export const CreateDestinationNatForm: FC<
  CreateDestinationNatFormPropsType
> = ({ natFormik, forceClose, selectedNat }) => {
  const [vpcNetworkId, setVpcNetworkId] = useState<number | "">("");
  const [vpcIp, setVpcIp] = useState<string | "">("");

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));

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
  const { data: natServiceList } = useGetApiMyVpcNatServiceListQuery();

  const [createVpcNat, { isLoading: createNatLoading }] =
    usePostApiMyVpcNatCreateDnatMutation();
  const [editVpcNat, { isLoading: editNatLoading }] =
    usePutApiMyVpcNatEditMutation();

  const isLoading = useMemo(
    () => createNatLoading || editNatLoading,
    [createNatLoading, editNatLoading]
  );

  const initialValues: CustomCreate_D_NatInitialValueType = {
    vpcHostId: Number(vpcId!),
    natTypeId: NAT_TYPE.D_NAT,
    name: selectedNat?.name || natName || "",
    sourceIp: selectedNat?.sourceIp || null,
    destinationIp: selectedNat?.destinationIp || null,
    destinationPort: selectedNat?.destinationPort || null,
    translateIp: selectedNat?.translateIp || vpcIp,
    vpcHostServiceId: selectedNat?.serviceId || null,
    description: selectedNat?.description || "",
    isDisabled: true, //TODO : need change
    vpcNetworkId: selectedNat ? 1 : Number(vpcNetworkId),
  };

  const onSubmit: any = (values: any, { resetForm }: any) => {
    if (selectedNat?.id) {
      editVpcNat({
        editVpcGatewayNatModel: {
          ...values,
        },
      })
        .unwrap()
        .then((res) => {
          resetForm();
        })
        .catch((err) => {});
    } else {
      createVpcNat({
        createVpcGatewayDnatModel: {
          ...values,
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
    validationSchema: customCreate_D_NatInitialValueSchema,
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
            </Stack>
            <Stack width="100%" direction="column" rowGap={1}>
              <Stack width="100%" direction="column" rowGap={1}>
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

              <FormControl fullWidth>
                <TextField
                  fullWidth
                  {...formik.getFieldProps("destinationPort")}
                  size="small"
                  label="Translate Port"
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
                  {...formik.getFieldProps("destinationIp")}
                  size="small"
                  label="Destination IP"
                  focused
                  error={Boolean(
                    formik.errors.destinationIp && formik.touched.destinationIp
                  )}
                  helperText={
                    formik.touched.destinationIp && formik.errors.destinationIp
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
              <FormControl
                sx={{
                  direction: "rtl",
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      border: ` rgba(0, 0, 0, 0.23) 1px solid`,
                    },
                  },
                }}
                focused
                fullWidth
              >
                <SelectNatService
                  natServiceList={natServiceList}
                  formik={formik}
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
  );
};
