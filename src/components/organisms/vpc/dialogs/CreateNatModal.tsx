import {
  Alert,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { FormikProps, useFormik } from "formik";
import { FC } from "react";
import { useParams } from "react-router";
import {
  GetVpcGatewayNatResponse,
  useGetApiMyVpcIpListByVpcHostIdQuery,
  useGetApiMyVpcNetworkShortListByVpcHostIdQuery,
} from "src/app/services/api.generated";
import { AlphaNumericTextField } from "src/components/atoms/AlphaNumericTextField";
import {
  NAT_TYPE,
  natFormikInitialValuesType,
  natNameAndTypeValidationSchema,
} from "src/constant/vpc";
import { formikOnSubmitType } from "src/types/form.type";
import { CreateSourceNatForm } from "../forms/CreateSourceNatForm";

type CreateNatDialogPropsType = DialogProps & {
  selectedNat: GetVpcGatewayNatResponse | null;
  forceClose: () => void;
};

export const CreateNatDialog: FC<CreateNatDialogPropsType> = ({
  selectedNat,
  forceClose,
  ...props
}) => {
  const { vpcId } = useParams();
  const { data: vpcNetworkList, isLoading: vpcNetworkListLoading } =
    useGetApiMyVpcNetworkShortListByVpcHostIdQuery({
      vpcHostId: Number(vpcId),
    });
  const { data: vpcIpList, isLoading: vpcIpListLoading } =
    useGetApiMyVpcIpListByVpcHostIdQuery({
      vpcHostId: Number(vpcId),
    });
  const onSubmit: formikOnSubmitType<natFormikInitialValuesType> = (
    values
  ) => {};

  const initialValues = {
    name: "",
    natType: NAT_TYPE.S_NAT,
  };

  const natFormik: FormikProps<natFormikInitialValuesType> = useFormik({
    initialValues,
    validationSchema: natNameAndTypeValidationSchema,
    onSubmit,
    enableReinitialize: true,
  });

  const dialogCloseHandler: DialogProps["onClose"] = (event) => {
    props.onClose && props.onClose(event, "escapeKeyDown" || "backdropClick");
    natFormik.resetForm();
  };

  return (
    <Dialog {...props} onClose={dialogCloseHandler}>
      <DialogTitle align="center">ایجاد NAT جدید</DialogTitle>
      <DialogContent sx={{ p: 4 }}>
        {vpcIpList &&
        vpcIpList?.length > 0 &&
        vpcNetworkList &&
        vpcNetworkList?.length > 0 ? (
          <>
            <Grid
              container
              columnSpacing={1}
              rowSpacing={2}
              sx={{ mt: { xs: 1, lg: 0 } }}
            >
              <Grid item xs={12} md={6} lg={3}>
                <FormControl
                  fullWidth
                  error={Boolean(
                    natFormik.errors.name && natFormik.touched.name
                  )}
                >
                  <AlphaNumericTextField
                    formik={natFormik}
                    id="name"
                    size="small"
                    fullWidth
                    placeholder="نام موردنظر را وارد کنید"
                    // error={Boolean(
                    //   natFormik.errors.name && natFormik.touched.name
                    // )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <FormControl fullWidth>
                  <InputLabel id="type-select">type</InputLabel>
                  <Select
                    {...natFormik.getFieldProps("natType")}
                    defaultValue={NAT_TYPE.S_NAT}
                    size="small"
                    labelId="type-select"
                    id="type-select"
                    label="Type"
                    sx={{ paddingBottom: "3.5px" }}
                  >
                    <MenuItem value={NAT_TYPE.S_NAT}>Source Nat</MenuItem>
                    <MenuItem value={NAT_TYPE.D_NAT}>Destination Nat</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Divider sx={{ py: 1 }} />

            {natFormik.values.natType === NAT_TYPE.S_NAT ? (
              <CreateSourceNatForm
                forceClose={forceClose}
                natFormik={natFormik}
                selectedNat={selectedNat}
              />
            ) : (
              <CreateDestinationNatForm
                natFormik={natFormik}
                forceClose={forceClose}
                selectedNat={selectedNat}
              />
            )}
          </>
        ) : (
          <Alert severity="info">
            <Typography>لطفا ابتدا شبکه ایجاد کنید</Typography>
          </Alert>
        )}
      </DialogContent>
    </Dialog>
  );
};
