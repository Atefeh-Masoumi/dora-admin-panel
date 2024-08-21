import { FormControl, MenuItem, Select } from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";
import { EnvironmentType } from "src/constant/kubernetesCloud.constant";
import { VariableEnvironment } from "src/types/kubernetesCloud.types";

type SelectEnvTypePropsType = {
  type: any;
  setType: any;
};

export const SelectEnvType: FC<SelectEnvTypePropsType> = ({
  type,
  setType,
}) => {
  return (
    <FormControl fullWidth size="small">
      <Select dir="ltr" onChange={(e) => setType(e.target.value)} value={type}>
        {EnvironmentType.map((item, index) => (
          <MenuItem
            key={index}
            sx={{
              justifyContent: "end",
              bgColor: "primary.contrastText",
            }}
            value={item.id}
          >
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
