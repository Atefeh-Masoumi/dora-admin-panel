import type { FC } from "react";
import { Stack, Typography } from "@mui/material";
import { Add } from "src/components/atoms/svg-icons/AddSvg";
import { TextLoading } from "src/components/molecules/TextLoading";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import {
  usePostApiMyDnsCdnEdgeCertCreateMutation,
  useGetApiMyDnsCdnEdgeCertGetByDnsCdnHostIdQuery,
} from "src/app/services/api.generated";
import EmptyTableSvg from "src/components/atoms/svg-icons/EmptyTableSvg.svg";

import { ConvertToJalali } from "src/utils/convertToJalali";

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
      .catch((res) => {});
  };

  return (
    <Stack bgcolor="white" borderRadius={BORDER_RADIUS_1} p={2} width="100%">
      <Stack direction="row" justifyContent="end" alignItems="center">
        <LoadingButton
          loading={loadingCreate}
          variant="outlined"
          size="large"
          sx={{ whiteSpace: "nowrap", px: 1.2, borderRadius: 1.5, border: 1 }}
          startIcon={
            <Add sx={{ "& path": { stroke: "#00a651" } }} />
          }
          onClick={submit}
        >
          {edgeCert ? "تمدید SSL" : "درخواست SSL"}
        </LoadingButton>
      </Stack>
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
