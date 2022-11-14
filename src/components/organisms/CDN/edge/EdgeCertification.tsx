import { Button, Skeleton, Stack, Typography } from "@mui/material";
import { FC, Fragment } from "react";
import { usePutApiV2CdnZoneChangeEdgeCertTypeMutation } from "src/app/services/api.generated";
import { User } from "src/components/atoms/svg/UserSvg";
import { CloudCertification } from "./CloudCertification";
import Cloud from "src/components/atoms/svg/Cloud.svg";
import CloudOff from "src/components/atoms/svg/CloudOff.svg";
import { UserCertification } from "./UserCertification";

type EdgeCertificationPropsType = {
  id: number;
  loading?: boolean;
  certTypeId?: number;
};

export const EdgeCertification: FC<EdgeCertificationPropsType> = ({
  id,
  loading,
  certTypeId,
}) => {
  const [changeEdge] = usePutApiV2CdnZoneChangeEdgeCertTypeMutation();
  const onChangeEdge = (type: number) => {
    if (!certTypeId) return;
    changeEdge({ changeEdgeCertTypeModel: { id, zoneEdgeCertTypeId: type } });
  };

  return (
    <Stack direction={{ xs: "column", md: "row" }} spacing={1}>
      <Stack
        bgcolor="white"
        py={3}
        px={4}
        alignItems="center"
        justifyContent="center"
        borderRadius={2}
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
                sx={{ bgcolor: "secondary.light", borderRadius: 2 }}
              />
            ))}
          </Stack>
        ) : (
          <Fragment>
            <Button
              sx={{ p: 0, borderRadius: 2 }}
              onClick={() => onChangeEdge(1)}
            >
              <Stack
                color={certTypeId === 1 ? "primary.main" : "secondary.main"}
                direction="row"
                spacing={1}
                alignItems="center"
                py={{ xs: 2, md: 3 }}
                sx={{ border: 2, borderRadius: 2, px: 2 }}
              >
                <img src={certTypeId === 1 ? Cloud : CloudOff} alt="Cloud" />
                <Typography
                  fontWeight="bold"
                  fontSize={{ xs: 16, md: 18 }}
                  sx={{ lineHeight: 1, whiteSpace: "nowrap" }}
                >
                  استفاده از گواهی درسا
                </Typography>
              </Stack>
            </Button>

            <Button
              sx={{ p: 0, borderRadius: 2 }}
              onClick={() => onChangeEdge(2)}
            >
              <Stack
                color={certTypeId === 2 ? "primary.main" : "secondary.main"}
                direction="row"
                spacing={1}
                alignItems="center"
                py={{ xs: 1.2, md: 2.5 }}
                sx={{ border: 2, borderRadius: 2, px: 2 }}
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
      {certTypeId === 1 ? <CloudCertification /> : <UserCertification />}
    </Stack>
  );
};
