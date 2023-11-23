import React, { Dispatch, SetStateAction, FC } from "react";
import {
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
  Skeleton,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { CUSTOMER_PRODUCT_TYPE_ENUM } from "src/constant/customerProductTypeEnum";
import { CUSTOMER_TYPE_ENUM } from "src/constant/customerTypeEnum";

type ServiceReceiptPropsType = {
  factorFixedContentWidth?: number;
  receiptItemNumber: string;
  reciptItemPrice: string;
  receiptItemName: string | null | undefined;
  totalPrice: string;
  vat: string;
  submitHandler: () => void;
  submitButtonIsLoading: boolean;
  paymentType: CUSTOMER_PRODUCT_TYPE_ENUM | null;
  setPaymentType: Dispatch<SetStateAction<CUSTOMER_PRODUCT_TYPE_ENUM | null>>;
  customerType: number | undefined;
  priceIsLoading?: boolean;
};

const ServiceReceipt: FC<ServiceReceiptPropsType> = ({
  factorFixedContentWidth,
  submitHandler,
  submitButtonIsLoading,
  paymentType,
  setPaymentType,
  customerType,
  receiptItemName,
  receiptItemNumber,
  reciptItemPrice,
  totalPrice,
  vat,
  priceIsLoading,
}) => {
  return priceIsLoading ? (
    <Stack maxHeight="550px" justifyContent="space-between">
      <Stack
        bgcolor="white"
        p={4}
        pt={10}
        borderRadius={2}
        height="100%"
        spacing={2}
      >
        <Skeleton
          variant="rectangular"
          height={50}
          sx={{ bgcolor: "secondary.light", borderRadius: 2 }}
        />
        <Skeleton
          variant="rectangular"
          height={50}
          sx={{ bgcolor: "secondary.light", borderRadius: 2 }}
        />
        <Skeleton
          variant="rectangular"
          height={50}
          sx={{ bgcolor: "secondary.light", borderRadius: 2 }}
        />
        <Skeleton
          variant="rectangular"
          height={50}
          sx={{ bgcolor: "secondary.light", borderRadius: 2 }}
        />
      </Stack>
    </Stack>
  ) : (
    <Stack
      position={{ xs: "static", md: "fixed" }}
      maxHeight={{ md: "550px", xs: "auto" }}
      component={Paper}
      className="fixed-paper-factor"
      sx={{
        overflow: "scroll",
        width: factorFixedContentWidth,
        px: 2,
        py: 2,
      }}
    >
      <Stack spacing={2}>
        <Typography fontSize={24} fontWeight="bold" align="center">
          صورتحساب
        </Typography>
        <Divider
          sx={{ margin: "20px 20px !important", borderBottomWidth: 3 }}
        />
        <Grid
          container
          sx={{
            marginTop: "20px !important",
            marginBottom: "20px !important",
          }}
        >
          <Grid item xs={4} px={2} sx={{ textAlign: "left" }}>
            <Typography
              fontSize={14}
              sx={{ color: ({ palette }) => palette.grey[700] }}
            >
              موارد فاکتور
            </Typography>
          </Grid>
          <Grid item xs={4} px={2} sx={{ textAlign: "center" }}>
            <Typography
              fontSize={14}
              sx={{ color: ({ palette }) => palette.grey[700] }}
            >
              تعداد منابع
            </Typography>
          </Grid>
          <Grid item xs={4} px={2} sx={{ textAlign: "right" }}>
            <Typography
              fontSize={14}
              sx={{ color: ({ palette }) => palette.grey[700] }}
            >
              مبلغ (ریال)
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            marginTop: "10px !important",
            marginBottom: "5px !important",
          }}
        >
          <Grid item xs={4} px={2} sx={{ textAlign: "left" }}>
            <Typography
              fontSize={12}
              sx={{ color: ({ palette }) => palette.grey[700] }}
            >
              {receiptItemName}
            </Typography>
          </Grid>
          <Grid item xs={4} px={2} sx={{ textAlign: "center" }}>
            <Typography
              fontSize={12}
              sx={{ color: ({ palette }) => palette.grey[700] }}
            >
              {receiptItemNumber}
            </Typography>
          </Grid>
          <Grid item xs={4} px={2} sx={{ textAlign: "right" }}>
            <Typography
              fontSize={12}
              sx={{ color: ({ palette }) => palette.grey[700] }}
            >
              {reciptItemPrice}
            </Typography>
          </Grid>
        </Grid>
        <Divider
          sx={{ margin: "15px 20px !important", borderBottomWidth: 1 }}
        />

        <Grid
          container
          sx={{
            marginTop: "10px !important",
            marginBottom: "5px !important",
          }}
        >
          <Grid item xs={4} px={2} sx={{ textAlign: "left" }}>
            <Typography
              fontSize={12}
              sx={{ color: ({ palette }) => palette.grey[700] }}
            >
              مالیات بر ارزش افزوده
            </Typography>
          </Grid>
          <Grid item xs={4} px={2} sx={{ textAlign: "center" }}>
            <Typography
              fontSize={12}
              sx={{ color: ({ palette }) => palette.grey[700] }}
            >{`  `}</Typography>
          </Grid>
          <Grid item xs={4} px={2} sx={{ textAlign: "right" }}>
            <Typography
              fontSize={12}
              sx={{ color: ({ palette }) => palette.grey[700] }}
            >
              {vat}
            </Typography>
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
            marginTop: "10px !important",
            backgroundColor: "rgba(240, 247, 255, 1)",
          }}
        >
          <Grid
            item
            xs={6}
            sx={{ textAlign: "left", paddingLeft: "4px !important" }}
          >
            <Typography fontSize={14}>
              <strong>جمع کل</strong>
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{ textAlign: "right", paddingRight: "4px !important" }}
          >
            <Typography fontSize={14}>
              <strong>{totalPrice}</strong>
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            width: "95% !important",
            margin: "15px auto !important",
          }}
        >
          {customerType === CUSTOMER_TYPE_ENUM.POST_PAID ? (
            <></>
          ) : (
            <Grid item xs={12}>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                whiteSpace="nowrap"
              >
                <Button
                  onClick={() =>
                    setPaymentType(CUSTOMER_PRODUCT_TYPE_ENUM.PAY_AS_YOU_GO)
                  }
                  variant="outlined"
                  color={
                    paymentType === CUSTOMER_PRODUCT_TYPE_ENUM.PAY_AS_YOU_GO
                      ? "primary"
                      : "secondary"
                  }
                  sx={{
                    border:
                      paymentType === CUSTOMER_PRODUCT_TYPE_ENUM.PAY_AS_YOU_GO
                        ? "2px solid #3C8AFF !important"
                        : 1,
                    py: 1,
                  }}
                  fullWidth
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems={{ xs: "start", md: "end" }}
                  >
                    <Typography variant="text14">پراخت بر اساس مصرف</Typography>
                  </Stack>
                </Button>
                <Button
                  onClick={() =>
                    setPaymentType(CUSTOMER_PRODUCT_TYPE_ENUM.PRE_PAID)
                  }
                  variant="outlined"
                  color={
                    paymentType === CUSTOMER_PRODUCT_TYPE_ENUM.PRE_PAID
                      ? "primary"
                      : "secondary"
                  }
                  sx={{
                    border:
                      paymentType === CUSTOMER_PRODUCT_TYPE_ENUM.PRE_PAID
                        ? "2px solid #3C8AFF !important"
                        : 1,
                    py: 1,
                  }}
                  fullWidth
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems={{ xs: "start", md: "end" }}
                  >
                    <Typography variant="text14">پیش پرداخت</Typography>
                  </Stack>
                </Button>
              </Stack>
            </Grid>
          )}
        </Grid>
        <Grid
          container
          sx={{
            marginTop: "5px !important",
            marginBottom: "10px !important",
          }}
        >
          <Grid item xs={12}>
            <LoadingButton
              loading={submitButtonIsLoading}
              variant="contained"
              color="primary"
              sx={{ width: "95%" }}
              onClick={submitHandler}
            >
              ایجاد سرویس
            </LoadingButton>
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
};

export default ServiceReceipt;
