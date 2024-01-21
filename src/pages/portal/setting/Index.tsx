import type { FC } from "react";
import { Box, Stack } from "@mui/material";
import { ChangePassword } from "src/components/organisms/portal/setting/ChangePassword";
import { NotificationSetting } from "src/components/organisms/portal/setting/NotificationSetting";
import { SecuritySetting } from "src/components/organisms/portal/setting/SecuritySetting";

const Setting: FC = () => {
  return (
    <Stack direction="column" rowGap={2}>
      <ChangePassword />
      <Stack
        direction={{ xs: "column", md: "row" }}
        // alignItems="center"
        justifyContent="space-between"
      >
        <Box width={{ xs: "100%", md: "49%" }}>
          <NotificationSetting />
        </Box>
        <Box width={{ xs: "100%", md: "49%" }}>
          <SecuritySetting />
        </Box>
      </Stack>
    </Stack>
  );
};

export default Setting;
