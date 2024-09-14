import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { FC, memo, useMemo, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { staticImageCategoryList } from "src/constant/kubernetesCloud.constant";
import { EmptyTable } from "src/components/molecules/EmptyTable";
import { AppImageCard } from "./AppImageCard";
import { FormikProps } from "formik";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { useParams } from "react-router";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import {
  GetApiMyKubernetesCloudImageListApiResponse,
  useGetApiMyKubernetesCloudSecretListByNamespaceIdQuery,
} from "src/app/services/api.generated";
import { KuberCloudNamespaceImageType } from "src/types/kubernetesCloud.types";

type AppImageListCardPropsType = {
  list: GetApiMyKubernetesCloudImageListApiResponse;
  loading: boolean;
  formik: FormikProps<KuberCloudNamespaceImageType>;
};

const AppImageListCard: FC<AppImageListCardPropsType> = ({
  list,
  loading,
  formik,
}) => {
  const [secret, setSecret] = useState<number | null>();
  const [hub, setHub] = useState<string | "">("");
  const [selectedCategory, setSelectedCategory] = useState<{
    id: number;
    name: string;
  }>(staticImageCategoryList[0]);

  const { kubernetesCloudId } = useParams();

  const { data: secretList, isLoading: secretListLoading } =
    useGetApiMyKubernetesCloudSecretListByNamespaceIdQuery(
      {
        namespaceId: Number(kubernetesCloudId),
      },
      { skip: !kubernetesCloudId }
    );

  const secretListFilterByType = useMemo(
    () => secretList?.filter((item) => item.secretTypeId === 3),
    [secretList]
  );

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

              return (
                <Stack sx={{ width: "100%" }}>
                  <EmptyTable text="رکوردی وجود ندارد" />
                </Stack>
              );
            })()
          ) : (
            <Stack gap={3} sx={{ width: "100%" }} alignItems="center">
              <Typography>ایجاد از طریق Image Registry</Typography>
              <Grid gap={2} justifyContent="center" container>
                <Grid item xs={12} md={4}>
                  <DorsaTextField
                    fullWidth
                    dir="ltr"
                    label="آدرس ایمیج"
                    size="small"
                    placeholder="https://..."
                    // sx={{
                    //   // border: "0.5px solid gray",
                    //   borderRadius: BORDER_RADIUS_1,
                    //   border: ({ palette }: any) =>
                    //     `1px solid ${palette.primary.light} !important`,
                    // }}
                    // helperText={
                    //   <FormHelperText sx={{ m: 0 }}>
                    //     <Box display="flex" sx={{ direction: "ltr" }}>
                    //       می توانید یک <Link href="/">سکرت</Link> ایجاد کنید
                    //     </Box>
                    //   </FormHelperText>
                    // }
                    // error={}
                    // helperText={"zahra"}
                    // {...formik.getFieldProps("name")}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl size="small" fullWidth>
                    <InputLabel id="registry">سکرت ایمیج رجیستری</InputLabel>
                    <Select
                      value={secret}
                      id="registry"
                      labelId="registry-id"
                      label="سکرت ایمیج رجیستری"
                      onChange={(e) => setSecret(Number(e.target.value))}
                      renderValue={(value) =>
                        value !== 0 ? (
                          value
                        ) : (
                          <Typography variant="text9" color="textSecondary">
                            No Option
                          </Typography>
                        )
                      }
                      sx={{
                        width: "100%",
                        "& .MuiSelect-select": {
                          bgcolor: "rgba(110, 118, 138, 0.06)",

                          border: ({ palette }) =>
                            `0.5px solid ${palette.primary.light}`,
                          padding: "7px !important",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none !important",
                        },
                      }}
                    >
                      {secretListFilterByType &&
                      secretListFilterByType?.length > 0 ? (
                        secretListFilterByType?.map(({ id, name }, index) => (
                          <MenuItem key={index} value={id}>
                            {name}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem value={0}>No Option</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Stack>
          )}
        </Grid>
      </Stack>
    </Stack>
  );
};

export default memo(AppImageListCard);
