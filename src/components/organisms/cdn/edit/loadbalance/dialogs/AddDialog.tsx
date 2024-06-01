import { FC, useEffect, useState } from "react";
import {
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogTitle,
  MenuItem,
  Stack,
  Typography,
  InputAdornment,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { BlurBackdrop } from "src/components/atoms/BlurBackdrop";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { formikOnSubmitType } from "src/types/form.type";
import { useAppSelector } from "src/app/hooks";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { DorsaSwitch } from "src/components/atoms/DorsaSwitch";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import PageLoading from "src/components/atoms/PageLoading";
import { useLazyGetApiMyCdnRouteGetByIdQuery } from "src/app/services/api";
import {
  DestinationModel,
  usePostApiMyCdnRouteCreateMutation,
  usePutApiMyCdnRouteEditMutation,
} from "src/app/services/api.generated";

type InitialValuesType = {
  id: number;
  host: string;
  destinations?: DestinationModel[] | null;
  loadBalancingPolicyId: number;
  maxConnectionsPerServer: number;
  dangerousAcceptAnyServerCertificate: boolean;
};

const loadBalancePolicyArray = [
  {
    label: "First",
    value: 1,
  },
  {
    label: "Random",
    value: 2,
  },
  {
    label: "Round Robin",
    value: 3,
  },
  {
    label: "Latest Requests",
    value: 4,
  },
  {
    label: "Rower of two choices",
    value: 5,
  },
];

const formValidation = yup.object().shape({
  host: yup.string().required("نام هاست را وارد کنید"),
  maxConnectionsPerServer: yup.string().required("تعداد کانکشن را وارد‍ کنید"),
});

type AddLoadBalanceDialogPropsType = {
  onClose: () => void;
  id?: number;
  openDialog: boolean;
};

export const AddLoadBalanceDialog: FC<AddLoadBalanceDialogPropsType> = ({
  onClose,
  id,
  openDialog,
}) => {
  const [initialValues, setInitialValues] = useState<InitialValuesType>({
    id: 0,
    host: "",
    destinations: [],
    loadBalancingPolicyId: 1,
    maxConnectionsPerServer: 0,
    dangerousAcceptAnyServerCertificate: false,
  });
  const selectedDomain = useAppSelector((store) => store.cdn.selectedDomain);
  const cdnId = selectedDomain?.id || 0;

  const [destinations, setDestinations] = useState<DestinationModel[]>([]);
  const [certificateSwitch, setCertificateSwitch] = useState(false);
  const [getDetails, { isLoading: getDetailsLoading }] =
    useLazyGetApiMyCdnRouteGetByIdQuery();

  useEffect(() => {
    if (!id) return;
    getDetails({ id: id })
      .unwrap()
      .then((res) => {
        if (res) {
          if (!res.destinations || !res.host) return;

          setCertificateSwitch(res.dangerousAcceptAnyServerCertificate!);
          setDestinations(res.destinations!);
          setInitialValues((prevState) => {
            let result = { ...prevState };
            result.host = res.host as string;
            result.maxConnectionsPerServer =
              res.maxConnectionsPerServer as number;
            result.loadBalancingPolicyId = res.loadBalancingPolicyId!;
            return result;
          });
        }
      });
  }, [getDetails, id]);

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

  const switchChangeHandler = () =>
    setCertificateSwitch((prevState) => !prevState);

  const [createLoadBalance, { isLoading: createLoadBalanceLoading }] =
    usePostApiMyCdnRouteCreateMutation();

  const [editLoadBalance, { isLoading: editLoadBalanceLoading }] =
    usePutApiMyCdnRouteEditMutation();

  const submitHandler: formikOnSubmitType<InitialValuesType> = (
    { host, loadBalancingPolicyId, maxConnectionsPerServer },
    { setSubmitting }
  ) => {
    if (id) {
      editLoadBalance({
        editCdnRouteModel: {
          id: selectedDomain?.id!,
          destinations,
          dangerousAcceptAnyServerCertificate: certificateSwitch,
          maxConnectionsPerServer: Number(maxConnectionsPerServer),
          host,
          loadBalancingPolicyId,
        },
      })
        .unwrap()
        .then(() => {
          toast.success("کلاستر با موفقیت بروز رسانی شد");
          onClose();
        });
    } else {
      createLoadBalance({
        createCdnRouteModel: {
          dnsHostId: cdnId,
          destinations,
          dangerousAcceptAnyServerCertificate: certificateSwitch,
          maxConnectionsPerServer: Number(maxConnectionsPerServer),
          host,
          loadBalancingPolicyId,
        },
      })
        .unwrap()
        .then(() => {
          toast.success("کلاستر با موفقیت بروز رسانی شد");
          onClose();
        });
    }

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
          sx: { borderRadius: 2.5 },
        }}
      >
        {getDetailsLoading && <PageLoading />}
        <DialogTitle fontWeight="bold" variant="text1">
          {id ? "ویرایش کلاستر" : "ایجاد کلاستر"}
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
                      fullWidth
                      label="نام هاست"
                      error={Boolean(errors.host && touched.host)}
                      helperText={errors.host}
                      {...getFieldProps("host")}
                    />
                  </Grid2>
                  <Grid2 xs={12} sm={6}>
                    <DorsaTextField
                      inputProps={{ fontSize: "20px !important" }}
                      select
                      fullWidth
                      label="نوع توزیع"
                      error={Boolean(
                        errors.loadBalancingPolicyId &&
                          touched.loadBalancingPolicyId
                      )}
                      helperText={errors.loadBalancingPolicyId}
                      {...getFieldProps("loadBalancingPolicyId")}
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
                      label="حداکثر کانکشن هر سرور"
                      error={Boolean(
                        errors.maxConnectionsPerServer &&
                          touched.maxConnectionsPerServer
                      )}
                      helperText={errors.maxConnectionsPerServer}
                      {...getFieldProps("maxConnectionsPerServer")}
                    />
                  </Grid2>
                </Grid2>
                <Stack spacing={3}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography
                      sx={{ color: ({ palette }) => palette.grey[700] }}
                    >
                      آدرس سرورهای کاربر
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
                    >
                      اضافه کردن
                    </Button>
                  </Stack>
                  {destinations.map(({ address }, index) => (
                    <DorsaTextField
                      key={index}
                      inputProps={{ fontSize: "20px !important" }}
                      fullWidth
                      label={"سرور " + (index + 1)}
                      value={address}
                      onChange={({ target: { value } }) =>
                        setDestinations((prevState) => {
                          let result = [...prevState];
                          result[index] = { address: value };
                          return result;
                        })
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">
                            <IconButton
                              onClick={() => removeDestinationInput(index)}
                            >
                              <TrashSvg />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{ "&> .MuiInputBase-root": { pr: "0 !important" } }}
                    />
                  ))}
                </Stack>
                <br />
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{
                    border: "1px solid rgba(110, 118, 138, 0.12)",
                    borderRadius: BORDER_RADIUS_1,
                    p: 1.5,
                  }}
                >
                  <Typography color="rgba(110, 118, 138, 0.8)">
                    عدم اتصال در زمان خطای certificate کاربر
                  </Typography>
                  <DorsaSwitch
                    checked={certificateSwitch}
                    onChange={switchChangeHandler}
                  />
                </Stack>
                <br />
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
                    loading={createLoadBalanceLoading || editLoadBalanceLoading}
                    variant="contained"
                    sx={{ px: 3, py: 0.8 }}
                  >
                    ذخیره تغییرات
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
