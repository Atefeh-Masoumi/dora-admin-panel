import { Paper, Stack, Typography } from "@mui/material";
import { ChangeEvent, FC, useContext } from "react";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { ExclamationMarkCircleSvg } from "src/components/atoms/svg-icons/ExclamationMarkCircleSvg";
import { AddVpcContext } from "../contexts/AddVpcContext";

type ServerInfoPropsType = {};

export const SelectVpcServiceInfo: FC<ServerInfoPropsType> = () => {
  const { name, setName } = useContext(AddVpcContext);

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
            یک نام برای شناسایی سرویس خود انتخاب کنید
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
    </Paper>
  );
};
