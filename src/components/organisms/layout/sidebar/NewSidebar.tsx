import { Dispatch, FC, SetStateAction, useState } from "react";
import { listItem } from "src/types/itemsList.type";
import { Box, List, ListSubheader, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { VmSvg } from "src/components/atoms/svg-icons/VmSvg";
import { ObjectStorageSvg } from "src/components/atoms/svg-icons/ObjectStorageSvg";
import { KubernetesSvg } from "src/components/atoms/svg-icons/KubernetesSvg";
import { CdnSvg } from "src/components/atoms/svg-icons/CdnSvg";
import { DashboardSvg } from "src/components/atoms/svg-icons/DashboardSvg";
import { WebHostSvg } from "src/components/atoms/svg-icons/WebHostSvg";
import { ListItemWithChild } from "./ListItemWithChild";
import { ListItemWithoutChild } from "./ListItemWithoutChild";
import { useShallowEqualSelector } from "src/app/hooks";
import { BORDER_RADIUS_1 } from "src/configs/theme";

type SidebarPropsType = {
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
  isAccumulated: boolean;
  setIsAccumulated: Dispatch<SetStateAction<boolean>>;
};

export const NewSidebar: FC<SidebarPropsType> = ({
  setShowSidebar,
  isAccumulated,
  setIsAccumulated,
}) => {
  const [expandedItem, setExpandedItem] = useState<listItem | null>(null);
  const selectedProjectId = useShallowEqualSelector((state) => state.project.selectedProjectId);

  const { t } = useTranslation();
  const firstList: listItem[] = [
    {
      title: "زیرساخت ابری ",
      Icon: VmSvg,
      link: `/vm/${selectedProjectId}/list`,
      subList: [
        {
          title: " سرورهای ابری",
          link: selectedProjectId ? `/vm/${selectedProjectId}/list` : "/dashboard",
        },
      
        {
          title:"کلیدهای دسترسی",
          link:`/key/${selectedProjectId}`,
        },
        {
          title:"شبکه",
          link:`/network/${selectedProjectId}`,
        },
        {
          title:"فایروال",
          link:`/firewall/${selectedProjectId}`,
        },
        {
          title:"بکاپ",
          link:`/backup/${selectedProjectId}`,
        },
        // {
        //   title:"اسنپ شات",
        //   link:`/snapshot/${selectedProjectId}`,
        // },
        // {
        //   title: "ابر اختصاصی(vPC)",
        //   link: `/vpc/${selectedProjectId}`,
        // },
      ],
    },
    // {
    //   title: "پلتفرم ابری ",
    //   Icon: KubernetesSvg,
    //   link: `/kubernetes-cluster/${selectedProjectId}`,
    //   subList: [
    //     { title: "کلاستر کوبرنتیز", link: `/kubernetes-cluster/${selectedProjectId}` },
    //     {
    //       title: "کوبرنتیز ابری",
    //        link: `/kubernetes-cloud/${selectedProjectId}`,
    //      },
    //   ],
    // },
 
    // {
    //   title: "ذخیره ساز ابری ",
    //   Icon: ObjectStorageSvg,
    //   link: `/storage/${selectedProjectId}`,
    //   subList: [{ title: "ذخیره ساز ابری", link: `/storage/${selectedProjectId}` }],
    // },
    
    {
      title: " DNS ابری",
      Icon: CdnSvg,
      link: `/cdn/${selectedProjectId}`,
      subList: [
        {
          title: "مدیریت زون ها",
          link: `/cdn/${selectedProjectId}`,
        },
      ],
    },
  ];

//   const secondList: listItem[] = [
//     {
//       title: "سرور اختصاصی",
//       Icon: DomainIcon,
//       link: `/bare-metal/${selectedProjectId}`,
//       subList: [{ title: "مدیریت سرورهای اختصاصی", link: `/bare-metal/${selectedProjectId}` }],
//     },
//     {
//       title: "فضای مرکز داده",
//       Icon: ColocationSvg,
//       link: `/colocation/${selectedProjectId}`,
//       subList: [{ title: "هم‌مکانی", link: `/colocation/${selectedProjectId}` }],
//     },
//   ];

  const singleItemOnClick = (item: listItem) => {
    if (isAccumulated) {
      setIsAccumulated(false);
      return;
    }
    setExpandedItem((prevState) =>
      prevState?.title === item.title ? null : item || null
    );
  };

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
          width: "100%",
          p: 2,
          boxShadow: "0px 32px 64px rgba(17, 17, 17, 0.08)",
          height: "100%",
          borderRadius: BORDER_RADIUS_1,
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Stack >
          <ListItemWithoutChild
            item={{
              title: "داشبورد",
              link: "/",
              Icon: DashboardSvg,
            }}
            isAccumulated={isAccumulated}
            itemOnClick={() =>
              singleItemOnClick({
                title: "داشبورد",
                link: "/",
                Icon: DashboardSvg,
              })
            }
          />
          
          {/* <List
            sx={{ pb: 0, mt: 6 }}
            subheader={
              <ListSubheader
                sx={{
                  whiteSpace: "nowrap",
                  opacity: isAccumulated ? "0" : "100%",
                  transition: "200ms",
                }}
              >
                {t("cloudServiceList")}
              </ListSubheader>
            }
          /> */}
          
          {firstList.map((item, index) => {
            return (
              <ListItemWithChild
                key={index}
                listItem={item}
                setShowSidebar={setShowSidebar}
                isAccumulated={isAccumulated}
                setIsAccumulated={setIsAccumulated}
                expandedItem={expandedItem}
                setExpandedItem={setExpandedItem}
              />
            );
          })}
        </Stack>
      </Stack>
    </Box>
  );
}; 