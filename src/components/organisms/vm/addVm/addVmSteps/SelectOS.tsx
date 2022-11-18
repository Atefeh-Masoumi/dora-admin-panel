import { useContext, FC, useState, useMemo } from "react";
import { Skeleton, Stack, Typography, Box } from "@mui/material";
import { BORDER_RADIUS_4 } from "src/configs/theme";
import {
  GetApiV2VmImageListByDatacenterIdApiResponse,
  ImageListResponse,
  useGetApiV2VmImageListByDatacenterIdQuery,
} from "src/app/services/api.generated";
import { AddServerContext } from "src/components/organisms/vm/addVm/contexts/AddServerContext";
import Grid2 from "@mui/material/Unstable_Grid2";
import { WindowsSvg } from "src/components/atoms/svg/WindowsSvg";
import { UbuntuSvg } from "src/components/atoms/svg/UbuntuSvg";

type SelectOSPropsType = {};

export const SelectOS: FC<SelectOSPropsType> = () => {
  const { dataCenter, osVersion, setOsVersion } = useContext(AddServerContext);

  const { data: osVersionsList, isLoading } =
    useGetApiV2VmImageListByDatacenterIdQuery({
      datacenterId: dataCenter?.id || 0,
    });

  const [osType, setOsType] = useState<number | null>(osVersion?.osId || null);

  const osTypeClickHandler = (id: number | undefined) => id && setOsType(id);

  const osVersionClickHandler = (selectedOs: ImageListResponse) =>
    setOsVersion(selectedOs);

  const osArray = useMemo(() => {
    let result: GetApiV2VmImageListByDatacenterIdApiResponse = [];
    if (osVersionsList) {
      osVersionsList.forEach((item) => {
        const idx = result.findIndex(({ osId }) => osId === item.osId);
        if (idx === -1) {
          result.push(item);
        }
      });
    }
    return result;
  }, [osVersionsList]);

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      spacing={4}
      sx={{ px: 2 }}
    >
      <Typography fontSize={24} fontWeight="bold" align="center">
        سیستم عامل ماشین را انتخاب کنید
      </Typography>
      <Grid2 container gap={2} justifyContent="center" width="100%">
        {isLoading &&
          [...Array(2)].map((_, index) => (
            <Stack
              key={index}
              direction="row"
              sx={{
                width: { xs: "100%", sm: 200 },
                height: 96,
                transition: "150ms",
                borderRadius: BORDER_RADIUS_4,
                border: "1px solid rgba(110, 118, 138, 0.12)",
                overflow: "hidden",
                p: 1,
                cursor: "pointer",
              }}
              alignItems="center"
              justifyContent="center"
              spacing={1}
            >
              <Skeleton variant="circular" width={44} height={44} />
              <Skeleton width="30%" />
            </Stack>
          ))}
        {osArray.map((osItem) => {
          const { id, os, osId } = osItem;
          const isSelected = osType === osId;
          return (
            <Grid2
              xs={12}
              sm
              key={id}
              sx={{
                minWidth: { sm: 184 },
                maxWidth: { sm: 184 },
                height: { xs: 64, sm: 84 },
              }}
            >
              <Stack
                direction="row"
                sx={{
                  height: "100%",
                  transition: "200ms",
                  borderRadius: BORDER_RADIUS_4,
                  border: ({ palette }) =>
                    `2px solid ${
                      isSelected
                        ? palette.primary.main
                        : "rgba(110, 118, 138, 0.12)"
                    }`,
                  overflow: "hidden",
                  px: 1,
                  cursor: "pointer",
                }}
                alignItems="center"
                justifyContent="center"
                spacing={1}
                onClick={() => osTypeClickHandler(osId)}
              >
                <Box
                  sx={{
                    transition: "150ms",
                    filter: isSelected ? "grayscale(0)" : "grayscale(100%)",
                    height: 40,
                    overflow: "hidden",
                  }}
                >
                  {osId === 1 ? (
                    <WindowsSvg
                      sx={{
                        width: 40,
                        height: 40,
                        "&>path": {
                          fill: ({ palette }) => palette.primary.main,
                        },
                      }}
                    />
                  ) : (
                    <UbuntuSvg sx={{ width: 40, height: 40 }} />
                  )}
                </Box>
                <Typography
                  noWrap
                  color={isSelected ? "primary.main" : "secondary.main"}
                  sx={{ transition: "200ms" }}
                  fontWeight="bold"
                >
                  {os}
                </Typography>
              </Stack>
            </Grid2>
          );
        })}
      </Grid2>
      <Grid2 container gap={3}>
        {osVersionsList &&
          osType &&
          osVersionsList
            .filter((optionItem) => optionItem.osId === osType)
            .map((osVersionItem) => {
              const { id, name } = osVersionItem;
              const isSelected = id === osVersion?.id;
              return (
                <Grid2
                  xs
                  key={id}
                  direction="row"
                  sx={{
                    width: "100%",
                    minWidth: { xs: "100%", sm: 270 },
                    transition: "200ms",
                    borderRadius: BORDER_RADIUS_4,
                    border: ({ palette }) =>
                      `2px solid ${
                        isSelected
                          ? palette.primary.main
                          : "rgba(110, 118, 138, 0.12)"
                      }`,
                    overflow: "hidden",
                    px: 1,
                    py: 2.5,
                    minHeight: 65,
                    cursor: "pointer",
                  }}
                  onClick={() => osVersionClickHandler(osVersionItem)}
                >
                  <Typography
                    align="center"
                    noWrap
                    color={isSelected ? "primary.main" : "secondary.main"}
                    sx={{ transition: "200ms" }}
                    fontWeight="bold"
                  >
                    {name}
                  </Typography>
                </Grid2>
              );
            })}
      </Grid2>
    </Stack>
  );
};
