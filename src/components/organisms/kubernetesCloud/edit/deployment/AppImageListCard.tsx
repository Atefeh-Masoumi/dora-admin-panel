import { Divider, Grid, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { FC, memo, useCallback, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { staticImageCategoryList } from "src/constant/kubernetesCloud.constant";
import { GetApiMyKubernetesCloudImageListApiResponse } from "src/app/services/api.generated";
import { EmptyTable } from "src/components/molecules/EmptyTable";
import { AppImageCard } from "./AppImageCard";
import { FormikProps } from "formik";
import { KubernetesCloudAppImageType } from "src/types/kubernetesCloud.types";

type AppImageListCardPropsType = {
  list: GetApiMyKubernetesCloudImageListApiResponse;
  loading: boolean;
  formik: FormikProps<KubernetesCloudAppImageType>;
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
    (id: number) => list.filter((item) => item.categoryId === id),
    [list]
  );

  return (
    <Stack rowGap={2} direction="column" sx={{ width: "100%" }}>
      <Stack direction="column" rowGap={3}>
        <Stack textAlign="center">
          <Typography fontSize={24} fontWeight="bold" alignItems="center">
            انتخاب Image
          </Typography>
          <Typography
            align="center"
            sx={{ color: ({ palette }) => palette.grey[700] }}
          >
            ساخت ساده‌ی انواع ابزارهای سازمانی و سرویس‌های آماده با یک کلیک
          </Typography>
        </Stack>
        <Stack justifyContent="center" direction="row" gap={2} pb={4}>
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

        <Grid spacing={3} columns={10} justifyContent="center" container>
          {(() => {
            const finalList =
              selectedCategory?.id === 3
                ? list
                : filterByCategory(selectedCategory?.id!);
            if (!!finalList.length) {
              return finalList.map((object, index) => (
                <Grid key={index} item xs={10} sm={8} md={4} lg={3}>
                  <AppImageCard item={object} formik={formik} />
                </Grid>
              ));
            }
            return <EmptyTable text="رکوردی وجود ندارد" />;
          })()}
        </Grid>
      </Stack>
    </Stack>
  );
};

export default memo(AppImageListCard);
