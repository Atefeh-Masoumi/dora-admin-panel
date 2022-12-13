import { FC, useContext, ChangeEvent } from "react";
import { Stack, Typography } from "@mui/material";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { ExclamationMarkCircleSvg } from "src/components/atoms/svg/ExclamationMarkCircleSvg";
import { AddRabbitContext } from "src/components/organisms/rabbit/addService/context/AddRabbitContext";

type ServerInfoPropsType = {};

export const ServerInfo: FC<ServerInfoPropsType> = () => {
  const { name, setName, serverUsername, setServerUsername, serverPassword, setServerPassword } =
    useContext(AddRabbitContext);

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
      </Stack>
      <DorsaTextField
        value={name}
        onChange={nameInputChangeHandler}
        sx={{ minWidth: 300 }}
        label="نام سرویس (VHost)"
        dir="ltr"
      />
      <DorsaTextField
        value={serverUsername}
        onChange={usernameInputChangeHandler}
        sx={{ minWidth: 300 }}
        label="نام کاربری (User Name)"
        dir="ltr"
      />
      <DorsaTextField
        value={serverPassword}
        onChange={passwordInputChangeHandler}
        sx={{ minWidth: 300 }}
        label="رمز عبور (Password)"
        dir="ltr"
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
