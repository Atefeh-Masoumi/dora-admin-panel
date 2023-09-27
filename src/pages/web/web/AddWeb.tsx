import { FC, useContext } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import {
  AddWebContext,
  addWebStepsType,
} from "src/components/organisms/web/web/add/contexts/AddWebContext";
import { AddWebStepper } from "src/components/organisms/web/web/add/AddStepper";
import { SelectDomain } from "src/components/organisms/web/web/add/steps/SelectDomain";
import { SelectDataCenter } from "src/components/organisms/web/web/add/steps/SelectDataCenter";
import { SelectConfig } from "src/components/organisms/web/web/add/steps/SelectConfig";
import { usePostApiWebCreateMutation } from "src/app/services/api.generated";

const AddWeb: FC = () => {
  const { step, setStep, domainName, dataCenter, serverConfig, term } =
    useContext(AddWebContext);

  const navigate = useNavigate();

  const goPreviousStep = () => {
    if (step === 1) {
      navigate("/web");
      return;
    }
    setStep((step - 1) as addWebStepsType);
  };

  const [createWeb, { isLoading }] = usePostApiWebCreateMutation();

  const submitHandler = () => {
    if (term !== true) {
      toast.error("به علت عدم تائید قوانین امکان ثبت وجود ندارد.");
      return;
    }

    if (
      step !== 3 ||
      !domainName ||
      domainName.length < 3 ||
      !dataCenter ||
      !dataCenter.id ||
      !serverConfig
    ) {
      toast.error("خطا در تکمیل اطلاعات");
      return;
    }

    createWeb({
      createWebHostModel: {
        domainName: domainName,
        datacenterId: dataCenter.id,
        productBundleId: serverConfig.id || 0,
      },
    })
      .unwrap()
      .then((res) => {
        toast.success("سرویس هاست وب با موفقیت ایجاد شد");
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
        domainName && setStep(2);
        break;
      case 2:
        domainName && dataCenter && setStep(3);
        break;
      case 3:
        domainName && dataCenter && serverConfig && submitHandler();
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
        result = <SelectDataCenter />;
        break;
      case 3:
        result = <SelectConfig />;
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
        ایجاد هاست وب جدید
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
          <AddWebStepper step={step} />
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
            {step === 3 ? "ایجاد سرویس" : "ادامه"}
          </LoadingButton>
        </Stack>
      </Box>
    </>
  );
};

export default AddWeb;
