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
        direction={{ xs: "column", xl: "row" }}
        justifyContent="space-between"
        spacing={2}
      >
        <Box width={{ xs: "100%", xl: "50%" }}>
          <NotificationSetting />
        </Box>
        <Box width={{ xs: "100%", xl: "50%" }}>
          <SecuritySetting />
        </Box>
      </Stack>
    </Stack>
  );
};

export default Setting;
