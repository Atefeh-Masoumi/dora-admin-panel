import { Stack, Typography } from "@mui/material";
import { ChangeEvent, FC, useContext } from "react";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { ExclamationMarkCircleSvg } from "src/components/atoms/svg-icons/ExclamationMarkCircleSvg";
import { AddKubernetesCloudContext } from "../context/AddKubernetesCloudContext";

type KuberCloudInfoPropsType = {};

export const KuberCloudInfo: FC<KuberCloudInfoPropsType> = () => {
  const { serviceName, setServiceName } = useContext(AddKubernetesCloudContext);

  const nameInputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setServiceName(e.target.value);
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
          نام namespace خود را وارد کنید
        </Typography>
      </Stack>
      <DorsaTextField
        value={serviceName}
        onChange={nameInputChangeHandler}
        sx={{ minWidth: 300 }}
        label="نام namespace"
        inputProps={{ dir: "ltr" }}
        type="text"
      />
    </Stack>
  );
};
