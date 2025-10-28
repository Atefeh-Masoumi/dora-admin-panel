import { FC } from "react";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { CommonSelectPropsType } from "src/types/kubernetesCloud.types";
import { TextField } from "@mui/material";
type SelectEnvKeyPropsType = CommonSelectPropsType;

export const SelectEnvKey: FC<SelectEnvKeyPropsType> = ({
  value,
  onChange,
}) => {
  return (
    <TextField  
      sx={{
        background: ({ palette }) => palette.primary.contrastText,
      }}
      dir="ltr"
      size="small"
      fullWidth
      placeholder="Key"
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
    />
  );
};
