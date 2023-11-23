import { FC, useContext, useEffect, useState } from "react";
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
  useGetApiCloudCustomerGetCustomerTypeQuery,
  usePostApiVmHostCreateMutation,
} from "src/app/services/api.generated";
import useResize from "src/utils/useResize";
import { CUSTOMER_TYPE_ENUM } from "src/constant/customerTypeEnum";
import { CUSTOMER_PRODUCT_TYPE_ENUM } from "src/constant/customerProductTypeEnum";
import ServiceReceipt from "src/components/molecules/ServiceReceipt";

const AddVm: FC = () => {
  const { dataCenter, osVersion, serverConfig, serverName, serverPassword } =
    useContext(AddServerContext);

  const { screenHeight, screenWidth } = useResize();
  const [factorFixedContentWidth, setFactorFixedContentWidth] = useState(0);
  const [paymentType, setPaymentType] =
    useState<CUSTOMER_PRODUCT_TYPE_ENUM | null>(null);

  const navigate = useNavigate();

  const { data: customerType } = useGetApiCloudCustomerGetCustomerTypeQuery();

  useEffect(() => {
    const factorCol = document.getElementById("relative-left-col-factor");
    setFactorFixedContentWidth(factorCol?.offsetWidth || 0);
  }, [screenHeight, screenWidth]);

  const [createCloudServer, { isLoading: createHostIsLoading }] =
    usePostApiVmHostCreateMutation();

  const submitHandler = () => {
    let validationErrorMessage = "";

    if (!dataCenter || !dataCenter.id) {
      validationErrorMessage = "لطفا مرکز داده را انتخاب کنید";
    } else if (!osVersion || !osVersion.id) {
      validationErrorMessage = "لطفا ورژن سیستم عامل را انتخاب کنید";
    } else if (!serverConfig || !serverConfig.id) {
      validationErrorMessage = "لطفا مشخصات سرور را انتخاب کنید";
    } else if (!serverName) {
      validationErrorMessage = "لطفا نام سرور را انتخاب کنید";
    } else if (serverName.length < 3) {
      validationErrorMessage = "نام سرور نباید کمتر از سه حرف باشد";
    } else if (!passwordValidationRegex.test(serverPassword)) {
      validationErrorMessage = "رمز عبور نامعتبر است";
    } else if (customerType === CUSTOMER_TYPE_ENUM.NORMAL && !paymentType) {
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
          customerProductTypeId:
            customerType === CUSTOMER_TYPE_ENUM.POST_PAID
              ? CUSTOMER_PRODUCT_TYPE_ENUM.PAY_AS_YOU_GO
              : paymentType || 0,
          isPredefined: true,
          productBundleId: serverConfig?.id || 0,
          cpu: null,
          memory: null,
          disk: null,
        },
      })
        .unwrap()
        .then((res) => {
          toast.success("ماشین مجازی با موفقیت ایجاد گردید");
          navigate("/vm");
        });
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
                  <Divider sx={{ margin: "50px 10px" }} />
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
            <ServiceReceipt
              factorFixedContentWidth={factorFixedContentWidth}
              submitHandler={() => submitHandler()}
              submitButtonIsLoading={createHostIsLoading}
              paymentType={paymentType}
              setPaymentType={setPaymentType}
              customerType={customerType}
              receiptItemName={serverConfig?.id ? serverConfig.name : "سرور"}
              receiptItemNumber={serverConfig?.id ? "۱" : "---"}
              reciptItemPrice={Math.floor(
                serverConfig?.price || 0
              ).toLocaleString("fa-IR")}
              totalPrice={Math.floor(
                (serverConfig?.price || 0) * 1.09
              ).toLocaleString("fa-IR")}
              vat={Math.floor((serverConfig?.price || 0) * 0.09).toLocaleString(
                "fa-IR"
              )}
            />
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
