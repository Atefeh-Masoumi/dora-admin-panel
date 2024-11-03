import type { FC } from "react";
import { Divider, Stack, Typography } from "@mui/material";
import { Add } from "src/components/atoms/svg-icons/AddSvg";
import { useGetApiMyDnsCdnOriginCertGetByDnsCdnHostIdQuery } from "src/app/services/api.generated";
import { TextLoading } from "src/components/molecules/TextLoading";
import { LoadingButton } from "@mui/lab";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { ConvertToJalali } from "src/utils/convertToJalali";
import EmptyTableSvg from "src/components/atoms/svg-icons/EmptyTableSvg.svg";

type CdnOriginCertPropsType = {
  dnsId: number;
  loading?: boolean;
};

export const CdnOriginCert: FC<CdnOriginCertPropsType> = ({
  dnsId,
  loading,
}) => {
  const { data: edgeCert, isLoading } =
    useGetApiMyDnsCdnOriginCertGetByDnsCdnHostIdQuery({
      dnsCdnHostId: dnsId,
    });

  return (
    <Stack bgcolor="white" borderRadius={BORDER_RADIUS_1} p={2} width="100%">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography>گواهی ابر راهبر</Typography>
        <LoadingButton
          variant="outlined"
          size="large"
          sx={{ whiteSpace: "nowrap", px: 1.2, borderRadius: 1.5, border: 1 }}
          startIcon={
            <Add sx={{ "& path": { stroke: "rgba(60, 138, 255, 1)" } }} />
          }
        >
          {edgeCert ? "تمدید گواهی" : "افزودن"}
        </LoadingButton>
      </Stack>
      <Divider sx={{ width: "100%", color: "#6E768A14", my: 2 }} />
      {edgeCert ? (
        <Stack spacing={2} px={1} color="secondary.main">
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="text14">صادرکننده گواهی:</Typography>
            {isLoading ? (
              <TextLoading num={9} />
            ) : (
              <Typography variant="text15">{edgeCert?.issuer}</Typography>
            )}
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="text14">پایان اعتبار:</Typography>
            {isLoading ? (
              <TextLoading num={8} />
            ) : (
              <Typography variant="text15">
                {edgeCert?.expirationDate
                  ? ConvertToJalali(String(edgeCert?.expirationDate))
                  : "---"}
              </Typography>
            )}
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="text14">دامنه‌ها:</Typography>
            {isLoading ? (
              <TextLoading num={9} />
            ) : (
              <Typography variant="text15">{edgeCert?.commonName}</Typography>
            )}
          </Stack>
        </Stack>
      ) : (
        <Stack direction="row" justifyContent="center">
          <img
            src={EmptyTableSvg}
            alt="Empty Card"
            style={{ maxWidth: "160px", maxHeight: "100px" }}
          />
        </Stack>
      )}
    </Stack>
  );
};
