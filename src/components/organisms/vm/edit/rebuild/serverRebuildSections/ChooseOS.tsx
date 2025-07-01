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
  useGetApiMyVmByProjectIdImageListQuery,
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

type OsDropDownType = {
  content: VmImageListResponse[];
  osId: number;
  os: string;
  selectedImageId: string | null;
  isSelected: boolean;
};

export const ChooseOSForRebuild: FC<SelectOSPropsType> = ({
  setImageId,
}) => {
  const { id:vmId, projectId } = useParams();
  
  const { data: vmProjectSpecification } =
    useGetApiMyVmByProjectIdHostGetAndIdQuery({
      id: Number(vmId!),
      projectId: Number(projectId!),
    });

  const { data: osImagesList, isLoading } = useGetApiMyVmByProjectIdImageListQuery(
    {
      projectId: Number(projectId!),
      productId: PRODUCT_CATEGORY_ENUM.VM,
    },
    {
      skip: !projectId,
    }
  );

  const [selectedOs, setSelectedOs] = useState<VmImageListResponse | null>(null);
  const [osDropDownsState, setOsDropDownsState] = useState<OsDropDownType[]>([]);

  useEffect(() => {
    let newOsDropDownsState: OsDropDownType[] = [];
    osImagesList?.forEach((osImage: VmImageListResponse) => {
      const index = newOsDropDownsState.findIndex(
        (dropDown) => dropDown.osId === osImage.operatingSystemId
      );
      if (index !== -1) {
        newOsDropDownsState[index].content.push(osImage);
      } else {
        newOsDropDownsState.push({
          content: [{ ...osImage }],
          osId: osImage.operatingSystemId || 0,
          os: osImage.operatingSystem || "",
          selectedImageId: osImage.id?.toString() || "",
          isSelected: false,
        });
      }
    });
    setOsDropDownsState(newOsDropDownsState);
    
    // Auto-select the first OS if available and no OS is currently selected
    if (newOsDropDownsState.length > 0 && !selectedOs) {
      const firstOs = newOsDropDownsState[0];
      const firstImage = firstOs.content[0];
      if (firstImage) {
        setSelectedOs(firstImage);
        setImageId(firstImage.id);
      }
    }
  }, [osImagesList, setImageId]);

  useEffect(() => {
    if (selectedOs?.id) {
      setImageId(selectedOs.id);
    }
  }, [selectedOs, setImageId]);

  const osTypeClickHandler = (id?: number) => {
    setOsDropDownsState(
      osDropDownsState.map((x) => {
        if (x.osId !== id) {
          return {
            ...x,
            isSelected: false,
          };
        }
        const selectedImage = x.content.find((item) => item.id === +(x.selectedImageId || "0")) || null;
        setSelectedOs(selectedImage);
        return { ...x, isSelected: true };
      })
    );
  };

  const handleChange = (event: SelectChangeEvent) => {
    setOsDropDownsState(
      osDropDownsState.map((dropDownState) => {
        const selectedImageItem =
          dropDownState.content.find(
            (item) => item.id === +event.target.value
          ) || null;

        if (selectedImageItem) {
          setSelectedOs(selectedImageItem);
          return {
            ...dropDownState,
            selectedImageId: event.target.value,
            isSelected: true,
          };
        } else {
          return { ...dropDownState, isSelected: false };
        }
      })
    );
  };

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
      sx={{ p: 2 }}
    >
      <Typography fontSize={24} fontWeight="bold" align="center">
        سیستم عامل ماشین را انتخاب کنید
      </Typography>
      <Grid2 container gap={2} justifyContent="center" width="100%">
        {isLoading && (
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
        {!isLoading && osDropDownsState.map((osDropDown, index) => {
          return (
            <Grid2 key={index} size={{xs:12, sm:6}}
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
                      osDropDown.isSelected
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
                onClick={() => osTypeClickHandler(osDropDown.osId)}
              >
                <Box
                  sx={{
                    transition: "150ms",
                    filter: osDropDown.isSelected
                      ? "grayscale(0)"
                      : "grayscale(100%)",
                    height: 40,
                    overflow: "hidden",
                  }}
                >
                  {dataCenterIconRenderHandler(osDropDown.osId)}
                </Box>
                <Typography
                  noWrap
                  color={
                    osDropDown.isSelected ? "primary.main" : "secondary.main"
                  }
                  sx={{ transition: "200ms" }}
                  fontWeight="bold"
                >
                  {osDropDown.os}
                </Typography>
              </Stack>
              <Select
                value={osDropDown.selectedImageId || ""}
                onChange={handleChange}
                sx={{
                  "&> fieldset": {
                    border: ({ palette }) =>
                      `2px solid ${
                        osDropDown.isSelected
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
                        osDropDown.isSelected
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
                {osDropDown.content.map((image) => (
                  <MenuItem key={image.id} dir="ltr" value={image.id?.toString() || ""}>
                    {image.name || "---"}
                  </MenuItem>
                ))}
              </Select>
            </Grid2>
          );
        })}
      </Grid2>
    </Stack>
  );
};
