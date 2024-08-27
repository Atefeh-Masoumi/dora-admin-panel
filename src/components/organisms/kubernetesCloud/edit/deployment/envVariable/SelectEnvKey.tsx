import { FC } from "react";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";

type SelectEnvKeyPropsType = {
  envKey: string;
  setKey: (envKey: string) => void;
};

export const SelectEnvKey: FC<SelectEnvKeyPropsType> = ({ envKey, setKey }) => {
  return (
    <DorsaTextField
      sx={{
        background: ({ palette }) => palette.primary.contrastText,
      }}
      dir="ltr"
      size="small"
      fullWidth
      placeholder="Key"
      value={envKey}
      onChange={(e) => setKey(e.target.value)}
    />
  );
};
