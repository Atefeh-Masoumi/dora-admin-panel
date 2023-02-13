import type { FC } from "react";
import { Skeleton, Stack } from "@mui/material";
import { Specifications } from "src/components/organisms/portal/profile/Specifications";
import { MobileValidation } from "src/components/organisms/portal/profile/MobileValidation";
import { EmailValidation } from "src/components/organisms/portal/profile/EmailValidation";
import { useGetUserV2PortalProfileGetQuery } from "src/app/services/api.generated";
import { LegalPersonality } from "src/components/organisms/portal/profile/Legal";

const Profile: FC = () => {
  const { data: userInformation, isLoading } = useGetUserV2PortalProfileGetQuery();

  return (
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
          {!userInformation || isLoading ? (
            <Stack spacing={3} height="100%" justifyContent="space-between">
              <Stack
                bgcolor="white"
                p={4}
                pt={10}
                borderRadius={2}
                height="100%"
                spacing={2}
              >
                <Skeleton
                  variant="rectangular"
                  height={50}
                  sx={{ bgcolor: "secondary.light", borderRadius: 2 }}
                />
                <Stack direction="row" justifyContent="end">
                  <Skeleton
                    variant="rectangular"
                    height={80}
                    width={200}
                    sx={{ bgcolor: "secondary.light", borderRadius: 2 }}
                  />
                </Stack>
              </Stack>
              <Stack
                bgcolor="white"
                p={4}
                pt={10}
                borderRadius={2}
                height="100%"
                spacing={2}
              >
                <Skeleton
                  variant="rectangular"
                  height={50}
                  sx={{ bgcolor: "secondary.light", borderRadius: 2 }}
                />
                <Stack direction="row" justifyContent="end">
                  <Skeleton
                    variant="rectangular"
                    height={80}
                    width={200}
                    sx={{ bgcolor: "secondary.light", borderRadius: 2 }}
                  />
                </Stack>
              </Stack>
            </Stack>
          ) : (
            <Stack spacing={2}>
              <MobileValidation
                isVerified={userInformation.phoneNumberConfirmed}
                phoneNumber={userInformation.phoneNumber}
              />
              <EmailValidation
                isVerified={userInformation.emailConfirmed}
                email={userInformation.email}
              />
            </Stack>
          )}
        </Stack>
      </Stack>
      <LegalPersonality isLegal={userInformation?.isLegal || false} />
    </Stack>
  );
};

export default Profile;
