import { FC, useContext } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { SelectDataCenter } from "src/components/organisms/kubernetes/add/addWorkspaceSteps/SelectDataCenter";
import { AddWorkspaceStepper } from "src/components/organisms/kubernetes/add/AddWorkspaceStepper";
import { useNavigate } from "react-router";
import {
  AddWorkspaceContext,
  addWorkspaceStepsType,
} from "src/components/organisms/kubernetes/add/context/AddWorkspaceContext";
import { SelectConfig } from "src/components/organisms/kubernetes/add/addWorkspaceSteps/SelectConfig";
import { ServerInfo } from "src/components/organisms/kubernetes/add/addWorkspaceSteps/ServerInfo";
import { usePostPortalKubeWorkspaceCreateMutation } from "src/app/services/api.generated";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";

const AddWorkspaceService: FC = () => {
  const { step, setStep, dataCenter, serverConfig, name } =
    useContext(AddWorkspaceContext);

  const navigate = useNavigate();

  const goPreviousStep = () => {
    if (step === 1) {
      navigate("/kubernetes");
      return;
    }
    setStep((step - 1) as addWorkspaceStepsType);
  };

  const [createWorkspaceService, { isLoading }] =
    usePostPortalKubeWorkspaceCreateMutation();

  const submitHandler = () => {
    if (
      step !== 3 ||
      !dataCenter ||
      !dataCenter.id ||
      !serverConfig ||
      !name ||
      name.length < 3
    ) {
      toast.error("خطا در اعتبارسنجی.");
      return;
    }

    createWorkspaceService({
      createKubeWorkspaceModel: {
        name: name,
        datacenterId: dataCenter.id,
        productBundleId: serverConfig.id || 0,
      },
    })
      .unwrap()
      .then((res) => {
        toast.success("سرویس  با موفقیت ایجاد شد");
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
        dataCenter && serverConfig && setStep(3);
        break;
      case 3:
        dataCenter && serverConfig && name && submitHandler();
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
        result = <SelectConfig />;
        break;
      case 3:
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
        ایجاد سرویس کوبرنتیز جدید
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
          <AddWorkspaceStepper step={step} />
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

export default AddWorkspaceService;
