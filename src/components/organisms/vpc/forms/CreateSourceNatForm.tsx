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
  // const [vpcNetworkId, setVpcNetworkId] = useState<number | "">("");
  // const [vpcIp, setVpcIp] = useState<string | "">("");
  // const { vpcId } = useParams();
  // const { name: natName } = natFormik.values;

  // const { data: vpcNetworkList, isLoading: vpcNetworkListLoading } =
  //   useGetApiMyVpcNetworkShortListByVpcHostIdQuery({
  //     vpcHostId: Number(vpcId),
  //   });
  // const { data: vpcIpList, isLoading: vpcIpListLoading } =
  //   useGetApiMyVpcIpListByVpcHostIdQuery({
  //     vpcHostId: Number(vpcId),
  //   });
  // const [createVpcNat, { isLoading: isLoading }] =
  //   usePostApiMyVpcNatCreateSnatMutation();

  // const initialValues: customCreate_S_NatInitialValueType = {
  //   vpcHostId: Number(vpcId!),
  //   natTypeId: NAT_TYPE.S_NAT,
  //   name: selectedNat?.name || natName || "",
  //   sourceIp: selectedNat?.sourceIp || "",
  //   destinationIp: selectedNat?.destinationIp || null,
  //   destinationPort: selectedNat?.destinationPort || null,
  //   translateIp: selectedNat?.translateIp || vpcIp,
  //   description: selectedNat?.description || "",
  //   isDisabled: false, // TODO : need change
  //   vpcNetworkId: selectedNat ? 1 : Number(vpcNetworkId),
  // };

  // const onSubmit: formikOnSubmitType<customCreate_S_NatInitialValueType> = (
  //   values,
  //   { resetForm }
  // ) => {
  //   if (selectedNat) {
  //     createVpcNat({
  //       createVpcGatewaySnatModel: {
  //         ...values,
  //         vpcHostServiceId: null,
  //       },
  //     })
  //       .unwrap()
  //       .then((res) => {
  //         resetForm();
  //         natFormik.resetForm();
  //         forceClose();
  //       })
  //       .catch((err) => {});
  //   }
  // };

  // const formik = useFormik({
  //   initialValues,
  //   validationSchema: customCreate_S_NatInitialValueSchema,
  //   onSubmit,
  //   enableReinitialize: true,
  // });

  // useEffect(() => {
  //   if (vpcNetworkListLoading) return;
  //   if (vpcNetworkList && vpcNetworkList?.length > 0) {
  //     setVpcNetworkId(vpcNetworkList?.[0].id);
  //   }
  // }, [vpcNetworkListLoading, vpcIpListLoading, vpcNetworkList]);

  // useEffect(() => {
  //   if (vpcIpListLoading) return;
  //   if (vpcIpList && vpcIpList?.[0].ip) {
  //     setVpcIp(vpcIpList?.[0].ip);
  //   }
  // }, [vpcIpList, vpcIpListLoading]);

  return <></>;
};
