import { FC } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { ResourceListType } from "src/types/kubernetesCloud.types";

type SelectEnvResourcePropsType = {
  resourceList: ResourceListType | undefined;
  selectedResourceItem: number | null;
  setSelectedResourceItem: (selectedResourceItem: number | null) => void;
  handleResourceOnChange: (resourceItem: number) => void;
};

export const SelectEnvResource: FC<SelectEnvResourcePropsType> = ({
  resourceList,
  selectedResourceItem,
  setSelectedResourceItem,
  handleResourceOnChange,
}) => {
  return (
    <FormControl fullWidth size="small">
      <InputLabel htmlFor="resource-select">Resource</InputLabel>
      <Select
        label="Resource"
        id="resource-select"
        dir="ltr"
        value={selectedResourceItem}
        onChange={(e) => handleResourceOnChange(Number(e.target.value))}
      >
        {resourceList?.map((item, index) => (
          <MenuItem
            key={index}
            sx={{
              justifyContent: "end",
              bgColor: "primary.contrastText",
            }}
            value={item.id}
          >
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
