import { FC, useState, MouseEvent } from "react";
import { IconButton, InputAdornment, Stack } from "@mui/material";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type SelectPasswordPropsType = {
  password: string;
  setPassword: (password: string) => void;
};

export const SelectPassword: FC<SelectPasswordPropsType> = ({
  password,
  setPassword,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Stack spacing={2} justifyContent="center" alignItems="center">
      <DorsaTextField
        type={showPassword ? "text" : "password"}
        sx={{ minWidth: 300 }}
        label="رمز عبور سرور ابری (Password)"
        dir="ltr"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="start"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  );
}; 