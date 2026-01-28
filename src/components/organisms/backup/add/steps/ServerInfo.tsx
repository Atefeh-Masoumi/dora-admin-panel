import { FC, useContext, ChangeEvent } from "react";
import {  Stack, Typography } from "@mui/material";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { ExclamationMarkCircleSvg } from "src/components/atoms/svg-icons/ExclamationMarkCircleSvg";
import { AddBckupVMContext } from "../contex/AddBackupContext";
type ServerInfoPropsType = {};

export const ServerInfo: FC<ServerInfoPropsType> = () => {
  const { serverName, setServerName } = useContext(AddBckupVMContext);

 
  const nameInputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setServerName(e.target.value);

  

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
      
      
      
    </Stack>
  );
};
