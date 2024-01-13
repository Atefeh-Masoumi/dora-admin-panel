import { FC } from "react";
import { Box, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import { SelectKuberDataCenter } from "src/components/organisms/platform/add/steps/SelectKuberDataCenter";
import { SelectKuberSetting } from "src/components/organisms/platform/add/steps/SelectKuberSetting";
import { ServerKuberInfo } from "src/components/organisms/platform/add/steps/ServerKuberInfo";
import { SelectKuberConfig } from "src/components/organisms/platform/add/steps/SelectKuberConfig";
import { KuberServiceReceipt } from "src/components/organisms/platform/add/steps/KuberServiceReceipt";

const AddKubernetes: FC = () => {
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
            <KuberServiceReceipt />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AddKubernetes;
