import { FC } from "react";
import { Stack, Typography } from "@mui/material";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";

type SelectServiceNamePropsType = {
  serviceName: string;
  setServiceName: (serviceName: string) => void;
};

export const SelectServiceName: FC<SelectServiceNamePropsType> = ({
  serviceName,
  setServiceName,
}) => {
  return (
    <Stack spacing={4} justifyContent="center" alignItems="center" >
      <Typography fontSize={24} fontWeight="bold" align="center">
        نام سرور
      </Typography>
      <DorsaTextField
        value={serviceName}
        onChange={(e) => setServiceName(e.target.value)}
        sx={{ minWidth: 300 }}
        label="نام سرویس"
        inputProps={{ dir: "ltr" }}
      />
    </Stack>
  );
}; 