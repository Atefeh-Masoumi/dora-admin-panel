import { Button, Chip, Divider, Stack, Typography } from "@mui/material";
import { FC, useMemo } from "react";
import { useParams } from "react-router";
import { useGetApiMyDnsHostGetByIdQuery } from "src/app/services/api.generated";
import { RefreshSvg } from "src/components/atoms/svg-icons/RefreshSvg";
import { BoxRow } from "src/components/molecules/BoxRow";
import { BORDER_RADIUS_1 } from "src/configs/theme";

type ZoneInfoPropsType = {};

export const ZoneInfo: FC<ZoneInfoPropsType> = () => {
  const { id } = useParams();
  const dnsId = Number(id) || 0;

  const refetchOnClick = () => refetch();

  const {
    data: zoneData,
    isLoading: getDataLoading,
    refetch,
    isFetching: getDataFetching,
  } = useGetApiMyDnsHostGetByIdQuery({ id: dnsId });

  const isLoading = useMemo(
    () => getDataLoading || getDataFetching,
    [getDataFetching, getDataLoading]
  );

  const isActive = useMemo(
    () => zoneData?.statusId === 2,
    [zoneData?.statusId]
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
                  بررسی مجدد دامنه
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
                label={zoneData?.status}
                sx={{
                  bgcolor: ({ palette }) =>
                    isActive ? palette.success.light : palette.error.light,
                  color: ({ palette }) =>
                    isActive ? palette.success.main : palette.error.main,
                  borderRadius: BORDER_RADIUS_1,
                }}
              />
            }
            isLoading={isLoading}
          />
          <BoxRow
            title="Zone Name"
            value={zoneData?.zoneName}
            isLoading={isLoading}
          />
          <BoxRow
            title="Create Date"
            value={zoneData?.createDate}
            isLoading={isLoading}
          />{" "}
          <BoxRow
            title="Last Edit Date"
            value={zoneData?.modifyDate}
            isLoading={isLoading}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
