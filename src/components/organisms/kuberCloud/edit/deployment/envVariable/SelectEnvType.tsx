import { FormControl, MenuItem, Select } from "@mui/material";
import { FC } from "react";
import { environmentType } from "src/constant/kubernetesCloud.constant";
import { CommonSelectPropsType } from "src/types/kuberCloud.types";

type SelectEnvTypePropsType = CommonSelectPropsType;

export const SelectEnvType: FC<SelectEnvTypePropsType> = ({
  value,
  onChange,
}) => {
  return (
    <FormControl fullWidth size="small">
      <Select
        dir="ltr"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {environmentType.map((item, index) => (
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
