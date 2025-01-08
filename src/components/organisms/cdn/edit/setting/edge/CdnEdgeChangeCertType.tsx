import { Button, Skeleton, Stack, Typography } from "@mui/material";
import { FC, Fragment } from "react";
import { usePutApiMyDnsCdnHostChangeEdgeCertTypeMutation } from "src/app/services/api.generated";
import { User } from "src/components/atoms/svg-icons/UserSvg";
import Cloud from "src/components/atoms/svg-icons/Cloud.svg";
import CloudOff from "src/components/atoms/svg-icons/CloudOff.svg";
import PageLoading from "src/components/atoms/PageLoading";
import { CdnEdgeCertUserCert } from "./CdnEdgeCertUserCert";
import { CdnEdgeCert } from "./CdnEdgeCert";
import { BORDER_RADIUS_1 } from "src/configs/theme";

type CdnEdgeChangeCertTypePropsType = {
  dnsId: number;
  loading?: boolean;
  certTypeId?: number;
};

export const CdnEdgeChangeCertType: FC<CdnEdgeChangeCertTypePropsType> = ({
  dnsId,
  loading,
  certTypeId,
}) => {
  const [changeEdge, { isLoading }] =
    usePutApiMyDnsCdnHostChangeEdgeCertTypeMutation();
  const onChangeEdge = (type: number) => {
    if (!certTypeId) return;
    changeEdge({
      changeEdgeCertTypeModel: {
        id: dnsId,
        cdnHostEdgeCertTypeId: type,
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
          alignItems="center"
          justifyContent="center"
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
                    borderRadius: { BORDER_RADIUS_1 },
                  }}
                />
              ))}
            </Stack>
          ) : (
            <Fragment>
              <Button
                sx={{ p: 0, borderRadius: BORDER_RADIUS_1 }}
                onClick={() => onChangeEdge(1)}
              >
                <Stack
                  color={certTypeId === 1 ? "primary.main" : "secondary.main"}
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  py={{ xs: 2, md: 3 }}
                  sx={{ border: 1, borderRadius: BORDER_RADIUS_1, px: 2 }}
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
                sx={{ p: 0, borderRadius: BORDER_RADIUS_1 }}
                onClick={() => onChangeEdge(2)}
              >
                <Stack
                  color={certTypeId === 2 ? "primary.main" : "secondary.main"}
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  py={{ xs: 1.2, md: 2.5 }}
                  sx={{ border: 1, borderRadius: BORDER_RADIUS_1, px: 2 }}
                >
                  <User
                    status={certTypeId === 2 ? "Active" : "Inactive"}
                    fontSize="large"
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
          <CdnEdgeCert dnsId={dnsId} loading />
        ) : (
          <CdnEdgeCertUserCert dnsId={dnsId} loading />
        )}
      </Stack>
    </>
  );
};
