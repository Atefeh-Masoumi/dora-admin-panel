import { FC, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Box,
  Button,
  Chip,
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
import { usePostApiVmHostCreateMutation } from "src/app/services/api.generated";
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
          a.href = "/cloud/order/" + res;
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
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
              dolorem ab vitae asperiores magnam fugit tempore maiores tempora
              inventore! Libero totam aliquam tempora voluptatibus voluptates
              minus vel rerum fugiat repudiandae necessitatibus, harum ea quasi
              eveniet distinctio quisquam autem corrupti, nemo porro sed
              Voluptates, nobis hic perferendis atque fugit nam perspiciatis? Et
              est aliquam placeat optio sint velit exercitationem ut, dolores
              perferendis, nihil eveniet quibusdam deserunt, quia sequi
              perspiciatis nesciunt ab dolorem nisi facilis atque veniam? Iure
              totam dicta fugiat, unde, voluptatibus provident error culpa minus
              explicabo, eveniet pariatur. Nihil quasi eveniet distinctio
              quisquam autem corrupti, nemo porro sed quos. Lorem ipsum dolor
              sit, amet consectetur adipisicing elit. In dolorem ab vitae
              asperiores magnam fugit tempore maiores tempora inventore! Libero
              totam aliquam tempora voluptatibus voluptates minus vel rerum
              fugiat repudiandae necessitatibus, harum ea quasi eveniet
              distinctio quisquam autem corrupti, nemo porro sed Voluptates,
              nobis hic perferendis atque fugit nam perspiciatis? Et est aliquam
              placeat optio sint velit exercitationem ut, dolores perferendis,
              nihil eveniet quibusdam deserunt, quia sequi perspiciatis nesciunt
              ab dolorem nisi facilis atque veniam? Iure totam dicta fugiat,
              unde, voluptatibus provident error culpa minus explicabo, eveniet
              pariatur. Nihil quasi eveniet distinctio quisquam autem corrupti,
              nemo porro sed quos.
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
