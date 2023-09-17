import { FC, useContext } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import {
  AddDomainContext,
  addDomainStepsType,
} from "src/components/organisms/domain/add/contexts/AddContext";
import { AddDomainStepper } from "src/components/organisms/domain/add/AddStepper";
import { SelectDomain } from "src/components/organisms/domain/add/steps/SelectDomain";
import { DomainInfo } from "src/components/organisms/domain/add/steps/DomainInfo";
import {
  usePostApiDomainGetPriceMutation,
  usePostApiDomainRegisterMutation,
} from "src/app/services/api.generated";

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

  const navigate = useNavigate();

  const goPreviousStep = () => {
    if (step === 1) {
      navigate("/domain");
      return;
    }
    setStep((step - 1) as addDomainStepsType);
  };

  const [getPriceModel, { isLoading: checkLoading }] =
    usePostApiDomainGetPriceMutation();

  const CheckDomain = () => {
    if (domainName === "") return;
    getPriceModel({ getPriceModel: { domainName, ext, typeId, authCode } })
      .unwrap()
      .then(() => setStep(2))
      .catch((res) => {
        if (res.status === 401 || res.status === 404) toast.error("خطای سرور");
        else toast.error(res.data[""][0]);
      });
  };

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
    RegisterDomainModel({
      registerDomainModel: {
        domainName: domainName,
        ext: ext,
        typeId: typeId,
        authCode: authCode,
        name: name,
        country: country,
        province: province,
        city: city,
        street: street,
        postalCode: postalCode,
        voice: voice,
        ns1: ns1,
        ns2: ns2,
        autoRenewal: autoRenewal,
        activeCdn: activeCdn,
      },
    })
      .unwrap()
      .then((res) => {
        toast.success("اطلاعات دامنه با موفقیت ثبت شد");
        if (res) {
          let a = document.createElement("a");
          a.href = "/cloud/order/" + res;
          a.click();
        }
      });
  };

  const goNextStep = () => {
    switch (step) {
      case 1:
        if (term !== true) {
          toast.error("به علت عدم تائید قوانین امکان ثبت وجود ندارد.");
          return;
        }

        domainName && ext && authCode && CheckDomain();
        break;
      case 2:
        domainName &&
          ext &&
          authCode &&
          name &&
          country &&
          province &&
          city &&
          street &&
          postalCode &&
          voice &&
          ns1 &&
          ns2 &&
          submitHandler();
        break;
      default:
        break;
    }
  };

  const renderStepHandler = () => {
    let result = <></>;
    switch (step) {
      case 1:
        result = <SelectDomain />;
        break;
      case 2:
        result = <DomainInfo />;
        break;
      default:
        break;
    }
    return result;
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
      <Box
        sx={{
          borderRadius: 3,
          bgcolor: "white",
          py: 6,
          px: 2,
          overflow: "overlay",
        }}
      >
        <Box sx={{ overflow: "overlay" }}>
          <AddDomainStepper step={step} />
        </Box>
        <Box sx={{ my: 6 }}>{renderStepHandler()}</Box>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
          px={1.7}
        >
          <Button
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
            loading={checkLoading || registerLoading}
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
            {step === 2 ? "ایجاد سرویس" : "ادامه"}
          </LoadingButton>
        </Stack>
      </Box>
    </>
  );
};

export default AddDomain;
