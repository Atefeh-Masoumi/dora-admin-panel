import { FC, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Box, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { AddServerContext } from "src/components/organisms/vm/add/contexts/AddVmContext";
import { SelectDataCenter } from "src/components/organisms/vm/add/steps/SelectDataCenter";
import { SelectOS } from "src/components/organisms/vm/add/steps/SelectOS";
import { SelectConfig } from "src/components/organisms/vm/add/steps/SelectConfig";
import { ServerInfo } from "src/components/organisms/vm/add/steps/ServerInfo";
import { passwordValidationRegex } from "src/utils/regexUtils";
import {
  useGetApiMyPortalProductItemListByProductIdQuery,
  usePostApiMyVmHostCreateMutation,
} from "src/app/services/api.generated";
import { CUSTOMER_PRODUCT_TYPE_ENUM } from "src/constant/customerProductTypeEnum";
import ServiceReceipt, {
  ReceiptTypeEnum,
} from "src/components/molecules/ServiceReceipt";
import { SelectConfigType } from "src/components/organisms/vm/add/steps/SelectConfigType";
import { PRODUCT_CATEGORY_ENUM } from "src/constant/productCategoryEnum";
const mapConfig = {
  cpu: "CPU",
  memory: "Memory",
  disk: "Disk",
  ipv4: "IPV4",
  ipv6: "IPV6",
  rackUnitSpace: "Rack Space Unit",
  powerAmp: "Power (A)",
  ipv4Count: "IPV4",
  networkPort10G: "Network 10G Port",
  networkPort1G: "Network 1G Port",
};

const AddVm: FC = () => {
  const {
    dataCenter,
    osVersion,
    serverConfig,
    serverName,
    serverPassword,
    isPredefined,
    setIsPredefined,
    customConfig,
  } = useContext(AddServerContext);

  const [paymentType, setPaymentType] =
    useState<CUSTOMER_PRODUCT_TYPE_ENUM | null>(null);

  const { data: productItems } =
    useGetApiMyPortalProductItemListByProductIdQuery({
      productId: PRODUCT_CATEGORY_ENUM.VM,
    });

  const navigate = useNavigate();

  const [createCloudServer, { isLoading: createHostIsLoading }] =
    usePostApiMyVmHostCreateMutation();

  const mapCustomConfig = useMemo(() => {
    return [
      {
        numberOfItem: customConfig.memory || 0,
        name: mapConfig.memory || "",
        fee: productItems?.find((x) => x.name === mapConfig.memory)?.price || 0,
      },
      {
        numberOfItem: customConfig.cpu || 0,
        name: mapConfig.cpu || "",
        fee: productItems?.find((x) => x.name === mapConfig.cpu)?.price || 0,
      },
      {
        numberOfItem: customConfig.disk || 0,
        name: mapConfig.disk || "",
        fee: productItems?.find((x) => x.name === mapConfig.disk)?.price || 0,
      },
      {
        numberOfItem: customConfig.IPV4 || 0,
        name: mapConfig.ipv4 || "",
        fee: productItems?.find((x) => x.name === mapConfig.ipv4)?.price || 0,
      },
    ];
  }, [customConfig, productItems]);

  const submitHandler = () => {
    let validationErrorMessage = "";

    if (!dataCenter || !dataCenter.id) {
      validationErrorMessage = "لطفا مرکز داده را انتخاب کنید";
    } else if (!osVersion || !osVersion.id) {
      validationErrorMessage = "لطفا ورژن سیستم عامل را انتخاب کنید";
    } else if (isPredefined && (!serverConfig || !serverConfig.id)) {
      validationErrorMessage = "لطفا مشخصات سرور را انتخاب کنید";
    } else if (!serverName) {
      validationErrorMessage = "لطفا نام سرور را انتخاب کنید";
    } else if (serverName.trim().length < 5 || serverName.length > 50) {
      validationErrorMessage =
        "طول کارکترهای بخش نام سرور ابری باید بین ۵ تا ۵۰ کارکتر باشد";
    } else if (!passwordValidationRegex.test(serverPassword)) {
      validationErrorMessage = "رمز عبور نامعتبر است";
    } else if (!paymentType) {
      validationErrorMessage = "لطفا نوع پرداخت را مشخص کنید";
    }

    if (validationErrorMessage !== "") {
      toast.error(validationErrorMessage);
    } else {
      createCloudServer({
        createVmModel: {
          name: serverName,
          password: serverPassword,
          publicKey: null,
          datacenterId: dataCenter?.id || 0,
          imageId: osVersion?.id || 0,
          customerProductTypeId: paymentType!,
          isPredefined: isPredefined,
          productBundleId: serverConfig?.id || 0,
          cpu: customConfig.cpu,
          memory: customConfig.memory,
          disk: customConfig.disk,
        },
      })
        .unwrap()
        .then((res) => {
          toast.success("ماشین مجازی با موفقیت ایجاد گردید");
          navigate("/vm");
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
        ایجاد سرور مجازی جدید
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
                  <SelectDataCenter />
                  <Divider sx={{ margin: "50px 10px" }} />
                </Grid>
                <Grid xs={12} item>
                  <SelectOS />
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
                  <SelectConfig />
                  <Divider sx={{ margin: "50px 10px" }} />
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
                  isPredefined
                    ? ReceiptTypeEnum.PREDEFINED_BUNDLE
                    : ReceiptTypeEnum.CUSTOM
                }
                submitHandler={() => submitHandler()}
                submitButtonIsLoading={createHostIsLoading}
                paymentType={paymentType}
                setPaymentType={setPaymentType}
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

export default AddVm;
