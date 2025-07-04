import { FC } from "react";
import {
  Box,
  Stack,
  Typography,
  Paper
} from "@mui/material";
import { VM_SECURITY_TYPE_SETTING } from "src/types/securityTypeSettings.type";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { SelectPassword } from "./SelectPassword";
import { SelectVmKey } from "./SelectVmKey";

type SelectSecuritySettingsPropsType = {
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
  vmKeyList: any;
};

export const SelectSecuritySettings: FC<SelectSecuritySettingsPropsType> = ({
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
  return (
    <Stack spacing={3} justifyContent="center" alignItems="center">
      <Typography fontSize={24} fontWeight="bold" align="center">
        روش احراز هویت
      </Typography>

      <Stack direction="column" spacing={2} sx={{ width: "100%", maxWidth: 600 }}>
        {/* Password Section */}
        <Paper
          elevation={1}
          sx={{
            p: 2,
            borderRadius: BORDER_RADIUS_1,
            border: 2,
            borderColor: "grey.200",
            bgcolor: "background.paper",
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={{ flex: 1 }}>
              <Typography fontWeight="bold" fontSize={16}>
                رمز عبور
              </Typography>
              <Typography fontSize={14} color="text.secondary">
                استفاده از رمز عبور برای ورود
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <SelectPassword password={password} setPassword={setPassword} />
            </Box>
          </Stack>
        </Paper>

        {/* VM Key Section */}
        <Paper
          elevation={1}
          sx={{
            p: 2,
            borderRadius: BORDER_RADIUS_1,
            border: 2,
            borderColor: "grey.200",
            bgcolor: "background.paper",
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={{ flex: 1 }}>
              <Typography fontWeight="bold" fontSize={16}>
                کلید SSH
              </Typography>
              <Typography fontSize={14} color="text.secondary">
                استفاده از کلید SSH برای ورود
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <SelectVmKey vmKeyList={vmKeyList} setVmKeyId={setVmKeyId} />
            </Box>
          </Stack>
        </Paper>
      </Stack>
    </Stack>
  );
}; 