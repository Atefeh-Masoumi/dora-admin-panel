import { Box } from "@mui/material";
import { type FC } from "react";
import { useGetApiMyPortalProfileGetQuery } from "src/app/services/api.generated";
import PageLoading from "src/components/atoms/PageLoading";
import CustomTabComponent, {
  tabsType,
} from "src/components/molecules/DorsaTab";
import Profile from "src/components/organisms/portal/account/profile/Index";
import { LegalPersonality } from "src/components/organisms/portal/account/profile/Legal";
import Notifications from "./Notifications";
import Referrals from "./Referrals";
import { NotificationSetting } from "src/components/organisms/portal/account/setting/NotificationSetting";
import { SecuritySetting } from "src/components/organisms/portal/account/setting/SecuritySetting";
import { ChangePassword } from "src/components/organisms/portal/account/setting/ChangePassword";
import { AccountSvg } from "src/components/atoms/svg-icons/AccountSvg";
import { AccessibilitySetting } from "src/components/organisms/portal/account/setting/AccessibilitySetting";

const tabs: tabsType[] = [
  {
    title: "حساب کاربری",
    icon: AccountSvg,
    content: <Profile />,
    path: "profile",
  },
  {
    title: "اطلاعات صورتحساب",
    icon: AccountSvg,
    content: <LegalPersonality />,
    path: "legal-personality",
  },
  {
    title: "کد معرف",
    icon: AccountSvg,
    content: <Referrals />,
    path: "referral",
  },
  {
    title: "اعلان ها",
    icon: AccountSvg,
    content: <Notifications />,
    path: "notification",
  },
  {
    title: "تنظیمات اطلاع رسانی",
    icon: AccountSvg,
    content: <NotificationSetting />,
    path: "notification-setting",
  },
  {
    title: "تنظیمات امنیتی",
    icon: AccountSvg,
    content: <SecuritySetting />,
    path: "security-setting",
  },
  {
    title: "تغییر رمز عبور",
    icon: AccountSvg,
    content: <ChangePassword />,
    path: "change-password",
  },
  {
    title: "مدیریت دسترسی",
    icon: AccountSvg,
    content: <AccessibilitySetting />,
    path: "accessibility",
  },
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
