import { Button, Skeleton, Stack, Typography } from "@mui/material";
import { FC, Fragment } from "react";
import { usePutApiMyDnsCdnHostChangeOriginCertTypeMutation } from "src/app/services/api.generated";
import { User } from "src/components/atoms/svg-icons/UserSvg";
import Cloud from "src/components/atoms/svg-icons/Cloud.svg";
import CloudOff from "src/components/atoms/svg-icons/CloudOff.svg";
import PageLoading from "src/components/atoms/PageLoading";
import { CdnOriginCertUserCert } from "./CdnOriginCertUserCert";
import { CdnOriginCert } from "./CdnOriginCert";
import { BORDER_RADIUS_1 } from "src/configs/theme";

type CdnOriginChangeCertTypePropsType = {
  dnsId: number;
  loading: boolean | undefined;
  certTypeId: number | undefined;
};

export const CdnOriginChangeCertType: FC<CdnOriginChangeCertTypePropsType> = ({
  dnsId,
  loading,
  certTypeId,
}) => {
  const [changeClient, { isLoading }] =
    usePutApiMyDnsCdnHostChangeOriginCertTypeMutation();
  const onChangeClient = (type: number) => {
    if (!certTypeId) return;
    changeClient({
      changeOriginCertTypeModel: {
        id: dnsId,
        cdnHostOriginCertTypeId: type,
      },
    });
  };
  return (
    <>
      {isLoading && <PageLoading />}
      <Stack direction={{ xs: "column", md: "row" }} spacing={1}>
        <Stack
          bgcolor="white"
          py={3}
          px={4}
          borderRadius={BORDER_RADIUS_1}
          spacing={1.5}
        >
          {loading ? (
            <Stack spacing={2} justifyContent="center">
              {[...Array(2)].map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rectangular"
                  height={70}
                  width={240}
                  sx={{
                    bgcolor: "secondary.light",
                    borderRadius: BORDER_RADIUS_1,
                  }}
                />
              ))}
            </Stack>
          ) : (
            <Fragment>
              <Button
                sx={{ p: 0, borderRadius: BORDER_RADIUS_1 }}
                value="hi"
                onClick={() => onChangeClient(1)}
              >
                <Stack
                  color={certTypeId === 1 ? "primary.main" : "secondary.main"}
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  py={{ xs: 2, md: 3 }}
                  sx={{ px: 2, border: 1, borderRadius: BORDER_RADIUS_1 }}
                >
                  <img src={certTypeId === 1 ? Cloud : CloudOff} alt="Cloud" />
                  <Typography
                    fontWeight="bold"
                    fontSize={{ xs: 16, md: 18 }}
                    sx={{ lineHeight: 1, whiteSpace: "nowrap" }}
                  >
                    استفاده از گواهی ابری
                  </Typography>
                </Stack>
              </Button>
              <Button
                onClick={() => onChangeClient(2)}
                sx={{ p: 0, borderRadius: BORDER_RADIUS_1 }}
              >
                <Stack
                  color={certTypeId === 2 ? "primary.main" : "secondary.main"}
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  py={{ xs: 1.2, md: 2.5 }}
                  sx={{ px: 2, border: 1, borderRadius: BORDER_RADIUS_1 }}
                >
                  <User
                    fontSize="large"
                    status={certTypeId === 2 ? "Active" : "Inactive"}
                  />

                  <Typography
                    fontWeight="bold"
                    fontSize={{ xs: 16, md: 18 }}
                    sx={{ lineHeight: 1, whiteSpace: "nowrap" }}
                  >
                    استفاده از گواهی کاربر
                  </Typography>
                </Stack>
              </Button>
            </Fragment>
          )}
        </Stack>
        {certTypeId === 1 ? (
          <CdnOriginCert dnsId={dnsId} loading />
        ) : (
          <CdnOriginCertUserCert dnsId={dnsId} loading />
        )}
      </Stack>
    </>
  );
};
