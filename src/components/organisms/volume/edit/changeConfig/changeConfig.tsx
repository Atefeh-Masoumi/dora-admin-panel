import { FC, useEffect, useMemo, useState } from "react";
import { Divider, Paper, Stack, Typography, useTheme } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { Grid2 } from "@mui/material";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { PRODUCT_CATEGORY_ENUM } from "src/constant/productCategoryEnum";
import { PRODUCT_ITEM_ENUM } from "src/constant/productItemEnum";
import ReverseSlider from "src/components/atoms/ReverseSlider";
import { priceToPersian } from "src/utils/priceToPersian";
import { e2p } from "src/utils/e2p.utils";
import {
  useGetApiMyPortalProductItemListByProductIdQuery,
  useGetApiMyVmByProjectIdVolumeGetAndIdQuery,
  usePutApiMyVmByProjectIdVolumeEditAndIdMutation,
} from "src/app/services/api.generated";

type ChangeConfigPropsType = {};

export const ChangeConfig: FC<ChangeConfigPropsType> = () => {
  const [size, setSize] = useState(25);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);

  const { blockstorageId, projectId } = useParams();
  const theme = useTheme();

  const { data: volumeData } = useGetApiMyVmByProjectIdVolumeGetAndIdQuery({
    id: blockstorageId ? +blockstorageId : 0,
    projectId: Number(projectId),
  });

  const { data: productItems } = useGetApiMyPortalProductItemListByProductIdQuery({
    productId: PRODUCT_CATEGORY_ENUM.BlockStorage,
  });

  const diskUnitPrice = productItems?.find(
    (x) => x.id === PRODUCT_ITEM_ENUM.CloudBlockDisk
  )?.price;

  const [sendNewConfig, { isLoading: sendNewConfigLoading }] =
    usePutApiMyVmByProjectIdVolumeEditAndIdMutation();

  const { refetch } = useGetApiMyVmByProjectIdVolumeGetAndIdQuery({
    id: Number(blockstorageId)!,
    projectId: Number(projectId),
  });

  useEffect(() => {
    if (blockstorageId && volumeData) {
      setSize(volumeData.size || 25);
    }
  }, [volumeData, blockstorageId]);

  const resourceList = [
    {
      name: "Size (GB)",
      value: size,
      onChange: setSize,
      min: 25,
      max: 5000,
      step: 25,
    },
  ];

  const totalPrice = useMemo(() => {
    const diskPrice = diskUnitPrice! * size;
    return diskPrice;
  }, [size, diskUnitPrice]);

  const submitClickHandler = () => {
    if (!blockstorageId) return;
    
    sendNewConfig({
      id: blockstorageId ? +blockstorageId : 0,
      projectId: Number(projectId),
      editVolumeHostModel: {
        volumeSize: size,
      },
    })
      .unwrap()
      .then(() => {
        toast.success("تغییرات جدید با موفقیت اعمال شد");
        refetch();
      })
      .catch(() => {
        toast.error("خطا در اعمال تغییرات");
      });
  };

  return (
    <>
      <Grid2 container spacing={3} alignItems="center" justifyContent="center">
        <Grid2 size={{ xs: 12, md: 10 }}>
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
                      color={theme.palette.grey[700]}
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
                  {e2p(priceToPersian(totalPrice))} ریال
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
                تغییر حجم دیسک
              </LoadingButton>
            </Stack>
          </Paper>
        </Grid2>
      </Grid2>
    </>
  );
};
