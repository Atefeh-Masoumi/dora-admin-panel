import { FC, useContext } from "react";
import { Box, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import { SelectKuberDataCenter } from "src/components/organisms/kubernetes/add/steps/SelectKuberDataCenter";
import { SelectKuberSetting } from "src/components/organisms/kubernetes/add/steps/SelectKuberSetting";
import { ServerKuberInfo } from "src/components/organisms/kubernetes/add/steps/ServerKuberInfo";
import { SelectKuberConfig } from "src/components/organisms/kubernetes/add/steps/SelectKuberConfig";
import { KuberServiceReceipt } from "src/components/organisms/kubernetes/add/steps/KuberServiceReceipt";
import { AddKubernetesContext } from "src/components/organisms/kubernetes/add/contexts/AddKubernetesContext";

const AddKubernetes: FC = () => {
  const {
    serverConfig,
    workersCount,
    paymentType,
    setPaymentType,
    submitHandler,
    submitLoading,
  } = useContext(AddKubernetesContext);

  return (
    <>
      <Typography
        variant="title6"
        color="secondary"
        fontWeight="700"
        sx={{ mb: 3 }}
      >
        ایجاد کلاستر کوبرنتیز جدید
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
                  <SelectKuberDataCenter />
                  <Divider sx={{ margin: "50px 10px" }} />
                </Grid>
                <Grid xs={12} item>
                  <SelectKuberSetting />
                  <Divider sx={{ margin: "50px 10px" }} />
                </Grid>
                <Grid xs={12} item>
                  <SelectKuberConfig />
                  <Divider sx={{ margin: "50px 10px" }} />
                </Grid>
                <Grid xs={12} item>
                  <ServerKuberInfo />
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
            <KuberServiceReceipt
              serverPrice={serverConfig?.price || 0}
              serverName={serverConfig?.name || ""}
              workersCount={workersCount}
              paymentType={paymentType}
              setPaymentType={setPaymentType}
              submitHandler={submitHandler}
              submitLoading={submitLoading}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AddKubernetes;
