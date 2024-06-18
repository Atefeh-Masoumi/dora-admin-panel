import { Box, Stack } from "@mui/material";
import { FC } from "react";
import { CdnSvg } from "src/components/atoms/svg-icons/CdnSvg";
import { CloudConnectionSvg } from "src/components/atoms/svg-icons/CloudConnectionSvg";
import { KubernetesSvg } from "src/components/atoms/svg-icons/KubernetesSvg";
import { ObjectStorageSvg } from "src/components/atoms/svg-icons/ObjectStorageSvg";
import { VmSvg } from "src/components/atoms/svg-icons/VmSvg";
import { WalletSvg } from "src/components/atoms/svg-icons/WalletSvg";
import { WebHostSvg } from "src/components/atoms/svg-icons/WebHostSvg";
import { sidebarWidth } from "src/components/templates/MainTemplate";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { sidebarItemType } from "src/types/itemsList.type";
import { ItemList } from "./ItemList";
import { SpecialOffer } from "./SpecialOffer";

type SidebarPropsType = {};

const listItems: sidebarItemType[] = [
  {
    title: "CDN / DNS",
    text: "شبکه مدیریت و توزیع محتوا",
    Icon: CloudConnectionSvg,
    link: "/cdn",
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
    text: "سرویس کلاستر کوبرنتیز",
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
];

export const Sidebar: FC<SidebarPropsType> = () => {
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
      <Stack
        justifyContent="space-between"
        sx={{
          transition: "width 0.5s",
          width: sidebarWidth,
          p: 2,
          boxShadow: "0px 32px 64px rgba(17, 17, 17, 0.08)",
          height: "100%",
          borderRadius: BORDER_RADIUS_1,
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <ItemList listItems={listItems} />
        <SpecialOffer />
      </Stack>
    </Box>
  );
};
