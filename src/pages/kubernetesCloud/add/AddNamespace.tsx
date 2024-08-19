import { Box, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import { FC, useContext, useEffect, useMemo } from "react";
import { useLazyGetApiMyPortalProductItemKubernetesPriceByWorkerNodeCountQuery } from "src/app/services/api";
import {
  useGetApiMyPortalProductBundleKuberCloudListQuery,
  useGetApiMyPortalProductItemListByProductIdQuery,
} from "src/app/services/api.generated";
import ServiceReceipt, {
  ReceiptTypeEnum,
} from "src/components/molecules/ServiceReceipt";
import { SelectKuberConfig } from "src/components/organisms/kubernetes/add/steps/SelectKuberConfig";
import { AddKubernetesCloudContext } from "src/components/organisms/kubernetesCloud/add/context/AddKubernetesCloudContext";
import { KuberCloudInfo } from "src/components/organisms/kubernetesCloud/add/steps/KuberCloudInfo";
import { SelectKuberCloudConfigType } from "src/components/organisms/kubernetesCloud/add/steps/SelectConfigType";
import { SelectKuberCloudConfig } from "src/components/organisms/kubernetesCloud/add/steps/SelectKuberCloudConfig";
import { SelectKuberCloudDataCenter } from "src/components/organisms/kubernetesCloud/add/steps/SelectKuberCloudDataCenter";
import { SelectConfigType } from "src/components/organisms/vm/add/steps/SelectConfigType";
import { PRODUCT_CATEGORY_ENUM } from "src/constant/productCategoryEnum";
import { PRODUCT_ITEM_ENUM } from "src/constant/productItemEnum";

const mapConfig = {
  cpu: "vCPU",
  memory: "vMemory",
  disk: "vDisk",
  ipv4: "IPV4",
  ipv6: "IPV6",
  rackUnitSpace: "Rack Space Unit",
  powerAmp: "Power (A)",
  ipv4Count: "IPV4",
  networkPort10G: "Network 10G Port",
  networkPort1G: "Network 1G Port",
};

type MapCustomConfigType = {
  numberOfItem: number;
  name: string;
  fee: number | undefined;
}[];

const AddNamespace: FC = () => {
  const {
    serverConfig,
    submitHandler,
    submitLoading,
    isPredefined,
    setIsPredefined,
    customConfig,
    setProductItemPrices,
    productItemPrices,
  } = useContext(AddKubernetesCloudContext);

  const { data: productItems } =
    useGetApiMyPortalProductItemListByProductIdQuery({
      productId: PRODUCT_CATEGORY_ENUM.KubernetesCloud,
    });

  const { data: kuberCloudList, isLoading: kuberCloudListLoading } =
    useGetApiMyPortalProductBundleKuberCloudListQuery();

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
                <SelectKuberCloudDataCenter />
                <Divider sx={{ margin: "50px 10px" }} />
              </Grid>
              <Grid xs={12} item>
                <SelectKuberCloudConfigType
                  isPredefined={isPredefined}
                  setIsPredefined={setIsPredefined}
                />
                <Divider sx={{ margin: "50px 10px" }} />
              </Grid>
              <Grid xs={12} item>
                <SelectKuberCloudConfig />
                <Divider sx={{ margin: "50px 10px" }} />
              </Grid>
              <Grid xs={12} item>
                <KuberCloudInfo />
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

export default AddNamespace;
