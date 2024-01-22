import { type FC } from "react";
import { Stack } from "@mui/material";
import { Specifications } from "src/components/organisms/portal/profile/Specifications";
import { MobileValidation } from "src/components/organisms/portal/profile/MobileValidation";
import { EmailValidation } from "src/components/organisms/portal/profile/EmailValidation";
import { useGetApiMyPortalProfileGetQuery } from "src/app/services/api.generated";
import { LegalPersonality } from "src/components/organisms/portal/profile/Legal";
import PageLoading from "src/components/atoms/PageLoading";

const Profile: FC = () => {
  const { isLoading } = useGetApiMyPortalProfileGetQuery();

  return (
    <>
      {isLoading && <PageLoading />}
      <Stack spacing={2}>
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
      </Stack>
    </>
  );
};

export default Profile;
