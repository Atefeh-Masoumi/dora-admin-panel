import { CloudConnectionSvg } from "src/components/atoms/svg-icons/CloudConnectionSvg";
import { KubernetesSvg } from "src/components/atoms/svg-icons/KubernetesSvg";
import { ObjectStorageSvg } from "src/components/atoms/svg-icons/ObjectStorageSvg";
import { VmSvg } from "src/components/atoms/svg-icons/VmSvg";
import { WebHostSvg } from "src/components/atoms/svg-icons/WebHostSvg";

export const homeProductsConstantListItems = [
  // {
  //   title: "CDN / DNS",
  //   text: "شبکه مدیریت و توزیع محتوا",
  //   Icon: CloudConnectionSvg,
  //   bgcolor: "rgba(60, 138, 255, 0.08)",
  //   link: "/cdn",
  // },
  {
    title: "Virtual Machine",
    text: "سرویس سرور های ابری",
    Icon: VmSvg,
    bgcolor: "rgba(211, 237, 224, 1)",
    link: "/vm",
  },
  {
    title: "Kubernetes",
    text: "سرویس کوبرنتیز ابری",
    Icon: KubernetesSvg,
    bgcolor: "rgba(211, 250, 240, 1)",
    link: "/kubernetes-cluster",
  },
  {
    title: "Object Storage",
    text: "فضای ابری",
    Icon: ObjectStorageSvg,
    bgcolor: "rgba(140, 69, 255, 0.1)",
    link: "/storage",
  },
  {
    title: "Private Cloud",
    text: "ابر اختصاصی مجازی",
    Icon: WebHostSvg,
    bgcolor: "rgba(230, 69, 80, 0.2)",
    link: "/vpc",
  },
  // {
  //   title: "Domain",
  //   text: "ثبت/تمدید دامنه",
  //   Icon: CdnSvg,
  //   bgcolor: "rgba(159, 69, 255, 0.2)",
  //   link: "/domain",
  // },
  // {
  //   title: "VPC",
  //   text: "ابر اختصاصی",
  //   Icon: VpcSvg,
  //   bgcolor: "rgb(252 76 6 / 20%)",
  //   link: "/vpc",
  // },
];
