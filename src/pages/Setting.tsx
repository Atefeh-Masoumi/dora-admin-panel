import type { FC } from "react";
import { Stack } from "@mui/material";
import { ChangePassword } from "src/components/organisms/setting/ChangePassword";
import { SecuritySetting } from "src/components/organisms/setting/SecuritySetting";

const Setting: FC = () => {
  return (
      <Stack direction="column" rowGap={2}>
        <ChangePassword />
        <SecuritySetting />
      </Stack>
  );
};

export default Setting;
