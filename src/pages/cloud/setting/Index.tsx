import type { FC } from "react";
import { Stack } from "@mui/material";
import { ChangePassword } from "src/components/organisms/cloud/setting/ChangePassword";
import { NotificationSetting } from "src/components/organisms/cloud/setting/NotificationSetting";

const Setting: FC = () => {
  return (
    <Stack direction="column" rowGap={2}>
      <ChangePassword />
      <NotificationSetting />
    </Stack>
  );
};

export default Setting;
