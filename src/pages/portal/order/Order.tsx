import {
  ChangeEvent,
  ChangeEventHandler,
  FC,
  Fragment,
  useMemo,
  useState,
  useEffect,
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
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import PageLoading from "src/components/atoms/PageLoading";
import { DorsaTextField } from "src/components/atoms/DorsaTextField";
import { priceToPersian } from "src/utils/priceToPersian";
import {
  usePostUserV2PortalInvoicePayMutation,
  usePutUserV2PortalInvoicePaymentTypeMutation,
  usePutUserV2PortalInvoiceDurationMutation,
  usePutUserV2PortalInvoiceVoucherMutation,
  useGetUserV2PortalInvoiceGetByIdQuery,
  GetInvoiceResponse
} from "src/app/services/api.generated";

const useDurationArray = [
  { name: "یک ماه", value: "1" },
  { name: "سه ماه", value: "2" },
  { name: "شش ماه", value: "3" },
  { name: "یک ساله", value: "4" },
];

type OrderDetailsPropsType = {};

const OrderDetails: FC<OrderDetailsPropsType> = () => {
  const [invoicePaymentTypeId, setInvoicePaymentTypeId] = useState(1);
  const [paymentGateway, setPaymentGateway] = useState(1);
  const [discountCode, setDiscountCode] = useState("");

  const navigate = useNavigate();

  const { id } = useParams();

  const { data, isLoading: getOrderInfoLoading } = useGetUserV2PortalInvoiceGetByIdQuery({
    id: Number(id),
  });

  useEffect(() => {
    if (!data || !data.invoicePaymentTypeId) return;
    setInvoicePaymentTypeId(data.invoicePaymentTypeId);
  }, [data]);

  const [changePaymentMethod, { isLoading: changePaymentMethodLoading }] = usePutUserV2PortalInvoicePaymentTypeMutation();
  const [changeOrderDuration, { isLoading: changeOrderDurationLoading }] = usePutUserV2PortalInvoiceDurationMutation();
  const [goToBankPortal, { isLoading: goToBankPortalLoading }] = usePostUserV2PortalInvoicePayMutation();
  const [applyDiscountCode, { isLoading: applyDiscountCodeLoading }] = usePutUserV2PortalInvoiceVoucherMutation();

  const orderInfo: GetInvoiceResponse = useMemo(() => data || {}, [data]);

  if (!id || (!data && !getOrderInfoLoading)) return <Navigate to="/dash" />;

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
      value: orderInfo.invoiceDate,
    },
    {
      name: "وضعیت",
      value: orderInfo.invoiceStatus,
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
      value: orderInfo.invoicePrice,
    },
    {
      name: "حداقل موجودی کیف پول برای انجام عملیات",
      value: orderInfo.invoicePrice ? Math.round(orderInfo.invoicePrice / 10) : 0,
    },
    {
      name: "مبلغ قابل پرداخت",
      value: orderInfo.invoicePrice,
    },
  ];

  const billTypeChangeHandler = (
    _: ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    changePaymentMethod({
      invoicePaymentTypeModel: { id: orderInfo!.id, isPrepaid: value === "1" },
    })
      .unwrap()
      .then(() => {
        toast.success("تغییرات با موفقیت اعمال شد");
      });
  };

  const paymentMethodChangeHandler = (
    _: ChangeEvent<HTMLInputElement>,
    value: string
  ) => setInvoicePaymentTypeId(parseInt(value));

  const useDurationChangeHandler = (event: SelectChangeEvent<string>) => {
    if (!event.target.value) return;
    changeOrderDuration({
      invoiceDurationModel: {
        id: orderInfo!.id,
        orderDurationId: Number(event.target.value),
      },
    })
      .unwrap()
      .then(() => toast.success("تغییرات با موفقیت اعمال شد"));
  };

  const discountCodeChangeHandler: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    setDiscountCode(event.target.value);
  };

  const paymentGatewayChangeHandler = (
    _: ChangeEvent<HTMLInputElement>,
    value: string
  ) => setPaymentGateway(parseInt(value));

  const applyDiscountHandler = () => {
    if (!discountCode || !orderInfo.id) return;
    applyDiscountCode({
      invoiceVoucherModel: {
        id: orderInfo.id,
        voucherCode: discountCode,
      },
    })
      .unwrap()
      .then(() => toast.success("کد تخفیف با موفقیت اعمال شد"));
  };

  const submitHandler = () => {
    if (!orderInfo) return;

    goToBankPortal({
      invoicePayModel: {
        id: orderInfo.id,
        invoicePaymentTypeId: Number(invoicePaymentTypeId),
        paymentProviderId: Number(paymentGateway)
      },
    }).unwrap()
      .then((res) => {
        if (!res || !res.location || !res.status) return;

        if (res.invoicePaymentTypeId === 2) {
          navigate("/dash");
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
                    index === 4 && orderInfo.invoiceStatusId === 1
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
              <FormControlLabel value="1" control={<Radio />} label="پیش پرداخت (پرداخت کامل فاکتور)" />
              <FormControlLabel value="2" control={<Radio />} label="پرداخت بر اساس مصرف" />
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
              value={invoicePaymentTypeId}
              onChange={paymentMethodChangeHandler}
            >
              <FormControlLabel value="1" control={<Radio />} label="پرداخت آنلاین" />
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
          {invoicePaymentTypeId === 1 && (
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
                <FormControlLabel value="1" control={<Radio />} label="پارسیان" />
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
    </>
  );
};

export default OrderDetails;
