import { FC, useContext, useEffect, useState } from "react";
import { Box, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { AddDomainContext } from "src/components/organisms/web/domain/add/contexts/AddContext";
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
import ServiceReceipt from "src/components/molecules/ServiceReceipt";

const AddDomain: FC = () => {
  const {
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

  const [paymentType, setPaymentType] =
    useState<CUSTOMER_PRODUCT_TYPE_ENUM | null>(null);

  const [domainPrice, setDomainPrice] = useState(0);

  const navigate = useNavigate();

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

  const { data: customerType } = useGetApiCloudCustomerGetCustomerTypeQuery();

  const [RegisterDomainModel, { isLoading: registerLoading }] =
    usePostApiDomainRegisterMutation();

  const submitHandler = () => {
    let validationErrorMessage = "";

    if (term !== true) {
      validationErrorMessage = "به علت عدم تائید قوانین امکان ثبت وجود ندارد.";
    } else if (!domainName) {
      validationErrorMessage = "لطفا نام دامنه را وارد کنید";
    } else if (domainName.length < 3) {
      validationErrorMessage = "نام دامنه نمی تواند کمتر از سه حرف باشد";
    } else if (!ext) {
      validationErrorMessage = "لطفا دامنه را انتخاب کنید";
    } else if (ext.length < 3) {
      validationErrorMessage = "دامنه نمی تواند کمتر از سه حرف باشد";
    } else if (!name) {
      validationErrorMessage = "لطفا نام و نام خانوادگی را وارد کنید";
    } else if (name.length < 3) {
      validationErrorMessage =
        "نام و نام خانوادگی نمی تواند کمتر از سه حرف باشد";
    } else if (!country) {
      validationErrorMessage = "لطفا نام کشور را وارد کنید";
    } else if (country.length < 3) {
      validationErrorMessage = "نام  کشور تواند کمتر از سه حرف باشد";
    } else if (!province) {
      validationErrorMessage = "لطفا نام استان را وارد کنید";
    } else if (province.length < 3) {
      validationErrorMessage = "نام استان نمی تواند کمتر از سه حرف باشد";
    } else if (!city) {
      validationErrorMessage = "لطفا نام شهر را وارد کنید";
    } else if (city.length < 3) {
      validationErrorMessage = "نام شهر نمی تواند کمتر از سه حرف باشد";
    } else if (!street) {
      validationErrorMessage = "لطفا آدرس را وارد کنید";
    } else if (street.length < 3) {
      validationErrorMessage = "آدرس نمی تواند کمتر از سه حرف باشد";
    } else if (!postalCode) {
      validationErrorMessage = "لطفا کد پستی را وارد کنید";
    } else if (postalCode.length < 3) {
      validationErrorMessage = "کد پستی نمی تواند کمتر از سه حرف باشد";
    } else if (!voice) {
      validationErrorMessage = "لطفا شماره تلفن را وارد کنید";
    } else if (voice.length < 3) {
      validationErrorMessage = "شماره تلفن نمی تواند کمتر از سه حرف باشد";
    } else if (!ns1) {
      validationErrorMessage = "لطفا ns1 را وارد کنید";
    } else if (ns1.length < 3) {
      validationErrorMessage = "ns1 نمی تواند کمتر از سه حرف باشد";
    } else if (!ns2) {
      validationErrorMessage = "لطفا ns2 را وارد کنید";
    } else if (ns2.length < 3) {
      validationErrorMessage = "ns2 نمی تواند کمتر از سه حرف باشد";
    } else if (customerType === CUSTOMER_TYPE_ENUM.NORMAL && !paymentType) {
      validationErrorMessage = "لطفا نوع پرداخت را مشخص کنید";
    }

    if (validationErrorMessage !== "") {
      toast.error(validationErrorMessage);
    } else {
      RegisterDomainModel({
        registerDomainModel: {
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
          fax: null,
          ns1,
          ns2,
          autoRenewal,
          activeCdn,
          customerProductTypeId:
            customerType === CUSTOMER_TYPE_ENUM.POST_PAID
              ? CUSTOMER_PRODUCT_TYPE_ENUM.PAY_AS_YOU_GO
              : paymentType || 0,
        },
      })
        .unwrap()
        .then((res) => {
          toast.success("دامنه با موفقیت ایجاد/منتقل گردید");
          navigate("/domain");
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
        ثبت/انتقال دامنه
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
            <ServiceReceipt
              submitHandler={() => submitHandler()}
              submitButtonIsLoading={registerLoading}
              paymentType={paymentType}
              setPaymentType={setPaymentType}
              customerType={customerType}
              receiptItemName={"ثبت/انتقال دامنه"}
              receiptItemNumber={domainPrice !== 0 ? "۱" : "---"}
              reciptItemPrice={Math.floor(domainPrice).toLocaleString("fa-IR")}
              totalPrice={Math.floor(domainPrice * 1.09).toLocaleString(
                "fa-IR"
              )}
              vat={Math.floor(domainPrice * 0.09).toLocaleString("fa-IR")}
              priceIsLoading={getPriceIsLoading}
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

export default AddDomain;
