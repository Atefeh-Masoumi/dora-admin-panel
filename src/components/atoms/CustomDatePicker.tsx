import { FC, SetStateAction } from "react";
import { TextField } from "@mui/material";
import jMoment from "jalali-moment";
import AdapterJalali from "@date-io/date-fns-jalali";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { DorsaTextField } from "./DorsaTextField";

type CustomDatePickerPropsType = {
  label: string;
  value: string;
  setValue: SetStateAction<any>;
};

const CustomDatePicker: FC<CustomDatePickerPropsType> = ({
  label,
  value,
  setValue,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterJalali}>
      <DatePicker
        label={label}
        mask="____/__/__"
        value={
          value
            ? jMoment(value, "jYYYY/jMM/jDD").toDate()
            : jMoment(
                new Date().toLocaleDateString("fa-IR-u-nu-latn"),
                "jYYYY/jMM/jDD"
              ).toDate()
        }
        onChange={(newValue: Date | null) => {
          if (!newValue) return null;
          setValue(jMoment(newValue).format("jYYYY/jMM/jDD"));
        }}
        renderInput={(params) => <DorsaTextField {...params} fullWidth />}
      />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
