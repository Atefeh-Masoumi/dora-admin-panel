import { Box, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import { FC, useContext, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import {
  useGetApiMyPortalProductItemListByProductIdQuery,
  useGetApiMyVmByProjectIdVolumeListQuery,
  usePostApiMyVmByProjectIdVolumeCreateMutation,
} from "src/app/services/api.generated";
import ServiceReceipt, {
  ReceiptTypeEnum,
} from "src/components/molecules/ServiceReceipt";
import { AddVolumeContext } from "src/components/organisms/volume/add/contexts/AddVolumeContext";
import AddVolumeContextProvider from "src/components/organisms/volume/add/contexts/AddVolumeContext";
import { SelectVolumeConfig } from "src/components/organisms/volume/add/steps/SelectVolumeConfig";
import { VolumeInfo } from "src/components/organisms/volume/add/steps/VolumeInfo";
import { SelectConfigType } from "src/components/organisms/vm/add/steps/SelectConfigType";
import { PRODUCT_CATEGORY_ENUM } from "src/constant/productCategoryEnum";
import { PRODUCT_ITEM_ENUM } from "src/constant/productItemEnum";

const mapConfig = {
  disk: "Disk",
};

const AddVolumeService: FC = () => {
  const {
    predefinedConfig,
    volumeName,
    isPredefined,
    setIsPredefined,
    customConfig,
  } = useContext(AddVolumeContext);

  const navigate = useNavigate();
  const { projectId } = useParams();
  const [createVolumeService, { isLoading }] =
    usePostApiMyVmByProjectIdVolumeCreateMutation();

  const { data: productItems } =
    useGetApiMyPortalProductItemListByProductIdQuery({
      productId: PRODUCT_CATEGORY_ENUM.BlockStorage,
    });

  const { refetch } = useGetApiMyVmByProjectIdVolumeListQuery({
    projectId: Number(projectId),
  });

  const mapCustomConfig = useMemo(() => {
    return [
      {
        numberOfItem: customConfig.disk || 0,
        name: mapConfig.disk || "",
        fee:
          productItems?.find((x) => x.id === PRODUCT_ITEM_ENUM.CloudBlockDisk)
            ?.price || 0,
      },
    ];
  }, [customConfig, productItems]);

  const submitHandler = () => {
    let validationErrorMessage = "";

    if (!volumeName) {
      validationErrorMessage = "لطفا نام سرویس را انتخاب کنید";
    } else if (volumeName.length < 5) {
      validationErrorMessage = "نام سرویس نمی تواند کمتر از ۵ حرف باشد";
    } else if (isPredefined && (!predefinedConfig || !predefinedConfig.id)) {
      validationErrorMessage = "لطفا مشخصات سرور را انتخاب کنید";
    }

    if (validationErrorMessage !== "") {
      toast.error(validationErrorMessage);
    } else {
      createVolumeService({
        projectId: Number(projectId),
        createVolumeHostModel: {
          name: volumeName,
          productBundleId: predefinedConfig?.id || 0,
          isPredefined: isPredefined,
          volumeSize: customConfig.disk,
        },
      })
        .unwrap()
        .then(() => {
          toast.success("دیسک ابری با موفقیت ایجاد شد");
          navigate(`/block-storage/${projectId}`);
          refetch();
        })
        .catch((err) => {});
    }
  };

  return (
    <>
      <Typography
        variant="title6"
        color="secondary"
        fontWeight="700"
        sx={{ mb: 3 }}
      >
        ایجاد دیسک ابری جدید
      </Typography>
      <Box sx={{ my: 0 }}>
        <Grid container>
          <Grid xs={12} md={8} item>
            <Stack
              component={Paper}
              sx={{
                position: "relative",
                width: { xs: "100%" },
                px: { xs: 1.8, lg: 2 },
                py: { xs: 1.8, lg: 2.25 },
              }}
            >
              <Grid container gap={2}>
                <Grid xs={12} item>
                  <SelectConfigType
                    isPredefined={isPredefined}
                    setIsPredefined={setIsPredefined}
                  />
                  <Divider sx={{ mt: 10 }} />
                </Grid>
                <Grid xs={12} item>
                  <SelectVolumeConfig />
                  <Divider sx={{ mt: 10 }} />
                </Grid>
                <Grid xs={12} item>
                  <VolumeInfo />
                </Grid>
              </Grid>
            </Stack>
          </Grid>
          <Grid
            id="relative-left-col-factor"
            px={{ md: 2, xs: 0 }}
            py={{ md: 0, xs: 2 }}
            xs={12}
            md={4}
            item
            style={{ position: "relative", textAlign: "center" }}
          >
            <Box sx={{ position: "sticky", top: 0 }}>
              <ServiceReceipt
                customConfig={mapCustomConfig}
                receiptType={
                  isPredefined
                    ? ReceiptTypeEnum.PREDEFINED_BUNDLE
                    : ReceiptTypeEnum.CUSTOM
                }
                submitHandler={() => submitHandler()}
                submitButtonIsLoading={isLoading}
                receiptItemName={predefinedConfig?.id ? predefinedConfig.name : "سرور"}
                receiptItemNumber={predefinedConfig?.id ? "۱" : "---"}
                reciptItemPrice={Math.floor(
                  predefinedConfig?.price || 0
                ).toLocaleString("fa-IR")}
                totalPrice={Math.floor(
                  (predefinedConfig?.price || 0) * 1.1
                ).toLocaleString("fa-IR")}
                vat={Math.floor(
                  (predefinedConfig?.price || 0) * 0.1
                ).toLocaleString("fa-IR")}
              />
            </Box>
          </Grid>
        </Grid>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
          px={1.7}
        ></Stack>
      </Box>
    </>
  );
};

const AddVolume: FC = () => {
  return (
    <AddVolumeContextProvider>
      <AddVolumeService />
    </AddVolumeContextProvider>
  );
};

export default AddVolume;
