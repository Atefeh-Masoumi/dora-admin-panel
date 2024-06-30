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
