import type { FC } from "react";
import { Stack } from "@mui/material";
import { ChangePassword } from "src/components/organisms/portal/setting/ChangePassword";
import { NotificationSetting } from "src/components/organisms/portal/setting/NotificationSetting";

const Setting: FC = () => {
  return (
    <Stack direction="column" rowGap={2}>
      <ChangePassword />
      <NotificationSetting />
    </Stack>
  );
};

export default Setting;
