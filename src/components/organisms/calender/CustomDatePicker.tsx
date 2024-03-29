import { FC, Dispatch, SetStateAction, useState, useRef } from "react";
import {
  IconButton,
  Stack,
  TextField,
  Button,
  Box,
  DialogProps,
  DialogActions,
} from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { CalendarSvg } from "src/components/atoms/svg-icons/CalendarSvg";
import { JalaliDatePicker } from "./JalaliDatePicker";
import { GregorianDatePicker } from "./GregorianDatePicker";
import { PickersActionBarProps } from "@mui/x-date-pickers/PickersActionBar";
import { BORDER_RADIUS_5 } from "src/configs/theme";

type CustomDatePickerPropsType = {
  setValue: Dispatch<SetStateAction<Date | null>>;
  value: Date | null;
  placeholder?: string;
};

export const CustomDatePicker: FC<CustomDatePickerPropsType> = ({
  setValue,
  value,
  placeholder,
}) => {
  const [date, setDate] = useState<Date | null>(value || null);
  const [open, setOpen] = useState(false);
  const [isJalali, setIsJalali] = useState(true);

  const changeAdapter = () => setIsJalali((prevState) => !prevState);

  const calendarWeekdays = (day: string) => {
    if (day.charAt(0) === "ش") {
      return "شنبه";
    } else if (day.charAt(0) === "ج") {
      return "جمعه";
    } else if (
      day.charAt(0) === "T" ||
      day.charAt(0) === "S" ||
      day.charAt(0) === "M" ||
      day.charAt(0) === "F" ||
      day.charAt(0) === "W"
    ) {
      return day;
    } else {
      return day.charAt(0) + "شنبه ";
    }
  };

  const ToolbarComponent = (props: any) => (
    <Box>
      <IconButton
        disableRipple
        disableTouchRipple
        sx={{
          top: "50%",
          transform: "translateY(-50%)",
          position: "absolute",
          zIndex: 1,
          width: 40,
          height: 200,
          left: 0,
          borderRadius: 0,
        }}
        onClick={() => {
          rightRef.current?.click();
        }}
      >
        <ChevronRight fontSize="large" sx={{ "&>path": { fill: "#aaa" } }} />
      </IconButton>
      <Stack
        sx={{ position: "absolute", top: "0", right: "30px" }}
        direction="row"
        alignItems={"center"}
      >
        <Button
          sx={{
            pointerEvents: "all",
            minWidth: "0",
            fontSize: "14px",
            color: "#3C8AFF",
          }}
          onClick={changeAdapter}
          startIcon={<CalendarSvg />}
        >
          {isJalali ? "نمایش تقویم میلادی" : "نمایش تقویم شمسی"}
        </Button>
      </Stack>
      <IconButton
        disableRipple
        disableTouchRipple
        sx={{
          top: "50%",
          transform: "translateY(-50%)",
          position: "absolute",
          zIndex: 1,
          width: 40,
          height: 200,
          right: 0,
          borderRadius: 0,
        }}
        onClick={() => {
          leftRef.current?.click();
        }}
      >
        <ChevronLeft fontSize="large" sx={{ "&>path": { fill: "#aaa" } }} />
      </IconButton>
    </Box>
  );

  const DialogProps: DialogProps = {
    sx: {
      "& .muirtl-1rn5c32-MuiStack-root": {
        mt: "11px",
      },
      "& .MuiPickersArrowSwitcher-root": {
        display: "none",
      },
      "& .muirtl-n2q1ii-MuiPaper-root-MuiDialog-paper": {
        width: "400px",
        maxWidth: "unset",
      },
      "& .muirtl-jro82b-MuiButtonBase-root-MuiIconButton-root-MuiPickersArrowSwitcher-button":
        {
          pointerEvents: "none",
        },
      "& .muirtl-1ae9t7h-MuiButtonBase-root-MuiIconButton-root-MuiPickersArrowSwitcher-button":
        {
          pointerEvents: "none",
        },
      "& .muirtl-1j9funn-MuiButtonBase-root-MuiButton-root:hover": {
        backgroundColor: "rgba(110, 118, 138, 0.4)",
        border: "1px solid rgba(110, 118, 138, 0)",
      },
      "& .muirtl-1j9funn-MuiButtonBase-root-MuiButton-root:hover :after": {
        color: "white",
      },
      "& .muirtl-1j9funn-MuiButtonBase-root-MuiButton-root :after": {
        // content: '"انصراف"',
        // visibility: "visible",
        // paddingTop: "6px",
        // alignItems: "center",
        // display: "flex",
        // justifyContent: "center",
        // color: "#6E768A",
        // height: "48px",
      },
      "& .muirtl-epd502": {
        width: "100%",
      },
      "& .muirtl-169iwlq-MuiCalendarPicker-root": {
        width: "100%",
      },
      "& .MuiDayPicker-header": {
        backgroundColor: "#6E768A0F",
        width: "100%",
        padding: "0 49px",
        margin: "10px 0",
        display: "flex",
        justifyContent: "space-between",
      },
      "& .muirtl-1cnkspq": {
        width: "100%",
      },
      "& .muirtl-i6bazn": {
        width: "100%",
        padding: "0 25px",
      },
      "& .muirtl-mvmu1r": {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
      },
      "& .muirtl-1m3rwuk-MuiPickersDay-root": {
        width: "32px",
        height: "32px",
      },
      "& .MuiDayPicker-weekDayLabel": {
        color: "#3C8AFF",
        fontSize: "12px",
      },
      "& .MuiPickersDay-root": {
        color: "#6E768A",
        fontSize: "16px",
        border: "0.5px solid rgba(110, 118, 138, 0.32)",
        borderRadius: "10px",
        width: "32px",
        height: "32px",
      },
      "& .muirtl-9yjdhh-MuiDialogContent-root": {
        overflow: "hidden",
      },
      "& .muirtl-1rulnbo-MuiButtonBase-root-MuiPickersDay-root.Mui-selected:hover":
        {
          color: "white",
          backgroundColor: "rgb(56, 95, 172)",
        },
      "& .muirtl-1rulnbo-MuiButtonBase-root-MuiPickersDay-root.Mui-selected": {
        color: "white",
        backgroundColor: "#3C8AFF",
      },
      "& .muirtl-1rulnbo-MuiButtonBase-root-MuiPickersDay-root:focus.Mui-selected":
        {
          backgroundColor: "#3C8AFF",
          "& :hover": {
            backgroundColor: "rgb(56, 95, 172)",
          },
        },
      "& .muirtl-zexgeb-MuiButtonBase-root-MuiPickersDay-root.Mui-selected": {
        color: "white",
        borderRadius: "10px",
        fontSize: "16px",
        backgroundColor: "#3C8AFF",
      },
      "& .muirtl-zexgeb-MuiButtonBase-root-MuiPickersDay-root:focus.Mui-selected":
        {
          backgroundColor: "#3C8AFF",
        },
      "& .muirtl-zexgeb-MuiButtonBase-root-MuiPickersDay-root:focus.Mui-selected:hover":
        {
          backgroundColor: "rgb(56, 95, 172)",
        },
      "& .MuiPickersDay-today": {
        backgroundColor: "#eee",
        borderColor: "black",
      },
      "& .MuiDayPicker-weekContainer": {
        justifyContent: "space-around",
        my: 1,
        padding: "2.5px 25px",
      },
      "& .PrivatePickersSlideTransition-root": {
        overflow: "hidden",
        minHeight: 300,
      },
      "& .MuiCalendarOrClockPicker-root": {
        "&> :nth-of-type(2)": {
          minHeight: "unset",
          maxHeight: "none",
          height: 400,
          overflow: "hidden",
        },
      },
      "& .MuiCalendarPicker-root": {
        overflow: "hidden",
        maxHeight: "none",
        height: 400,
      },
      "& .MuiDayPicker-monthContainer": {
        px: 3,
      },
    },
    open: open,
  };

  const onCancelClick = () => {
    setValue(null);
    setDate(null);
    setOpen(false);
  };
  const onSubmitClick = () => {
    date && setValue(date);
    setOpen(false);
  };

  const ActionBarComponents = (props: PickersActionBarProps) => (
    <DialogActions sx={{ height: 64, px: 3, mb: 2 }}>
      <Button
        onClick={onCancelClick}
        variant="outlined"
        color="secondary"
        sx={{ height: "100%", width: 92, borderRadius: BORDER_RADIUS_5 }}
      >
        انصراف
      </Button>
      <Button
        onClick={onSubmitClick}
        disableElevation
        fullWidth
        variant="contained"
        sx={{ height: "100%", borderRadius: BORDER_RADIUS_5 }}
      >
        تایید
      </Button>
    </DialogActions>
  );

  const rightRef = useRef<HTMLElement>();
  const leftRef = useRef<HTMLElement>();

  const renderMobileDatePicker = (
    <MobileDatePicker
      mask="____/__/__"
      inputFormat="dd/MM/yyyy"
      value={date}
      onChange={(newValue: any) => setDate(newValue)}
      renderInput={(params: any) => (
        <TextField
          placeholder={placeholder}
          {...params}
          onMouseDown={() => setOpen(true)}
          InputProps={{
            sx: {
              bgcolor: "rgba(110, 118, 138, 0.06)",
              // "&>fieldset": {
              //   borderColor: "transparent",
              // },
              // "&>::placeholder": {
              //   color: ({ palette }) => palette.grey[700],
              // },
            },
            endAdornment: (
              <CalendarSvg
                fontSize="medium"
                sx={{
                  "&>path": {
                    stroke: "#6E768A",
                    strokeOpacity: 0.3,
                    strokeWidth: 1.5,
                  },
                }}
              />
            ),
          }}
        />
      )}
      dayOfWeekFormatter={(day) => calendarWeekdays(day)}
      componentsProps={{
        rightArrowButton: { ref: rightRef },
        leftArrowButton: { ref: leftRef },
        // actionBar: {},
      }}
      ToolbarComponent={ToolbarComponent}
      DialogProps={DialogProps}
      components={{
        ActionBar: ActionBarComponents,
      }}
    />
  );

  if (isJalali) {
    return <JalaliDatePicker children={renderMobileDatePicker} />;
  } else {
    return <GregorianDatePicker children={renderMobileDatePicker} />;
  }
};
