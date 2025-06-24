import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  MenuItem,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { FC, MouseEventHandler } from "react";
import { useParams } from "react-router-dom";
import { useGetApiMyVmByProjectIdNetworkShortListQuery, usePostApiMyVmByProjectIdVpcAndVpcHostIdInterfaceCreateMutation } from "src/app/services/api.generated";
import { AlphaNumericTextField } from "src/components/atoms/AlphaNumericTextField";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { formikOnSubmitType } from "src/types/form.type";
import { maskRegexOnly24 } from "src/utils/regex.utils";
import * as yup from "yup";

export type NetworkItemsType = {
  // id?: number;
  // gatewayCidr: string;
  // name: string;
  vmNetworkId:number
};

export const CreateNetworkRecordModal: FC<DialogProps> = ({ ...props }) => {
  const { vpcId, projectId } = useParams();
  const vpcHostId = Number(vpcId) || 0;
  const [callCreateNetwork, { isLoading }] =
    usePostApiMyVmByProjectIdVpcAndVpcHostIdInterfaceCreateMutation();

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
    { vmNetworkId  },
    { resetForm }
  ) => {
    callCreateNetwork({
      createVpcInterfaceModel: {
        // name,
        // gatewayCidr,
        vmNetworkId,
      },
      projectId: Number(projectId),
      vpcHostId: vpcHostId,

    })
      .unwrap()
      .then(() => {
        closeHandler(new Event("submit"), "escapeKeyDown");
        resetForm();
      })
      .catch(() => { });
  };

  const initialValues = {
    vmNetworkId: 0
  };

  const formik = useFormik({
    initialValues,
    validationSchema: yup.object().shape({
      vmNetworkId: yup.number().required(),
      // name: yup.string().required("این بخش الزامی می‌باشد"),
      // gatewayCidr: yup
      //   .string()
      //   .matches(maskRegexOnly24, {
      //     message: "Ip طبق الگو و maskBits=24 باشد.",
      //   })
      //   .required("این بخش الزامی می‌باشد"),
    }),
    onSubmit,
  });
  const { data: networkList, isLoading: networkLoading } = useGetApiMyVmByProjectIdNetworkShortListQuery({
    projectId: Number(projectId),
  });
  return (
    <Dialog {...props} onClose={closeHandler}>
      <DialogTitle justifyContent="left">
        <Typography fontSize="1.25rem" component="span" fontWeight={700}>
          ایجاد Network جدید
        </Typography>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Stack direction="column" rowGap={3}>
            {networkLoading ? (
               <Stack spacing={2} justifyContent="center">
                  {[...Array(2)].map((_, index) => (
                    <Skeleton
                      key={index}
                      variant="rectangular"
                      height={70}
                      width={240}
                      sx={{
                        bgcolor: "secondary.light",
                        borderRadius: BORDER_RADIUS_1,
                      }}
                    />
                  ))}
               </Stack>
            ) : (
              <DorsaTextField
              select
                {...formik.getFieldProps("vmNetworkId")}
                error={Boolean(formik.errors.vmNetworkId && formik.touched.vmNetworkId)}
                fullWidth
              >
                {networkList?.map(({ name, id }) => (
                  <MenuItem key={id} value={id}>
                    {name}
                  </MenuItem>
                ))}
              </DorsaTextField>
            )}

            {/* <DialogContentText justifyContent="left">
              یک نام برای شناسایی Network خود مشخص کنید.
            </DialogContentText> */}

            {/* <AlphaNumericTextField
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
              placeholder="e.g: 192.168.1.0/24"
              {...formik.getFieldProps("gatewayCidr")}
              error={Boolean(
                formik.errors.gatewayCidr && formik.touched.gatewayCidr
              )}
              dir="ltr"
              helperText={formik.errors.gatewayCidr}
              focused
              size="small"
              label="GatewayCIDR"
              InputLabelProps={{
                style: {
                  textAlign: "start",
                  left: -95,
                },
              }}
              FormHelperTextProps={{
                style: {
                  textAlign: "end",
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    border: ({ palette }) => `#ccc 1px solid`,
                  },
                },
              }}
            /> */}
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
            loading={isLoading}
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
