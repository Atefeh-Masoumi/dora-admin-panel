import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import type { FC } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useGetApiMyPortalProductItemListByProductIdQuery } from "src/app/services/api.generated";
import ReceiptItem from "src/components/atoms/svg-icons/ReceiptItem.svg";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { PRODUCT_CATEGORY_ENUM } from "src/constant/productCategoryEnum";
import { priceToPersian } from "src/utils/priceToPersian";

const receiptImage = (
  <Box
    sx={{
      p: 1,
      bgcolor: "rgba(60, 138, 255, 0.04)",
      borderRadius: "50px",
      width: "p5px",
      height: "p5px",
    }}
  >
    <Box
      sx={{
        p: 2.5,
        bgcolor: "rgba(60, 138, 255, 0.08);",
        borderRadius: "50px",
        width: "85px",
        height: "85px",
      }}
    >
      <img
        src={ReceiptItem}
        style={{ width: "100%", height: "100%" }}
        alt="receipt"
      />
    </Box>
  </Box>
);

const topBoxRow_3section = (
  txt1: string,
  txt2: string | number,
  txt3: string
) => (
  <Stack
    sx={{ width: "100%" }}
    direction="row"
    alignItems="center"
    justifyContent="space-between"
  >
    <Typography variant="text13" color="#6E768A" sx={{ width: "40%" }}>
      {txt1}
    </Typography>
    <Typography
      variant="text13"
      color="#6E768A"
      sx={{ width: "20%" }}
      align="center"
    >
      {txt2}
    </Typography>
    <Typography
      variant="text13"
      color="#6E768A"
      sx={{ width: "40%" }}
      align="right"
    >
      {txt3}
    </Typography>
  </Stack>
);

const topBoxRow_2section = (txt1: string, txt2: string) => (
  <Stack
    sx={{ width: "100%" }}
    direction="row"
    alignItems="center"
    justifyContent="space-between"
  >
    <Typography variant="text13" color="#6E768A" sx={{ width: "180px" }}>
      {txt1}
    </Typography>
    <Typography variant="text13" color="#6E768A" align="right">
      {priceToPersian(txt2)}
    </Typography>
  </Stack>
);

const circles = {
  width: 20,
  height: 24,
};

const chain = {
  width: 16,
  height: 3,
};

const spaceBetweenCircles = 6;
const spaceBetweenChains = 4;

type ReceiptPropsType = {
  memory: number;
  cpu: number;
  disk: number;
  ipv4: number;
  ipv6: number;
  server: number;
};

const VmReceipt: FC<ReceiptPropsType> = ({
  memory,
  cpu,
  disk,
  ipv4,
  ipv6,
  server,
}) => {
  const navigate = useNavigate();
  const { data: vmData } = useGetApiMyPortalProductItemListByProductIdQuery({
    productId: PRODUCT_CATEGORY_ENUM.VM,
  });

  const [receiptWidth, setReceiptWidth] = useState(0);

  const monthHours = 24 * 30;

  // cpu price
  const singleCpuPrice = vmData?.find((item) => item.id === 101)?.price;
  const cpuPrice = cpu * singleCpuPrice!;

  // memory price
  const singleMemoryPrice = vmData?.find((item) => item.id === 102)?.price;
  const memoryPrice = memory * singleMemoryPrice!;

  // disk price
  const singleDiskPrice = vmData?.find((item) => item.id === 103)?.price;
  const diskPrice = disk * singleDiskPrice!;

  // ipv4 price
  const singleIPV4Price = vmData?.find((item) => item.id === 104)?.price;
  const ipv4Price = ipv4 * singleIPV4Price!;

  // ipv6 price
  const singleIPV6Price = vmData?.find((item) => item.id === 105)?.price;
  const ipv6Price = ipv6 * singleIPV6Price!;

  const monthlyAmountPrice =
    memoryPrice + cpuPrice + diskPrice + ipv4Price + ipv6Price;

  const hourlyAmountPrice = (monthlyAmountPrice / monthHours).toFixed();

  const totalPrice = monthlyAmountPrice * server;

  const receiptRef = useRef(null);

  const onWidthChange = () => {
    if (!receiptRef.current) return;
    setReceiptWidth((receiptRef.current as any)?.getBoundingClientRect().width);
  };

  useEffect(() => {
    if (!receiptRef.current) return;
    setReceiptWidth((receiptRef.current as any)?.getBoundingClientRect().width);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", onWidthChange);
    return () => {
      window.removeEventListener("resize", onWidthChange);
    };
  }, []);

  const circleCount = useMemo(() => {
    if (receiptWidth === 0 || !receiptWidth) return 0;
    return Math.ceil(receiptWidth / (circles.width + spaceBetweenCircles + 2));
  }, [receiptWidth]);

  const chainCount = useMemo(() => {
    if (receiptWidth === 0 || !receiptWidth) return 0;
    return Math.ceil(receiptWidth / (chain.width + spaceBetweenChains + 4));
  }, [receiptWidth]);

  const bottomCircles = (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{
        height: circles.height,
        width: "100%",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        transform: "translateY(65%)",
      }}
      columnGap={spaceBetweenCircles + "px"}
    >
      {[...Array(circleCount)].map((_, index) => (
        <Box
          key={index}
          sx={{
            width: circles.width,
            height: circles.height,
            borderRadius: "50px",
            bgcolor: "#f5f5f5",
            borderTop: "1px solid #DCE7FD",
          }}
        />
      ))}
    </Stack>
  );

  const divider = (
    <Stack
      direction="row"
      sx={{ position: "relative", height: "40px" }}
      justifyContent="center"
      alignItems="center"
      columnGap={spaceBetweenChains + "px"}
    >
      <Box
        sx={{
          position: "absolute",
          width: "40px",
          height: "40px",
          bgcolor: "#f5f5f5",
          right: 0,
          top: 0,
          bottom: 0,
          transform: "translateX(65%)",
          borderLeft: "1px solid #DCE7FD",
          borderRadius: "50px",
        }}
      />
      {[...Array(chainCount)].map((_, index) => (
        <Box
          key={index}
          sx={{
            width: chain.width,
            height: chain.height,
            borderRadius: "5px",
            bgcolor: "transparent",
            border: "1px solid #DCE7FD",
          }}
        />
      ))}
      <Box
        sx={{
          position: "absolute",
          width: "40px",
          height: "40px",
          bgcolor: "#f5f5f5",
          left: 0,
          top: 0,
          bottom: 0,
          transform: "translateX(-65%)",
          borderRight: "1px solid #DCE7FD",
          borderRadius: "50px",
        }}
      />
    </Stack>
  );

  return (
    <Paper
      ref={receiptRef}
      elevation={0}
      sx={{
        position: "relative",
        bgcolor: "white",
        pb: 3,
        // border: "1px solid #DCE7FD",
        borderTopRightRadius: BORDER_RADIUS_1,
        borderTopLeftRadius: BORDER_RADIUS_1,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
      }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ p: 2.4 }}>
        {receiptImage}
        <Typography
          variant="text1"
          color="primary"
          fontWeight={700}
          sx={{ mt: 1, mb: 2.7 }}
        >
          صورتحساب پرداختی
        </Typography>
        <Stack rowGap={1} sx={{ width: "100%" }}>
          {topBoxRow_3section("تخمین مبلغ ساعتی", "تعداد منابع", "مبلغ (ریال)")}
          {topBoxRow_3section(
            "Memory (GB)",
            memory,
            priceToPersian(memoryPrice)
          )}
          {topBoxRow_3section("CPU (Core)", cpu, priceToPersian(cpuPrice))}
          {topBoxRow_3section("Disk (GB)", disk, priceToPersian(diskPrice))}
          {topBoxRow_3section("IPv4", ipv4, priceToPersian(ipv4Price))}
          {topBoxRow_3section("IPv6", ipv6, "رایگان")}
          <Divider
            orientation="horizontal"
            flexItem
            sx={{
              borderColor: "rgba(110, 118, 138, 0.08)",
              my: 1,
            }}
          />
          {topBoxRow_2section("مبلغ ساعتی ماشین", hourlyAmountPrice)}
          {topBoxRow_2section(
            "مبلغ ماهیانه (۳۰ روزه) ماشین",
            String(monthlyAmountPrice)
          )}
        </Stack>
      </Stack>
      {divider}
      <Stack sx={{ p: 2.4 }} rowGap={3}>
        <Stack rowGap={1}>
          {topBoxRow_2section("ماشین مجازی", priceToPersian(server))}
          <Stack
            sx={{ width: "100%" }}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="text13" color="#6E768A">
              مبلغ کل فاکتور
            </Typography>
            <Typography variant="text13" color="#6E768A" fontWeight={700}>
              {priceToPersian(totalPrice)} ریال
            </Typography>
          </Stack>
        </Stack>
        <Button
          variant="contained"
          onClick={() => navigate("/vm")}
          size="large"
          sx={{ padding: "5px" }}
          fullWidth
        >
          ایجاد سرور ابری
        </Button>
      </Stack>
      {bottomCircles}
    </Paper>
  );
};

export default VmReceipt;
