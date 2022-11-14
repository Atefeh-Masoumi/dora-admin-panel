import { FC, useEffect, useState } from "react";
import {
  Button,
  Chip,
  Divider,
  Grid,
  LinearProgress,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { invoiceTableStruct } from "src/components/organisms/tables/wallet/invoices/struct";
import { invoiceTableRow } from "src/components/organisms/tables/wallet/invoices/InvoicesTableRow";
import { BaseTable } from "src/components/organisms/tables/BaseTable";
import { useGetApiV2PortalInvoiceGetByIdQuery } from "src/app/services/api.generated";
import { useParams } from "react-router-dom";
import moment from "jalali-moment";
import { priceToPersian } from "src/utils/priceToPersian";

const Invoice: FC = () => {
  const { id } = useParams();
  const { data: invoiceItem, isLoading } = useGetApiV2PortalInvoiceGetByIdQuery(
    { id: parseInt(id as string) }
  );

  const payInvoice = [
    {
      label: "جمع کل",
      value: priceToPersian(invoiceItem?.totalPrice as number),
    },
    { label: "تخفیف", value: priceToPersian(invoiceItem?.discount as number) },
    {
      label: "مالیات بر ارزش افزوده",
      value: priceToPersian(invoiceItem?.vat as number),
    },
  ];

  const [date, setDate] = useState("");
  useEffect(() => {
    if (!invoiceItem || !invoiceItem.invoiceDate) return;
    const m = moment
      .from(invoiceItem.invoiceDate, "fa", "YYYY/MM/DD HH:mm:ss")
      .locale("fa")
      .format("YYYY/MM/DD");
    setDate(m);
  }, [invoiceItem]);

  return (
    <Stack spacing={2}>
      <Stack
        borderRadius={2}
        spacing={3}
        bgcolor="white"
        p={{ xs: 1.8, lg: 3 }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" spacing={2} alignItems="center">
            {isLoading ? (
              <Stack width={100}>
                <LinearProgress />
              </Stack>
            ) : (
              <Stack
                direction={{ xs: "column", md: "row" }}
                alignItems={{ xs: "start", md: "center" }}
                spacing={{ xs: 0, md: 2 }}
              >
                <Typography
                  fontWeight={700}
                  variant="text1"
                  color="secondary"
                  whiteSpace="nowrap"
                >
                  فاکتور شماره {invoiceItem?.id}
                </Typography>
                <Button sx={{ p: 0 }}>
                  <Typography color="primary" variant="text15">
                    دانلود فاکتور
                  </Typography>
                </Button>
              </Stack>
            )}
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center">
            {isLoading ? (
              <Stack width={200}>
                <LinearProgress />
              </Stack>
            ) : (
              <Stack
                display={{ xs: "none", md: "flex" }}
                direction="row"
                spacing={1}
                sx={{ color: "secondary.main" }}
              >
                <Typography variant="text13">تاریخ ایجاد: {date}</Typography>
              </Stack>
            )}
            {isLoading ? (
              <Skeleton
                variant="rectangular"
                height={40}
                width={80}
                sx={{ bgcolor: "secondary.light", borderRadius: 2 }}
              />
            ) : (
              <Chip
                label={invoiceItem?.invoiceStatus}
                sx={{
                  backgroundColor:
                    invoiceItem?.invoiceStatusId === 2
                      ? "success.light"
                      : "error.light",
                  color:
                    invoiceItem?.invoiceStatusId === 2
                      ? "success.main"
                      : "error.main",
                  py: { xs: 1.5, md: 2.5 },
                  borderRadius: 1,
                  fontSize: { xs: 12, md: 14 },
                }}
              />
            )}
          </Stack>
        </Stack>

        <Stack
          display={{ xs: "flex", md: "none" }}
          direction="row"
          spacing={1}
          sx={{ color: "secondary.main" }}
        >
          <Typography fontSize={10}>تاریخ ایجاد: {date}</Typography>
        </Stack>

        <Grid container rowGap={2}>
          <Grid item width="100%">
            <Grid container direction={{ xs: "column", md: "row" }} rowGap={1}>
              <Grid item md={2}>
                {isLoading ? (
                  <Stack width={120} py={1}>
                    <LinearProgress />
                  </Stack>
                ) : (
                  <Typography variant="text9">
                    نام خریدار: {invoiceItem?.customerName}
                  </Typography>
                )}
              </Grid>
              <Grid item md={4}>
                {isLoading ? (
                  <Stack width={120} py={1}>
                    <LinearProgress />
                  </Stack>
                ) : (
                  <Typography variant="text9">
                    شماره تماس: {invoiceItem?.customerPhone}
                  </Typography>
                )}
              </Grid>
              <Grid item md>
                {isLoading ? (
                  <Stack width={320} py={1}>
                    <LinearProgress />
                  </Stack>
                ) : (
                  <Typography variant="text9">
                    آدرس: {invoiceItem?.customerAddress}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item width="100%">
            <Grid container direction={{ xs: "column", md: "row" }} rowGap={1}>
              <Grid item md={2}>
                <Typography variant="text9">
                  نام فروشنده: {invoiceItem?.sellerName}
                </Typography>
              </Grid>
              <Grid item md={4}>
                <Typography variant="text9">
                  شماره تماس: {invoiceItem?.sellerPhone}
                </Typography>
              </Grid>
              <Grid item md>
                <Typography variant="text9">
                  آدرس: {invoiceItem?.sellerAddress}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />
        <Stack>
          <BaseTable
            struct={invoiceTableStruct}
            RowComponent={invoiceTableRow}
            rows={invoiceItem?.invoiceItems || []}
            text="فاکتور موجود نیست"
            isLoading={isLoading}
          />
        </Stack>
      </Stack>
      <Stack direction="row" justifyContent="end">
        <Stack
          borderRadius={2}
          bgcolor="white"
          p={1.5}
          width="100%"
          maxWidth={500}
        >
          <Stack direction="column" spacing={1.5}>
            <Stack direction="column">
              {payInvoice.map((invoice, index) => (
                <Stack
                  key={index}
                  borderRadius={1}
                  direction="row"
                  justifyContent="space-between"
                  p={2}
                  bgcolor={index === 1 ? "white" : "#F0F7FF"}
                  fontSize={14}
                  color="#6E768A"
                >
                  <Typography>{invoice.label}</Typography>
                  <Typography>{invoice.value} ریال</Typography>
                </Stack>
              ))}
            </Stack>
            <Divider sx={{ borderColor: "rgba(91, 104, 119, 0.1)", mb: 1.3 }} />
            <Stack
              borderRadius={1}
              direction="row"
              justifyContent="space-between"
              p={2}
              color="#6E768A"
            >
              <Typography fontWeight={700} fontSize={16}>
                مبلغ قابل پرداخت
              </Typography>
              <Typography fontWeight={700} fontSize={16}>
                {priceToPersian(invoiceItem?.invoicePrice as number)} ریال
              </Typography>
            </Stack>
            {/* <Button fullWidth size="large" variant="contained" sx={{ py: 1.5 }}>
              پرداخت آنلاین فاکتور
            </Button> */}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Invoice;
