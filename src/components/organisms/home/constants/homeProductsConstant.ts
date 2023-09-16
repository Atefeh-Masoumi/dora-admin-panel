// import CodeCircleSvg from "src/components/atoms/svg/CodeCircleSvg";
// import SmsSvg from "src/components/atoms/svg/SmsSvg";
import CoinSvg from "src/components/atoms/svg/CoinSvg";
import DeviceMessageSvg from "src/components/atoms/svg/DeviceMessageSvg";
import DriverSvg from "src/components/atoms/svg/DriverSvg";
import CloudConnectionSvg from "src/components/atoms/svg/CloudConnectionSvg";
import { BuildingSvg } from "src/components/atoms/svg/BuildingSvg";
import { StorageOutlined } from "@mui/icons-material";
import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined";

export const homeProductsConstantListItems = [
  {
    title: "CDN / DNS",
    text: "شبکه مدیریت و توزیع محتوا",
    Icon: CloudConnectionSvg,
    bgcolor: "rgba(60, 138, 255, 0.08)",
    link: "/cdn",
  },
  {
    title: "Virtual Machine",
    text: "سرویس سرور های ابری",
    Icon: DriverSvg,
    bgcolor: "rgba(211, 237, 224, 1)",
    link: "/vm",
  },
  {
    title: "Kubernetes",
    text: "سرویس کوبرنتیز ابری",
    Icon: DnsOutlinedIcon,
    bgcolor: "rgba(211, 250, 240, 1)",
    link: "/platform",
  },

  {
    title: "Object Storage",
    text: "فضای ابری",
    Icon: StorageOutlined,
    bgcolor: "rgba(140, 69, 255, 0.1)",
    link: "/storage",
  },
  {
    title: "Web Hosting",
    text: "سرویس هاستینگ ابری",
    Icon: CoinSvg,
    bgcolor: "rgba(230, 69, 80, 0.2)",
    link: "/web",
  },
  {
    title: "Domain Registration",
    text: "ثبت/تمدید دامنه",
    Icon: BuildingSvg,
    bgcolor: "rgba(159, 69, 255, 0.2)",
    link: "/domain",
  },
  // {
  //   title: "SMS",
  //   text: "سرویس پیامک ابری",
  //   Icon: SmsSvg,
  //   bgcolor: "rgba(159, 69, 255, 0.2)",
  //   link: "/sms",
  // },
  // {
  //   title: "API",
  //   text: "کلیدهای دسترسی برنامه نویسی",
  //   Icon: CodeCircleSvg,
  //   bgcolor: "rgba(255, 69, 242, 0.2)",
  //   link: "/apis",
  // },
  {
    title: "RabbitMQ",
    text: "سرویس RabbitMQ ابری",
    Icon: DeviceMessageSvg,
    bgcolor: "rgba(255, 233, 218, 1)",
    link: "/rabbit",
  },
];
