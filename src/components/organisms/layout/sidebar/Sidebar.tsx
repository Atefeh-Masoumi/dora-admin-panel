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
      link: "/cdn",
      subList: [
        {
          title: "مدیریت دامنه‌ها",
          link: "/cdn",
        },
        {
          title: "تنظیمات DNS Record",
          link: "/cdn/dnsRecordSettings",
        },
        {
          title: "تنظیمات SSL/TLS",
          link: "/cdn/sslTslSettings",
        },
        {
          title: "تنظیمات Load Balance",
          link: "/cdn/loadBalanceSettings",
        },
        {
          title: "تنظیمات API Gateway",
          link: "/cdn/apiGatewaySettings",
        },
      ],
    },
    {
      title: "Cloud",
      text: "سرویس سرور های ابری",
      Icon: DriverSvg,
      link: "/cloud",
      subList: [{ title: "سرویس سرور‌های ابری", link: "/cloud" }],
    },
    {
      title: "RabbitMQ",
      text: "سرویس RabbitMQ ابری",
      Icon: DeviceMessageSvg,
      link: "/rabbit",
      subList: [{ title: "مدیریت RabbitMQ ابری", link: "/rabbit" }],
    },
    {
      title: "Payment",
      text: "سرویس پرداخت ابری",
      Icon: CoinSvg,
      link: "/payment",
    },
    {
      title: "SMS",
      text: "سرویس پیامک ابری",
      Icon: SmsSvg,
      link: "/sms",
      subList: [
        { title: "خرید بسته پیامکی", link: "/sms" },
        { title: "سرشماره های من", link: "/sms/" },
        { title: "پیام های دریافتی", link: "/sms/" },
        { title: "پیام های ارسالی", link: "/sms/" },
        { title: "ارسال پیامک تکی", link: "/sms/" },
        { title: "ارسال پیامک یک به چند", link: "/sms/" },
        { title: "ارسال پیامک چند به چند", link: "/sms/" },
      ],
    },
    {
      title: "API",
      text: "کلیدهای دسترسی برنامه نویسی",
      Icon: CodeCircleSvg,
      link: "/apis",
    },
    {
      Icon: EmptyWalletSvg,
      link: "/wallet",
      subList: [
        { title: "گزارش کیف پول", link: "/wallet" },
        { title: "گزارش مصرف", link: "/wallet/bills" },
        { title: "گزارش پرداخت ها", link: "/wallet/report" },
        { title: "فاکتور های فروش", link: "/wallet/salesInvoice" },
      ],
    },
    {
      Icon: HeadphoneSvg,
      link: "/support",
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
    if (windowHeight > 920) {
      setShowSpecialOffer(true);
    } else {
      setShowSpecialOffer(false);
    }
  }, [windowHeight]);

  const hideSubLists = useMemo(
    () =>
      pathname === "/" ||
      pathname === "/api" ||
      pathname === "/profile" ||
      pathname === "/setting" ||
      pathname === "/services" ||
      pathname === "/cart" ||
      pathname === "/referral",
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
