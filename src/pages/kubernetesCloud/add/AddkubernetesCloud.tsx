import { Box, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import { FC, useContext, useMemo } from "react";
import { useGetApiMyPortalProductItemListByProductIdQuery } from "src/app/services/api.generated";
import ServiceReceipt, {
  ReceiptTypeEnum,
} from "src/components/molecules/ServiceReceipt";
import { AddKubernetesCloudContext } from "src/components/organisms/kubernetesCloud/add/context/AddKubernetesCloudContext";
import { KubernetesCloudInfo } from "src/components/organisms/kubernetesCloud/add/steps/KubernetesCloudInfo";
import { SelectKubernetesCloudConfigType } from "src/components/organisms/kubernetesCloud/add/steps/SelectConfigType";
import { SelectKubernetesCloudConfig } from "src/components/organisms/kubernetesCloud/add/steps/SelectKubernetesCloudConfig";
import { SelectKubernetesCloudDataCenter } from "src/components/organisms/kubernetesCloud/add/steps/SelectKubernetesCloudDataCenter";
import { PRODUCT_CATEGORY_ENUM } from "src/constant/productCategoryEnum";
import { PRODUCT_ITEM_ENUM } from "src/constant/productItemEnum";

const AddKubernetesCloud: FC = () => {
  const {
    serverConfig,
    submitHandler,
    isPredefined,
    setIsPredefined,
    customConfig,
  } = useContext(AddKubernetesCloudContext);

  const { data: productItems } =
    useGetApiMyPortalProductItemListByProductIdQuery({
      productId: PRODUCT_CATEGORY_ENUM.KubernetesCloud,
    });

  const mapCustomConfig = useMemo(() => {
    return [
      {
        numberOfItem: customConfig.memory || 1,
        name:
          productItems?.find((x) => x.id === PRODUCT_ITEM_ENUM.KuberMemory)
            ?.name || "",
        fee:
          productItems?.find((x) => x.id === PRODUCT_ITEM_ENUM.KuberMemory)
            ?.price || 1,
      },
      {
        numberOfItem: customConfig.cpu || 1,
        name:
          productItems?.find((x) => x.id === PRODUCT_ITEM_ENUM.KuberCpu)
            ?.name || "",
        fee:
          productItems?.find((x) => x.id === PRODUCT_ITEM_ENUM.KuberCpu)
            ?.price || 1,
      },
      {
        numberOfItem: customConfig.disk || 25,
        name:
          productItems?.find((x) => x.id === PRODUCT_ITEM_ENUM.KuberDisk)
            ?.name || "",
        fee:
          productItems?.find((x) => x.id === PRODUCT_ITEM_ENUM.KuberDisk)
            ?.price || 25,
      },
      {
        numberOfItem: customConfig.pods10 || 1,
        name:
          productItems?.find((x) => x.id === PRODUCT_ITEM_ENUM.Kuber10Pods)
            ?.name || "",
        fee:
          productItems?.find((x) => x.id === PRODUCT_ITEM_ENUM.Kuber10Pods)
            ?.price || 1,
      },
    ];
  }, [customConfig, productItems]);

  return (
    <>
      <Typography
        variant="title6"
        color="secondary"
        fontWeight="700"
        sx={{ mb: 3 }}
      >
        ایجاد Namespace
      </Typography>
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
                <SelectKubernetesCloudDataCenter />
                <Divider sx={{ margin: "50px 10px" }} />
              </Grid>
              <Grid xs={12} item>
                <SelectKubernetesCloudConfigType
                  isPredefined={isPredefined}
                  setIsPredefined={setIsPredefined}
                />
                <Divider sx={{ margin: "50px 10px" }} />
              </Grid>
              <Grid xs={12} item>
                <SelectKubernetesCloudConfig />
                <Divider sx={{ margin: "50px 10px" }} />
              </Grid>
              <Grid xs={12} item>
                <KubernetesCloudInfo />
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
              submitButtonIsLoading={false}
              receiptItemName={serverConfig?.id ? serverConfig.name : "سرور"}
              receiptItemNumber={serverConfig?.id ? "۱" : "---"}
              reciptItemPrice={Math.floor(
                serverConfig?.price || 0
              ).toLocaleString("fa-IR")}
              totalPrice={Math.floor(
                (serverConfig?.price || 0) * 1.1
              ).toLocaleString("fa-IR")}
              vat={Math.floor((serverConfig?.price || 0) * 0.1).toLocaleString(
                "fa-IR"
              )}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default AddKubernetesCloud;
