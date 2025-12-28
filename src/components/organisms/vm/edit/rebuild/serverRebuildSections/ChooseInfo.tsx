import { FC, Dispatch, SetStateAction, useState, MouseEvent } from "react";
import { IconButton, InputAdornment, Stack } from "@mui/material";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type ChooseInfoPropsType = {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
};

export const ChooseInfo: FC<ChooseInfoPropsType> = ({
  name,
  setName,
  password,
  setPassword,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Stack spacing={2} justifyContent="center" alignItems="center" py={8}>
      <DorsaTextField
        sx={{ minWidth: 300 }}
        label="نام سرور  (Server Name)"
        dir="ltr"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <DorsaTextField
        type={showPassword ? "text" : "password"}
        sx={{ minWidth: 300 }}
        label={`رمز عبور  (Password)`}
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
