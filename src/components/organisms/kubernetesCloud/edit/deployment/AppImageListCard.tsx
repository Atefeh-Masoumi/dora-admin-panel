import { Divider, Grid, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { FC, memo, useCallback, useState } from "react";
import { CategorySvg } from "src/components/atoms/svg-icons/CategorySvg";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router";
import { staticImageCategoryList } from "src/constant/kubernetesCloud.constant";
import { GetApiMyKubernetesCloudImageListApiResponse } from "src/app/services/api.generated";
import { EmptyTable } from "src/components/molecules/EmptyTable";
import { AppImageCard } from "./AppImageCard";

// export type KuberCloudImageResponse = {
//   id: number;
//   name: string | null;
//   subtitle: string | null;
//   description: string | null;
//   path: string | null;
//   categories: KuberCloudImageCategoriesResponse[] | null;
// };

const zahraData = [
  {
    id: 1,
    name: "mySql",
    subtitle: "lorem Epsum subtitle",
    description: "",
    path: "",
    categories: [{ id: 1, name: "dataCenter" }],
  },
  {
    id: 2,
    name: "nginx",
    subtitle: "lorem Epsum subtitle",
    description: "",
    path: "",
    categories: [{ id: 1, name: "dataCenter" }],
  },
  {
    id: 3,
    name: "mongoDb",
    subtitle: "lorem Epsum subtitle",
    description: "",
    path: "",
    categories: [{ id: 2, name: "dataCenter" }],
  },
  {
    id: 4,
    name: ".net",
    subtitle: "lorem Epsum subtitle",
    description: "",
    path: "",
    categories: [{ id: 1, name: "dataCenter" }],
  },
  {
    id: 5,
    name: "php",
    subtitle: "lorem Epsum subtitle",
    description: "",
    path: "",
    categories: [{ id: 2, name: "dataCenter" }],
  },
];

type AppImageListCardPropsType = {
  list: GetApiMyKubernetesCloudImageListApiResponse;
  loading: boolean;
  formik: any;
};

const AppImageListCard: FC<AppImageListCardPropsType> = ({
  list,
  loading,
  formik,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<{
    id: number;
    name: string;
  }>(staticImageCategoryList[0]);

  const filterByCategory = useCallback(
    (id: number) => list.filter((item) => item.category === id),
    [list]
  );

  return (
    <Stack rowGap={2} direction="column" sx={{ width: "100%" }}>
      <Stack direction="row" gap={2}>
        {staticImageCategoryList.map((item, index) => (
          <LoadingButton
            size="small"
            disableRipple
            variant={
              selectedCategory?.id === item.id ? "contained" : "outlined"
            }
            key={index}
            onClick={() => setSelectedCategory(item)}
            loading={loading}
          >
            {item.name}
          </LoadingButton>
        ))}
      </Stack>

      <Paper sx={{ p: 2, width: "100%" }}>
        <Stack direction="column" rowGap={3}>
          <Stack textAlign="center">
            <Typography variant="title2">انتخاب Image</Typography>
            <Typography
              align="center"
              sx={{ color: ({ palette }) => palette.grey[700] }}
            >
              ساخت ساده‌ی انواع ابزارهای سازمانی و سرویس‌های آماده با یک کلیک
            </Typography>
          </Stack>
          <Grid spacing={2} container>
            {(() => {
              const finalList =
                selectedCategory?.id === 3
                  ? list
                  : filterByCategory(selectedCategory?.id!);
              if (!!finalList.length) {
                return finalList.map((object, index) => (
                  <Grid key={index} item xs={12} md={6} lg={4}>
                    <AppImageCard item={object} formik={formik} />
                  </Grid>
                ));
              }
              return <EmptyTable text="رکوردی وجود ندارد" />;
            })()}
          </Grid>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default memo(AppImageListCard);
