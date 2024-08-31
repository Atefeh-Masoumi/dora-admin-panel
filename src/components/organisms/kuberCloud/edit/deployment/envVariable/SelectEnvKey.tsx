import { FC } from "react";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { CommonSelectPropsType } from "src/types/kuberCloud.types";

type SelectEnvKeyPropsType = CommonSelectPropsType;

export const SelectEnvKey: FC<SelectEnvKeyPropsType> = ({
  value,
  onChange,
}) => {
  return (
    <DorsaTextField
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
