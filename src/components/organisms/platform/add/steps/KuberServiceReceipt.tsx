import { FC, useContext } from "react";
import { Button, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { AddKubernetesContext } from "../contexts/AddKubernetesContext";
import { CUSTOMER_PRODUCT_TYPE_ENUM } from "src/constant/customerProductTypeEnum";

type KuberServiceReceiptPropsType = {};

export const KuberServiceReceipt: FC<KuberServiceReceiptPropsType> = () => {
  const {
    serverConfig,
    workersCount,
    paymentType,
    setPaymentType,
    submitHandler,
    submitLoading,
  } = useContext(AddKubernetesContext);

  const receiptItemPrice = Math.floor(serverConfig?.price || 0).toLocaleString(
    "fa-IR"
  );
  const receiptItemInCountPrice = Math.floor(
    (serverConfig?.price || 0) * workersCount
  ).toLocaleString("fa-IR");
  const totalPrice = Math.floor(
    (serverConfig?.price || 0) * 1.09
  ).toLocaleString("fa-IR");
  const vat = Math.floor((serverConfig?.price || 0) * 0.09).toLocaleString(
    "fa-IR"
  );

  return (
    <Paper sx={{ p: 2 }}>
      <Stack direction="column" spacing={2}>
        <Typography align="center">صورتحساب</Typography>
        <Divider
          sx={{ margin: "10px 20px !important", borderBottomWidth: 3 }}
        />
        <Grid
          container
          sx={{
            marginTop: "10px !important",
            marginBottom: "10px !important",
          }}
        >
          <Grid item xs={4} px={2} sx={{ textAlign: "left" }}>
            <Typography>موارد فاکتور</Typography>
          </Grid>
          <Grid item xs={4} px={2} sx={{ textAlign: "center" }}>
            <Typography>تعداد منابع</Typography>
          </Grid>
          <Grid item xs={4} px={2} sx={{ textAlign: "right" }}>
            <Typography>مبلغ (ریال)</Typography>
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            marginTop: "5px !important",
            marginBottom: "5px !important",
          }}
        >
          <Grid item xs={4} px={2} sx={{ textAlign: "left" }}>
            <Typography>{serverConfig?.name || "سرویس"}</Typography>
          </Grid>
          <Grid item xs={4} px={2} sx={{ textAlign: "center" }}>
            <Typography>{workersCount || "---"}</Typography>
          </Grid>
          <Grid item xs={4} px={2} sx={{ textAlign: "right" }}>
            <Typography>{receiptItemPrice}</Typography>
          </Grid>
        </Grid>
        <Divider
          sx={{ margin: "10px 20px !important", borderBottomWidth: 1 }}
        />
        <Grid
          container
          sx={{
            padding: "10px 0px",
            width: "95% !important",
            margin: "0px auto !important",
            marginTop: "5px !important",
          }}
        >
          <Grid
            item
            xs={6}
            sx={{
              textAlign: "left",
              paddingLeft: "4px !important",
            }}
          >
            <Typography>جمع کل</Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              textAlign: "right",
              paddingRight: "4px !important",
            }}
          >
            <Typography>{receiptItemInCountPrice}</Typography>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            padding: "10px 0px",
            width: "95% !important",
            margin: "0px auto !important",
            marginTop: "5px !important",
          }}
        >
          <Grid
            item
            xs={6}
            sx={{
              textAlign: "left",
              paddingLeft: "4px !important",
            }}
          >
            <Typography>تخفیف</Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              textAlign: "right",
              paddingRight: "4px !important",
            }}
          >
            <Typography>۰</Typography>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            padding: "10px 0px",
            width: "95% !important",
            margin: "0px auto !important",
            marginTop: "5px !important",
          }}
        >
          <Grid
            item
            xs={6}
            sx={{
              textAlign: "left",
              paddingLeft: "4px !important",
            }}
          >
            <Typography>مالیات بر ارزش افزوده</Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              textAlign: "right",
              paddingRight: "4px !important",
            }}
          >
            <Typography>{vat}</Typography>
          </Grid>
        </Grid>
        <Divider
          sx={{ margin: "15px 20px !important", borderBottomWidth: 1 }}
        />
        <Grid
          container
          sx={{
            padding: "5px 0px",
            width: "95% !important",
            margin: "0px auto !important",
            marginTop: "0px !important",
            borderRadius: "5px",
          }}
        >
          <Grid
            item
            xs={6}
            sx={{
              textAlign: "left",
              paddingLeft: "4px !important",
            }}
          >
            <Typography>
              <strong>مبلغ قابل پرداخت</strong>
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              textAlign: "right",
              paddingRight: "4px !important",
            }}
          >
            <Typography>
              <strong>{totalPrice}</strong>
            </Typography>
          </Grid>
        </Grid>
        <Stack
          direction="row"
          columnGap={3}
          alignItems="center"
          whiteSpace="nowrap"
        >
          <Button
            size="large"
            variant={
              paymentType === CUSTOMER_PRODUCT_TYPE_ENUM.PRE_PAID
                ? "contained"
                : "outlined"
            }
            onClick={() => setPaymentType(CUSTOMER_PRODUCT_TYPE_ENUM.PRE_PAID)}
            fullWidth
          >
            پیش پرداخت
          </Button>
          <Button
            size="large"
            onClick={() =>
              setPaymentType(CUSTOMER_PRODUCT_TYPE_ENUM.PAY_AS_YOU_GO)
            }
            variant={
              paymentType === CUSTOMER_PRODUCT_TYPE_ENUM.PAY_AS_YOU_GO
                ? "contained"
                : "outlined"
            }
            fullWidth
          >
            براساس مصرف
          </Button>
        </Stack>
        <LoadingButton
          loading={submitLoading}
          fullWidth
          variant="contained"
          onClick={submitHandler}
        >
          ایجاد سرویس
        </LoadingButton>
      </Stack>
    </Paper>
  );
};
