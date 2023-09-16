import {
  ChangeEventHandler,
  FC,
  Fragment,
  useMemo,
  useState,
  useEffect,
  useContext,
} from "react";
import {
  Paper,
  Typography,
  Stack,
  Select,
  MenuItem,
  SelectChangeEvent,
  Divider,
  Button,
} from "@mui/material";
import { Navigate, useParams, useNavigate } from "react-router";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import { Wallet } from "@mui/icons-material";
import { ParsianLogo } from "src/components/atoms/svg/ParsianSvg";
import { SamanLogo } from "src/components/atoms/svg/SamanSvg";
import { InvoiceSvg } from "src/components/atoms/svg/InvoiceSvg";
import { CalculateSvg } from "src/components/atoms/svg/CalculateSvg";
import PageLoading from "src/components/atoms/PageLoading";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { priceToPersian } from "src/utils/priceToPersian";
import {
  usePostApiCloudOrderPayMutation,
  usePutApiCloudOrderPaymentTypeMutation,
  usePutApiCloudOrderDurationMutation,
  usePutApiCloudOrderVoucherMutation,
  useGetApiCloudOrderGetByIdQuery,
  GetOrderResponse,
} from "src/app/services/api.generated";
import { DataContext } from "src/pages/cloud/order/Index";

const useDurationArray = [
  { name: "یک ماه", value: "1" },
  { name: "سه ماه", value: "2" },
  { name: "شش ماه", value: "3" },
  { name: "یک ساله", value: "4" },
];

type OrderDetailsPropsType = {};

const OrderDetails: FC<OrderDetailsPropsType> = () => {
  const [orderPaymentTypeId, setOrderPaymentTypeId] = useState(1);
  const [paymentProviderId, setPaymentGateway] = useState(2);
  const [discountCode, setDiscountCode] = useState("");

  const { refetchOnClick } = useContext(DataContext);

  const navigate = useNavigate();

  const { id } = useParams();

  const { data, isLoading: getOrderInfoLoading } =
    useGetApiCloudOrderGetByIdQuery({
      id: Number(id),
    });

  useEffect(() => {
    if (!data || !data.orderPaymentTypeId) return;
    setOrderPaymentTypeId(data.orderPaymentTypeId);
  }, [data]);

  const [changePaymentMethod, { isLoading: changePaymentMethodLoading }] =
    usePutApiCloudOrderPaymentTypeMutation();
  const [changeOrderDuration, { isLoading: changeOrderDurationLoading }] =
    usePutApiCloudOrderDurationMutation();
  const [orderOnlinePay, { isLoading: orderOnlinePayLoading }] =
    usePostApiCloudOrderPayMutation();
  const [applyDiscountCode, { isLoading: applyDiscountCodeLoading }] =
    usePutApiCloudOrderVoucherMutation();

  const orderInfo: GetOrderResponse = useMemo(() => data || {}, [data]);

  if (!id || (!data && !getOrderInfoLoading)) return <Navigate to="/" />;

  const generalInfo = [
    {
      name: "گروه محصول",
      value: orderInfo.productCategory,
    },
    {
      name: "نام محصول کاربر",
      value: orderInfo.name,
    },
    {
      name: "تاریخ",
      value: orderInfo.orderDate,
    },
    {
      name: "وضعیت",
      value: orderInfo.orderStatus,
    },
    // {
    //   name: "نوع صورتحساب",
    //   value: orderInfo.prepaidStatus,
    // },
  ];

  const amountInfo = [
    {
      name: "جمع",
      value: orderInfo.netPrice,
    },
    {
      name: "تخفیف",
      value: orderInfo.discount,
    },
    {
      name: "ارزش افزوده",
      value: orderInfo.vat,
    },
    {
      name: "جمع مبلغ ماهیانه",
      value: orderInfo.orderPrice,
    },
    {
      name: "حداقل موجودی (برای پرداخت براساس مصرف)",
      value: orderInfo.minPrice,
    },
    {
      name: "مبلغ قابل پرداخت",
      value: orderInfo.orderPrice,
    },
  ];

  const orderDiscountChangeHandler: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    setDiscountCode(event.target.value);
  };

  const orderDurationChangeHandler = (event: SelectChangeEvent<string>) => {
    if (!event.target.value) return;
    changeOrderDuration({
      orderDurationModel: {
        id: orderInfo!.id,
        orderDurationId: Number(event.target.value),
      },
    })
      .unwrap()
      .then(() => toast.success("تغییرات با موفقیت اعمال شد"));
  };

  const orderTypeChangeHandler = (value: number) => {
    if (!value) return;
    changePaymentMethod({
      orderPaymentTypeModel: { id: orderInfo!.id, isPrepaid: value === 1 },
    })
      .unwrap()
      .then(() => {
        toast.success("تغییرات با موفقیت اعمال شد");
      });
  };

  const applyDiscountHandler = () => {
    if (!discountCode || !orderInfo.id) return;
    applyDiscountCode({
      orderVoucherModel: {
        id: orderInfo.id,
        voucherCode: discountCode,
      },
    })
      .unwrap()
      .then(() => toast.success("کد تخفیف با موفقیت اعمال شد"));
  };

  const submitHandler = () => {
    if (!orderInfo) return;

    orderOnlinePay({
      orderPayModel: {
        id: orderInfo.id,
        orderPaymentTypeId: Number(orderPaymentTypeId),
        paymentProviderId: Number(paymentProviderId),
      },
    })
      .unwrap()
      .then((res) => {
        if (!res || !res.location || !res.status) return;

        if (res.orderPaymentTypeId === 2) {
          refetchOnClick();
          navigate("/");
          toast.success("پرداخت با موفقیت انجام شد");
        } else {
          let a = document.createElement("a");
          a.href = res.location;
          a.click();
          toast.success("در حال انتقال به صفحه پرداخت");
        }
      });
  };

  return (
    <>
      {(getOrderInfoLoading ||
        changePaymentMethodLoading ||
        changeOrderDurationLoading ||
        applyDiscountCodeLoading) && <PageLoading />}
      <Paper elevation={0} sx={{ overflow: "hidden" }}>
        <Grid2
          container
          p={{ xs: 2, sm: 2, md: 2 }}
          justifyContent="space-between"
          alignItems="stretch"
        >
          <Grid2
            xs={12}
            component={Paper}
            elevation={0}
            p={{ xs: 2, sm: 3, md: 4 }}
            border={1}
            borderRadius={2}
            borderColor="secondary.light"
            container
          >
            {generalInfo.map(({ name, value }, index) => (
              <Grid2
                container
                xs={12}
                sm={3}
                key={index}
                p={1}
                wrap="nowrap"
                textOverflow="ellipsis"
                overflow="hidden"
              >
                <Typography sx={{ pr: 1 }}>{name}:</Typography>
                <Typography
                  color={
                    index === 4 && orderInfo.orderStatusId === 1
                      ? "error"
                      : "grey.700"
                  }
                  fontWeight={600}
                >
                  {value}
                </Typography>
              </Grid2>
            ))}
          </Grid2>

          <Grid2
            xs={12}
            md={6}
            component={Paper}
            elevation={0}
            pt={1}
            pr={{ md: 1 }}
          >
            <Stack
              border={1}
              borderRadius={2}
              borderColor="secondary.light"
              p={2}
            >
              <Typography variant="text14" color="secondary">
                نوع صورتحساب
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                whiteSpace="nowrap"
              >
                <Button
                  onClick={() => orderTypeChangeHandler(1)}
                  variant="outlined"
                  color={
                    orderInfo!.isPrepaid === true ? "primary" : "secondary"
                  }
                  sx={{
                    border:
                      orderInfo!.isPrepaid === true
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
                    <InvoiceSvg sx={{ fontSize: { xs: 20, md: 30 } }} />
                    <Typography variant="text14">پیش پرداخت</Typography>
                  </Stack>
                </Button>
                <Button
                  onClick={() => orderTypeChangeHandler(2)}
                  variant="outlined"
                  color={
                    orderInfo!.isPrepaid === false ? "primary" : "secondary"
                  }
                  sx={{
                    border:
                      orderInfo!.isPrepaid === false
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
                    <CalculateSvg sx={{ fontSize: { xs: 20, md: 30 } }} />
                    <Typography variant="text14">
                      پرداخت بر اساس مصرف
                    </Typography>
                  </Stack>
                </Button>
              </Stack>
            </Stack>
          </Grid2>

          <Grid2
            xs={12}
            md={6}
            component={Paper}
            elevation={0}
            pt={1}
            pl={{ md: 1 }}
          >
            <Stack
              border={1}
              borderRadius={2}
              borderColor="secondary.light"
              p={2}
            >
              <Typography variant="text14" color="secondary">
                نحوه پرداخت
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                whiteSpace="nowrap"
              >
                <Button
                  onClick={() => setOrderPaymentTypeId(1)}
                  variant="outlined"
                  color={orderPaymentTypeId === 1 ? "primary" : "secondary"}
                  sx={{
                    border:
                      orderPaymentTypeId === 1
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
                    <AddIcon sx={{ fontSize: { xs: 20, md: 30 } }} />
                    <Typography variant="text14">پرداخت آنلاین</Typography>
                  </Stack>
                </Button>
                <Button
                  onClick={() => setOrderPaymentTypeId(2)}
                  variant="outlined"
                  color={orderPaymentTypeId === 2 ? "primary" : "secondary"}
                  sx={{
                    border:
                      orderPaymentTypeId === 2
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
                    <Wallet sx={{ fontSize: { xs: 20, md: 30 } }} />
                    <Typography variant="text14">کیف پول</Typography>
                  </Stack>
                </Button>
              </Stack>
            </Stack>
          </Grid2>

          {/* {orderInfo.isPrepaid && ( */}
          <Grid2
            xs={12}
            md={6}
            component={Paper}
            elevation={0}
            pt={1}
            pr={{ md: 1 }}
          >
            <Stack
              border={1}
              borderRadius={2}
              borderColor="secondary.light"
              p={2}
            >
              <Typography variant="text14" color="secondary">
                مدت استفاده
              </Typography>
              <Select
                fullWidth
                labelId="category-select-label"
                id="category-select"
                value={orderInfo.orderDurationId?.toString() || "1"}
                onChange={orderDurationChangeHandler}
              >
                {useDurationArray.map(({ value, name }, index) => (
                  <MenuItem value={value} key={index}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
          </Grid2>

          {/* {orderInfo.isPrepaid && ( */}
          <Grid2
            xs={12}
            md={6}
            component={Paper}
            elevation={0}
            pt={1}
            pl={{ md: 1 }}
          >
            <Stack
              border={1}
              borderRadius={2}
              borderColor="secondary.light"
              p={2}
            >
              <Typography variant="text14" color="secondary">
                کد تخفیف
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <DorsaTextField
                  fullWidth
                  variant="outlined"
                  onChange={orderDiscountChangeHandler}
                />
                <LoadingButton
                  loading={applyDiscountCodeLoading}
                  disableElevation
                  sx={{ minWidth: { xs: "100%", sm: 150 } }}
                  variant="contained"
                  onClick={applyDiscountHandler}
                >
                  اعمال
                </LoadingButton>
              </Stack>
            </Stack>
          </Grid2>

          <Grid2
            xs={12}
            md={6}
            component={Paper}
            elevation={0}
            pt={1}
            pr={{ md: 1 }}
          >
            <Stack
              border={1}
              borderRadius={2}
              borderColor="secondary.light"
              p={2}
            >
              <Typography variant="text14" color="secondary">
                درگاه پرداخت
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                whiteSpace="nowrap"
              >
                <Button
                  onClick={() => setPaymentGateway(1)}
                  variant="outlined"
                  color={paymentProviderId === 1 ? "primary" : "secondary"}
                  sx={{
                    border:
                      paymentProviderId === 1
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
                    <ParsianLogo sx={{ fontSize: { xs: 20, md: 30 } }} />
                    <Typography variant="text14">بانک پارسیان</Typography>
                  </Stack>
                </Button>
                <Button
                  onClick={() => setPaymentGateway(2)}
                  variant="outlined"
                  color={paymentProviderId === 2 ? "primary" : "secondary"}
                  sx={{
                    border:
                      paymentProviderId === 2
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
                    <SamanLogo sx={{ fontSize: { xs: 20, md: 30 } }} />
                    <Typography variant="text14">بانک سامان</Typography>
                  </Stack>
                </Button>
              </Stack>
            </Stack>
          </Grid2>

          <Grid2
            xs={12}
            md={6}
            component={Paper}
            elevation={0}
            pt={1}
            pl={{ md: 1 }}
          >
            <Stack
              spacing={2}
              border={1}
              borderRadius={2}
              borderColor="secondary.light"
              p={2}
            >
              {amountInfo.map(({ name, value }, index) => {
                if (orderInfo.isPrepaid && (index === 3 || index === 4))
                  return null;
                if (!orderInfo.isPrepaid && index === 5) return null;
                return (
                  <Fragment key={index}>
                    {orderInfo.isPrepaid && index === 5 && <Divider />}
                    {!orderInfo.isPrepaid && index === 3 && <Divider />}
                    <Stack direction="row" spacing={1} p={1}>
                      <Typography color="grey.700">{name}:</Typography>
                      <Typography>
                        {priceToPersian((value as number) || 0)}
                      </Typography>
                      <Typography color="grey.700">ریال</Typography>
                    </Stack>
                  </Fragment>
                );
              })}
            </Stack>
          </Grid2>

          <Grid2 xs={12} container justifyContent="center">
            <LoadingButton
              disableElevation
              loading={orderOnlinePayLoading}
              size="large"
              variant="contained"
              sx={{ mt: 2, width: { xs: "100%", sm: 250 } }}
              onClick={submitHandler}
            >
              انجام عملیات
            </LoadingButton>
          </Grid2>
        </Grid2>
      </Paper>
    </>
  );
};

export default OrderDetails;
