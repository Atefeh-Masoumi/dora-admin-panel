import { FC } from "react";
import { 
  Box, 
  Checkbox, 
  FormControlLabel, 
  Stack, 
  Typography,
  Paper
} from "@mui/material";
import { VM_SECURITY_TYPE_SETTING } from "src/types/securityTypeSettings.type";
import { BORDER_RADIUS_1 } from "src/configs/theme";

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
  const handleSecurityChange = (value: VM_SECURITY_TYPE_SETTING) => {
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
    <Stack spacing={3} justifyContent="center" alignItems="center">
      <Typography fontSize={24} fontWeight="bold" align="center">
        روش احراز هویت
      </Typography>
      
      <Stack direction="row" spacing={2} sx={{ width: "100%", maxWidth: 400 }}>
        <Paper
          elevation={securityId === VM_SECURITY_TYPE_SETTING.PASSWORD ? 4 : 1}
          sx={{
            flex: 1,
            p: 2,
            cursor: "pointer",
            borderRadius: BORDER_RADIUS_1,
            border: 2,
            borderColor: securityId === VM_SECURITY_TYPE_SETTING.PASSWORD 
              ? "primary.main" 
              : "grey.200",
            bgcolor: securityId === VM_SECURITY_TYPE_SETTING.PASSWORD 
              ? "primary.50" 
              : "background.paper",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              borderColor: "primary.main",
              bgcolor: "primary.50",
              transform: "translateY(-2px)",
            },
          }}
          onClick={() => handleSecurityChange(VM_SECURITY_TYPE_SETTING.PASSWORD)}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={securityId === VM_SECURITY_TYPE_SETTING.PASSWORD}
                onChange={() => handleSecurityChange(VM_SECURITY_TYPE_SETTING.PASSWORD)}
                sx={{
                  color: "primary.main",
                  "&.Mui-checked": {
                    color: "primary.main",
                  },
                }}
              />
            }
            label={
              <Box>
                <Typography fontWeight="bold" fontSize={16}>
                  رمز عبور
                </Typography>
                <Typography fontSize={14} color="text.secondary">
                  استفاده از رمز عبور برای ورود
                </Typography>
              </Box>
            }
            sx={{ 
              width: "100%", 
              margin: 0,
              "& .MuiFormControlLabel-label": {
                width: "100%",
              }
            }}
          />
        </Paper>

        <Paper
          elevation={securityId === VM_SECURITY_TYPE_SETTING.VMKEY ? 4 : 1}
          sx={{
            flex: 1,
            p: 2,
            cursor: "pointer",
            borderRadius: BORDER_RADIUS_1,
            border: 2,
            borderColor: securityId === VM_SECURITY_TYPE_SETTING.VMKEY 
              ? "primary.main" 
              : "grey.200",
            bgcolor: securityId === VM_SECURITY_TYPE_SETTING.VMKEY 
              ? "primary.50" 
              : "background.paper",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              borderColor: "primary.main",
              bgcolor: "primary.50",
              transform: "translateY(-2px)",
            },
          }}
          onClick={() => handleSecurityChange(VM_SECURITY_TYPE_SETTING.VMKEY)}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={securityId === VM_SECURITY_TYPE_SETTING.VMKEY}
                onChange={() => handleSecurityChange(VM_SECURITY_TYPE_SETTING.VMKEY)}
                sx={{
                  color: "primary.main",
                  "&.Mui-checked": {
                    color: "primary.main",
                  },
                }}
              />
            }
            label={
              <Box>
                <Typography fontWeight="bold" fontSize={16}>
                  کلید SSH
                </Typography>
                <Typography fontSize={14} color="text.secondary">
                  استفاده از کلید SSH برای ورود
                </Typography>
              </Box>
            }
            sx={{ 
              width: "100%", 
              margin: 0,
              "& .MuiFormControlLabel-label": {
                width: "100%",
              }
            }}
          />
        </Paper>
      </Stack>
    </Stack>
  );
}; 