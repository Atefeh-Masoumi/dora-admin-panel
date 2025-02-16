import { Add } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { Grid2 } from "@mui/material";
import { FormikErrors, useFormik } from "formik";
import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  DestinationModel,
  useGetApiMyVmHostListByVmProjectIdQuery,
  useGetApiMyVpcIpListByVpcHostIdQuery,
  usePostApiMyVpcLoadBalanceCreateMutation,
} from "src/app/services/api.generated";
import { BlurBackdrop } from "src/components/atoms/BlurBackdrop";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import PageLoading from "src/components/atoms/PageLoading";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import * as yup from "yup";

type InitialValuesType = {
  vpcHostGatewayId: number | null;
  vpcHostGatewayIpId: number | null;
  serverPoolPort: number | null;
  algorithmTypeId: number | null;
  poolMembers: { vmHostId: number; port: number }[];
};

const loadBalancePolicyArray = [
  {
    label: "Round Robin",
    value: 1,
  },
  {
    label: "Weighted Round Robin",
    value: 2,
  },
  {
    label: "Least Connection",
    value: 3,
  },
  {
    label: "Weighted Least Connection",
    value: 4,
  },
  {
    label: "IP Hash",
    value: 5,
  },
];

const formValidation = yup.object().shape({
  algorithmTypeId: yup.number().nullable().required("نوع توزیع را انتخاب کنید"),
  vpcHostGatewayIpId: yup.number().nullable().required("IP را انتخاب کنید"),
  serverPoolPort: yup.number().nullable().required("Port را وارد کنید"),
  poolMembers: yup
    .array()
    .of(
      yup.object().shape({
        vmHostId: yup.number().nullable().required("VM را وارد کنید"),
        port: yup
          .number()
          .nullable()
          .required("Port را وارد کنید")
          .max(65535, "پورت باید کوچک‌تر از ۶۵۵۳۶ باید"),
      })
    )
    .min(1, "حداقل یک Pool Member نیاز است"),
});

type CreateVpcLoadBalancerDialogPropsType = {
  onClose: () => void;
  openDialog: boolean;
};

export const CreateVpcLoadBalancerDialog: FC<
  CreateVpcLoadBalancerDialogPropsType
> = ({ onClose, openDialog }) => {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("projectId");
  const { vpcId } = useParams();
  const [selectedGatewayIp, setSelectedGatewayIp] = useState<any>({
    id: null,
  });
  const [destinations, setDestinations] = useState<DestinationModel[]>([]);

  const { data: vpcIpList, isLoading: vpcIpListLoading } =
    useGetApiMyVpcIpListByVpcHostIdQuery({
      vpcHostId: Number(vpcId),
    });

  const { data: vmHostList, isLoading: vmHostListLoading } =
    useGetApiMyVmHostListByVmProjectIdQuery({
      vmProjectId: Number(projectId),
    });

  const [createVpcLoadBalancer, { isLoading: createVpcLoadBalancerLoading }] =
    usePostApiMyVpcLoadBalanceCreateMutation();

  const formik = useFormik<InitialValuesType>({
    initialValues: {
      vpcHostGatewayId: null,
      vpcHostGatewayIpId: null,
      serverPoolPort: null,
      algorithmTypeId: null,
      poolMembers: [],
    },
    validationSchema: formValidation,
    onSubmit: (values, { setSubmitting }) => {
      createVpcLoadBalancer({
        createVpcHostLbModel: {
          vpcHostGatewayIpId: Number(selectedGatewayIp?.id),
          vpcHostLbPort: Number(values.serverPoolPort),
          vpcHostLbTypeId: Number(values.algorithmTypeId),
          vpcHostLbNodes: values.poolMembers,
        },
      })
        .unwrap()
        .then(() => {
          toast.success("با موفقیت ساخته شد");
          onClose();
        })
        .catch(() => {});

      setSubmitting(false);
    },
    enableReinitialize: true,
  });

  const addDestinationInput = () => {
    setDestinations((prevState) => {
      let result = [...prevState];
      result.push({ address: "" });
      return result;
    });
    formik.setFieldValue("poolMembers", [
      ...formik.values.poolMembers,
      { vmHostId: null, port: null },
    ]);
  };

  const removeDestinationInput = (index: number) => {
    setDestinations((prevState) => {
      let result = [...prevState];
      result.splice(index, 1);
      return result;
    });
    formik.setFieldValue(
      "poolMembers",
      formik.values.poolMembers.filter((_, i) => i !== index)
    );
  };

  const handleVpcListItemClick = (id: number) => {
    setSelectedGatewayIp({ id });
  };

  const handleVmChange = (index: number, vmHostId: number) => {
    const updatedPoolMembers = [...formik.values.poolMembers];
    updatedPoolMembers[index] = { ...updatedPoolMembers[index], vmHostId };
    formik.setFieldValue("poolMembers", updatedPoolMembers);
  };

  const handlePortChange = (index: number, port: number) => {
    const updatedPoolMembers = [...formik.values.poolMembers];
    updatedPoolMembers[index] = { ...updatedPoolMembers[index], port };
    formik.setFieldValue("poolMembers", updatedPoolMembers);
  };

  const getAvailableVms = (index: number) => {
    const selectedVmIds = formik.values.poolMembers.map(
      (member) => member.vmHostId
    );
    return vmHostList?.filter(
      (vm) =>
        !selectedVmIds.includes(Number(vm.id)) ||
        vm.id === formik.values.poolMembers[index]?.vmHostId
    );
  };

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={onClose}
        components={{ Backdrop: BlurBackdrop }}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: { borderRadius: BORDER_RADIUS_1 },
        }}
      >
        {vpcIpListLoading && <PageLoading />}
        <DialogTitle fontWeight="bold" variant="text1">
          ایجاد LoadBalancer
        </DialogTitle>
        <form onSubmit={formik.handleSubmit} autoComplete="on">
          <Stack p={{ xs: 1.8, md: 3 }} spacing={{ xs: 2, md: 5 }}>
            <Grid2 container spacing={3}>
              <Grid2 size={{xs:12,md:6}}>
                <DorsaTextField
                  select
                  fullWidth
                  label="Gateway IP"
                  error={Boolean(
                    formik.errors.vpcHostGatewayIpId &&
                      formik.touched.vpcHostGatewayIpId
                  )}
                  helperText={formik.errors.vpcHostGatewayIpId}
                  {...formik.getFieldProps("vpcHostGatewayIpId")}
                >
                  {vpcIpList?.map(({ id, ip, isV4, isPrimary }) => (
                    <MenuItem
                      onClick={() => handleVpcListItemClick(Number(id))}
                      key={id}
                      value={id}
                      sx={{
                        borderRadius: 1,
                        backgroundColor: "#F3F4F6",
                        m: 0.5,
                        py: 1.5,
                        color: "secondary",
                        "&: focus": {
                          color: "rgba(60, 138, 255, 1)",
                          backgroundColor: "rgba(60, 138, 255, 0.1)",
                        },
                      }}
                    >
                      {ip}
                    </MenuItem>
                  ))}
                </DorsaTextField>
              </Grid2>
              <Grid2 size={{xs:12,md:6}}>
                <DorsaTextField
                  select
                  fullWidth
                  label="نوع توزیع"
                  error={Boolean(
                    formik.errors.algorithmTypeId &&
                      formik.touched.algorithmTypeId
                  )}
                  helperText={formik.errors.algorithmTypeId}
                  {...formik.getFieldProps("algorithmTypeId")}
                >
                  {loadBalancePolicyArray.map(({ label, value }) => (
                    <MenuItem
                      key={value}
                      value={value}
                      sx={{
                        borderRadius: 1,
                        backgroundColor: "#F3F4F6",
                        m: 0.5,
                        py: 1.5,
                        color: "secondary",
                        "&: focus": {
                          color: "rgba(60, 138, 255, 1)",
                          backgroundColor: "rgba(60, 138, 255, 0.1)",
                        },
                      }}
                    >
                      {label}
                    </MenuItem>
                  ))}
                </DorsaTextField>
              </Grid2>
              <Grid2 xs={12}>
                <DorsaTextField
                  fullWidth
                  label="Server Pool Port"
                  error={Boolean(
                    formik.errors.serverPoolPort &&
                      formik.touched.serverPoolPort
                  )}
                  helperText={formik.errors.serverPoolPort}
                  {...formik.getFieldProps("serverPoolPort")}
                  inputProps={{
                    maxLength: 5,
                  }}
                />
              </Grid2>
            </Grid2>
            <Divider />
            <Stack spacing={3}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography sx={{ color: ({ palette }) => palette.grey[800] }}>
                  آدرس‌ها
                </Typography>
                <Button
                  variant="text"
                  color="secondary"
                  sx={{
                    color: "primary.main",
                    justifyContent: "space-between",
                    py: 1,
                    fontSize: "16px",
                  }}
                  startIcon={<Add />}
                  onClick={addDestinationInput}
                  disabled={vmHostList?.length === destinations.length}
                >
                  اضافه کردن
                </Button>
              </Stack>
              <Grid container columnSpacing={1} alignItems={"center"}>
                {destinations.map((destination, index) => (
                  <>
                    <Grid item xs={6} mb={2}>
                      <DorsaTextField
                        key={index}
                        select
                        fullWidth
                        label={"vm" + (index + 1)}
                        value={formik.values.poolMembers[index]?.vmHostId || ""}
                        onChange={(e) =>
                          handleVmChange(index, Number(e.target.value))
                        }
                        error={Boolean(
                          (
                            formik.errors.poolMembers?.[index] as FormikErrors<{
                              vmHostId: number;
                              port: number;
                            }>
                          )?.vmHostId
                        )}
                        helperText={
                          (
                            formik.errors.poolMembers?.[index] as FormikErrors<{
                              vmHostId: number;
                              port: number;
                            }>
                          )?.vmHostId
                        }
                      >
                        {getAvailableVms(index)?.map(({ id, name }) => (
                          <MenuItem
                            key={id}
                            value={id}
                            sx={{
                              borderRadius: 1,
                              backgroundColor: "#F3F4F6",
                              m: 0.5,
                              py: 1.5,
                              color: "secondary",
                              "&: focus": {
                                color: "rgba(60, 138, 255, 1)",
                                backgroundColor: "rgba(60, 138, 255, 0.1)",
                              },
                            }}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </DorsaTextField>
                    </Grid>
                    <Grid item xs={4} mb={2}>
                      <DorsaTextField
                        inputProps={{
                          maxLength: 5,
                        }}
                        fullWidth
                        label="Port"
                        value={formik.values.poolMembers[index]?.port || ""}
                        onChange={(e) =>
                          handlePortChange(index, Number(e.target.value))
                        }
                        error={Boolean(
                          (
                            formik.errors.poolMembers?.[index] as FormikErrors<{
                              vmHostId: number;
                              port: number;
                            }>
                          )?.port
                        )}
                        helperText={
                          (
                            formik.errors.poolMembers?.[index] as FormikErrors<{
                              vmHostId: number;
                              port: number;
                            }>
                          )?.port
                        }
                      />
                    </Grid>
                    <Grid item xs={1} mb={2}>
                      <IconButton onClick={() => removeDestinationInput(index)}>
                        <TrashSvg />
                      </IconButton>
                    </Grid>
                  </>
                ))}
              </Grid>
            </Stack>
            <DialogActions>
              <Stack direction="row" justifyContent="end" spacing={1}>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{ px: 3, py: 0.8 }}
                  onClick={onClose}
                >
                  انصراف
                </Button>
                <LoadingButton
                  component="button"
                  type="submit"
                  loading={createVpcLoadBalancerLoading}
                  variant="contained"
                  sx={{ px: 3, py: 0.8 }}
                >
                  ذخیره
                </LoadingButton>
              </Stack>
            </DialogActions>
          </Stack>
        </form>
      </Dialog>
    </>
  );
};
