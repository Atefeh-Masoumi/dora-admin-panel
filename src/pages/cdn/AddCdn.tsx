import { FC, useContext, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router";
import { SelectDomain } from "src/components/organisms/cdn/add/steps/SelectDomain";
import { RecordsList } from "src/components/organisms/cdn/add/steps/RecordsList";
import { AddZoneStepper } from "src/components/organisms/cdn/add/AddStepper";
import {
  usePostApiMyDnsHostCheckZoneMutation,
  usePostApiMyDnsHostCreateMutation,
} from "src/app/services/api.generated";
import {
  AddZoneContext,
  addZoneStepsType,
} from "src/components/organisms/cdn/add/contexts/AddContext";

const AddZone: FC = () => {
  const { step, setStep, domainName, term } = useContext(AddZoneContext);

  const navigate = useNavigate();

  const goPreviousStep = () => {
    if (step === 1) {
      navigate("/cdn");
      return;
    }
    setStep((step - 1) as addZoneStepsType);
  };

  const [checkZone, { isLoading }] = usePostApiMyDnsHostCheckZoneMutation();
  const [createCdn, { isLoading: createCdnLoading }] =
    usePostApiMyDnsHostCreateMutation();

  const submitHandler = () => {
    if (term !== true) {
      toast.error("به علت عدم تائید قوانین امکان ثبت وجود ندارد.");
      return;
    }

    if (step !== 2 || !domainName || domainName.length < 3) {
      toast.error("خطا در تکمیل اطلاعات");
      return;
    }

    createCdn({
      createDnsModel: {
        zoneName: domainName,
      },
    })
      .unwrap()
      .then((res) => {
        toast.success("زون با موفقیت ایجاد شد");
        navigate("/cdn");
      })
      .catch((err) => {});
  };

  const goNextStep = () => {
    switch (step) {
      case 1:
        if (term !== true) {
          toast.error("به علت عدم تائید قوانین امکان ثبت وجود ندارد.");
          return;
        }
        if (!domainName || domainName.length < 3) {
          toast.error("خطا در تکمیل اطلاعات");
          return;
        }
        checkZone({
          checkDnsModel: {
            zoneName: domainName,
          },
        })
          .unwrap()
          .then(() => {
            toast.success("دامنه تایید شد");
            domainName && setStep(2);
          })
          .catch(() => {});
        break;
      case 2:
        domainName && submitHandler();
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
        result = <RecordsList zoneName={domainName} />;
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
        ایجاد زون جدید
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
          <AddZoneStepper step={step} />
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
            loading={isLoading || createCdnLoading}
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

export default AddZone;
