import { Stack, Typography } from "@mui/material";
import type { FC } from "react";
import { useParams } from "react-router";
import { useGetApiMyDnsCdnHostGetCdnByIdQuery } from "src/app/services/api.generated";
import { CdnSecuritySetting } from "src/components/organisms/cdn/edit/setting/CdnSecuritySetting";
import { CdnTypeSetting } from "src/components/organisms/cdn/edit/setting/CdnTypeSetting";
import { CdnOriginChangeCertType } from "src/components/organisms/cdn/edit/setting/origin/CdnOriginChangeCertType";
import { CdnEdgeChangeCertType } from "src/components/organisms/cdn/edit/setting/edge/CdnEdgeChangeCertType";

export const CdnSetting: FC = () => {
  const { id } = useParams();
  const dnsId = Number(id) || 0;

  const { data: zoneData, isLoading } = useGetApiMyDnsCdnHostGetCdnByIdQuery({
    id: dnsId,
  });
  return (
    <Stack width="100%" spacing={4}>
      <Stack spacing={2}>
        <Typography fontSize={24} color="secondary" fontWeight="bold">
          تنظیمات HTTPS
        </Typography>
        <CdnTypeSetting
          zoneTypeId={zoneData?.cdnHostTypeId as number}
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
          certTypeId={zoneData?.cdnHostEdgeCertTypeId}
        />
      </Stack>

      <Stack spacing={2}>
        <Typography fontSize={24} color="secondary" fontWeight="bold">
          گواهی های سرور (ORIGIN)
        </Typography>
        <CdnOriginChangeCertType
          dnsId={dnsId}
          loading={isLoading}
          certTypeId={zoneData?.cdnHostOriginCertTypeId}
        />
      </Stack>
    </Stack>
  );
};
