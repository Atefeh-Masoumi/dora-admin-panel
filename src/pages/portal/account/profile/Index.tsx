import { Box } from "@mui/material";
import { type FC } from "react";
import { useGetApiMyPortalProfileGetQuery } from "src/app/services/api.generated";
import PageLoading from "src/components/atoms/PageLoading";
import CustomTabComponent, {
  tabsType,
} from "src/components/organisms/CustomTab";
import { EmailValidation } from "src/components/organisms/portal/account/profile/EmailValidation";
import { LegalPersonality } from "src/components/organisms/portal/account/profile/Legal";
import { MobileValidation } from "src/components/organisms/portal/account/profile/MobileValidation";

const tabs: tabsType[] = [
  {
    title: "حساب کاربری",
    content: (
      <>
        <MobileValidation />
        <EmailValidation />
      </>
    ),
  },
  { title: "ویژگی‌ها و مزایا", content: <LegalPersonality /> },
];

const Profile: FC = () => {
  const { isLoading } = useGetApiMyPortalProfileGetQuery();

  return (
    <>
      {isLoading && <PageLoading />}
      {/* <Stack spacing={2}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          rowGap={2}
          columnGap={3}
          justifyContent="space-between"
        >
          <Stack width="100%">
            <Specifications />
          </Stack>
          <Stack width="100%">
            <Stack spacing={2}>
              <MobileValidation />
              <EmailValidation />
            </Stack>
          </Stack>
        </Stack>
        <LegalPersonality />
      </Stack> */}
      <Box sx={{ my: 10 }}>
        <CustomTabComponent tabs={tabs} />
      </Box>
    </>
  );
};

export default Profile;
