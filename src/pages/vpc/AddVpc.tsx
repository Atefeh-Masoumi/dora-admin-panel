import { Box, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import { FC, useContext } from "react";
import ServiceReceipt, {
  ReceiptTypeEnum,
} from "src/components/molecules/ServiceReceipt";
import { AddVpcContext } from "src/components/organisms/vpc/add/contexts/AddVpcContext";
import { SelectVpcConfig } from "src/components/organisms/vpc/add/steps/SelectVpcConfig";
import { SelectVpcDataCenter } from "src/components/organisms/vpc/add/steps/SelectVpcDataCenter";
import SelectVpcNetwork from "src/components/organisms/vpc/add/steps/SelectVpcNetwork";
import { SelectVpcServiceInfo } from "src/components/organisms/vpc/add/steps/SelectVpcServiceInfo";

const AddVpc: FC = () => {
  const { submitHandler, submitLoading, serverConfig } =
    useContext(AddVpcContext);

  return (
    <>
      <Typography
        variant="title6"
        color="secondary"
        fontWeight="700"
        sx={{ mb: 3 }}
      >
        ایجاد ابر اختصاصی
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
                  <SelectVpcDataCenter />
                  <Divider sx={{ mt: 10 }} />
                </Grid>
                {/* <Grid xs={12} item>
                <SelectVpcHypervisor />
                  <Divider sx={{ mt: 10 }} />
              </Grid> */}
                <Grid xs={12} item>
                  <SelectVpcNetwork />
                  <Divider sx={{ mt: 10 }} />
                </Grid>
                <Grid xs={12} item>
                  <SelectVpcConfig />
                  <Divider sx={{ mt: 10 }} />
                </Grid>
                <Grid xs={12} item sx={{ pb: 4 }}>
                  <SelectVpcServiceInfo />
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
            <Box sx={{ position: "sticky", top: 0 }}>
              <ServiceReceipt
                receiptType={ReceiptTypeEnum.PREDEFINED_BUNDLE}
                submitHandler={() => submitHandler()}
                submitButtonIsLoading={submitLoading}
                receiptItemName={serverConfig?.id ? serverConfig.name : "سرور"}
                receiptItemNumber={serverConfig?.id ? "۱" : "---"}
                reciptItemPrice={Math.floor(
                  serverConfig?.price || 0
                ).toLocaleString("fa-IR")}
                totalPrice={Math.floor(
                  (serverConfig?.price || 0) * 1.1
                ).toLocaleString("fa-IR")}
                vat={Math.floor(
                  (serverConfig?.price || 0) * 0.1
                ).toLocaleString("fa-IR")}
              />
            </Box>
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

export default AddVpc;
