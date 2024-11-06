import { Paper, Stack, Typography } from "@mui/material";
import { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { ExclamationMarkCircleSvg } from "src/components/atoms/svg-icons/ExclamationMarkCircleSvg";

type ServerInfoPropsType = {
  serviceName: string | null;
  setServiceName: Dispatch<SetStateAction<string>>;
};

export const SelectServiceName: FC<ServerInfoPropsType> = ({
  serviceName,
  setServiceName,
}) => {
  const nameInputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setServiceName(e.target.value);

  return (
    <Paper sx={{ px: 2, py: 4 }}>
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
            یک نام برای شناسایی سرویس خود انتخاب کنید
          </Typography>
        </Stack>
        <DorsaTextField
          value={serviceName}
          onChange={nameInputChangeHandler}
          sx={{ minWidth: 300 }}
          label="نام سرویس"
          inputProps={{ dir: "ltr" }}
        />
      </Stack>
    </Paper>
  );
};
