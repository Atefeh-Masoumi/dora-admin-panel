import { Dispatch, SetStateAction, FC } from "react";
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
import { InvoiceSvg } from "../atoms/svg-icons/InvoiceSvg";
import { CalculateSvg } from "../atoms/svg-icons/CalculateSvg";
import { useGetApiMyStorageHostListQuery } from "src/app/services/api.generated";

type ServiceReceiptPropsType = {
  receiptItemNumber: string;
  reciptItemPrice: string;
  receiptItemName: string | null | undefined;
  totalPrice: string;
  vat: string;
  submitHandler: () => void;
  submitButtonIsLoading: boolean;
  paymentType?: CUSTOMER_PRODUCT_TYPE_ENUM | null;
  setPaymentType?: Dispatch<SetStateAction<CUSTOMER_PRODUCT_TYPE_ENUM | null>>;
  priceIsLoading?: boolean;
};

const ServiceReceipt: FC<ServiceReceiptPropsType> = ({
  submitHandler,
  submitButtonIsLoading,
  paymentType,
  setPaymentType,
  receiptItemName,
  receiptItemNumber,
  reciptItemPrice,
  totalPrice,
  vat,
  priceIsLoading,
}) => {
  return (
    <Paper sx={{ p: 2 }}>
      {priceIsLoading ? (
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
      ) : (
        <Stack spacing={2}>
          <Typography fontSize={24} fontWeight="bold" align="center">
            صورتحساب
          </Typography>
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
              marginTop: "5px !important",
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
            sx={{ margin: "10px 20px !important", borderBottomWidth: 1 }}
          />
          <Grid
            container
            sx={{
              padding: "10px 0px",
              width: "95% !important",
              margin: "0px auto !important",
              marginTop: "5px !important",
              backgroundColor: "rgba(240, 247, 255, 1)",
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
              <Typography
                sx={{ color: ({ palette }) => palette.grey[700] }}
                fontSize={14}
              >
                جمع کل
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
              <Typography
                fontSize={14}
                sx={{ color: ({ palette }) => palette.grey[700] }}
              >
                {reciptItemPrice}
              </Typography>
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
              <Typography
                sx={{ color: ({ palette }) => palette.grey[700] }}
                fontSize={14}
              >
                تخفیف
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
              <Typography
                fontSize={14}
                sx={{ color: ({ palette }) => palette.grey[700] }}
              >
                ۰
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{
              padding: "10px 0px",
              width: "95% !important",
              margin: "0px auto !important",
              marginTop: "5px !important",
              backgroundColor: "rgba(240, 247, 255, 1)",
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
              <Typography
                sx={{ color: ({ palette }) => palette.grey[700] }}
                fontSize={14}
              >
                مالیات بر ارزش افزوده
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
              <Typography
                fontSize={14}
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
              <Typography
                sx={{ color: ({ palette }) => palette.grey[700] }}
                fontSize={14}
              >
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
              <Typography
                fontSize={14}
                sx={{ color: ({ palette }) => palette.grey[700] }}
              >
                <strong>{totalPrice}</strong>
              </Typography>
            </Grid>
          </Grid>
          {(paymentType || setPaymentType) && (
            <Grid
              container
              sx={{
                width: "95% !important",
                margin: "10px auto !important",
              }}
            >
              <Grid item xs={12}>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  whiteSpace="nowrap"
                >
                  <Button
                    variant="outlined"
                    onClick={() =>
                      setPaymentType &&
                      setPaymentType(CUSTOMER_PRODUCT_TYPE_ENUM.PRE_PAID)
                    }
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
                      <InvoiceSvg
                        stroke={
                          paymentType === CUSTOMER_PRODUCT_TYPE_ENUM.PRE_PAID
                            ? "#3C8AFF"
                            : undefined
                        }
                        sx={{ fontSize: { xs: 20, md: 30 } }}
                      />
                      <Typography variant="text14">پیش پرداخت</Typography>
                    </Stack>
                  </Button>
                  <Button
                    onClick={() =>
                      setPaymentType &&
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
                      <CalculateSvg
                        stroke={
                          paymentType ===
                          CUSTOMER_PRODUCT_TYPE_ENUM.PAY_AS_YOU_GO
                            ? "#3C8AFF"
                            : undefined
                        }
                        sx={{ fontSize: { xs: 20, md: 30 } }}
                      />
                      <Typography variant="text14">براساس مصرف</Typography>
                    </Stack>
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          )}

          <Grid
            container
            sx={{
              marginTop: "5px !important",
              marginBottom: "5px !important",
            }}
          >
            <Grid item xs={12}>
              <LoadingButton
                loading={submitButtonIsLoading}
                fullWidth
                size="large"
                variant="contained"
                sx={{ py: 1.5 }}
                color="primary"
                onClick={submitHandler}
              >
                ایجاد سرویس
              </LoadingButton>
            </Grid>
          </Grid>
        </Stack>
      )}
    </Paper>
  );
};

export default ServiceReceipt;
