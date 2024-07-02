import { ipValidation } from "src/utils/regex.utils";
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

//------------------SOURCE NAT FORM-------------------//
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

//------------------DESTINATION NAT FORM-------------------//
export type CustomCreate_D_NatInitialValueType = {
  vpcHostId: number;
  natTypeId: NAT_TYPE;
  name: string | null;
  sourceIp: string | null;
  destinationIp?: string | null;
  destinationPort?: number | null;
  translateIp?: string | null;
  vpcHostServiceId?: number | null;
  description?: string | null;
  isDisabled: boolean;
  id?: number;
  vpcNetworkId: number | null | "";
};

export const customCreate_D_NatInitialValueSchema = yup.object().shape({
  vpcHostId: yup.number().required(VALIDATION_REQUIRED_ERROR_MESSAGE),
  natTypeId: yup.number().required(VALIDATION_REQUIRED_ERROR_MESSAGE),
  name: yup.string().required(VALIDATION_REQUIRED_ERROR_MESSAGE),
  sourceIp: yup
    .string()
    .matches(
      ipValidation,
      "آدرس IP که وارد کردید یک آدرس IPv4 معتبر نیست. لطفاً قالب را بررسی کنید (به عنوان مثال، 192.168.1.1)."
    )
    .nullable(),
  destinationIp: yup
    .string()
    .transform((value) => (value === null ? "" : value))
    .required(VALIDATION_REQUIRED_ERROR_MESSAGE),
  destinationPort: yup
    .number()
    .typeError("Port باید یک عدد باشد")
    .required(VALIDATION_REQUIRED_ERROR_MESSAGE),
  translateIp: yup.string().required(VALIDATION_REQUIRED_ERROR_MESSAGE),
  description: yup.string(),
  isDisabled: yup.string().required(VALIDATION_REQUIRED_ERROR_MESSAGE),
  id: yup.number().nullable(),
  vpcNetworkId: yup.number(),
});
