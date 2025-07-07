import { FC, useState, MouseEvent } from "react";
import {
  Stack,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from "@mui/material";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { VmKeyListResponse } from "src/app/services/api.generated";
import { VM_SECURITY_TYPE_SETTING } from "src/types/securityTypeSettings.type";

type SelectServiceNamePropsType = {
  serviceName: string;
  setServiceName: (serviceName: string) => void;
  securityId: VM_SECURITY_TYPE_SETTING;
  setSecurityId: (securityId: VM_SECURITY_TYPE_SETTING) => void;
  usePassword: boolean;
  setUsePassword: (usePassword: boolean) => void;
  useVmKey: boolean;
  setUseVmKey: (useVmKey: boolean) => void;
  password: string;
  setPassword: (password: string) => void;
  vmKeyId: any;
  setVmKeyId: (vmKeyId: any) => void;
  vmKeyList: VmKeyListResponse[] | undefined;
};

export const SelectServiceName: FC<SelectServiceNamePropsType> = ({
  serviceName,
  setServiceName,
  securityId,
  setSecurityId,
  usePassword,
  setUsePassword,
  useVmKey,
  setUseVmKey,
  password,
  setPassword,
  vmKeyId,
  setVmKeyId,
  vmKeyList,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleVmKeyChange = (event: SelectChangeEvent) => {
    const selectedKey = vmKeyList?.find(key => key.id?.toString() === event.target.value);
    setVmKeyId(selectedKey || null);
  };

  return (
    <Stack spacing={2} justifyContent="center" alignItems="center">
      {/* Service Name Section */}
      <DorsaTextField
        value={serviceName}
        onChange={(e) => setServiceName(e.target.value)}
        sx={{ minWidth: 300 }}
        label="نام سرویس"
        inputProps={{ dir: "ltr" }}
      />

      {/* Password Section */}
      <DorsaTextField
        type={showPassword ? "text" : "password"}
        sx={{ minWidth: 300 }}
        label="رمز عبور سرور ابری (Password)"
        dir="ltr"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="start"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* VM Key Section */}
      <FormControl sx={{ minWidth: 300 }}>
        <InputLabel>کلید SSH</InputLabel>
        <Select
          onChange={handleVmKeyChange}
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