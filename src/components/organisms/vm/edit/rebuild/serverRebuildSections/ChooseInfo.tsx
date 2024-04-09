import {
  FC,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useState,
  MouseEvent,
} from "react";
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

  const nameInputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setName(e.target.value);

  const passwordInputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setPassword(e.target.value);

  return (
    <Stack spacing={2} justifyContent="center" alignItems="center" my={4}>
      <DorsaTextField
        type={showPassword ? "text" : "password"}
        value={name}
        onChange={nameInputChangeHandler}
        sx={{ minWidth: 300 }}
        label="نام سرور ابری (Server Name)"
        dir="ltr"
      />
      <DorsaTextField
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={passwordInputChangeHandler}
        sx={{ minWidth: 300 }}
        // label="رمز عبور سرور ابری (Password)" + `&nbsp`
        label={`رمز عبور سرور ابری (Password)`}
        dir="ltr"
        InputLabelProps={{
          style: { paddingRight: 14 },
        }}
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
