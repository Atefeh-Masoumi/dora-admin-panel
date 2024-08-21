import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";
import { SecretKeyValuePairsResponse } from "src/app/services/api.generated";
import { VariableEnvironment } from "src/types/kubernetesCloud.types";
type SelectEnvValuePropsType = {
  keyListInResource: SecretKeyValuePairsResponse[];
  value: any;
  setValue: any;
};
export const SelectEnvValue: FC<SelectEnvValuePropsType> = ({
  keyListInResource,
  value,
  setValue,
}) => {
  return (
    <FormControl fullWidth size="small">
      <InputLabel htmlFor="value-select">Value</InputLabel>
      <Select
        label="Value"
        id="value-select"
        dir="ltr"
        value={value}
        onChange={(e) => setValue(e.target.value)}
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
