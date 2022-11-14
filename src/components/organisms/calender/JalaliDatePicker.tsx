import { FC } from "react";
import AdapterJalali from "@date-io/date-fns-jalali";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

type JalaliDatePickerPropsType = {
  children: JSX.Element;
};

export const JalaliDatePicker: FC<JalaliDatePickerPropsType> = ({
  children,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterJalali}>
      {children}
    </LocalizationProvider>
  );
};
