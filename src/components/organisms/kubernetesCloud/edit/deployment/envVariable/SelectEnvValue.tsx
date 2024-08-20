import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";
import { SecretKeyValuePairsResponse } from "src/app/services/api.generated";
import { VariableEnvironment } from "src/types/kubernetesCloud.types";
type SelectEnvValuePropsType = {
  keyListInResource: SecretKeyValuePairsResponse[];
  environmentVariable: VariableEnvironment;
  setEnvironmentVariable: Dispatch<SetStateAction<VariableEnvironment>>;
};
export const SelectEnvValue: FC<SelectEnvValuePropsType> = ({
  keyListInResource,
  setEnvironmentVariable,
  environmentVariable,
}) => {
  return (
    <FormControl fullWidth size="small">
      <InputLabel htmlFor="value-select">Value</InputLabel>
      <Select
        label="Value"
        id="value-select"
        dir="ltr"
        onChange={(e) =>
          setEnvironmentVariable((prevState) => ({
            ...prevState,
            value: e.target.value,
          }))
        }
        value={environmentVariable?.value || ""}
      >
        {keyListInResource?.map((item, index) => (
          <MenuItem
            key={index}
            sx={{
              justifyContent: "end",
              bgColor: "primary.contrastText",
            }}
            value={item.id}
          >
            {item.key}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
