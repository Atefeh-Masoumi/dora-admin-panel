import { Stack } from "@mui/material";
import { type FC } from "react";
import { useGetApiMyPortalProfileGetQuery } from "src/app/services/api.generated";
import PageLoading from "src/components/atoms/PageLoading";
import { EmailValidation } from "src/components/organisms/portal/account/profile/EmailValidation";
import { MobileValidation } from "src/components/organisms/portal/account/profile/MobileValidation";
import { Specifications } from "src/components/organisms/portal/account/profile/Specifications";

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
      </Stack>
    </>
  );
};

export default Profile;
