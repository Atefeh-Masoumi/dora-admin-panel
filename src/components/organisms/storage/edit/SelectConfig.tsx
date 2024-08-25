import { FC, useEffect, useMemo, useState } from "react";
import { Divider, Paper, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import { priceToPersian } from "src/utils/priceToPersian";
import {
  usePutApiMyObjectStorageHostEditByIdMutation,
  useGetApiMyObjectStorageHostGetByIdQuery,
  useGetApiMyPortalProductItemListByProductIdQuery,
} from "src/app/services/api.generated";

import ReverseSlider from "src/components/atoms/ReverseSlider";
import { useParams } from "react-router";
import Grid2 from "@mui/material/Unstable_Grid2";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { PRODUCT_CATEGORY_ENUM } from "src/constant/productCategoryEnum";
import { PRODUCT_ITEM_ENUM } from "src/constant/productItemEnum";

type SelectConfigPropsType = {};

export const SelectConfig: FC<SelectConfigPropsType> = () => {
  const [disk, setDisk] = useState(25);

  const { id: serverId } = useParams();

  const { data } = useGetApiMyObjectStorageHostGetByIdQuery({
    id: serverId ? +serverId : 0,
  });
  const { data: productItems } =
    useGetApiMyPortalProductItemListByProductIdQuery({
      productId: PRODUCT_CATEGORY_ENUM.STORAGE,
    });

  const diskUnitPrice = productItems?.find(
    (x) => x.id === PRODUCT_ITEM_ENUM.CloudDisk
  )?.price;

  const [sendNewConfig, { isLoading: sendNewConfigLoading }] =
    usePutApiMyObjectStorageHostEditByIdMutation();

  useEffect(() => {
    if (serverId && data) {
      setDisk(data.disk || 0);
    }
  }, [data, serverId]);

  const resourceList = [
    {
      name: "Disk (GB)",
      value: disk,
      onChange: setDisk,
      min: 25,
      max: 1000,
      step: 25,
    },
  ];

  const totalPrice = useMemo(() => {
    const d = diskUnitPrice! * disk;
    return d;
  }, [disk]);

  const submitClickHandler = () => {
    if (!serverId) return;
    sendNewConfig({
      id: serverId ? +serverId : 0,
      editStorageHostModel: {
        disk,
      },
    })
      .unwrap()
      .then(() => toast.success("تغییرات جدید با موفقیت اعمال شد"));
  };

  return (
    <>
      <Grid2 container spacing={3} alignItems="center" justifyContent="center">
        <Grid2 xs={12} md={10}>
          <Paper
            component={Stack}
            rowGap={2}
            elevation={0}
            sx={{
              borderRadius: BORDER_RADIUS_1,
              p: { xs: 2.5 },
              height: "100%",
            }}
          >
            <Typography align="center" fontWeight={700} fontSize={18}>
              تغییر مشخصات
            </Typography>
            <Divider />
            <Stack rowGap={{ xs: 3, md: 7.4 }} sx={{ p: 4 }}>
              {resourceList.map(
                ({ name, value, onChange, min, max, step }, index) => (
                  <Stack
                    key={index}
                    direction={{ xs: "column-reverse", md: "row" }}
                    rowGap={5}
                    columnGap={4}
                    alignItems="end"
                  >
                    <ReverseSlider
                      value={value}
                      valueLabelDisplay="on"
                      onChange={(_, value) => onChange(value as number)}
                      min={min}
                      max={max}
                      step={step}
                    />
                    <Typography
                      color={({ palette }) => palette.grey[700]}
                      sx={{ width: "125px" }}
                      align="right"
                    >
                      {name}
                    </Typography>
                  </Stack>
                )
              )}
            </Stack>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              sx={{ mt: 6 }}
              alignItems="center"
              justifyContent="space-between"
              rowGap={3}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography color="grey.700">تخمین هزینه ماهیانه:</Typography>
                <Typography color="grey.700" fontWeight={700}>
                  {priceToPersian(totalPrice)} ریال
                </Typography>
              </Stack>
              <LoadingButton
                loading={sendNewConfigLoading}
                onClick={submitClickHandler}
                variant="contained"
                sx={{
                  px: { xs: 3, sm: 7 },
                  py: 2,
                  width: { xs: "100%", sm: "auto" },
                }}
              >
                تغییر فضای دیسک
              </LoadingButton>
            </Stack>
          </Paper>
        </Grid2>
      </Grid2>
    </>
  );
};
