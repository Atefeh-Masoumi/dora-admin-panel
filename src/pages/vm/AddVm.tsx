import { FC, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import {
  AddServerContext,
  addServerStepsType,
} from "src/components/organisms/vm/add/contexts/AddVmContext";
import { AddVmStepper } from "src/components/organisms/vm/add/AddStepper";
import { SelectDataCenter } from "src/components/organisms/vm/add/steps/SelectDataCenter";
import { SelectOS } from "src/components/organisms/vm/add/steps/SelectOS";
import { SelectConfig } from "src/components/organisms/vm/add/steps/SelectConfig";
import { ServerInfo } from "src/components/organisms/vm/add/steps/ServerInfo";
import { passwordValidationRegex } from "src/utils/regexUtils";
import { useGetApiCloudCustomerGetQuery, usePostApiVmHostCreateMutation } from "src/app/services/api.generated";
import useResize from "src/utils/useResize";

const AddVm: FC = () => {
  const {
    step,
    setStep,
    dataCenter,
    osVersion,
    serverConfig,
    serverName,
    serverPassword,
  } = useContext(AddServerContext);

  const { screenHeight, screenWidth } = useResize();
  const [factorFixedContentWidth, setFactorFixedContentWidth] = useState(0);
  const [paymentType, setPaymentType] = useState<number | null>(null);

  const {data:customerTypes, isLoading:customerTypeIsLoading} = useGetApiCloudCustomerGetQuery();

  console.log(customerTypes);


  useEffect(() => {
    const factorCol = document.getElementById("relative-left-col-factor");
    setFactorFixedContentWidth(factorCol?.offsetWidth || 0);
  }, [screenHeight, screenWidth]);

  const navigate = useNavigate();

  const goPreviousStep = () => {
    if (step === 1) {
      navigate("/vm");
      return;
    }
    setStep((step - 1) as addServerStepsType);
  };

  const [createCloudServer, { isLoading }] = usePostApiVmHostCreateMutation();

  const submitHandler = () => {
    if (
      step !== 4 ||
      !dataCenter ||
      !dataCenter.id ||
      !osVersion ||
      !osVersion.id ||
      !serverConfig ||
      !serverName ||
      serverName.length < 3
    ) {
      toast.error("خطا در اعتبارسنجی.");
      return;
    }

    if (!passwordValidationRegex.test(serverPassword)) {
      toast.error("رمز عبور نامعتبر است.");
      return;
    }
    // createCloudServer({
    //   createVmModel: {
    //     name: serverName,
    //     password: serverPassword,
    //     imageId: osVersion.id,
    //     productBundleId: serverConfig.id || 0,
    //     datacenterId: dataCenter.id,
    //   },
    // })
    //   .unwrap()
    //   .then((res) => {
    //     toast.success("درخواست سرور ابری  با موفقیت ثبت شد");
    //     if (res) {
    //       let a = document.createElement("a");
    //       a.href = "/cloud/order/" + res;
    //       a.click();
    //     }
    //   });
  };

  // const goNextStep = () => {
  //   switch (step) {
  //     case 1:
  //       dataCenter && setStep(2);
  //       break;
  //     case 2:
  //       dataCenter && osVersion && setStep(3);
  //       break;
  //     case 3:
  //       dataCenter && osVersion && serverConfig && setStep(4);
  //       break;
  //     case 4:
  //       dataCenter &&
  //         osVersion &&
  //         serverConfig &&
  //         serverName &&
  //         serverPassword &&
  //         submitHandler();
  //       break;
  //     default:
  //       break;
  //   }
  // };

  // const renderStepHandler = () => {
  //   let result = <></>;
  //   switch (step) {
  //     case 1:
  //       result = <SelectDataCenter />;
  //       break;
  //     case 2:
  //       result = <SelectOS />;
  //       break;
  //     case 3:
  //       result = <SelectConfig />;
  //       break;
  //     case 4:
  //       result = <ServerInfo />;
  //       break;
  //     default:
  //       break;
  //   }
  //   return result;
  // };

  const isStepDisabled = (stepId: number) => {
    return stepId > step;
  };

  const myNumber = 45654654;

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
      <Box sx={{ my: 6 }}>
        <Grid container>
          <Grid xs={12} md={7} item>
            <Grid container gap={2}>
              <Grid xs={12} item>
                <Stack
                  className="blurrable-step"
                  component={Paper}
                  sx={{
                    position: "relative",
                    width: { xs: "100%" },
                    px: { xs: 1.8, lg: 2 },
                    py: { xs: 1.8, lg: 2.25 },
                  }}
                >
                  <Chip
                    label="۱"
                    sx={{
                      position: "absolute",
                      top: "15px",
                      left: "10px",
                      border: "none",
                      fontWeight: "bolder",
                    }}
                    variant="outlined"
                    size="medium"
                  />
                  <SelectDataCenter />
                </Stack>
              </Grid>
              <Grid xs={12} item>
                <Stack
                  component={Paper}
                  className={
                    isStepDisabled(2)
                      ? "blurred-step blurrable-step"
                      : "blurrable-step"
                  }
                  sx={{
                    position: "relative",
                    width: { xs: "100%" },
                    px: { xs: 1.8, lg: 2 },
                    py: { xs: 1.8, lg: 2.25 },
                  }}
                >
                  <Chip
                    label="۲"
                    sx={{
                      position: "absolute",
                      top: "15px",
                      left: "10px",
                      border: "none",
                      fontWeight: "bolder",
                    }}
                    variant="outlined"
                    size="medium"
                  />
                  <SelectOS />
                </Stack>
              </Grid>
              <Grid xs={12} item>
                <Stack
                  component={Paper}
                  className={
                    isStepDisabled(3)
                      ? "blurred-step blurrable-step"
                      : "blurrable-step"
                  }
                  sx={{
                    position: "relative",
                    width: { xs: "100%" },
                    px: { xs: 1.8, lg: 2 },
                    py: { xs: 1.8, lg: 2.25 },
                  }}
                >
                  <Chip
                    label="۳"
                    sx={{
                      position: "absolute",
                      top: "15px",
                      left: "10px",
                      border: "none",
                      fontWeight: "bolder",
                    }}
                    variant="outlined"
                    size="medium"
                  />
                  <SelectConfig />
                </Stack>
              </Grid>
              <Grid xs={12} item>
                <Stack
                  component={Paper}
                  className={
                    isStepDisabled(4)
                      ? "blurred-step blurrable-step"
                      : "blurrable-step"
                  }
                  sx={{
                    position: "relative",
                    width: { xs: "100%" },
                    px: { xs: 1.8, lg: 2 },
                    py: { xs: 1.8, lg: 2.25 },
                  }}
                >
                  <Chip
                    label="۴"
                    sx={{
                      position: "absolute",
                      top: "15px",
                      left: "10px",
                      border: "none",
                      fontWeight: "bolder",
                    }}
                    variant="outlined"
                    size="medium"
                  />
                  <ServerInfo />
                </Stack>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            id="relative-left-col-factor"
            px={{ md: 2, xs: 0 }}
            py={{ md: 0, xs: 2 }}
            xs={12}
            md={5}
            item
            style={{ position: "relative", textAlign: "center" }}
          >
            <Stack
              position={{ xs: "static", md: "fixed" }}
              maxHeight={{ md: "400px", xs: "auto" }}
              component={Paper}
              className="fixed-paper-factor"
              sx={{
                overflow: "scroll",
                width: factorFixedContentWidth,
                px: 1,
                py: 1,
              }}
            >
              <Stack spacing={2}>
                <Typography fontSize={24} fontWeight="bold" align="center">
                  صورتحساب
                </Typography>
                <Divider
                  sx={{ margin: "10px 20px !important", borderBottomWidth: 3 }}
                />
                <Grid
                  container
                  sx={{
                    marginTop: "16px !important",
                    marginBottom: "16px !important",
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
                    marginTop: "5px !important",
                    marginBottom: "0px !important",
                  }}
                >
                  <Grid item xs={4} px={2} sx={{ textAlign: "left" }}>
                    <Typography
                      fontSize={12}
                      sx={{ color: ({ palette }) => palette.grey[700] }}
                    >
                      سرور
                    </Typography>
                  </Grid>
                  <Grid item xs={4} px={2} sx={{ textAlign: "center" }}>
                    <Typography
                      fontSize={12}
                      sx={{ color: ({ palette }) => palette.grey[700] }}
                    >
                      ۱
                    </Typography>
                  </Grid>
                  <Grid item xs={4} px={2} sx={{ textAlign: "right" }}>
                    <Typography
                      fontSize={12}
                      sx={{ color: ({ palette }) => palette.grey[700] }}
                    >
                      {myNumber.toLocaleString("fa-IR")}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider
                  sx={{ margin: "5px 20px !important", borderBottomWidth: 1 }}
                />

                <Grid
                  container
                  sx={{
                    marginTop: "5px !important",
                    marginBottom: "0px !important",
                  }}
                >
                  <Grid item xs={4} px={2} sx={{ textAlign: "left" }}>
                    <Typography
                      fontSize={12}
                      sx={{ color: ({ palette }) => palette.grey[700] }}
                    >
                      سرور
                    </Typography>
                  </Grid>
                  <Grid item xs={4} px={2} sx={{ textAlign: "center" }}>
                    <Typography
                      fontSize={12}
                      sx={{ color: ({ palette }) => palette.grey[700] }}
                    >
                      ۱
                    </Typography>
                  </Grid>
                  <Grid item xs={4} px={2} sx={{ textAlign: "right" }}>
                    <Typography
                      fontSize={12}
                      sx={{ color: ({ palette }) => palette.grey[700] }}
                    >
                      {myNumber.toLocaleString("fa-IR")}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider
                  sx={{ margin: "5px 20px !important", borderBottomWidth: 1 }}
                />

                <Grid
                  container
                  sx={{
                    padding: "5px 0px",
                    width: "95% !important",
                    margin: "0px auto !important",
                    marginTop: "5px !important",
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
                      <strong>{myNumber.toLocaleString("fa-IR")}</strong>
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  sx={{
                    width: "95% !important",
                    margin: "10px auto !important",
                  }}
                >
                  <Grid item xs={12}>
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      whiteSpace="nowrap"
                    >
                      <Button
                        onClick={() => setPaymentType(1)}
                        variant="outlined"
                        color={paymentType === 1 ? "primary" : "secondary"}
                        sx={{
                          border:
                            paymentType === 1
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
                        onClick={() => setPaymentType(2)}
                        variant="outlined"
                        color={paymentType === 2 ? "primary" : "secondary"}
                        sx={{
                          border:
                            paymentType === 2
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
                </Grid>
                <Grid
                  container
                  sx={{
                    marginTop: "5px !important",
                    marginBottom: "10px !important",
                  }}
                >
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ width: "95%" }}
                      onClick={submitHandler}
                    >
                      ایجاد سرویس
                    </Button>
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
        >
          {/* <Button
            fullWidth
            disableElevation
            sx={{
              height: 58,
              maxWidth: { xs: "50%", sm: 200 },
              borderRadius: "10px",
              border: "1px solid rgba(110, 118, 138, 0.32)",
              color: "rgba(110, 118, 138, 1)",
              fontSize: "16px !important",
            }}
            onClick={goPreviousStep}
          >
            {step === 1 ? "انصراف" : "مرحله قبل"}
          </Button>
          <LoadingButton
            loading={isLoading}
            fullWidth
            disableElevation
            variant="contained"
            sx={{
              height: 58,
              maxWidth: { xs: "50%", sm: 200 },
              borderRadius: "10px",
              fontSize: "16px !important",
            }}
            onClick={goNextStep}
          >
            {step === 4 ? "ایجاد ماشین" : "ادامه"}
          </LoadingButton> */}
        </Stack>
      </Box>
    </>
  );
};

export default AddVm;
