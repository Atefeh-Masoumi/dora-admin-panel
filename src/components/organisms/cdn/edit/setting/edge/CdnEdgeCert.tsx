import type { FC } from "react";
import { Divider, Stack, Typography } from "@mui/material";
import { Add } from "src/components/atoms/svg-icons/AddSvg";
import { TextLoading } from "src/components/molecules/TextLoading";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import {
  usePostApiMyDnsCdnEdgeCertCreateMutation,
  useGetApiMyDnsCdnEdgeCertGetByDnsCdnHostIdQuery,
} from "src/app/services/api.generated";

type CdnEdgeCertPropsType = {
  dnsId: number;
  loading?: boolean;
};

export const CdnEdgeCert: FC<CdnEdgeCertPropsType> = ({ dnsId, loading }) => {
  const [createLicense, { isLoading: loadingCreate }] =
    usePostApiMyDnsCdnEdgeCertCreateMutation();

  const { data: edgeCert, isLoading } =
    useGetApiMyDnsCdnEdgeCertGetByDnsCdnHostIdQuery({
      dnsCdnHostId: dnsId,
    });

  const submit = () => {
    createLicense({
      createCdnEdgeCertModel: {
        dnsCdnHostId: dnsId,
      },
    })
      .unwrap()
      .then(() => toast.success("Certificate created"))
      .catch((res) => {
        if (res.status === 401 || res.status === 404) toast.error("خطای سرور");
        else toast.error(res.data[""][0]);
      });
  };

  return (
    <Stack bgcolor="white" borderRadius={BORDER_RADIUS_1} p={2} width="100%">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography>گواهی ابر درسا</Typography>
        <LoadingButton
          loading={loadingCreate}
          variant="outlined"
          size="large"
          sx={{ whiteSpace: "nowrap", px: 1.2, borderRadius: 1.5, border: 1 }}
          startIcon={
            <Add sx={{ "& path": { stroke: "rgba(60, 138, 255, 1)" } }} />
          }
          onClick={submit}
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
