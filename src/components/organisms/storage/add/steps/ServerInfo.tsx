import { FC, useContext, ChangeEvent } from "react";
import { Paper, Stack, Typography } from "@mui/material";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { ExclamationMarkCircleSvg } from "src/components/atoms/svg-icons/ExclamationMarkCircleSvg";
import { AddStorageContext } from "src/components/organisms/storage/add/contexts/AddStorageContext";

type ServerInfoPropsType = {};

export const ServerInfo: FC<ServerInfoPropsType> = () => {
  const { name, setName } = useContext(AddStorageContext);

  const nameInputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setName(e.target.value);

  return (
    <Paper
      elevation={1}
      sx={{ p: 2, width: "100%", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}
    >
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
            نام سرویس ابری خود را وارد نمایید.
          </Typography>
        </Stack>
        <DorsaTextField
          value={name}
          onChange={nameInputChangeHandler}
          sx={{ minWidth: 300 }}
          label="نام سرویس (Bucket Name)"
          inputProps={{ dir: "ltr" }}
        />
        <Stack justifyContent="center" spacing={1}>
          <Typography sx={{ color: ({ palette }) => palette.grey[700] }}>
            توجه:
          </Typography>
          <Typography
            fontSize={14}
            sx={{ color: ({ palette }) => palette.grey[700], opacity: 0.9 }}
          >
            این سرویس S3 را پشتیبانی مینماید.
            <br />
            اطلاعات دسترسی بعد از ایجاد، ارسال میگردد.
            <br />
            بعد از ایجاد میتوانید کلید های خود را مجدد ایجاد نمایید.
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};
