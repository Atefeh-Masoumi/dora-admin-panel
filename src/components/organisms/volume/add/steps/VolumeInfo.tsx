import { Stack, Typography } from "@mui/material";
import { ChangeEvent, FC, useContext } from "react";
import { AddVolumeContext } from "../contexts/AddVolumeContext";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { ExclamationMarkCircleSvg } from "src/components/atoms/svg-icons/ExclamationMarkCircleSvg";

type VolumeInfoPropsType = {};

export const VolumeInfo: FC<VolumeInfoPropsType> = () => {
  const { volumeName, setVolumeName } = useContext(AddVolumeContext);
  const nameInputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setVolumeName(e.target.value);
  return (
    <>
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
          نام دیسک ابری خود را وارد نمایید.
        </Typography>
      </Stack>
          <DorsaTextField
        value={volumeName}
        onChange={nameInputChangeHandler}
        sx={{ minWidth: 300 }}
        label="نام دیسک ابری"
        inputProps={{ dir: "ltr" }}
      />
        </Stack>
      
    </>
  );
}; 