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
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Form, Formik } from "formik";
import { FC, useState } from "react";
import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import {
  DestinationModel,
  useGetApiMyVmHostListByVmProjectIdQuery,
  useGetApiMyVpcIpListByVpcHostIdQuery,
  usePostApiMyVpcLoadBalancerCreateMutation,
} from "src/app/services/api.generated";
import { BlurBackdrop } from "src/components/atoms/BlurBackdrop";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import PageLoading from "src/components/atoms/PageLoading";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { formikOnSubmitType } from "src/types/form.type";
import * as yup from "yup";

type InitialValuesType = {
  vpcHostGatewayId: number | null;
  vpcHostGatewayIpId: number | null;
  serverPoolPort: number | null;
  algorithmTypeId: number | null;
  poolMembers: any[] | null;
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
  serverPoolPort: yup.number().nullable().required("پورت را وارد کنید"),
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
  const [selectedGateway, setSelectedGateway] = useState<any>({
    vpcHostGatewayId: null,
    id: null,
  });
  const [initialValues, setInitialValues] = useState<InitialValuesType>({
    vpcHostGatewayId: null,
    vpcHostGatewayIpId: null,
    serverPoolPort: null,
    algorithmTypeId: null,
    poolMembers: [],
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
    usePostApiMyVpcLoadBalancerCreateMutation();

  const addDestinationInput = () =>
    setDestinations((prevState) => {
      let result = [...prevState];
      result.push({ address: "" });
      return result;
    });

  const removeDestinationInput = (index: number) => {
    setDestinations((prevState) => {
      let result = [...prevState];
      result.splice(index, 1);
      return result;
    });
  };

  const handleMenuItemClick = (vpcHostGatewayId: number, id: number) => {
    setSelectedGateway({ vpcHostGatewayId, id });
  };

  const submitHandler: formikOnSubmitType<InitialValuesType> = (
    values,
    { setSubmitting }
  ) => {
    console.log(values);

    setSubmitting(false);
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
        <Formik
          initialValues={initialValues}
          validationSchema={formValidation}
          onSubmit={submitHandler}
          enableReinitialize
        >
          {({ errors, touched, getFieldProps }) => (
            <Form autoComplete="on">
              <Stack p={{ xs: 1.8, md: 3 }} spacing={{ xs: 2, md: 5 }}>
                <Grid2 container spacing={3}>
                  <Grid2 xs={12} sm={6}>
                    <DorsaTextField
                      inputProps={{ fontSize: "20px !important" }}
                      select
                      fullWidth
                      label="Gateway IP"
                      error={Boolean(
                        errors.vpcHostGatewayIpId && touched.vpcHostGatewayIpId
                      )}
                      helperText={errors.vpcHostGatewayIpId}
                      {...getFieldProps("vpcHostGatewayIpId")}
                    >
                      {vpcIpList?.map(
                        ({ id, ip, isV4, isPrimary, vpcHostGatewayId }) => {
                          return (
                            <MenuItem
                              onClick={() =>
                                handleMenuItemClick(
                                  Number(vpcHostGatewayId),
                                  Number(id)
                                )
                              }
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
                          );
                        }
                      )}
                    </DorsaTextField>
                  </Grid2>
                  <Grid2 xs={12} sm={6}>
                    <DorsaTextField
                      inputProps={{ fontSize: "20px !important" }}
                      select
                      fullWidth
                      label="نوع توزیع"
                      error={Boolean(
                        errors.algorithmTypeId && touched.algorithmTypeId
                      )}
                      helperText={errors.algorithmTypeId}
                      {...getFieldProps("algorithmTypeId")}
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
                      inputProps={{ fontSize: "20px !important" }}
                      fullWidth
                      label="پورت"
                      error={Boolean(
                        errors.serverPoolPort && touched.serverPoolPort
                      )}
                      helperText={errors.serverPoolPort}
                      {...getFieldProps("serverPoolPort")}
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
                    <Typography
                      sx={{ color: ({ palette }) => palette.grey[800] }}
                    >
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
                    {destinations.map(({ address }, index) => (
                      <>
                        <Grid item xs={7} mb={2}>
                          <DorsaTextField
                            key={index}
                            inputProps={{ fontSize: "20px !important" }}
                            select
                            fullWidth
                            label={"vm" + (index + 1)}
                            // error={Boolean(
                            //   errors.algorithmTypeId && touched.algorithmTypeId
                            // )}
                            // helperText={errors.algorithmTypeId}
                            {...getFieldProps("algorithmTypeId")}
                          >
                            {vmHostList?.map(({ id, name }) => (
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
                        <Grid item xs={3} mb={2}>
                          <DorsaTextField
                            inputProps={{ fontSize: "20px !important" }}
                            fullWidth
                            label="پورت"
                            // {...getFieldProps("serverPoolPort")}
                          />
                        </Grid>
                        <Grid item xs={1} mb={2}>
                          <IconButton
                            onClick={() => removeDestinationInput(index)}
                          >
                            <TrashSvg />
                          </IconButton>
                        </Grid>
                      </>
                    ))}
                  </Grid>
                </Stack>
                <DialogActions>
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
                </DialogActions>
              </Stack>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
};
