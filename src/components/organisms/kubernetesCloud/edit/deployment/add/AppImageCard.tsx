import {
  Avatar,
  Box,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { FormikProps } from "formik";
import { FC } from "react";
import { KuberCloudImageResponse } from "src/app/services/api.generated";
import InfoSvg from "src/components/atoms/svg-icons/InfoSvg";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { appImageList } from "src/constant/kubernetesCloud.constant";
import { KuberCloudNamespaceImageType } from "src/types/kubernetesCloud.types";

type AppImageCardPropsType = {
  item: KuberCloudImageResponse;
  formik: FormikProps<KuberCloudNamespaceImageType>;
};

export const AppImageCard: FC<AppImageCardPropsType> = ({ item, formik }) => {
  const onClickCardHandler = () => {
    if (formik.values.imageId !== item.id) {
      formik.setFieldValue("imageId", item.id);
      formik.setFieldValue("imageTagId", item.tags?.[0].id);
    }
  };

  return (
    <Grid item xs={12} sm={3} md={2} lg={2}>
      <Stack
        direction="column"
        sx={{
          pt: 2,
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
        spacing={1}
        onClick={() => onClickCardHandler()}
      >
        <Stack direction="row" gap={1} alignItems="center">
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
            <Avatar
              src={appImageList.find((image) => image.name === item.name)?.src}
            />
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

        <Stack
          sx={{ mt: "0 !important" }}
          maxWidth="fit-content"
          alignSelf="start"
        >
          <Tooltip
            dir="rtl"
            sx={{
              textAlign: "center",
              "& .MuiTooltip-tooltip": {
                textAlign: "center", // or 'left', 'right'
                direction: "rtl",
              },
            }}
            title={item.description}
          >
            <IconButton>
              <InfoSvg />
            </IconButton>
          </Tooltip>
        </Stack>
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
