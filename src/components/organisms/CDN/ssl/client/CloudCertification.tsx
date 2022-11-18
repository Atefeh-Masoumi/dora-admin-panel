import type { FC } from "react";
import { Divider, Stack, Typography } from "@mui/material";
import { Add } from "src/components/atoms/svg/AddSvg";
import { useGetApiV2CdnClientCertGetByZoneNameQuery } from "src/app/services/api.generated";
import { useAppSelector } from "src/app/hooks";
import { TextLoading } from "src/components/molecules/TextLoading";
import { LoadingButton } from "@mui/lab";

export const CloudCertification: FC = () => {
  const selectedDomain = useAppSelector((store) => store.cdn.selectedDomain);

  const { data: edgeCert, isLoading } =
    useGetApiV2CdnClientCertGetByZoneNameQuery({
      zoneName: selectedDomain?.zoneName || "",
    });

  /* const submit = () => {
    createLicense({
      createZoneEdgeCertificateModel: {
        zoneName: selectedDomain?.zoneName || "",
      },
    })
      .unwrap()
      .then(() => toast.success("Certificate created"))
      .catch((res) => {
        if (res.status === 401 || res.status === 404) toast.error("خطای سرور");
        else toast.error(res.data[""][0]);
      });
  }; */

  return (
    <Stack bgcolor="white" borderRadius={2} p={2} width="100%">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography>گواهی ابر درسا</Typography>
        <LoadingButton
          // loading={loadingCreate}
          variant="outlined"
          size="large"
          sx={{ whiteSpace: "nowrap", px: 1.2, borderRadius: 1.5, border: 1 }}
          startIcon={
            <Add sx={{ "& path": { stroke: "rgba(60, 138, 255, 1)" } }} />
          }
        // onClick={submit}
        >
          صدور گواهی
        </LoadingButton>
      </Stack>
      <Divider sx={{ width: "100%", color: "#6E768A14", my: 2 }} />
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
            <Typography variant="text15">{edgeCert?.expirationDate}</Typography>
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
    </Stack>
  );
};
