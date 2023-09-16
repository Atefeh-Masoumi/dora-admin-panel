import { FC, useContext, ChangeEvent } from "react";
import { Stack, Typography } from "@mui/material";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { ExclamationMarkCircleSvg } from "src/components/atoms/svg/ExclamationMarkCircleSvg";
import { AddWorkspaceContext } from "../contexts/AddContext";

type ServerInfoPropsType = {};

export const ServerInfo: FC<ServerInfoPropsType> = () => {
  const { name, setName } = useContext(AddWorkspaceContext);

  const nameInputChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    const regex =
      /^((?![\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFBC1\uFE70-\uFEFC]).)*$/;

    if (regex.test(value)) {
      setName(event.target.value);
    }
  };

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
        label="نام سرویس"
        inputProps={{ dir: "ltr" }}
      />
    </Stack>
  );
};
