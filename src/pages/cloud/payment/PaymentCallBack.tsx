import { FC, useEffect, useState, useMemo } from "react";
import { Button, Stack, Typography, Paper } from "@mui/material";
import { SuccessfulPayment } from "src/components/atoms/svg/SuccessfulSvg";
import { UnsuccessfulPayment } from "src/components/atoms/svg/UnsuccessfulSvg";
import { priceToPersian } from "src/utils/priceToPersian";
import { useNavigate, useParams } from "react-router";
import { useLazyGetApiCloudPaymentGetByIdQuery } from "src/app/services/api";
import PageLoading from "src/components/atoms/PageLoading";
import { PaymentListResponse } from "src/app/services/api.generated";

type PaymentCallBackPropsType = {
  handleClose: () => void;
};

const PaymentCallBack: FC<PaymentCallBackPropsType> = ({ handleClose }) => {
  const [paymentInfo, setPaymentInfo] = useState<PaymentListResponse>({});
  const { id } = useParams();
  const navigate = useNavigate();

  const [getInfo, { isLoading }] = useLazyGetApiCloudPaymentGetByIdQuery();

  useEffect(() => {
    if (id === null || id === undefined || isNaN(Number(id))) {
      navigate(-1);
    } else {
      getInfo({ id: Number(id) })
        .unwrap()
        .then((res) => {
          if (!res) return;
          setPaymentInfo(res);
        });
    }
  }, [getInfo, id, navigate]);

  const isSuccess = useMemo(() => {
    let result: boolean = false;
    if (paymentInfo.paymentStatusId) {
      result = paymentInfo.paymentStatusId !== 1;
    }
    return result;
  }, [paymentInfo.paymentStatusId]);

  const closeHandler = () => navigate("/cloud/wallet/payment");

  if (!id) return <></>;

  return (
    <>
      {isLoading && <PageLoading />}
      <Paper
        elevation={0}
        component={Stack}
        sx={{ px: 4, py: 3 }}
        spacing={4}
        alignItems="center"
      >
        {isSuccess ? (
          <SuccessfulPayment sx={{ fontSize: 200 }} />
        ) : (
          <UnsuccessfulPayment sx={{ fontSize: 200 }} />
        )}
        <Typography
          variant="text1"
          fontWeight="bold"
          color={isSuccess ? "isSuccess.main" : "error.main"}
          fontSize={{ xs: 24, md: 32 }}
        >
          {isSuccess ? "پرداخت موفق" : "پرداخت ناموفق"}
        </Typography>
        <Typography color="secondary.main" variant="text14" align="justify">
          {isSuccess
            ? "پرداخت شما با موفقیت انجام شد!"
            : "متاسفانه مشکلی در پرداخت پیش آمده است. در صورتی که وجهی از حساب شما کم شده است، تا ۷۲ ساعت دیگر به حساب شما بر خواهد گشت."}
        </Typography>
        <Stack spacing={2} color="secondary.main" width="100%">
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="text14">مبلغ تراکنشی</Typography>
            <Typography variant="text14" dir="ltr">
              {priceToPersian(paymentInfo.amount || 0)} ریال
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="text14">زمان تراکنش</Typography>
            <Typography variant="text14" dir="ltr">
              {paymentInfo.transactionDate || ""}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="text14">کد پیگیری</Typography>
            <Typography variant="text14" dir="ltr">
              {paymentInfo.id || ""}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="text14">کد مرجع (بانک)</Typography>
            <Typography variant="text14" dir="ltr">
              {paymentInfo.rrn || ""}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="text14">شماره کارت</Typography>
            <Typography variant="text14" dir="ltr">
              {paymentInfo.hashCardNumber || ""}
            </Typography>
          </Stack>
        </Stack>
        <Button
          variant="outlined"
          color="secondary"
          sx={{
            borderRadius: 1.5,
            px: 7,
            py: 2,
            borderColor: "secondary.light",
          }}
          onClick={closeHandler}
          size="large"
        >
          بازگشت به ابر درسا
        </Button>
      </Paper>
    </>
  );
};

export default PaymentCallBack;
