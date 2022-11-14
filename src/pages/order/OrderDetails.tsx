import {
  ChangeEvent,
  ChangeEventHandler,
  FC,
  Fragment,
  useMemo,
  useState,
  useRef,
} from "react";
import {
  Paper,
  Typography,
  Stack,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  SelectChangeEvent,
  Divider,
} from "@mui/material";
import { Navigate, useParams, useNavigate } from "react-router";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import {
  usePostApiV2PortalOrderPayMutation,
  usePutApiV2PortalOrderPaymentTypeMutation,
  usePutApiV2PortalOrderDurationMutation,
  usePutApiV2PortalOrderVoucherMutation,
  useGetApiV2PortalOrderGetByIdQuery,
  GetOrderResponse,
} from "src/app/services/api.generated";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { LoadingButton } from "@mui/lab";
import { priceToPersian } from "src/utils/priceToPersian";
import { toast } from "react-toastify";
import PageLoading from "src/components/atoms/PageLoading";

const useDurationArray = [
  { name: "یک ماه", value: "1" },
  { name: "سه ماه", value: "2" },
  { name: "شش ماه", value: "3" },
  { name: "یک ساله", value: "4" },
];

type OrderDetailsPropsType = {};

const OrderDetails: FC<OrderDetailsPropsType> = () => {
  const [paymentMethod, setPaymentMethod] = useState("2");
  const [discountCode, setDiscountCode] = useState("");
  const [paymentGateway, setPaymentGateway] = useState("1");

  const navigate = useNavigate();

  const { id } = useParams();

  const { data, isLoading: getOrderInfoLoading } =
    useGetApiV2PortalOrderGetByIdQuery({
      id: Number(id),
    });
  const [changePaymentMethod, { isLoading: changePaymentMethodLoading }] =
    usePutApiV2PortalOrderPaymentTypeMutation();
  const [changeOrderDuration, { isLoading: changeOrderDurationLoading }] =
    usePutApiV2PortalOrderDurationMutation();
  const [goToBankPortal, { isLoading: goToBankPortalLoading }] =
    usePostApiV2PortalOrderPayMutation();
  const [applyDiscountCode, { isLoading: applyDiscountCodeLoading }] =
    usePutApiV2PortalOrderVoucherMutation();

  const formRef = useRef(null);
  const formToken = useRef(null);
  const formRedirectURL = useRef(null);

  const orderInfo: GetOrderResponse = useMemo(() => data || {}, [data]);

  if (!id || (!data && !getOrderInfoLoading)) return <Navigate to="/" />;

  const generalInfo = [
    {
      name: "دسته بندی محصول",
      value: orderInfo.productCategory,
    },
    {
      name: "نام محصول",
      value: orderInfo.productBundle,
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
    {
      name: "نوع صورتحساب",
      value: orderInfo.prepaidStatus,
    },
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
      name: "حداقل موجودی کیف پول برای انجام عملیات",
      value: orderInfo.orderPrice ? Math.round(orderInfo.orderPrice / 10) : 0,
    },
    {
      name: "مبلغ قابل پرداخت",
      value: orderInfo.orderPrice,
    },
  ];

  const billTypeChangeHandler = (
    _: ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    changePaymentMethod({
      orderPaymentTypeModel: { id: orderInfo!.id, isPrepaid: value === "1" },
    })
      .unwrap()
      .then(() => {
        toast.success("تغییرات با موفقیت اعمال شد");
      });
  };
  const paymentMethodChangeHandler = (
    _: ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setPaymentMethod(value);
  };
  const useDurationChangeHandler = (event: SelectChangeEvent<string>) => {
    if (!event.target.value) return;
    changeOrderDuration({
      orderDurationModel: {
        id: orderInfo!.id,
        orderDurationId: Number(event.target.value),
      },
    })
      .unwrap()
      .then(() => toast.success("تغییرات با موفقیت اعمال شد"));
    // setOrderInfo((prevState) => {
    //   let result = { ...prevState };
    //   result.orderDurationId = Number(event.target.value);
    //   return result;
    // });
  };
  const discountCodeChangeHandler: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    setDiscountCode(event.target.value);
  };
  const paymentGatewayChangeHandler = (
    _: ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setPaymentGateway(value);
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
    if (orderInfo.orderPaymentTypeId === 2) {
      navigate("/");
      toast.success("پرداخت با موفقیت انجام شد");
      return;
    } else {
      goToBankPortal({
        orderPayModel: {
          id: orderInfo.id,
          orderPaymentTypeId: orderInfo.orderPaymentTypeId,
          paymentProviderId: Number(paymentGateway),
        },
      })
        .unwrap()
        .then((res) => {
          if (!res || !res.location || !res.status) return;
          let a = document.createElement("a");
          a.target = "_blank";
          a.href = res.location;
          a.click();
          toast.success("در حال انتقال به صفحه پرداخت");
        });
    }
  };

  return (
    <>
      {(getOrderInfoLoading ||
        changePaymentMethodLoading ||
        changeOrderDurationLoading ||
        applyDiscountCodeLoading) && <PageLoading />}
      <Typography
        variant="title6"
        color="secondary"
        fontWeight="700"
        sx={{ my: 3 }}
      >
        پرداخت سفارش
      </Typography>
      <Paper elevation={0} sx={{ overflow: "hidden" }}>
        <Grid2
          container
          gap={3}
          p={{ xs: 2, sm: 3, md: 4 }}
          justifyContent="space-between"
          alignItems="stretch"
        >
          <Grid2
            container
            xs={12}
            component={Paper}
            elevation={0}
            sx={{ border: "0.5px solid #aaa" }}
            p={2}
          >
            {generalInfo.map(({ name, value }, index) => (
              <Grid2
                container
                xs={12}
                sm={6}
                key={index}
                p={2}
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
            direction="column"
            xs={12}
            md={5.8}
            component={Paper}
            elevation={0}
            sx={{ border: "0.5px solid #aaa" }}
            p={{ xs: 2, sm: 3, md: 4 }}
          >
            <Typography sx={{ mb: 3 }}>نوع صورتحساب</Typography>
            <RadioGroup
              value={orderInfo!.isPrepaid ? "1" : "2"}
              onChange={billTypeChangeHandler}
            >
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="پیش پرداخت (پرداخت کامل فاکتور)"
              />
              <FormControlLabel
                value="2"
                control={<Radio />}
                label="پرداخت بر اساس مصرف"
              />
            </RadioGroup>
          </Grid2>
          <Grid2
            direction="column"
            xs={12}
            md={5.8}
            component={Paper}
            elevation={0}
            sx={{ border: "0.5px solid #aaa" }}
            p={{ xs: 2, sm: 3, md: 4 }}
          >
            <Typography sx={{ mb: 3 }}>نحوه پرداخت</Typography>
            <RadioGroup
              value={paymentMethod}
              onChange={paymentMethodChangeHandler}
            >
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="پرداخت آنلاین"
              />
              <FormControlLabel value="2" control={<Radio />} label="کیف پول" />
            </RadioGroup>
          </Grid2>
          {orderInfo.isPrepaid && (
            <Grid2
              xs={12}
              md={5.8}
              component={Paper}
              elevation={0}
              sx={{ border: "0.5px solid #aaa" }}
              p={{ xs: 2, sm: 3, md: 4 }}
            >
              <Typography sx={{ mb: 2 }}>مدت استفاده</Typography>
              <Select
                fullWidth
                labelId="category-select-label"
                id="category-select"
                value={orderInfo.orderDurationId?.toString() || "1"}
                label="محصولات"
                onChange={useDurationChangeHandler}
              >
                {useDurationArray.map(({ value, name }, index) => (
                  <MenuItem value={value} key={index}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </Grid2>
          )}
          {orderInfo.isPrepaid && (
            <Grid2
              xs={12}
              md={5.8}
              component={Paper}
              elevation={0}
              sx={{ border: "0.5px solid #aaa" }}
              p={{ xs: 2, sm: 3, md: 4 }}
            >
              <Typography sx={{ mb: 2 }}>کد تخفیف</Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <DorsaTextField
                  fullWidth
                  variant="outlined"
                  onChange={discountCodeChangeHandler}
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
            </Grid2>
          )}
          {paymentMethod === "1" && (
            <Grid2
              xs={12}
              md={5.8}
              component={Paper}
              elevation={0}
              sx={{ border: "0.5px solid #aaa" }}
              p={{ xs: 2, sm: 3, md: 4 }}
            >
              <Typography sx={{ mb: 3 }}>درگاه پرداخت</Typography>
              <RadioGroup
                value={paymentGateway}
                onChange={paymentGatewayChangeHandler}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="پارسیان"
                />
                <FormControlLabel value="2" control={<Radio />} label="سامان" />
              </RadioGroup>
            </Grid2>
          )}
          <Grid2
            xs={12}
            md={5.8}
            component={Paper}
            elevation={0}
            sx={{ border: "0.5px solid #aaa" }}
            p={{ xs: 2, sm: 3, md: 4 }}
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
          </Grid2>
          <Grid2 xs={12} container justifyContent="center">
            <LoadingButton
              disableElevation
              loading={goToBankPortalLoading}
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
      <form
        action="https://sep.shaparak.ir/payment.aspx"
        method="POST"
        ref={formRef}
      >
        <input ref={formToken} type="hidden" name="Token" value="token" />
        <input
          ref={formRedirectURL}
          type="hidden"
          name="RedirectURL"
          value="redirect"
        />
      </form>
    </>
  );
};

export default OrderDetails;
