import { FC, useContext } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { SelectDataCenter } from "../../components/organisms/cloudServer/addServer/addServerSteps/SelectDataCenter";
import { AddCloudServerStepper } from "src/components/organisms/cloudServer/addServer/AddCloudServerStepper";
import { useNavigate } from "react-router";
import { SelectOS } from "../../components/organisms/cloudServer/addServer/addServerSteps/SelectOS";
import {
  AddServerContext,
  addServerStepsType,
} from "src/context/AddServerContext";
import { SelectConfig } from "../../components/organisms/cloudServer/addServer/addServerSteps/SelectConfig";
import { ServerInfo } from "../../components/organisms/cloudServer/addServer/addServerSteps/ServerInfo";
import { passwordValidationRegex } from "src/utils/regexUtils";
import { usePostApiV2VmVmCreateMutation } from "src/app/services/api.generated";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";

const AddCloudServer: FC = () => {
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
      navigate("/dash/cloud");
      return;
    }
    setStep((step - 1) as addServerStepsType);
  };

  const [createCloudServer, { isLoading }] = usePostApiV2VmVmCreateMutation();

  const submitHandler = () => {
    if (
      step !== 4 ||
      !dataCenter ||
      !dataCenter.id ||
      !osVersion ||
      !osVersion.id ||
      !serverConfig ||
      !serverName ||
      serverName.length < 3 ||
      !passwordValidationRegex.test(serverPassword)
    )
      return;
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
      .then(() => {
        toast.success("سرور ابری  با موفقیت ایجاد شد");
        navigate("/dash/portal/order");
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
        dataCenter &&
          osVersion &&
          serverConfig &&
          serverName &&
          serverPassword &&
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
          <AddCloudServerStepper step={step} />
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

export default AddCloudServer;
