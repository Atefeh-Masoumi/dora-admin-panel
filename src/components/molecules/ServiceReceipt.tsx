import { FC, Fragment } from "react";
import {
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
  Skeleton,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { priceToPersian } from "src/utils/priceToPersian";
import { e2p } from "src/utils/e2p.utils";
import { BORDER_RADIUS_1 } from "src/configs/theme";
type CustomConfigType = { numberOfItem: number; name: string; fee?: number }[];

export enum ReceiptTypeEnum {
  CUSTOM = 1,
  PREDEFINED_BUNDLE = 2,
}

type ServiceReceiptPropsType = {
  receiptItemNumber: string;
  reciptItemPrice: string;
  receiptItemName: string | null | undefined;
  totalPrice: string;
  vat: string;
  submitHandler: () => void;
  submitButtonIsLoading: boolean;
  priceIsLoading?: boolean;
  customConfig?: CustomConfigType;
  receiptType?: ReceiptTypeEnum;
};

const ServiceReceipt: FC<ServiceReceiptPropsType> = ({
  submitHandler,
  submitButtonIsLoading,
  receiptItemName,
  receiptItemNumber,
  reciptItemPrice,
  totalPrice,
  vat,
  priceIsLoading,
  customConfig,
  receiptType,
}) => {
  let netPrice = 0;
  return (
    <Paper sx={{ p: 2 }}>
      {priceIsLoading ? (
        <Stack
          bgcolor="white"
          p={4}
          pt={10}
          borderRadius={BORDER_RADIUS_1}
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
            sx={{
              margin: "10px 20px !important",
              borderBottomWidth: 3,
            }}
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
            {receiptType === ReceiptTypeEnum.CUSTOM &&
              customConfig?.map((item) => {
                netPrice += item.numberOfItem * (item?.fee || 0);
                return (
                  <Fragment key={item.name}>
                    <Grid item xs={4} px={2}>
                      <Typography
                        minWidth="max-content"
                        textAlign="left"
                        fontSize={12}
                        sx={{ color: ({ palette }) => palette.grey[700] }}
                      >
                        {item.name || "---"}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} px={2}>
                      <Typography
                        minWidth="max-content"
                        textAlign="center"
                        fontSize={12}
                        sx={{ color: ({ palette }) => palette.grey[700] }}
                      >
                        {item.numberOfItem ? e2p(item.numberOfItem) : "---"}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} px={2}>
                      <Typography
                        minWidth="max-content"
                        textAlign="right"
                        fontSize={12}
                        sx={{ color: ({ palette }) => palette.grey[700] }}
                      >
                        {item.fee
                          ? e2p(priceToPersian(item.fee * item.numberOfItem))
                          : "---"}
                      </Typography>
                    </Grid>
                  </Fragment>
                );
              })}

            {receiptType === ReceiptTypeEnum.PREDEFINED_BUNDLE && (
              <>
                <Grid item xs={4} px={2}>
                  <Typography
                    textAlign="left"
                    fontSize={12}
                    sx={{ color: ({ palette }) => palette.grey[700] }}
                  >
                    {receiptItemName}
                  </Typography>
                </Grid>
                <Grid item xs={4} px={2}>
                  <Typography
                    textAlign="center"
                    fontSize={12}
                    sx={{ color: ({ palette }) => palette.grey[700] }}
                  >
                    {receiptItemNumber}
                  </Typography>
                </Grid>
                <Grid item xs={4} px={2}>
                  <Typography
                    textAlign="right"
                    fontSize={12}
                    sx={{ color: ({ palette }) => palette.grey[700] }}
                  >
                    {reciptItemPrice}
                  </Typography>
                </Grid>
              </>
            )}
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
                {receiptType === ReceiptTypeEnum.PREDEFINED_BUNDLE
                  ? reciptItemPrice
                  : e2p(priceToPersian(netPrice))}
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
                {receiptType === ReceiptTypeEnum.PREDEFINED_BUNDLE
                  ? vat
                  : e2p(priceToPersian(netPrice * 0.1))}
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
                <strong>
                  {receiptType === ReceiptTypeEnum.PREDEFINED_BUNDLE
                    ? totalPrice
                    : e2p(priceToPersian(netPrice * 1.1))}
                </strong>
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
