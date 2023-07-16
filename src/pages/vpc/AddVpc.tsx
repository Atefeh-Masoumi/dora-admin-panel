import { FC, useContext } from "react";
import { useNavigate } from "react-router";
import { Box, Button, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import { AddServerContext, addServerStepsType } from "src/components/organisms/vm/addVm/contexts/AddServerContext";
import { AddVmStepper } from "src/components/organisms/vm/addVm/AddVmStepper";
import { SelectDataCenter } from "src/components/organisms/vm/addVm/addVmSteps/SelectDataCenter";
import { SelectOS } from "src/components/organisms/vm/addVm/addVmSteps/SelectOS";
import { SelectConfig } from "src/components/organisms/vm/addVm/addVmSteps/SelectConfig";
import { ServerInfo } from "src/components/organisms/vm/addVm/addVmSteps/ServerInfo";
import { passwordValidationRegex } from "src/utils/regexUtils";
import { usePostPortalVmVmCreateMutation } from "src/app/services/api.generated";

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

  const navigate = useNavigate();

  const goPreviousStep = () => {
    if (step === 1) {
      navigate("/vm");
      return;
    }
    setStep((step - 1) as addServerStepsType);
  };

  const [createCloudServer, { isLoading }] = usePostPortalVmVmCreateMutation();

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
    createCloudServer({
      createVmModel: {
        name: serverName,
        password: serverPassword,
        imageId: osVersion.id,
        productBundleId: serverConfig.id || 0,
        datacenterId: dataCenter.id,
      },
    })
      .unwrap()
      .then((res) => {
        toast.success("درخواست سرور ابری  با موفقیت ثبت شد");
        if (res) {
          let a = document.createElement("a");
          a.href = "/portal/order/" + res;
          a.click();
        }
      });
  };

  const goNextStep = () => {
    switch (step) {
      case 1:
        dataCenter && setStep(2);
        break;
      case 2:
        dataCenter && osVersion && setStep(3);
        break;
      case 3:
        dataCenter && osVersion && serverConfig && setStep(4);
        break;
      case 4:
        dataCenter && osVersion && serverConfig && serverName && serverPassword && submitHandler();
        break;
      default:
        break;
    }
  };

  const renderStepHandler = () => {
    let result = <></>;
    switch (step) {
      case 1:
        result = <SelectDataCenter />;
        break;
      case 2:
        result = <SelectOS />;
        break;
      case 3:
        result = <SelectConfig />;
        break;
      case 4:
        result = <ServerInfo />;
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
        ایجاد سرور مجازی جدید
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
          <AddVmStepper step={step} />
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
            {step === 4 ? "ایجاد ماشین" : "ادامه"}
          </LoadingButton>
        </Stack>
      </Box>
    </>
  );
};

export default AddVm;
