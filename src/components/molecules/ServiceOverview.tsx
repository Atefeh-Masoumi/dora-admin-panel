import {
  Button,
  Chip,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { BoxRow } from "./BoxRow";
import { serviceStatusIdentifier } from "src/constant/serviceStatusIdentifier";
import { RefreshSvg } from "../atoms/svg-icons/RefreshSvg";

const oneSectionOverview: { id: number; label: string; gridItemMd: number }[] =
  [
    {
      id: 1,
      label: "Overview",
      gridItemMd: 12,
    },
  ];

const towSectionOverview: { id: number; label: string; gridItemMd: number }[] =
  [
    {
      id: 1,
      label: "Overview",
      gridItemMd: 6,
    },
    {
      id: 2,
      label: "Hardware",
      gridItemMd: 6,
    },
  ];

type HeaderPropsType = {
  columnCounter: number;
  label: string;
  refetchOnClick?: () => void | "";
};

const Header: FC<HeaderPropsType> = ({
  columnCounter,
  label,
  refetchOnClick,
}) => {
  switch (columnCounter) {
    case 1:
      return (
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems={{ xs: "start", md: "center" }}
          justifyContent="space-between"
          width="100%"
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
                  Overview
                </Typography>
              </Stack>
              {refetchOnClick ? (
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
                    بررسی مجدد
                  </Button>
                </Stack>
              ) : (
                <></>
              )}
            </Stack>
          </Stack>
        </Stack>
      );
    case 2:
    default:
      return (
        <Typography align="right" fontWeight={700} fontSize={18}>
          {label}
        </Typography>
      );
  }
};

type ServiceOverviewPropsType = {
  infoList: infoListType[][];
  isLoading: boolean;
  refetchOnClick?: () => void;
};

type infoListType = {
  id: string;
  label: string;
  value: string | number | null;
  statusColor?: string;
};

export const ServiceOverview: FC<ServiceOverviewPropsType> = ({
  infoList = [],
  isLoading,
  refetchOnClick,
}) => {
  return (
    <Grid container>
      <Grid
        container
        spacing={3}
        justifyContent="space-between"
        alignItems="stretch"
        width="100%"
      >
        {(infoList.length === 1 ? oneSectionOverview : towSectionOverview).map(
          ({ label, gridItemMd }, index) => {
            return (
              <Grid key={index} item xs={12} md={gridItemMd}>
                <Paper
                  component={Stack}
                  rowGap={2}
                  elevation={0}
                  sx={{
                    borderRadius: BORDER_RADIUS_1,
                    p: { xs: 2.5 },
                    height: "100%",
                  }}
                >
                  <Header
                    label={label}
                    columnCounter={infoList.length}
                    refetchOnClick={refetchOnClick || undefined}
                  />
                  <Divider />
                  {infoList[index].map(
                    ({ id, label, value, statusColor }, index) =>
                      id === "statusId" ? (
                        <BoxRow
                          key={index}
                          title="Status"
                          component={
                            <Chip
                              label={
                                serviceStatusIdentifier(Number(value)).label
                              }
                              sx={{
                                bgcolor: serviceStatusIdentifier(Number(value))
                                  .bgColor,
                                color: serviceStatusIdentifier(Number(value))
                                  .typographyColor,
                                borderRadius: BORDER_RADIUS_1,
                              }}
                            />
                          }
                          isLoading={isLoading}
                        />
                      ) : statusColor ? (
                        <BoxRow
                          title={label}
                          component={
                            <Typography color={statusColor}>{value}</Typography>
                          }
                          isLoading={isLoading}
                        />
                      ) : (
                        <BoxRow
                          key={index}
                          title={label}
                          value={value}
                          isLoading={isLoading}
                        />
                      )
                  )}
                </Paper>
              </Grid>
            );
          }
        )}
      </Grid>
    </Grid>
  );
};
