import { Stack, Typography } from "@mui/material";
import type { FC } from "react";
import { useParams } from "react-router";
import { useGetApiMyCdnHostGetByDnsHostIdQuery } from "src/app/services/api.generated";
import { CdnSecuritySetting } from "src/components/organisms/cdn/edit/setting/CdnSecuritySetting";
import { CdnTypeSetting } from "src/components/organisms/cdn/edit/setting/CdnTypeSetting";
import { CdnOriginChangeCertType } from "src/components/organisms/cdn/edit/setting/origin/CdnOriginChangeCertType";
import { CdnEdgeChangeCertType } from "src/components/organisms/cdn/edit/setting/edge/CdnEdgeChangeCertType";

export const CdnSetting: FC = () => {
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
        <CdnEdgeChangeCertType
          dnsId={dnsId}
          loading={isLoading}
          certTypeId={zoneData?.zoneEdgeCertTypeId}
        />
      </Stack>

      <Stack spacing={2}>
        <Typography fontSize={24} color="secondary" fontWeight="bold">
          گواهی های سرور (ORIGIN)
        </Typography>
        <CdnOriginChangeCertType
          dnsId={dnsId}
          loading={isLoading}
          certTypeId={zoneData?.zoneClientCertTypeId}
        />
      </Stack>
    </Stack>
  );
};
