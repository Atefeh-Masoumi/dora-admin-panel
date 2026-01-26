import { Box, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import { FC, useContext, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import {
  useGetApiMyPortalProductItemListByProductIdQuery,
  useGetApiMyVmByProjectIdHostListQuery,
  usePostApiMyVmByProjectIdHostCreateFromBackupMutation,
} from "src/app/services/api.generated";
import ServiceReceipt, {
  ReceiptTypeEnum,
} from "src/components/molecules/ServiceReceipt";
import { PRODUCT_CATEGORY_ENUM } from "src/constant/productCategoryEnum";
import { PRODUCT_ITEM_ENUM } from "src/constant/productItemEnum";
import { AddBckupVMContext } from "src/components/organisms/backup/add/contex/AddBackupContext";
import { ServerInfo } from "src/components/organisms/backup/add/steps/ServerInfo";
import { SelectConfig } from "src/components/organisms/backup/add/steps/SelectConfig";
import { SelectNetwork } from "src/components/organisms/backup/add/steps/SelectNetwork";
import { SelectFirewalType } from "src/components/organisms/backup/add/steps/SelectFirewallType";
import { SelectFirewall } from "src/components/organisms/backup/add/steps/SelectFirewal";

const AddBackupVm: FC = () => {
  const { projectId,id } = useParams();

  const {
    serverConfig,
    serverName,
    customConfig,
    usePublicIpV4,
    usePublicIpV6,
    usePrivateNetwork,
    selectedNetwork,
    ipAddress,
    usedFirewall,
    vmFirewallId,
    allowRemoteAccess,
    allowHttpAccess,
    allowHttpsAccess,
    remoteAccessIp,
  } = useContext(AddBckupVMContext);

  const { data: productItems } =
    useGetApiMyPortalProductItemListByProductIdQuery({
      productId: PRODUCT_CATEGORY_ENUM.VM,
    });

  const { refetch } = useGetApiMyVmByProjectIdHostListQuery({
    projectId: Number(projectId),
  });

  const navigate = useNavigate();

  const [createServerfromBackup, { isLoading: createHostIsLoading }] =
    usePostApiMyVmByProjectIdHostCreateFromBackupMutation();

  const mapCustomConfig = useMemo(() => {
    return [
      {
        numberOfItem: customConfig.memory || 1,
        name:
          productItems?.find((x) => x.id === PRODUCT_ITEM_ENUM.VMemory)?.name ||
          "",
        fee:
          productItems?.find((x) => x.id === PRODUCT_ITEM_ENUM.VMemory)
            ?.price || 1,
      },
      {
        numberOfItem: customConfig.cpu || 1,
        name:
          productItems?.find((x) => x.id === PRODUCT_ITEM_ENUM.VCpu)?.name ||
          "",
        fee:
          productItems?.find((x) => x.id === PRODUCT_ITEM_ENUM.VCpu)?.price ||
          1,
      },
    ];
  }, [customConfig, productItems]);

  const submitHandler = () => {
    let validationErrorMessage = "";

     if (!serverName) {
      validationErrorMessage = "لطفا نام سرور را انتخاب کنید";
    } else if (serverName.trim().length < 5 || serverName.length > 50) {
      validationErrorMessage =
        "طول کارکترهای بخش نام سرور ابری باید بین ۵ تا ۵۰ کارکتر باشد";
    } else if (usePrivateNetwork && (!selectedNetwork?.id || !ipAddress)) {
      validationErrorMessage = "برای شبکه خصوصی، انتخاب شبکه و IP الزامی است";
    } else if (usedFirewall && !vmFirewallId) {
      validationErrorMessage = "برای فایروال، انتخاب فایروال الزامی است";
    }

    if (validationErrorMessage !== "") {
      toast.error(validationErrorMessage);
    } else {
      createServerfromBackup({
        createVmFromBackupModel: {
          vmVolumeBackUpId:Number(id),
          name: serverName,
          cpu: customConfig.cpu,
          memory: customConfig.memory,

          vmNetworkId: usePrivateNetwork
            ? (selectedNetwork?.id as number | undefined)
            : undefined,
          ipAddress: usePrivateNetwork ? (ipAddress as string) : undefined,
          usedFirewall: usedFirewall,
          vmFirewallId: usedFirewall ? (vmFirewallId as number) : undefined,
          usedPublicIpV4: usePublicIpV4,
          usedPublicIpV6: usePublicIpV6,
          allowRemoteAccess: allowRemoteAccess,
          allowHttpAccess: allowHttpAccess,
          allowHttpsAccess: allowHttpsAccess,
          remoteAccessIp: remoteAccessIp || undefined,
        },
        projectId: Number(projectId),
      })
        .unwrap()
        .then(() => {
          toast.success("ماشین مجازی با موفقیت ایجاد گردید");
          navigate(-1);
          refetch();
        })
        .catch(() => {});
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
        ایجاد سرور ابری از طریق بکاپ
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
                  <SelectConfig />
                  <Divider sx={{ margin: "50px 10px" }} />
                </Grid>

                <Grid xs={12} item>
                  <SelectNetwork />
                  <Divider sx={{ mt: 10 }} />
                </Grid>
                <Grid xs={12} item>
                  <SelectFirewalType />
                </Grid>
                <Grid xs={12} item>
                  <SelectFirewall />
                  <Divider sx={{ mt: 10 }} />
                </Grid>
                <Grid xs={12} item>
                  <ServerInfo />
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
                  ReceiptTypeEnum.CUSTOM
                }
                submitHandler={() => submitHandler()}
                submitButtonIsLoading={createHostIsLoading}
                receiptItemName={serverConfig?.id ? serverConfig.name : "سرور"}
                receiptItemNumber={serverConfig?.id ? "۱" : "---"}
                reciptItemPrice={Math.floor(
                  serverConfig?.price || 0
                ).toLocaleString("fa-IR")}
                totalPrice={Math.floor(
                  (serverConfig?.price || 0) * 1.1
                ).toLocaleString("fa-IR")}
                vat={Math.floor(
                  (serverConfig?.price || 0) * 0.1
                ).toLocaleString("fa-IR")}
              />
            </Box>
          </Grid>
        </Grid>
        
      </Box>
    </>
  );
};

export default AddBackupVm;
