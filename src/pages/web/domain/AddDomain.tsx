import { FC, useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import {
  AddDomainContext,
  addDomainStepsType,
} from "src/components/organisms/web/domain/add/contexts/AddContext";
import { AddDomainStepper } from "src/components/organisms/web/domain/add/AddStepper";
import { SelectDomain } from "src/components/organisms/web/domain/add/steps/SelectDomain";
import { DomainInfo } from "src/components/organisms/web/domain/add/steps/DomainInfo";
import {
  useGetApiCloudCustomerGetCustomerTypeQuery,
  usePostApiDomainGetPriceMutation,
  usePostApiDomainRegisterMutation,
} from "src/app/services/api.generated";
import useResize from "src/utils/useResize";
import { CUSTOMER_PRODUCT_TYPE_ENUM } from "src/constant/customerProductTypeEnum";
import { CUSTOMER_TYPE_ENUM } from "src/constant/customerTypeEnum";

const AddDomain: FC = () => {
  const {
    step,
    setStep,
    domainName,
    ext,
    typeId,
    authCode,
    name,
    country,
    province,
    city,
    street,
    postalCode,
    voice,
    ns1,
    ns2,
    autoRenewal,
    activeCdn,
    term,
  } = useContext(AddDomainContext);

  const { screenHeight, screenWidth } = useResize();
  const [factorFixedContentWidth, setFactorFixedContentWidth] = useState(0);
  const [paymentType, setPaymentType] =
    useState<CUSTOMER_PRODUCT_TYPE_ENUM | null>(null);

  const [domainPrice, setDomainPrice] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const factorCol = document.getElementById("relative-left-col-factor");
    setFactorFixedContentWidth(factorCol?.offsetWidth || 0);
  }, [screenHeight, screenWidth]);

  useEffect(() => {
    let timer: any = null;
    if (term && authCode && domainName && ext) {
      timer = setTimeout(() => {
        callApiDomainGetPrice({
          getPriceModel: {
            domainName,
            ext,
            typeId,
            authCode,
          },
        })
          .unwrap()
          .then((res) => {
            setDomainPrice(res.productPrice || 0);
          })
          .catch((err) => {
            setDomainPrice(0);
          });
      }, 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [term, ext, typeId, domainName, authCode]);

  const [callApiDomainGetPrice, { isLoading: getPriceIsLoading }] =
    usePostApiDomainGetPriceMutation();

  const { data: customerType, isLoading: customerTypeIsLoading } =
    useGetApiCloudCustomerGetCustomerTypeQuery();

  const [RegisterDomainModel, { isLoading: registerLoading }] =
    usePostApiDomainRegisterMutation();

  const submitHandler = () => {
    if (term !== true) {
      toast.error("به علت عدم تائید قوانین امکان ثبت وجود ندارد.");
      return;
    }

    if (
      step !== 2 ||
      !domainName ||
      domainName.length < 3 ||
      !ext ||
      ext.length < 3 ||
      !name ||
      name.length < 3 ||
      !country ||
      country.length < 3 ||
      !province ||
      province.length < 3 ||
      !city ||
      city.length < 3 ||
      !street ||
      street.length < 3 ||
      !postalCode ||
      postalCode.length < 3 ||
      !voice ||
      voice.length < 3 ||
      !ns1 ||
      ns1.length < 3 ||
      !ns2 ||
      ns2.length < 3
    ) {
      toast.error("خطا در تکمیل اطلاعات");
      return;
    }

    // RegisterDomainModel
  };

  return (
    <>
      <Typography
        variant="title6"
        color="secondary"
        fontWeight="700"
        sx={{ mb: 3 }}
      >
        ثبت/انتقال دامنه
      </Typography>
      <Box sx={{ my: 6 }}>
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
                  <SelectDomain />
                  <Divider sx={{ margin: "10px 10px" }} />
                </Grid>
                <Grid xs={12} item>
                  <DomainInfo />
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
              {getPriceIsLoading ? (
                <Stack maxHeight="550px" justifyContent="space-between">
                  <Stack
                    bgcolor="white"
                    p={4}
                    pt={10}
                    borderRadius={2}
                    height="100%"
                    spacing={2}
                  >
                    <Skeleton
                      variant="rectangular"
                      height={50}
                      sx={{ bgcolor: "secondary.light", borderRadius: 2 }}
                    />
                    <Stack direction="row" justifyContent="end">
                      <Skeleton
                        variant="rectangular"
                        height={80}
                        width={200}
                        sx={{ bgcolor: "secondary.light", borderRadius: 2 }}
                      />
                    </Stack>
                  </Stack>
                </Stack>
              ) : (
                <Stack spacing={2}>
                  <Typography fontSize={24} fontWeight="bold" align="center">
                    صورتحساب
                  </Typography>
                  <Divider
                    sx={{
                      margin: "20px 20px !important",
                      borderBottomWidth: 3,
                    }}
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
                        ثبت/انتقال دامنه
                      </Typography>
                    </Grid>
                    <Grid item xs={4} px={2} sx={{ textAlign: "center" }}>
                      <Typography
                        fontSize={12}
                        sx={{ color: ({ palette }) => palette.grey[700] }}
                      >
                        {domainPrice !== 0 ? "۱" : "---"}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} px={2} sx={{ textAlign: "right" }}>
                      <Typography
                        fontSize={12}
                        sx={{ color: ({ palette }) => palette.grey[700] }}
                      >
                        {Math.floor(domainPrice).toLocaleString("fa-IR")}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider
                    sx={{
                      margin: "15px 20px !important",
                      borderBottomWidth: 1,
                    }}
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
                        {Math.floor(domainPrice * 0.09).toLocaleString("fa-IR")}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider
                    sx={{
                      margin: "15px 20px !important",
                      borderBottomWidth: 1,
                    }}
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
                      sx={{
                        textAlign: "right",
                        paddingRight: "4px !important",
                      }}
                    >
                      <Typography fontSize={14}>
                        <strong>
                          {Math.floor(domainPrice * 1.09).toLocaleString(
                            "fa-IR"
                          )}
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
                              setPaymentType(
                                CUSTOMER_PRODUCT_TYPE_ENUM.PRE_PAID
                              )
                            }
                            variant="outlined"
                            color={
                              paymentType ===
                              CUSTOMER_PRODUCT_TYPE_ENUM.PRE_PAID
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
                              <Typography variant="text14">
                                پیش پرداخت
                              </Typography>
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
                        loading={registerLoading}
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
              )}
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

export default AddDomain;
