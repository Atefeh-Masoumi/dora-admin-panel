import { Divider, Grid, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { FC, memo, useCallback, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { staticImageCategoryList } from "src/constant/kubernetesCloud.constant";
import { GetApiMyKubernetesCloudImageListApiResponse } from "src/app/services/api.generated";
import { EmptyTable } from "src/components/molecules/EmptyTable";
import { AppImageCard } from "./AppImageCard";
import { FormikProps } from "formik";
import { KuberCloudAppImageType } from "src/types/kuberCloud.types";

type AppImageListCardPropsType = {
  list: GetApiMyKubernetesCloudImageListApiResponse;
  loading: boolean;
  formik: FormikProps<KuberCloudAppImageType>;
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

  // const filterByCategory = useCallback(
  //   (id: number) => list.filter((item) => item.categoryId === id),
  //   [list]
  // );

  return (
    <Stack rowGap={2} direction="column" sx={{ width: "100%" }}>
      <Stack direction="column" rowGap={3}>
        <Stack textAlign="center">
          <Typography fontSize={24} fontWeight="bold" alignItems="center">
            انتخاب ایمیج
          </Typography>
          <Typography
            align="center"
            variant="text9"
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

        <Grid spacing={2} columns={12} justifyContent="start" container>
          {selectedCategory.id === 1 ? (
            (() => {
              if (list.length > 0)
                return list.map((object, index) => (
                  <AppImageCard key={index} item={object} formik={formik} />
                ));

              return <EmptyTable text="رکوردی وجود ندارد" />;
            })()
          ) : (
            <>zahra good girl</>
          )}
        </Grid>
      </Stack>
    </Stack>
  );
};

export default memo(AppImageListCard);
