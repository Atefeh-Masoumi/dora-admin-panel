import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { FC } from "react";
import { SecretKeyValuePairsResponse } from "src/app/services/api.generated";
type SelectEnvValuePropsType = {
  keyListInResource: SecretKeyValuePairsResponse[];
};
export const SelectEnvValue: FC<SelectEnvValuePropsType> = ({
  keyListInResource,
}) => {
  return (
    <FormControl fullWidth size="small">
      <InputLabel htmlFor="value-select">Value</InputLabel>
      <Select label="Value" onChange={() => {}} id="value-select" dir="ltr" value="test">
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
