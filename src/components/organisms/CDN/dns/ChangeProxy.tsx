import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { usePutApiV2CdnDnsRecordChangeProxyStatusByIdMutation } from "src/app/services/api.generated";
import { DorsaSwitch } from "src/components/atoms/DorsaSwitch";

type ChangeProxyStatusPropsType = {
  proxyStatus: boolean | undefined;
  id: number | undefined;
};

export const ChangeProxyStatus: FC<ChangeProxyStatusPropsType> = ({
  proxyStatus,
  id,
}) => {
  const [changeProxyStatus] =
    usePutApiV2CdnDnsRecordChangeProxyStatusByIdMutation();

  const changeProxy = () => {
    if (proxyStatus === undefined) return;
    changeProxyStatus({ id: id as number });
  };

  const color = proxyStatus === true ? "primary" : "secondary";

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      border={1}
      borderColor={`${color}.light`}
      borderRadius={2}
      alignItems="center"
      p={1.5}
      boxShadow={
        proxyStatus === true ? "0px 2px 11px rgba(60, 138, 255, 0.44)" : "none"
      }
    >
      <Stack color="secondary.main">
        <Typography color={color + ".main"} fontSize={16}>
          استفاده از Proxy
        </Typography>
        <Typography variant="text8" color="secondary">
          با انتخاب این گزینه ترافیک از ابر درسا عبور خواهد کرد
        </Typography>
      </Stack>
      <DorsaSwitch checked={proxyStatus} onChange={changeProxy} />
    </Stack>
  );
};
