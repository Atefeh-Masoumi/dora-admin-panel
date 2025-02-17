import { Box, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import { FC, useContext, useEffect, useMemo } from "react";
import { useLazyGetApiMyPortalProductItemKubernetesPriceByWorkerNodeCountQuery } from "src/app/services/api";
import { useGetApiMyPortalProductBundleKuberClusterListQuery } from "src/app/services/api.generated";
import ServiceReceipt, {
  ReceiptTypeEnum,
} from "src/components/molecules/ServiceReceipt";
import { AddKubernetesContext } from "src/components/organisms/kuberCluster/add/contexts/AddKubernetesContext";
import { SelectKuberConfig } from "src/components/organisms/kuberCluster/add/steps/SelectKuberConfig";
import { SelectKuberDataCenter } from "src/components/organisms/kuberCluster/add/steps/SelectKuberDataCenter";
import { SelectKuberSetting } from "src/components/organisms/kuberCluster/add/steps/SelectKuberSetting";
import { ServerKuberInfo } from "src/components/organisms/kuberCluster/add/steps/ServerKuberInfo";
import { SelectConfigType } from "src/components/organisms/vm/add/steps/SelectConfigType";

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

const AddKubernetes: FC = () => {
  const {
    serverConfig,
    workersCount,
    submitHandler,
    submitLoading,
    isPredefined,
    setIsPredefined,
    customConfig,
    setProductItemPrices,
    productItemPrices,
  } = useContext(AddKubernetesContext);

  const [getKubernetesPrice] =
    useLazyGetApiMyPortalProductItemKubernetesPriceByWorkerNodeCountQuery();

  const { data: vmBundlesList } =
    useGetApiMyPortalProductBundleKuberClusterListQuery();

  useEffect(() => {
    if (isPredefined && !serverConfig?.id) return;
    getKubernetesPrice({ workerNodeCount: workersCount })
      .unwrap()
      .then((res) => {
        setProductItemPrices(res);
      })
      .catch((e) => {});
  }, [
    getKubernetesPrice,
    setProductItemPrices,
    isPredefined,
    workersCount,
    serverConfig?.id,
  ]);

  const mapCustomConfig = useMemo(() => {
    const numberOfMasterNodes =
      productItemPrices?.masterNodesInfo?.masterNodeCount;

    let items: MapCustomConfigType = [];

    productItemPrices?.masterNodesInfo?.masterVmSpecs?.forEach((x) => {
      const vmItem = productItemPrices?.vmProductItemsPrice?.find(
        (y) => y.name?.toLowerCase() === x.name?.toLowerCase()
      );

      if (vmItem) {
        items.push({
          numberOfItem: (numberOfMasterNodes || 0) * (x.quantity || 0),
          fee: vmItem.price || 0,
          name: `${x.name?.toLowerCase() || ""} (${
            numberOfMasterNodes || 0
          } مستر نود)`,
        });
      }
    });

    items.push({
      numberOfItem: 1,
      name: "هزینه نگهداری",
      fee: productItemPrices?.masterNodesInfo?.kubernetesManagementItemPrice,
    });

    if (isPredefined && serverConfig?.id) {
      const selectedProductBundle = vmBundlesList?.find(
        (x) => x.id === serverConfig?.id
      );

      return [
        {
          numberOfItem: workersCount,
          name: selectedProductBundle?.name || "",
          fee: selectedProductBundle?.price,
        },
        ...items,
      ];
    } else if (!isPredefined) {
      return [
        {
          numberOfItem: customConfig.cpu * workersCount,
          name: `${mapConfig.cpu.toLowerCase()} (${workersCount} ورکر نود)`,
          fee: productItemPrices?.vmProductItemsPrice?.find(
            (y) => y.name?.toLowerCase() === mapConfig.cpu.toLowerCase()
          )?.price,
        },
        {
          numberOfItem: customConfig.disk * workersCount,
          name: `${mapConfig.disk.toLowerCase()} (${workersCount} ورکر نود)`,
          fee: productItemPrices?.vmProductItemsPrice?.find(
            (y) => y.name?.toLowerCase() === mapConfig.disk.toLowerCase()
          )?.price,
        },
        {
          numberOfItem: customConfig.memory * workersCount,
          name: `${mapConfig.memory.toLowerCase()} (${workersCount} ورکر نود)`,
          fee: productItemPrices?.vmProductItemsPrice?.find(
            (y) => y.name?.toLowerCase() === mapConfig.memory.toLowerCase()
          )?.price,
        },
        {
          numberOfItem: customConfig.ipV4 * workersCount,
          name: `${mapConfig.ipv4.toLowerCase()} (${workersCount} ورکر نود)`,
          fee: productItemPrices?.vmProductItemsPrice?.find(
            (y) => y.name?.toLowerCase() === mapConfig.ipv4.toLowerCase()
          )?.price,
        },
        ...items,
      ];
    }
    return [{ numberOfItem: 0, name: "", fee: undefined }];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    customConfig,
    isPredefined,
    serverConfig?.id,
    vmBundlesList,
    productItemPrices,
  ]);

  return (
    <>
      <Typography
        variant="title6"
        color="secondary"
        fontWeight="700"
        sx={{ mb: 3 }}
      >
        ایجاد کلاستر کوبرنتیز جدید
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
                <SelectKuberDataCenter />
                <Divider sx={{ mt: 10 }} />
              </Grid>
              <Grid xs={12} item>
                <SelectKuberSetting />
                <Divider sx={{ mt: 10 }} />
              </Grid>
              <Grid xs={12} item>
                <SelectConfigType
                  isPredefined={isPredefined}
                  setIsPredefined={setIsPredefined}
                />
                <Divider sx={{ mt: 10 }} />
              </Grid>
              <Grid xs={12} item>
                <SelectKuberConfig />
                <Divider sx={{ mt: 10 }} />
              </Grid>
              <Grid xs={12} item>
                <ServerKuberInfo />
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
              receiptType={ReceiptTypeEnum.CUSTOM}
              submitHandler={submitHandler}
              submitButtonIsLoading={submitLoading}
              receiptItemName={serverConfig?.id ? serverConfig.name : "--"}
              receiptItemNumber={workersCount.toString() || ""}
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

export default AddKubernetes;
