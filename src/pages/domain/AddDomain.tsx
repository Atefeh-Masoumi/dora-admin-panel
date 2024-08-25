import { FC, useContext, useEffect } from "react";
import { Box, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { AddDomainContext } from "src/components/organisms/domain/add/contexts/AddContext";
import { SelectDomain } from "src/components/organisms/domain/add/steps/SelectDomain";
import { DomainInfo } from "src/components/organisms/domain/add/steps/DomainInfo";
import {
  usePostApiMyDomainHostCheckDomainMutation,
  usePostApiMyDomainHostRegisterMutation,
} from "src/app/services/api.generated";
import ServiceReceipt, {
  ReceiptTypeEnum,
} from "src/components/molecules/ServiceReceipt";

const AddDomain: FC = () => {
  const {
    domainName,
    productId,
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
    term,
    extObject,
  } = useContext(AddDomainContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (productId === 11) return;
    let timer: any = null;
    if (term && authCode && domainName && extObject.id) {
      timer = setTimeout(() => {
        checkDomain({
          checkDomainModel: {
            domainName,
            ext: extObject.name!,
          },
        })
          .unwrap()
          .catch((err) => {});
      }, 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [term, productId, domainName, authCode, extObject.id, extObject.name]);

  const [checkDomain, { isLoading: checkDomainLoading }] =
    usePostApiMyDomainHostCheckDomainMutation();

  const [RegisterDomainModel, { isLoading: registerLoading }] =
    usePostApiMyDomainHostRegisterMutation();

  const submitHandler = () => {
    let validationErrorMessage = "";

    if (term !== true) {
      validationErrorMessage = "به علت عدم تائید قوانین امکان ثبت وجود ندارد.";
    } else if (!domainName) {
      validationErrorMessage = "لطفا نام دامنه را وارد کنید";
    } else if (domainName.length < 3) {
      validationErrorMessage = "نام دامنه نمی تواند کمتر از سه حرف باشد";
    } else if (!extObject.id) {
      validationErrorMessage = "لطفا دامنه را انتخاب کنید";
    } else if (extObject.name?.length < 3) {
      validationErrorMessage = "دامنه نمی تواند کمتر از سه حرف باشد";
    } else if (!authCode && productId === 11) {
      validationErrorMessage = "کدانتقال را وارد کنید";
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
    }

    if (validationErrorMessage !== "") {
      toast.error(validationErrorMessage);
    } else {
      RegisterDomainModel({
        registerDomainModel: {
          domainName,
          ext: extObject.name!,
          productId: productId!,
          authCode,
          email: "",
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
        },
      })
        .unwrap()
        .then((res) => {
          toast.success("دامنه با موفقیت ایجاد/منتقل گردید");
          navigate("/domain");
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
            <Stack sx={{ position: "sticky", top: 0 }}>
              <ServiceReceipt
                receiptType={ReceiptTypeEnum.PREDEFINED_BUNDLE}
                submitHandler={() => submitHandler()}
                submitButtonIsLoading={registerLoading}
                receiptItemName={"ثبت/انتقال دامنه"}
                receiptItemNumber={extObject.price !== 0 ? "۱" : "---"}
                reciptItemPrice={Math.floor(extObject.price).toLocaleString(
                  "fa-IR"
                )}
                totalPrice={Math.floor(extObject.price * 1.1).toLocaleString(
                  "fa-IR"
                )}
                vat={Math.floor(extObject.price * 0.1).toLocaleString("fa-IR")}
                priceIsLoading={checkDomainLoading}
              />
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
