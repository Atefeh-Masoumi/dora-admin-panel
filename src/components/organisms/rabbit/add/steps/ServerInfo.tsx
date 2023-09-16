import { FC, useContext, ChangeEvent, useState } from "react";
import { IconButton, InputAdornment, Stack, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { ExclamationMarkCircleSvg } from "src/components/atoms/svg/ExclamationMarkCircleSvg";
import { AddRabbitContext } from "src/components/organisms/rabbit/add/contexts/AddRabbitContext";

type ServerInfoPropsType = {};

export const ServerInfo: FC<ServerInfoPropsType> = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    name,
    setName,
    serverUsername,
    setServerUsername,
    serverPassword,
    setServerPassword,
  } = useContext(AddRabbitContext);

  const nameInputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setName(e.target.value);

  const usernameInputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setServerUsername(e.target.value);

  const passwordInputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setServerPassword(e.target.value);

  return (
    <Stack spacing={2} justifyContent="center" alignItems="center">
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1}
        alignItems="center"
        justifyContent="center"
        sx={{ px: 2 }}
      >
        <ExclamationMarkCircleSvg
          sx={{
            transform: "rotate(180deg)",
            "&>path:first-of-type": {
              opacity: 1,
              stroke: ({ palette }) => palette.grey[700],
              strokeWidth: 1,
              fill: "transparent",
            },
          }}
        />
        <Typography
          align="center"
          sx={{ color: ({ palette }) => palette.grey[700] }}
        >
          نام کاربری و رمز عبور برای سرویس ابری خود را وارد نمایید.
        </Typography>
      </Stack>
      <DorsaTextField
        value={name}
        onChange={nameInputChangeHandler}
        sx={{ minWidth: 300 }}
        label="نام سرویس (VHost)"
        inputProps={{ dir: "ltr" }}
      />
      <DorsaTextField
        value={serverUsername}
        onChange={usernameInputChangeHandler}
        sx={{ minWidth: 300 }}
        label="نام کاربری (User Name)"
        inputProps={{ dir: "ltr" }}
      />
      <DorsaTextField
        type={showPassword ? "text" : "password"}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="start"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        value={serverPassword}
        onChange={passwordInputChangeHandler}
        sx={{ minWidth: 300 }}
        label="رمز عبور (Password)"
        inputProps={{ dir: "ltr" }}
      />
      <Stack justifyContent="center" spacing={1}>
        <Typography sx={{ color: ({ palette }) => palette.grey[700] }}>
          رمز عبور می‌بایست:
        </Typography>
        <Typography
          fontSize={14}
          sx={{ color: ({ palette }) => palette.grey[700], opacity: 0.9 }}
        >
          حداقل ۸ کاراکتر باشد
          <br />
          ترکیبی از حروف کوچک و بزرگ باشد
          <br />
          شامل اعداد باشد
          <br />
          شامل کاراکترهای خاص (نمادها) باشد
        </Typography>
      </Stack>
    </Stack>
  );
};
