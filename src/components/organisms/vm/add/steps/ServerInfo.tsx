import { FC, useContext, ChangeEvent, useState } from "react";
import { IconButton, InputAdornment, Stack, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { ExclamationMarkCircleSvg } from "src/components/atoms/svg-icons/ExclamationMarkCircleSvg";
import { AddServerContext } from "src/components/organisms/vm/add/contexts/AddVmContext";

type ServerInfoPropsType = {};

export const ServerInfo: FC<ServerInfoPropsType> = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { serverName, setServerName, serverPassword, setServerPassword } =
    useContext(AddServerContext);

  const nameInputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setServerName(e.target.value);

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
          نام کاربری برای سیستم عامل ویندوز Administrator و برای لینوکس root می
          باشد
        </Typography>
      </Stack>
      <DorsaTextField
        focused
        value={serverName}
        onChange={nameInputChangeHandler}
        sx={{ minWidth: 300 }}
        label="نام سرور ابری (Server Name)"
        inputProps={{ dir: "ltr" }}
      />
      <DorsaTextField
        focused
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
        label="رمز عبور سرور ابری (Password)"
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
