import type { FC } from "react";
import { Stack, Typography } from "@mui/material";
import { RadioHttpSetting } from "src/components/organisms/CDN/RadioHttpSetting";
import { SwitchHttpSetting } from "src/components/organisms/CDN/SwitchHttpSetting";
import { useAppSelector } from "src/app/hooks";
import { useGetApiV2CdnZoneGetByZoneNameQuery } from "src/app/services/api.generated";
import { EdgeCertification } from "../edge/EdgeCertification";
import { ClientCertification } from "../client/ClientCertification";

export const SSLSetting: FC = () => {
  const selectedDomain = useAppSelector((store) => store.cdn.selectedDomain);

  const zoneName = selectedDomain?.zoneName || "";
  const id = selectedDomain?.id || 0;

  const { data: zoneData, isLoading } = useGetApiV2CdnZoneGetByZoneNameQuery({
    zoneName,
  });
  return (
    <Stack width="100%" spacing={4}>
      <Stack spacing={2}>
        <Typography fontSize={24} color="secondary" fontWeight="bold">
          تنظیمات HTTPS
        </Typography>
        <RadioHttpSetting
          zoneTypeId={zoneData?.zoneTypeId as number}
          loading={isLoading}
          id={id}
        />
        <SwitchHttpSetting
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
        <EdgeCertification
          id={id}
          loading={isLoading}
          certTypeId={zoneData?.zoneEdgeCertTypeId}
        />
      </Stack>
      <Stack spacing={2}>
        <Typography fontSize={24} color="secondary" fontWeight="bold">
          گواهی های سرور (CLIENT)
        </Typography>
        <ClientCertification
          id={id}
          loading={isLoading}
          certTypeId={zoneData?.zoneClientCertTypeId}
        />
      </Stack>
    </Stack>
  );
};
