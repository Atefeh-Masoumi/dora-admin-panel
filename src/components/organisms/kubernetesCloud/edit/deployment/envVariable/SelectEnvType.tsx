import { FormControl, MenuItem, Select } from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";
import { EnvironmentType } from "src/constant/kubernetesCloud.constant";
import { VariableEnvironment } from "src/types/kubernetesCloud.types";

type SelectEnvTypePropsType = {
  environmentVariable: VariableEnvironment;
  setEnvironmentVariable: Dispatch<SetStateAction<VariableEnvironment>>;
};

export const SelectEnvType: FC<SelectEnvTypePropsType> = ({
  setEnvironmentVariable,
  environmentVariable,
}) => {
  return (
    <FormControl fullWidth size="small">
      <Select
        dir="ltr"
        onChange={(e) =>
          setEnvironmentVariable({
            variableType: Number(e.target.value),
            key: "",
            value: "",
          })
        }
        value={environmentVariable?.variableType || 1}
      >
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
