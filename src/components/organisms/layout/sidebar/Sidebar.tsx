import { FC, useEffect, useMemo, useState } from "react";
import { Box, Stack } from "@mui/material";
import { BORDER_RADIUS_4 } from "src/configs/theme";
import CloudConnectionSvg from "src/components/atoms/svg/CloudConnectionSvg";
import DriverSvg from "src/components/atoms/svg/DriverSvg";
import DeviceMessageSvg from "src/components/atoms/svg/DeviceMessageSvg";
import CoinSvg from "src/components/atoms/svg/CoinSvg";
import SmsSvg from "src/components/atoms/svg/SmsSvg";
import CodeCircleSvg from "src/components/atoms/svg/CodeCircleSvg";
import { ItemList } from "./ItemList";
import { SubItemList } from "./SubItemList";
import { SpecialOffer } from "./SpecialOffer";
import { sidebarWidth } from "src/components/templates/MainTemplate";
import { sidebarItemType } from "src/types/itemsList.type";
import HeadphoneSvg from "src/components/atoms/svg/HeadphoneSvg";
import CalculatorSvg from "src/components/atoms/svg/CalculatorSvg";
import EmptyWalletSvg from "src/components/atoms/svg/EmptyWalletSvg";
import { useLocation } from "react-router";

type SidebarPropsType = {};

export const Sidebar: FC<SidebarPropsType> = () => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [showSpecialOffer, setShowSpecialOffer] = useState(false);

  const { pathname } = useLocation();

  const listItems: sidebarItemType[] = [
    {
      title: "CDN / DNS",
      text: "شبکه مدیریت و توزیع محتوا",
      Icon: CloudConnectionSvg,
      link: "/dash/cdn",
      subList: [
        {
          title: "مدیریت دامنه‌ها",
          link: "/dash/cdn",
        },
        {
          title: "تنظیمات DNS Record",
          link: "/dash/cdn/dnsRecordSettings",
        },
        {
          title: "تنظیمات SSL/TLS",
          link: "/dash/cdn/sslTslSettings",
        },
        {
          title: "تنظیمات Load Balance",
          link: "/dash/cdn/loadBalanceSettings",
        },
        {
          title: "تنظیمات API Gateway",
          link: "/dash/cdn/apiGatewaySettings",
        },
      ],
    },
    {
      title: "Virtual Machine",
      text: "سرویس سرور های ابری",
      Icon: DriverSvg,
      link: "/dash/vm",
      subList: [{ title: "سرویس سرور‌های ابری", link: "/dash/vm" }],
    },
    {
      title: "RabbitMQ",
      text: "سرویس RabbitMQ ابری",
      Icon: DeviceMessageSvg,
      link: "/dash/rabbit",
      subList: [{ title: "مدیریت RabbitMQ ابری", link: "/dash/rabbit" }],
    },
    // {
    //   title: "Payment",
    //   text: "سرویس پرداخت ابری",
    //   Icon: CoinSvg,
    //   link: "/dash/payment",
    // },
    // {
    //   title: "SMS",
    //   text: "سرویس پیامک ابری",
    //   Icon: SmsSvg,
    //   link: "/dash/sms",
    //   subList: [
    //     { title: "خرید بسته پیامکی", link: "/dash/sms" },
    //     { title: "سرشماره های من", link: "/dash/sms/" },
    //     { title: "پیام های دریافتی", link: "/dash/sms/" },
    //     { title: "پیام های ارسالی", link: "/dash/sms/" },
    //     { title: "ارسال پیامک تکی", link: "/dash/sms/" },
    //     { title: "ارسال پیامک یک به چند", link: "/dash/sms/" },
    //     { title: "ارسال پیامک چند به چند", link: "/dash/sms/" },
    //   ],
    // },
    // {
    //   title: "API",
    //   text: "کلیدهای دسترسی برنامه نویسی",
    //   Icon: CodeCircleSvg,
    //   link: "/dash/apis",
    // },
    {
      Icon: EmptyWalletSvg,
      link: "/dash/portal/billing",
      subList: [
        { title: "گزارش کیف پول", link: "/dash/portal/billing/wallet" },
        { title: "گزارش مصرف", link: "/dash/portal/billing/user-bills" },
        { title: "گزارش پرداخت ها", link: "/dash/portal/billing/payments" },
        { title: "فاکتور های فروش", link: "/dash/portal/billing/invoices" },
      ],
    },
    {
      Icon: HeadphoneSvg,
      link: "/dash/portal/supports",
      subList: [{ title: "مرکز پشتیبانی", link: "/dash/portal/supports" }],
    },
    {
      Icon: CalculatorSvg,
      link: "/calculator",
    },
  ];

  const windowHeightWatcher = () => {
    setWindowHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", windowHeightWatcher);
    return () => {
      window.removeEventListener("resize", windowHeightWatcher);
    };
  }, []);

  useEffect(() => {
    setShowSpecialOffer(windowHeight > 920);
  }, [windowHeight]);

  const hideSubLists = useMemo(
    () =>
      pathname === "/dash/index" ||
      pathname === "/dash/api" ||
      pathname === "/dash/portal/profile" ||
      pathname === "/dash/portal/setting" ||
      pathname === "/dash/portal/user-service" ||
      pathname === "/dash/portal/order" ||
      pathname === "/dash/portal/referral",
    [pathname]
  );

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        bgcolor: "white",
        borderRadius: BORDER_RADIUS_4,
        height: { xs: "100vh", lg: "calc(100vh - 36px)" },
      }}
    >
      {!hideSubLists && <SubItemList listItems={listItems} />}
      <Stack
        justifyContent="space-between"
        sx={{
          transition: "width 0.5s",
          width: !hideSubLists ? 90 : sidebarWidth,
          p: 3,
          boxShadow: "0px 32px 64px rgba(17, 17, 17, 0.08)",
          height: "100%",
          overflow: "auto",
          borderRadius: BORDER_RADIUS_4,
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <ItemList listItems={listItems} />
        {hideSubLists && showSpecialOffer && <SpecialOffer />}
      </Stack>
    </Box>
  );
};
