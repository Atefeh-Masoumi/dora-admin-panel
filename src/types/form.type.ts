import { FormikHelpers } from "formik";

export type formikOnSubmitType<V> = (
  values: V,
  formikHelpers: FormikHelpers<V>
) => void | Promise<any>;
