import {
  Avatar,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import { FormikProps } from "formik";
import { FC } from "react";
import { KuberCloudImageResponse } from "src/app/services/api.generated";
import InfoSvg from "src/components/atoms/svg-icons/InfoSvg";
import { appImageList } from "src/constant/kubernetesCloud.constant";
import { KuberCloudAppImageType } from "src/types/kubernetesCloud.types";

type AppImageCardPropsType = {
  item: KuberCloudImageResponse;
  formik: FormikProps<KuberCloudAppImageType>;
};

export const AppImageCard: FC<AppImageCardPropsType> = ({ item, formik }) => {
  const tagOnChangeHandler = (newTagId: number) => {
    formik.setValues({ ...formik.values, tagId: newTagId, imageId: item.id });
  };

  const onClickCardHandler = () => {
    if (formik.values.imageId !== item.id) {
      formik.setFieldValue("imageId", item.id);
      formik.setFieldValue("tagId", "");
    }
  };

  return (
    <ListItem
      // sx={{

      sx={{
        alignSelf: "flex-start",
        px: 2,
        py: 2,

        position: "relative",
        borderRadius: "10px",
        backgroundColor: "#fff",
        boxShadow:
          "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
        border: ({ palette }) =>
          `2px solid ${
            formik.values.imageId === item.id ? palette.primary.main : "none"
          }`,
      }}
      // p: 2,
      // ":hover": {
      // transition: "all 1s ease",
      // border: ({ palette }) =>
      //   `ipx solid ${
      //     formik.values.imageId === item.id
      //       ? palette.customColor.primaryLighter
      //       : "none"
      //   }`,
      // boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
      // },
    >
      <Grid container>
        <Grid
          item
          sx={{
            cursor: "pointer",
            display: "flex",
            direction: "row",
            alignItems: "center",
          }}
          xs={8}
          md={8}
          onClick={onClickCardHandler}
        >
          <ListItemAvatar>
            <Avatar
              src={appImageList.find((image) => image.name === item.name)?.src}
            />
          </ListItemAvatar>
          <ListItemText
            dir="ltr"
            sx={{
              m: 0,
              "& .MuiListItemText-primary, & .MuiListItemText-secondary": {
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              },
            }}
            primary={item.name}
            secondary={item.subtitle}
          />
        </Grid>

        <Grid
          item
          xs={4}
          md={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
          gap={4}
        >
          <FormControl size="small">
            <InputLabel sx={{ fontSize: "15px" }}>Version</InputLabel>
            <Select
              value={
                formik.values.imageId === item.id ? formik.values.tagId : ""
              }
              onChange={(event) =>
                tagOnChangeHandler(Number(event.target.value))
              }
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
          <Tooltip sx={{ p: 0 }} placement="top" title="مطالعه مستندات">
            <IconButton>
              <InfoSvg />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </ListItem>
  );
};
