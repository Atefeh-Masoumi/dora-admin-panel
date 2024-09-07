import {
  Avatar,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  ListItemText,
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
import { appImageList } from "src/constant/kubernetesCloud.constant";
import { KuberCloudAppImageType } from "src/types/kuberCloud.types";

type AppImageCardPropsType = {
  item: KuberCloudImageResponse;
  formik: FormikProps<KuberCloudAppImageType>;
};

export const AppImageCard: FC<AppImageCardPropsType> = ({ item, formik }) => {
  const onClickCardHandler = () => {
    if (formik.values.imageId !== item.id) {
      formik.setFieldValue("imageId", item.id);
      formik.setFieldValue("imageTagId", "");
    }
  };

  // console.log(formik.values.keyValue);

  return (
    <Stack
      onClick={onClickCardHandler}
      // sx={{ cursor: "pointer" }}
      direction="column"
      rowGap={3}
      sx={{
        cursor: "pointer",
        position: "relative",
        borderRadius: "10px",
        backgroundColor: "#fff",
        border: ({ palette }) =>
          `1px solid ${
            formik.values.imageId === item.id
              ? palette.primary.main
              : "rgba(0, 0, 0, 0.12)"
          }`,
        height: 170,
      }}
      p={3}
    >
      <Stack
        direction="row"
        alignItems="start"
        gap={1}
        justifyContent={{ xs: "center", md: "space-between" }}
      >
        <Grid container>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Stack
              width={{ xs: "100%" }}
              alignItems="right"
              divider={<Divider orientation="vertical" flexItem />}
              columnGap={1}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Avatar
                src={
                  appImageList.find((image) => image.name === item.name)?.src
                }
                // src="/assets/icons/mysql.svg"
              />
              <Typography
                noWrap
                maxWidth={{ xs: "100%", md: "70%" }}
                textOverflow="ellipsis"
              >
                {item.name}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Stack
              gap={1}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "end",
              }}
            >
              <Tooltip sx={{ p: 0 }} placement="top" title={item.description}>
                <IconButton>
                  <InfoSvg />
                </IconButton>
              </Tooltip>
              <FormControl size="small">
                <InputLabel sx={{ fontSize: "15px" }}>Version</InputLabel>
                <Select
                  value={
                    formik.values.imageId === item.id
                      ? formik.values.imageTagId
                      : ""
                  }
                  onFocus={(event) => {
                    event.stopPropagation(); // Stop the event from propagating to the parent
                    formik.setFieldValue("imageId", item.id);
                  }}
                  onChange={(event) => {
                    formik.setFieldValue(
                      "imageTagId",
                      Number(event.target.value)
                    );
                  }}
                  label="Version"
                  sx={{
                    height: 28,
                    width: 90,
                    "& .MuiSelect-outlined": {
                      color: "primary.main",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #1890FF",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #1890FF",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #1890FF",
                    },
                    "& .MuiSelect-select": {
                      fontSize: "12px",
                    },
                  }}
                >
                  {item.tags?.map((tag) => (
                    <MenuItem key={tag.id} value={tag.id}>
                      {tag.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Grid>
        </Grid>
      </Stack>

      <ListItemText
        dir="ltr"
        sx={{
          m: 0,
          "& .MuiListItemText-primary, & .MuiListItemText-secondary": {
            // whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          },
        }}
        secondary={item.subtitle}
      />
    </Stack>
  );
};
