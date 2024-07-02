import * as yup from "yup";

const VALIDATION_REQUIRED_ERROR_MESSAGE = "فیلد الزامیست";

export enum NAT_TYPE {
  S_NAT = 1,
  D_NAT = 2,
}

export type natFormikInitialValuesType = {
  name: string | "";
  natType: NAT_TYPE;
};

export const natNameAndTypeValidationSchema = yup.object().shape({
  name: yup.string().required(VALIDATION_REQUIRED_ERROR_MESSAGE),
  natType: yup
    .number()
    .oneOf([NAT_TYPE.S_NAT, NAT_TYPE.S_NAT])
    .required(VALIDATION_REQUIRED_ERROR_MESSAGE),
});

//------------------DESTINATION NAT FORM-------------------//
export type customCreate_S_NatInitialValueType = {
  vpcHostId: number;
  natTypeId: NAT_TYPE;
  name: string;
  sourceIp: string;
  destinationIp: string | null;
  destinationPort: number | null;
  translateIp: string;
  description?: string;
  isDisabled: boolean;
  id?: number;
  vpcNetworkId: number;
};

export const customCreate_S_NatInitialValueSchema = yup.object().shape({
  vpcHostId: yup.number().required(VALIDATION_REQUIRED_ERROR_MESSAGE),
  natTypeId: yup.number().required(VALIDATION_REQUIRED_ERROR_MESSAGE),
  name: yup.string().required(VALIDATION_REQUIRED_ERROR_MESSAGE),
  sourceIp: yup.string().required(VALIDATION_REQUIRED_ERROR_MESSAGE),
  destinationIp: yup.string().nullable(),
  destinationPort: yup.number().nullable(),
  translateIp: yup.string().required(VALIDATION_REQUIRED_ERROR_MESSAGE),
  description: yup.string(),
  isDisabled: yup.string().required(VALIDATION_REQUIRED_ERROR_MESSAGE),
  id: yup.number().nullable(),
  vpcNetworkId: yup.number(),
});
