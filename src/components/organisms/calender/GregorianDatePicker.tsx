import { FC } from "react";
import DateFnsAdapter from "@date-io/date-fns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

type GregorianDatePickerPropsType = {
  children: JSX.Element;
};

export const GregorianDatePicker: FC<GregorianDatePickerPropsType> = ({
  children,
}) => {
  return (
    <LocalizationProvider dateAdapter={DateFnsAdapter}>
      {children}
    </LocalizationProvider>
  );
};
