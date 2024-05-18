import { ChangeEventHandler, FC } from "react";
import { Add, Remove } from "@mui/icons-material";
import { IconButton, Stack, TextField } from "@mui/material";
import { onlyNumber } from "src/utils/priceToPersian";

type CounterPropsType = {
  value: number;
  onChange: (newValue: number) => any;
  onPlusClick: () => any;
  onMinusClick: () => any;
};

export const Counter: FC<CounterPropsType> = ({
  value,
  onChange,
  onPlusClick,
  onMinusClick,
}) => {
  const inputOnChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    const newValue = onlyNumber(event.target.value);
    onChange(Number(newValue));
  };

  return (
    <Stack direction="row" columnGap={0.5} alignItems="center">
      <IconButton
        onClick={onPlusClick}
        size="small"
        sx={{
          bgcolor: "primary.main",
          width: 53,
          height: 53,
          "&:hover": {
            bgcolor: "primary.dark",
          },
          borderRadius: "5px",
        }}
      >
        <Add sx={{ color: "common.white" }} />
      </IconButton>
      <TextField
        label="تعداد نودهای کلاستر"
        value={value}
        onChange={inputOnChange}
        sx={{
          borderRadius: "5px",
          width: 130,
          textAlign: "center",
        }}
        inputProps={{
          style: {
            textAlign: "center",
          },
        }}
      />
      <IconButton
        onClick={onMinusClick}
        sx={{
          bgcolor: "primary.main",
          width: 53,
          height: 53,
          "&:hover": {
            bgcolor: "primary.dark",
          },
          borderRadius: "5px",
        }}
      >
        <Remove sx={{ color: "common.white" }} />
      </IconButton>
    </Stack>
  );
};
