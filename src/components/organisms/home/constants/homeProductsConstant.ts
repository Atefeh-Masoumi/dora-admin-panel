import CodeCircleSvg from "src/components/atoms/svg/CodeCircleSvg";
import SmsSvg from "src/components/atoms/svg/SmsSvg";
import CoinSvg from "src/components/atoms/svg/CoinSvg";
import DeviceMessageSvg from "src/components/atoms/svg/DeviceMessageSvg";
import DriverSvg from "src/components/atoms/svg/DriverSvg";
import CloudConnectionSvg from "src/components/atoms/svg/CloudConnectionSvg";

export const homeProductsConstantListItems = [
  {
    title: "CDN / DNS",
    text: "شبکه مدیریت و توزیع محتوا",
    Icon: CloudConnectionSvg,
    bgcolor: "rgba(60, 138, 255, 0.08)",
    link: "/dash/cdn",
  },
  {
    title: "Virtual Machine",
    text: "سرویس سرور های ابری",
    Icon: DriverSvg,
    bgcolor: "rgba(211, 237, 224, 1)",
    link: "/dash/vm",
  },
  {
    title: "RabbitMQ",
    text: "سرویس RabbitMQ ابری",
    Icon: DeviceMessageSvg,
    bgcolor: "rgba(255, 233, 218, 1)",
    link: "/dash/rabbit",
  },
  // {
  //   title: "Payment",
  //   text: "سرویس پرداخت ابری",
  //   Icon: CoinSvg,
  //   bgcolor: "rgba(255, 69, 80, 0.2)",
  //   link: "/dash/payment",
  // },
  // {
  //   title: "SMS",
  //   text: "سرویس پیامک ابری",
  //   Icon: SmsSvg,
  //   bgcolor: "rgba(159, 69, 255, 0.2)",
  //   link: "/dash/sms",
  // },
  // {
  //   title: "API",
  //   text: "کلیدهای دسترسی برنامه نویسی",
  //   Icon: CodeCircleSvg,
  //   bgcolor: "rgba(255, 69, 242, 0.2)",
  //   link: "/dash/apis",
  // },
];
