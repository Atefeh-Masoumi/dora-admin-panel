import { FC } from "react";
import { FormControl, FormControlLabel, Radio, RadioGroup, Stack, Typography } from "@mui/material";
import { VM_SECURITY_TYPE_SETTING } from "src/types/securityTypeSettings.type";

type SelectSecuritySettingsPropsType = {
  securityId: VM_SECURITY_TYPE_SETTING;
  setSecurityId: (securityId: VM_SECURITY_TYPE_SETTING) => void;
  usePassword: boolean;
  setUsePassword: (usePassword: boolean) => void;
  useVmKey: boolean;
  setUseVmKey: (useVmKey: boolean) => void;
};

export const SelectSecuritySettings: FC<SelectSecuritySettingsPropsType> = ({
  securityId,
  setSecurityId,
  usePassword,
  setUsePassword,
  useVmKey,
  setUseVmKey,
}) => {
  const handleSecurityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value) as VM_SECURITY_TYPE_SETTING;
    setSecurityId(value);
    
    if (value === VM_SECURITY_TYPE_SETTING.PASSWORD) {
      setUsePassword(true);
      setUseVmKey(false);
    } else {
      setUsePassword(false);
      setUseVmKey(true);
    }
  };

  return (
    <Stack spacing={2} justifyContent="center" alignItems="center">
      <Typography fontSize={24} fontWeight="bold" align="center">
        روش احراز هویت
      </Typography>
      <FormControl>
        <RadioGroup
          value={securityId}
          onChange={handleSecurityChange}
          sx={{ direction: "rtl" }}
        >
          <FormControlLabel
            value={VM_SECURITY_TYPE_SETTING.PASSWORD}
            control={<Radio />}
            label="رمز عبور"
          />
          <FormControlLabel
            value={VM_SECURITY_TYPE_SETTING.VMKEY}
            control={<Radio />}
            label="کلید SSH"
          />
        </RadioGroup>
      </FormControl>
    </Stack>
  );
}; 