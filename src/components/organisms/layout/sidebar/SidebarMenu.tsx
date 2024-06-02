import { FC, useMemo } from "react";
import { Box, Stack } from "@mui/material";
import { useLocation } from "react-router";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { sidebarWidth } from "src/components/templates/MainTemplate";
import { sidebarItemType } from "src/types/itemsList.type";
import { ItemList } from "./ItemList";
import { SubItemList } from "./SubItemList";
import { CloudConnectionSvg } from "src/components/atoms/svg-icons/CloudConnectionSvg";
import { WalletSvg } from "src/components/atoms/svg-icons/WalletSvg";
import { VmSvg } from "src/components/atoms/svg-icons/VmSvg";
import { ObjectStorageSvg } from "src/components/atoms/svg-icons/ObjectStorageSvg";
import { KubernetesSvg } from "src/components/atoms/svg-icons/KubernetesSvg";
import { CdnSvg } from "src/components/atoms/svg-icons/CdnSvg";
import { WebHostSvg } from "src/components/atoms/svg-icons/WebHostSvg";

type SidebarPropsType = {};

export const Sidebar: FC<SidebarPropsType> = () => {
  const { pathname } = useLocation();

  const listItems: sidebarItemType[] = [
    {
      title: "CDN / DNS",
      text: "شبکه مدیریت و توزیع محتوا",
      Icon: CloudConnectionSvg,
      link: "/cdn",
      // subList: [
      //   {
      //     title: "مدیریت دامنه‌ها",
      //     link: "/cdn",
      //   },
      //   {
      //     title: "مشخصات دامنه",
      //     link: "/cdn/overview",
      //   },
      //   {
      //     title: "تنظیمات",
      //     link: "/cdn/ssl-tls-settings",
      //   },
      //   {
      //     title: "آنالیز ترافیک",
      //     link: "/cdn/analytics",
      //   },
      //   {
      //     title: "تنظیمات DNS Record",
      //     link: "/cdn/dns-record-settings",
      //   },
      //   {
      //     title: "تنظیمات Load Balance",
      //     link: "/cdn/load-balance-settings",
      //   },
      // ],
    },
    {
      title: "Virtual Machine",
      text: "سرور های ابری",
      Icon: VmSvg,
      link: "/vm",
      subList: [{ title: "مدیریت سرورها", link: "/vm" }],
    },
    {
      title: "Kubernetes",
      text: "سرویس کوبرنتیز ابری",
      Icon: KubernetesSvg,
      link: "/kubernetes",
      subList: [{ title: "مدیریت کوبرنتیز ابری", link: "/kubernetes" }],
    },
    {
      title: "Object Storage",
      text: "فضای ابری",
      Icon: ObjectStorageSvg,
      link: "/storage",
      subList: [{ title: "مدیریت فضای ابری", link: "/storage" }],
    },
    {
      title: "Web Hosting",
      text: "هاستینگ ابری",
      Icon: WebHostSvg,
      link: "/web",
      subList: [{ title: "مدیریت هاستینگ ابری", link: "/web" }],
    },
    {
      title: "Domain Registration",
      text: "ثبت/تمدید دامنه",
      Icon: CdnSvg,
      link: "/domain",
      subList: [{ title: "ثبت/تمدید دامنه", link: "/domain" }],
    },
    // {
    //   title: "RabbitMQ",
    //   text: "سرویس RabbitMQ ابری",
    //   Icon: DeviceMessageSvg,
    //   link: "/rabbit",
    //   subList: [{ title: "مدیریت RabbitMQ ابری", link: "/rabbit" }],
    // },
    // {
    //   title: "SMS",
    //   text: "سرویس پیامک ابری",
    //   Icon: SmsSvg,
    //   link: "/sms",
    //   subList: [
    //     { title: "خرید بسته پیامکی", link: "/sms" },
    //     { title: "سرشماره های من", link: "/sms/" },
    //     { title: "پیام های دریافتی", link: "/sms/" },
    //     { title: "پیام های ارسالی", link: "/sms/" },
    //     { title: "ارسال پیامک تکی", link: "/sms/" },
    //     { title: "ارسال پیامک یک به چند", link: "/sms/" },
    //     { title: "ارسال پیامک چند به چند", link: "/sms/" },
    //   ],
    // },
    // {
    //   title: "API",
    //   text: "کلیدهای دسترسی برنامه نویسی",
    //   Icon: CodeCircleSvg,
    //   link: "/apis",
    // },
    {
      Icon: WalletSvg,
      link: "/portal/wallet",
      subList: [
        { title: "گزارش کیف پول", link: "/portal/wallet" },
        { title: "فاکتور های فروش", link: "/portal/wallet/invoice" },
        { title: "گزارش پرداخت ها", link: "/portal/wallet/payment" },
        { title: "گزارش محاسبات", link: "/portal/wallet/bill" },
      ],
    },
    // {
    //   Icon: HeadphoneSvg,
    //   link: "/portal/supports",
    // },
    // {
    //   Icon: CalculatorSvg,
    //   link: "/portal/calculator",
    // },
  ];

  // const windowHeightWatcher = () => {
  //   setWindowHeight(window.innerHeight);
  // };

  // useEffect(() => {
  //   window.addEventListener("resize", windowHeightWatcher);
  //   return () => {
  //     window.removeEventListener("resize", windowHeightWatcher);
  //   };
  // }, []);

  // useEffect(() => {
  //   setShowSpecialOffer(windowHeight > 920);
  // }, [windowHeight]);

  const hideSubLists = useMemo(
    () =>
      pathname === "/" ||
      pathname === "/portal/calculator" ||
      pathname === "/portal/supports" ||
      pathname === "/portal/profile" ||
      pathname === "/portal/setting" ||
      pathname === "/portal/customer-products" ||
      pathname === "/portal/referral" ||
      pathname === "/portal/notifications",
    [pathname]
  );

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        bgcolor: "white",
        borderRadius: BORDER_RADIUS_1,
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
          overflowY: "auto",
          overflowX: "hidden",
          borderRadius: BORDER_RADIUS_1,
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <ItemList listItems={listItems} />
        {/* {hideSubLists && showSpecialOffer && <SpecialOffer />} */}
      </Stack>
    </Box>
  );
};
