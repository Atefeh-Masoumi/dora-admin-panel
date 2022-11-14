import { GetUserCompanyResponse } from "src/app/services/api.generated";

export const legalFormDefault: GetUserCompanyResponse = {
  id: undefined,
  userCompanyTypeId: undefined,
  name: "",
  nationalId: "",
  registrationNumber: "",
  registrationDate: "",
  economicNumber: "",
  businessPhone: "",
  address: "",
  postalCode: "",
};
