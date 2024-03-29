import { FC, useMemo, useState } from "react";
import {
  Chip,
  Divider,
  Button,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import { BORDER_RADIUS_1, BORDER_RADIUS_5 } from "src/configs/theme";
import { useAppSelector } from "src/app/hooks";
import { DeleteZoneDialog } from "./dialogs/DeleteDialog";
import { TrashSvg } from "src/components/atoms/svg-icons/TrashSvg";
import { RefreshSvg } from "src/components/atoms/svg-icons/RefreshSvg";
import { useGetApiMyCdnHostOverviewByIdQuery } from "src/app/services/api.generated";
import { BoxRow } from "src/components/molecules/BoxRow";

type ZoneInfoPropsType = {};

export const ZoneInfo: FC<ZoneInfoPropsType> = () => {
  const selectedDomain = useAppSelector((store) => store.cdn.selectedDomain);
  const cdnId = selectedDomain?.id || 0;

  const handleOpenDelete = () => setOpenDelete(true);
  const [openDelete, setOpenDelete] = useState(false);
  const handleCloseDelete = () => setOpenDelete(false);

  const refetchOnClick = () => refetch();

  const {
    data: zoneData,
    isLoading: getDataLoading,
    refetch,
    isFetching: getDataFetching,
  } = useGetApiMyCdnHostOverviewByIdQuery({ id: cdnId });

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
      borderRadius={3}
      width="80%"
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
              <Stack display={{ xs: "flex", md: "none" }}>
                <IconButton
                  sx={{ borderRadius: 1 }}
                  color="error"
                  onClick={handleOpenDelete}
                >
                  <TrashSvg />
                </IconButton>
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
                    borderRadius: BORDER_RADIUS_5,
                  }}
                  startIcon={<RefreshSvg sx={{ width: 20, height: 20 }} />}
                >
                  بررسی مجدد دامنه
                </Button>

                <Button
                  variant="outlined"
                  onClick={handleOpenDelete}
                  color="error"
                  size="large"
                  sx={{ whiteSpace: "nowrap", px: { xs: 0.2, md: 1.2 } }}
                  startIcon={<TrashSvg color="error" />}
                >
                  حذف دامنه
                </Button>
              </Stack>
            </Stack>
          </Stack>
          <DeleteZoneDialog
            id={zoneData?.id ?? 0}
            openDialog={openDelete}
            handleClose={handleCloseDelete}
          />
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
            title="Domain Name"
            value={zoneData?.domainName}
            isLoading={isLoading}
          />
          <BoxRow
            title="Create Date"
            value={zoneData?.createDate}
            isLoading={isLoading}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
