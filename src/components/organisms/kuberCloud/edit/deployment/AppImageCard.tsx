import {
  Avatar,
  Box,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { FormikProps } from "formik";
import { FC } from "react";
import { KuberCloudImageResponse } from "src/app/services/api.generated";
import InfoSvg from "src/components/atoms/svg-icons/InfoSvg";
import { UbuntuSvg } from "src/components/atoms/svg-icons/UbuntuSvg";
import { WindowsSvg } from "src/components/atoms/svg-icons/WindowsSvg";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { appImageList } from "src/constant/kubernetesCloud.constant";
import { KuberCloudAppImageType } from "src/types/kuberCloud.types";

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
      return <UbuntuSvg sx={{ width: 40, height: 40 }} />;
    case 5:
      return <UbuntuSvg sx={{ width: 40, height: 40 }} />;
    default:
      return "";
  }
};

type AppImageCardPropsType = {
  item: KuberCloudImageResponse;
  formik: FormikProps<KuberCloudAppImageType>;
};

export const AppImageCard: FC<AppImageCardPropsType> = ({ item, formik }) => {
  const onClickCardHandler = () => {
    if (formik.values.imageId !== item.id) {
      formik.setFieldValue("imageId", item.id);
      formik.setFieldValue("imageTagId", item.tags?.[0].id);
    }
  };

  return (
    <Grid
      item
      xs={12}
      sm
      sx={{
        minWidth: { sm: 100 },
        maxWidth: { sm: 184 },
        // height: { xs: 64, sm: 84 },
        // marginBottom: { xs: "50px", sm: "20px" },
        // marginBottom:
        //   index === 0
        //     ? { xs: "50px", sm: "0px" }
        //     : { xs: "0px", sm: "0px" },
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
            `1px solid ${
              formik.values.imageId === item.id
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
        onClick={() => onClickCardHandler()}
      >
        <Box
          sx={{
            transition: "150ms",
            filter:
              formik.values.imageId === item.id
                ? "grayscale(0)"
                : "grayscale(100%)",
            height: 40,
            overflow: "hidden",
          }}
        >
          {dataCenterIconRenderHandler(item.id)}
        </Box>
        <Typography
          noWrap
          color={
            formik.values.imageId === item.id
              ? "primary.main"
              : "secondary.main"
          }
          sx={{ transition: "200ms" }}
          fontWeight="bold"
        >
          {item.name}
        </Typography>
      </Stack>
      <Select
        value={
          formik.values.imageId === item.id
            ? formik.values.imageTagId
            : item.tags?.[0].id
        }
        onFocus={(event) => {
          event.stopPropagation(); // Stop the event from propagating to the parent
          formik.setFieldValue("imageId", item.id);
        }}
        onChange={(event) => {
          formik.setFieldValue("imageTagId", Number(event.target.value));
        }}
        sx={{
          "&> fieldset": {
            border: ({ palette }) =>
              `1px solid ${
                formik.values.imageId === item.id
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
              `1px solid ${
                formik.values.imageId === item.id
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
        {item.tags?.map((item) => (
          <MenuItem dir="ltr" key={item.id} value={item.id}>
            {item.name || "---"}
          </MenuItem>
        ))}
      </Select>
    </Grid>
  );
};
