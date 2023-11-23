import { FC, useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { AddStorageStepper } from "src/components/organisms/storage/add/AddStepper";
import { SelectDataCenter } from "src/components/organisms/storage/add/steps/SelectDataCenter";
import { SelectConfig } from "src/components/organisms/storage/add/steps/SelectConfig";
import { ServerInfo } from "src/components/organisms/storage/add/steps/ServerInfo";
import {
  AddStorageContext,
  addStorageStepsType,
} from "src/components/organisms/storage/add/contexts/AddStorageContext";
import {
  useGetApiCloudCustomerGetCustomerTypeQuery,
  usePostApiStorageHostCreateMutation,
} from "src/app/services/api.generated";
import useResize from "src/utils/useResize";
import { CUSTOMER_PRODUCT_TYPE_ENUM } from "src/constant/customerProductTypeEnum";
import { CUSTOMER_TYPE_ENUM } from "src/constant/customerTypeEnum";

const AddStorageService: FC = () => {
  const { step, setStep, dataCenter, serverConfig, name, isPublic } =
    useContext(AddStorageContext);

  const { screenHeight, screenWidth } = useResize();
  const [factorFixedContentWidth, setFactorFixedContentWidth] = useState(0);
  const [paymentType, setPaymentType] =
    useState<CUSTOMER_PRODUCT_TYPE_ENUM | null>(null);

  const navigate = useNavigate();

  const { data: customerType, isLoading: customerTypeIsLoading } =
    useGetApiCloudCustomerGetCustomerTypeQuery();

  useEffect(() => {
    const factorCol = document.getElementById("relative-left-col-factor");
    setFactorFixedContentWidth(factorCol?.offsetWidth || 0);
  }, [screenHeight, screenWidth]);

  const [createStorageService, { isLoading }] =
    usePostApiStorageHostCreateMutation();

  const submitHandler = () => {
    let validationErrorMessage = "";

    if (!dataCenter || !dataCenter.id) {
      validationErrorMessage = "لطفا مرکز داده را انتخاب کنید";
    } else if (!name) {
      validationErrorMessage = "لطفا نام سرویس را انتخاب کنید";
    } else if (name.length < 3) {
      validationErrorMessage = "نام سرویس نمی تواند کمتر از سه حرف باشد";
    } else if (!serverConfig || !serverConfig.id) {
      validationErrorMessage = "لطفا مشخصات سرور را انتخاب کنید";
    } else if (customerType === CUSTOMER_TYPE_ENUM.NORMAL && !paymentType) {
      validationErrorMessage = "لطفا نوع پرداخت را مشخص کنید";
    }

    if (validationErrorMessage !== "") {
      toast.error(validationErrorMessage);
    } else {
      createStorageService({
        createStorageHostModel: {
          name: name,
          isPublic: isPublic,
          datacenterId: dataCenter?.id || 0,
          productBundleId: serverConfig?.id || 0,
          customerProductTypeId:
            customerType === CUSTOMER_TYPE_ENUM.POST_PAID
              ? CUSTOMER_PRODUCT_TYPE_ENUM.PAY_AS_YOU_GO
              : paymentType || 0,
          isPredefined: true,
        },
      })
        .unwrap()
        .then((res) => {
          toast.success("سرویس فضای ابری با موفقیت ایجاد شد");
          if (res) {
            let a = document.createElement("a");
            a.href = "/cloud/order/" + res;
            a.click();
          }
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
        ایجاد فضای ابری جدید
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
            <Stack
              position={{ xs: "static", md: "fixed" }}
              maxHeight={{ md: "550px", xs: "auto" }}
              component={Paper}
              className="fixed-paper-factor"
              sx={{
                overflow: "scroll",
                width: factorFixedContentWidth,
                px: 2,
                py: 2,
              }}
            >
              <Stack spacing={2}>
                <Typography fontSize={24} fontWeight="bold" align="center">
                  صورتحساب
                </Typography>
                <Divider
                  sx={{ margin: "20px 20px !important", borderBottomWidth: 3 }}
                />
                <Grid
                  container
                  sx={{
                    marginTop: "20px !important",
                    marginBottom: "20px !important",
                  }}
                >
                  <Grid item xs={4} px={2} sx={{ textAlign: "left" }}>
                    <Typography
                      fontSize={14}
                      sx={{ color: ({ palette }) => palette.grey[700] }}
                    >
                      موارد فاکتور
                    </Typography>
                  </Grid>
                  <Grid item xs={4} px={2} sx={{ textAlign: "center" }}>
                    <Typography
                      fontSize={14}
                      sx={{ color: ({ palette }) => palette.grey[700] }}
                    >
                      تعداد منابع
                    </Typography>
                  </Grid>
                  <Grid item xs={4} px={2} sx={{ textAlign: "right" }}>
                    <Typography
                      fontSize={14}
                      sx={{ color: ({ palette }) => palette.grey[700] }}
                    >
                      مبلغ (ریال)
                    </Typography>
                  </Grid>
                </Grid>

                <Grid
                  container
                  sx={{
                    marginTop: "10px !important",
                    marginBottom: "5px !important",
                  }}
                >
                  <Grid item xs={4} px={2} sx={{ textAlign: "left" }}>
                    <Typography
                      fontSize={12}
                      sx={{ color: ({ palette }) => palette.grey[700] }}
                    >
                      {serverConfig?.id ? serverConfig.name : "سرور"}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} px={2} sx={{ textAlign: "center" }}>
                    <Typography
                      fontSize={12}
                      sx={{ color: ({ palette }) => palette.grey[700] }}
                    >
                      {serverConfig?.id ? "۱" : "---"}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} px={2} sx={{ textAlign: "right" }}>
                    <Typography
                      fontSize={12}
                      sx={{ color: ({ palette }) => palette.grey[700] }}
                    >
                      {Math.floor(serverConfig?.price || 0).toLocaleString(
                        "fa-IR"
                      )}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider
                  sx={{ margin: "15px 20px !important", borderBottomWidth: 1 }}
                />

                <Grid
                  container
                  sx={{
                    marginTop: "10px !important",
                    marginBottom: "5px !important",
                  }}
                >
                  <Grid item xs={4} px={2} sx={{ textAlign: "left" }}>
                    <Typography
                      fontSize={12}
                      sx={{ color: ({ palette }) => palette.grey[700] }}
                    >
                      مالیات بر ارزش افزوده
                    </Typography>
                  </Grid>
                  <Grid item xs={4} px={2} sx={{ textAlign: "center" }}>
                    <Typography
                      fontSize={12}
                      sx={{ color: ({ palette }) => palette.grey[700] }}
                    >{`  `}</Typography>
                  </Grid>
                  <Grid item xs={4} px={2} sx={{ textAlign: "right" }}>
                    <Typography
                      fontSize={12}
                      sx={{ color: ({ palette }) => palette.grey[700] }}
                    >
                      {Math.floor(
                        (serverConfig?.price || 0) * 0.09
                      ).toLocaleString("fa-IR")}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider
                  sx={{ margin: "15px 20px !important", borderBottomWidth: 1 }}
                />

                <Grid
                  container
                  sx={{
                    padding: "5px 0px",
                    width: "95% !important",
                    margin: "0px auto !important",
                    marginTop: "10px !important",
                    backgroundColor: "rgba(240, 247, 255, 1)",
                  }}
                >
                  <Grid
                    item
                    xs={6}
                    sx={{ textAlign: "left", paddingLeft: "4px !important" }}
                  >
                    <Typography fontSize={14}>
                      <strong>جمع کل</strong>
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sx={{ textAlign: "right", paddingRight: "4px !important" }}
                  >
                    <Typography fontSize={14}>
                      <strong>
                        {Math.floor(
                          (serverConfig?.price || 0) * 1.09
                        ).toLocaleString("fa-IR")}
                      </strong>
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  sx={{
                    width: "95% !important",
                    margin: "15px auto !important",
                  }}
                >
                  {customerType === CUSTOMER_TYPE_ENUM.POST_PAID ? (
                    <></>
                  ) : (
                    <Grid item xs={12}>
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        whiteSpace="nowrap"
                      >
                        <Button
                          onClick={() =>
                            setPaymentType(
                              CUSTOMER_PRODUCT_TYPE_ENUM.PAY_AS_YOU_GO
                            )
                          }
                          variant="outlined"
                          color={
                            paymentType ===
                            CUSTOMER_PRODUCT_TYPE_ENUM.PAY_AS_YOU_GO
                              ? "primary"
                              : "secondary"
                          }
                          sx={{
                            border:
                              paymentType ===
                              CUSTOMER_PRODUCT_TYPE_ENUM.PAY_AS_YOU_GO
                                ? "2px solid #3C8AFF !important"
                                : 1,
                            py: 1,
                          }}
                          fullWidth
                        >
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems={{ xs: "start", md: "end" }}
                          >
                            <Typography variant="text14">
                              پراخت بر اساس مصرف
                            </Typography>
                          </Stack>
                        </Button>
                        <Button
                          onClick={() =>
                            setPaymentType(CUSTOMER_PRODUCT_TYPE_ENUM.PRE_PAID)
                          }
                          variant="outlined"
                          color={
                            paymentType === CUSTOMER_PRODUCT_TYPE_ENUM.PRE_PAID
                              ? "primary"
                              : "secondary"
                          }
                          sx={{
                            border:
                              paymentType ===
                              CUSTOMER_PRODUCT_TYPE_ENUM.PRE_PAID
                                ? "2px solid #3C8AFF !important"
                                : 1,
                            py: 1,
                          }}
                          fullWidth
                        >
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems={{ xs: "start", md: "end" }}
                          >
                            <Typography variant="text14">پیش پرداخت</Typography>
                          </Stack>
                        </Button>
                      </Stack>
                    </Grid>
                  )}
                </Grid>
                <Grid
                  container
                  sx={{
                    marginTop: "5px !important",
                    marginBottom: "10px !important",
                  }}
                >
                  <Grid item xs={12}>
                    <LoadingButton
                      loading={isLoading}
                      variant="contained"
                      color="primary"
                      sx={{ width: "95%" }}
                      onClick={submitHandler}
                    >
                      ایجاد سرویس
                    </LoadingButton>
                  </Grid>
                </Grid>
              </Stack>
            </Stack>
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

export default AddStorageService;
