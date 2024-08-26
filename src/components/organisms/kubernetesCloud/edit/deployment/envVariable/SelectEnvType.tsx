import { FormControl, MenuItem, Select } from "@mui/material";
import { FC } from "react";
import { environmentType } from "src/constant/kubernetesCloud.constant";

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
