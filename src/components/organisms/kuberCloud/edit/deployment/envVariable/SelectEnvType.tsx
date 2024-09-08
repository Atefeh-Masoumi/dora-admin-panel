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
        onChange={(e) => onChange && onChange(Number(e.target.value))}
        sx={{
          "& .MuiSelect-select": {
            fontSize: "14px",
          },
          "& .MuiMenuItem-root": {
            fontSize: "10px",
          },
        }}
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
