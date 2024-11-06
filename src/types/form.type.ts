import { FormikHelpers } from "formik";

export type formikOnSubmitType<V> = (
  values: V,
  formikHelpers: FormikHelpers<V>
) => void | Promise<any>;

export type autoCompleteValueType = {
  id?: number | null;
  label?: string | null;
} | null;

export type autoCompleteOnChangeType = (newValue: autoCompleteValueType) => any;
