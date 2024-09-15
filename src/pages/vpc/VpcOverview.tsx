import { Button, Chip, Divider, Stack, Typography } from "@mui/material";
import { FC, useMemo } from "react";
import { useParams } from "react-router";
import { useGetApiMyVpcHostGetByIdQuery } from "src/app/services/api.generated";
import { RefreshSvg } from "src/components/atoms/svg-icons/RefreshSvg";
import { BoxRow } from "src/components/molecules/BoxRow";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { serviceStatusIdentifier } from "src/constant/serviceStatusIdentifier";
import { ConvertToJalali } from "src/utils/convertToJalali";

type VpcOverviewPropsType = {};

export const VpcOverview: FC<VpcOverviewPropsType> = () => {
  const { vpcId } = useParams();
  const vpcHostId = Number(vpcId) || 0;

  const refetchOnClick = () => refetch();

  const {
    data: vpcData,
    isLoading: getDataLoading,
    refetch,
    isFetching: getDataFetching,
  } = useGetApiMyVpcHostGetByIdQuery({ id: vpcHostId });

  const isLoading = useMemo(
    () => getDataLoading || getDataFetching,
    [getDataFetching, getDataLoading]
  );

  return (
    <Stack
      bgcolor="white"
      py={2}
      px={3}
      borderRadius={BORDER_RADIUS_1}
      width="100%"
      direction="row"
      justifyContent="center"
    >
      <Stack width="100%">
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems={{ xs: "start", md: "center" }}
          justifyContent="space-between"
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            alignItems={{ xs: "start", md: "center" }}
            width="100%"
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              width="100%"
              alignItems="center"
            >
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Typography fontSize={18} color="secondary" whiteSpace="nowrap">
                  مشخصات دامنه
                </Typography>
              </Stack>
              <Stack
                display={{ xs: "none", md: "flex" }}
                direction="row"
                spacing={2}
                alignItems="center"
              >
                <Button
                  onClick={refetchOnClick}
                  variant="outlined"
                  size="large"
                  sx={{
                    whiteSpace: "nowrap",
                    px: 1.2,
                    borderRadius: BORDER_RADIUS_1,
                  }}
                  startIcon={<RefreshSvg sx={{ width: 20, height: 20 }} />}
                >
                  بررسی مجدد وضعیت
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        <Divider sx={{ width: "100%", color: "#6E768A14", py: 1 }} />
        <Stack py={1.5} spacing={2}>
          <BoxRow
            title="Status"
            component={
              <Chip
                label={serviceStatusIdentifier(vpcData?.statusId!).label}
                sx={{
                  bgcolor: serviceStatusIdentifier(vpcData?.statusId!).bgColor,
                  color: serviceStatusIdentifier(vpcData?.statusId!)
                    .typographyColor,
                  borderRadius: BORDER_RADIUS_1,
                }}
              />
            }
            isLoading={isLoading}
          />
          <BoxRow
            title="vPC Name"
            value={vpcData?.name}
            isLoading={isLoading}
          />
          <BoxRow
            title="Datacenter"
            value={vpcData?.datacenter}
            isLoading={isLoading}
          />
          <BoxRow
            title="Create Date"
            value={ConvertToJalali(String(vpcData?.createDate))}
            isLoading={isLoading}
          />{" "}
          <BoxRow
            title="Last Edit Date"
            value={ConvertToJalali(String(vpcData?.modifyDate))}
            isLoading={isLoading}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
