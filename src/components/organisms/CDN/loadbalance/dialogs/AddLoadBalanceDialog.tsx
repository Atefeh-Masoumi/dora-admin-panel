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
import { TrashSvg } from "src/components/atoms/svg/TrashSvg";
import { DorsaSwitch } from "src/components/atoms/DorsaSwitch";
import { BORDER_RADIUS_5 } from "src/configs/theme";
import PageLoading from "src/components/atoms/PageLoading";
import { useLazyGetUserV2CdnLoadBalanceGetByIdQuery } from "src/app/services/api";
import {
  DestinationModel,
  LoadBalanceListResponse,
  EditLoadBalanceModel,
  usePostUserV2CdnLoadBalanceCreateMutation,
  usePutUserV2CdnLoadBalanceEditMutation,
} from "src/app/services/api.generated";

type initialValuesType = Omit<
  EditLoadBalanceModel,
  "id" | "destinations" | "dangerousAcceptAnyServerCertificate"
>;

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
  loadBalance?: LoadBalanceListResponse;
};

export const AddLoadBalanceDialog: FC<AddLoadBalanceDialogPropsType> = ({
  onClose,
  loadBalance,
}) => {
  const [initialValues, setInitialValues] = useState<initialValuesType>({
    host: loadBalance?.host || "",
    loadBalancingPolicyId: 1,
    maxConnectionsPerServer: loadBalance?.maxConnectionsPerServer || 0,
  });
  const selectedDomain = useAppSelector((state) => state.cdn.selectedDomain);

  const [destinations, setDestinations] = useState<DestinationModel[]>([]);
  const [certificateSwitch, setCertificateSwitch] = useState(false);
  const [getDetails, { isLoading: getDetailsLoading }] = useLazyGetUserV2CdnLoadBalanceGetByIdQuery();

  useEffect(() => {
    if (!loadBalance?.id) return;
    getDetails({ id: loadBalance.id })
      .unwrap()
      .then((res) => {
        if (res) {
          res.dangerousAcceptAnyServerCertificate &&
            setCertificateSwitch(res.dangerousAcceptAnyServerCertificate);

          res.destinations && setDestinations(res.destinations);
          res.loadBalancingPolicyId !== undefined &&
            setInitialValues((prevState) => {
              let result = { ...prevState };
              result.loadBalancingPolicyId = res.loadBalancingPolicyId!;
              return result;
            });
        }
      });
  }, [getDetails, loadBalance]);

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

  const switchChangeHandler = () => setCertificateSwitch((prevState) => !prevState);

  const [createLoadBalance, { isLoading: createLoadBalanceLoading }] = usePostUserV2CdnLoadBalanceCreateMutation();

  const [editLoadBalance, { isLoading: editLoadBalanceLoading }] = usePutUserV2CdnLoadBalanceEditMutation();

  const submitHandler: formikOnSubmitType<initialValuesType> = (
    { host, loadBalancingPolicyId, maxConnectionsPerServer },
    { setSubmitting }
  ) => {
    if (loadBalance) {
      editLoadBalance({
        editLoadBalanceModel: {
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
          toast.success("کلاستر با موفقیت آپدیت شد");
          onClose();
        });
    } else {
      createLoadBalance({
        createLoadBalanceModel: {
          zoneName: selectedDomain?.zoneName!,
          destinations,
          dangerousAcceptAnyServerCertificate: certificateSwitch,
          maxConnectionsPerServer: Number(maxConnectionsPerServer),
          host,
          loadBalancingPolicyId,
        },
      })
        .unwrap()
        .then(() => {
          toast.success("کلاستر با موفقیت آپدیت شد");
          onClose();
        });
    }

    setSubmitting(false);
  };

  return (
    <>
      {getDetailsLoading && <PageLoading />}
      <Dialog
        open
        onClose={onClose}
        components={{ Backdrop: BlurBackdrop }}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2.5 },
        }}
      >
        <DialogTitle fontWeight="bold" variant="text1">
          {loadBalance ? "ویرایش کلاستر" : "ایجاد کلاستر"}
        </DialogTitle>
        <Formik
          initialValues={initialValues}
          validationSchema={formValidation}
          onSubmit={submitHandler}
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
                    borderRadius: BORDER_RADIUS_5,
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
