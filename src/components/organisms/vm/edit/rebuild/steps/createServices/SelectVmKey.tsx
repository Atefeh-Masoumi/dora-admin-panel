import { FC } from "react";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Typography } from "@mui/material";
import { VmKeyListResponse } from "src/app/services/api.generated";

type SelectVmKeyPropsType = {
  vmKeyList: VmKeyListResponse[] | undefined;
  setVmKeyId: (vmKey: VmKeyListResponse | null) => void;
};

export const SelectVmKey: FC<SelectVmKeyPropsType> = ({
  vmKeyList,
  setVmKeyId,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    const selectedKey = vmKeyList?.find(key => key.id?.toString() === event.target.value);
    setVmKeyId(selectedKey || null);
  };

  return (
    <Stack spacing={2} justifyContent="center" alignItems="center">
      <FormControl sx={{ minWidth: 300 }}>
        <InputLabel>کلید SSH</InputLabel>
        <Select
          onChange={handleChange}
          label="کلید SSH"
          sx={{ direction: "rtl" }}
        >
          {vmKeyList?.map((key) => (
            <MenuItem key={key.id} value={key.id?.toString()}>
              {key.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}; 