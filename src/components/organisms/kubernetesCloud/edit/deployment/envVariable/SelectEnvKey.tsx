import { Dispatch, FC, SetStateAction } from "react";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { VariableEnvironment } from "src/types/kubernetesCloud.types";

type SelectEnvKeyPropsType = {
  environmentVariable: VariableEnvironment;
  setEnvironmentVariable: Dispatch<SetStateAction<VariableEnvironment>>;
};

export const SelectEnvKey: FC<SelectEnvKeyPropsType> = ({
  environmentVariable,
  setEnvironmentVariable,
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
      value={environmentVariable.key}
      onChange={(e) =>
        setEnvironmentVariable((prevState) => ({
          ...prevState,
          key: e.target.value,
        }))
      }
    />
  );
};
