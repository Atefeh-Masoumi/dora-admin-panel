import { Stack, Typography } from "@mui/material";
import type { FC } from "react";
import { useParams } from "react-router";
import { useGetApiMyCdnHostGetByDnsHostIdQuery } from "src/app/services/api.generated";
import { CdnSecuritySetting } from "src/components/organisms/cdn/edit/ssl/CdnSecuritySetting";
import { CdnTypeSetting } from "src/components/organisms/cdn/edit/ssl/CdnTypeSetting";
import { CdnChangeClientCertType } from "src/components/organisms/cdn/edit/ssl/client/CdnChangeClientCertType";
import { CdnChangeEdgeCertType } from "src/components/organisms/cdn/edit/ssl/edge/CdnChangeEdgeCertType";

export const SSLSetting: FC = () => {
  const { id } = useParams();
  const dnsId = Number(id) || 0;

  const { data: zoneData, isLoading } = useGetApiMyCdnHostGetByDnsHostIdQuery({
    dnsHostId: dnsId,
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
          dnsId={dnsId}
        />
        <CdnSecuritySetting
          dnsId={dnsId}
          isHSTS={zoneData?.isHsts}
          isHttpsRedirect={zoneData?.isHttpsRedirect}
          isNonWwwRedirect={zoneData?.isNonWwwRedirect}
          loading={isLoading}
        />
      </Stack>
      <Stack spacing={2}>
        <Typography fontSize={24} color="secondary" fontWeight="bold">
          گواهی های لبه (EDGE)
        </Typography>
        <CdnChangeEdgeCertType
          id={dnsId}
          loading={isLoading}
          certTypeId={zoneData?.zoneEdgeCertTypeId}
        />
      </Stack>
      <Stack spacing={2}>
        <Typography fontSize={24} color="secondary" fontWeight="bold">
          گواهی های سرور (ORIGIN)
        </Typography>
        <CdnChangeClientCertType
          id={dnsId}
          loading={isLoading}
          certTypeId={zoneData?.zoneClientCertTypeId}
        />
      </Stack>
    </Stack>
  );
};
