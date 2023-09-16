import { FC, useContext, ChangeEvent } from "react";
import { Stack, Typography } from "@mui/material";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { ExclamationMarkCircleSvg } from "src/components/atoms/svg/ExclamationMarkCircleSvg";
import { AddStorageContext } from "src/components/organisms/storage/add/contexts/AddStorageContext";
import { DorsaSwitch } from "src/components/atoms/DorsaSwitch";

type ServerInfoPropsType = {};

export const ServerInfo: FC<ServerInfoPropsType> = () => {
  const { name, setName, isPublic, setIsPublic } =
    useContext(AddStorageContext);

  const nameInputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setName(e.target.value);

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
      <Stack
        direction="row"
        justifyContent="space-between"
        border={1}
        borderColor={isPublic === true ? "primary.light" : "secondary.light"}
        borderRadius={2}
        alignItems="center"
        p={1.5}
        boxShadow={
          isPublic === true ? "0px 2px 11px rgba(60, 138, 255, 0.44)" : "none"
        }
      >
        <Stack color="secondary.main">
          <Typography
            color={isPublic === true ? "primary.main" : "secondary.main"}
            fontSize={16}
          >
            استفاده در فضای عمومی (Public)
          </Typography>
          <Typography variant="text8" color="secondary">
            با انتخاب این گزینه دسترسی بدون احراز می باشد.
          </Typography>
        </Stack>
        <DorsaSwitch
          checked={isPublic}
          onChange={() => setIsPublic(!isPublic)}
        />
      </Stack>
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
          اطلاعات دسترسی بعد از پرداخت ارسال میگردد.
          <br />
          برای استفاده مستندات min.io را مطالعه نمایید.
          <br />
          برای استفاده SDK را از سایت min.io دانلود نمایید.
        </Typography>
      </Stack>
    </Stack>
  );
};
