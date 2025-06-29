import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { Grid2 } from "@mui/material";
import { FC, useEffect, useState } from "react";
import {
  VmImageListResponse,
  useGetApiMyVmByProjectIdHostGetAndIdQuery,
} from "src/app/services/api.generated";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { PRODUCT_CATEGORY_ENUM } from "src/constant/productCategoryEnum";
import { UbuntuSvg } from "src/components/atoms/svg-icons/UbuntuSvg";
import { WindowsSvg } from "src/components/atoms/svg-icons/WindowsSvg";
import { CentOSIcon } from "src/components/atoms/svg-icons/centos-logo.svg";
import { DebianSvgIcon } from "src/components/atoms/svg-icons/debian.svg";
import { RockyOSIcon } from "src/components/atoms/svg-icons/RockySvg";
import { SuseOSIcon } from "src/components/atoms/svg-icons/SuseSvg";
import { useParams } from "react-router";

type SelectOSPropsType = {
  setImageId?: any;
};

export const ChooseOSForRebuild: FC<SelectOSPropsType> = ({
  setImageId,
}) => {
  const { vmId, projectId } = useParams();
  
  const { data: vmProjectSpecification } =
    useGetApiMyVmByProjectIdHostGetAndIdQuery({
      id: Number(vmId!),
      projectId: Number(projectId!),
    });

  const [selectedOs, setSelectedOs] = useState<VmImageListResponse | null>(null);

  useEffect(() => {
    if (selectedOs?.id) {
      setImageId(selectedOs.id);
    }
  }, [selectedOs, setImageId]);

  const dataCenterIconRenderHandler = (id: number) => {
    switch (id) {
      case 1:
        return (
          <WindowsSvg
            sx={{
              width: 40,
              height: 40,
              "&>path": {
                fill: ({ palette }) => palette.primary.main,
              },
            }}
          />
        );
      case 2:
        return <UbuntuSvg sx={{ width: 40, height: 40 }} />;
      case 4:
        return <DebianSvgIcon />;
      case 5:
        return <CentOSIcon sx={{ width: 40, height: 40 }} />;
      case 6:
        return <SuseOSIcon sx={{ width: 40, height: 40 }} />;
      case 7:
        return <RockyOSIcon sx={{ width: 40, height: 40 }} />;
      default:
        return "";
    }
  };

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
        {!vmProjectSpecification && (
          [...Array(2)].map((_, index) => (
            <Stack
              key={index}
              direction="row"
              sx={{
                width: { xs: "100%", sm: 200 },
                height: 96,
                transition: "150ms",
                borderRadius: BORDER_RADIUS_1,
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
          ))
        )}
        {vmProjectSpecification && (
          <Grid2 size={{xs:12, sm:6}}
            sx={{
              minWidth: { sm: 100 },
              maxWidth: { sm: 184 },
              height: { xs: 64, sm: 84 },
              marginBottom: { xs: "50px", sm: "20px" },
            }}
          >
            <Stack
              direction="row"
              sx={{
                py: 2,
                transition: "200ms",
                borderTopRightRadius: BORDER_RADIUS_1,
                borderTopLeftRadius: BORDER_RADIUS_1,
                border: ({ palette }) =>
                  `2px solid ${
                    selectedOs
                      ? palette.primary.main
                      : "rgba(110, 118, 138, 0.12)"
                  }`,
                borderBottom: "0px",
                overflow: "hidden",
                px: 1,
                cursor: "pointer",
              }}
              alignItems="center"
              justifyContent="center"
              spacing={1}
            >
              <Box
                sx={{
                  transition: "150ms",
                  filter: selectedOs
                    ? "grayscale(0)"
                    : "grayscale(100%)",
                  height: 40,
                  overflow: "hidden",
                }}
              >
                {dataCenterIconRenderHandler(vmProjectSpecification.operatingSystemId || 0)}
              </Box>
              <Typography
                noWrap
                color={
                  selectedOs ? "primary.main" : "secondary.main"
                }
                sx={{ transition: "200ms" }}
                fontWeight="bold"
              >
                {vmProjectSpecification.operatingSystem || "Unknown OS"}
              </Typography>
            </Stack>
            <Select
              value={selectedOs?.id?.toString() || ""}
              onChange={(e: SelectChangeEvent) => {
                const os = {
                  id: Number(e.target.value),
                  name: vmProjectSpecification.name,
                  operatingSystem: vmProjectSpecification.operatingSystem,
                  operatingSystemId: vmProjectSpecification.operatingSystemId,
                  status: Boolean(vmProjectSpecification.status),
                } as VmImageListResponse;
                setSelectedOs(os);
              }}
              sx={{
                "&> fieldset": {
                  border: ({ palette }) =>
                    `2px solid ${
                      selectedOs
                        ? palette.primary.main
                        : "rgba(110, 118, 138, 0.12)"
                    } !important`,
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderBottomRightRadius: BORDER_RADIUS_1,
                  borderBottomLeftRadius: BORDER_RADIUS_1,
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                  border: ({ palette }) =>
                    `2px solid ${
                      selectedOs
                        ? palette.primary.main
                        : "rgba(110, 118, 138, 0.12)"
                    }`,
                  borderTop: "1px solid",
                },
                direction: "rtl",
              }}
              fullWidth
              style={{ height: 40 }}
            >
              <MenuItem dir="ltr" value={vmProjectSpecification.vmImageId?.toString() || ""}>
                {vmProjectSpecification.operatingSystem || "---"}
              </MenuItem>
            </Select>
          </Grid2>
        )}
      </Grid2>
    </Stack>
  );
};
