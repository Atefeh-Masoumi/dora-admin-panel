import type { FC } from "react";
import { Stack, Typography } from "@mui/material";
import { useAppSelector } from "src/app/hooks";
import { CdnTypeSetting } from "src/components/organisms/cdn/editZone/ssl/CdnTypeSetting";
import { CdnSecuritySetting } from "src/components/organisms/cdn/editZone/ssl/CdnSecuritySetting";
import { CdnChangeEdgeCertType } from "src/components/organisms/cdn/editZone/ssl/edge/CdnChangeEdgeCertType";
import { CdnChangeClientCertType } from "src/components/organisms/cdn/editZone/ssl/client/CdnChangeClientCertType";
import { useGetUserV2CdnCdnGetByZoneNameQuery } from "src/app/services/api.generated";

export const SSLSetting: FC = () => {
  const selectedDomain = useAppSelector((store) => store.cdn.selectedDomain);

  const zoneName = selectedDomain?.zoneName || "";
  const id = selectedDomain?.id || 0;

  const { data: zoneData, isLoading } = useGetUserV2CdnCdnGetByZoneNameQuery({
    zoneName,
  });
  return (
    <Stack width="100%" spacing={4}>
      <Stack spacing={2}>
        <Typography fontSize={24} color="secondary" fontWeight="bold">
          تنظیمات HTTPS
        </Typography>
        <CdnTypeSetting
          zoneTypeId={zoneData?.zoneTypeId as number}
          loading={isLoading}
          id={id}
        />
        <CdnSecuritySetting
          id={id}
          isHSTS={zoneData?.isHsts}
          isRedirect={zoneData?.isRedirect}
          loading={isLoading}
        />
      </Stack>
      <Stack spacing={2}>
        <Typography fontSize={24} color="secondary" fontWeight="bold">
          گواهی های لبه (EDGE)
        </Typography>
        <CdnChangeEdgeCertType
          id={id}
          loading={isLoading}
          certTypeId={zoneData?.zoneEdgeCertTypeId}
        />
      </Stack>
      <Stack spacing={2}>
        <Typography fontSize={24} color="secondary" fontWeight="bold">
          گواهی های سرور (ORIGIN)
        </Typography>
        <CdnChangeClientCertType
          id={id}
          loading={isLoading}
          certTypeId={zoneData?.zoneClientCertTypeId}
        />
      </Stack>
    </Stack>
  );
};
