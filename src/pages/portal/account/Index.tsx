import { Box } from "@mui/material";
import { type FC } from "react";
import { useGetApiMyPortalProfileGetQuery } from "src/app/services/api.generated";
import PageLoading from "src/components/atoms/PageLoading";
import CustomTabComponent, {
  tabsType,
} from "src/components/organisms/CustomTab";
import Profile from "src/components/organisms/portal/account/profile/Index";
import { LegalPersonality } from "src/components/organisms/portal/account/profile/Legal";
import Notifications from "./Notifications";
import Referrals from "./Referrals";
import { NotificationSetting } from "src/components/organisms/portal/account/setting/NotificationSetting";
import { SecuritySetting } from "src/components/organisms/portal/account/setting/SecuritySetting";
import { ChangePassword } from "src/components/organisms/portal/account/setting/ChangePassword";

const tabs: tabsType[] = [
  { title: "حساب کاربری", content: <Profile /> },
  { title: "اطلاعات صورتحساب", content: <LegalPersonality /> },
  { title: "کد معرف", content: <Referrals /> },
  { title: "اعلان ها", content: <Notifications /> },
  { title: "تنظمات اطلاع رسانی", content: <NotificationSetting /> },
  { title: "تنظمات امنیتی", content: <SecuritySetting /> },
  { title: "تغییر رمز عبور", content: <ChangePassword /> },
];

const Account: FC = () => {
  const { isLoading } = useGetApiMyPortalProfileGetQuery();

  return (
    <>
      {isLoading && <PageLoading />}
      <Box sx={{ my: 1 }}>
        <CustomTabComponent tabs={tabs} />
      </Box>
    </>
  );
};

export default Account;
