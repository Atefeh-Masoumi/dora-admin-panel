import { FC, useMemo } from "react";
import {
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import { sidebarWidth } from "src/components/templates/MainTemplate";
import { sidebarItemType } from "src/types/itemsList.type";
import { useLocation } from "react-router";
import CustomListItemButton from "src/components/atoms/CustomListItemButton";

type SubItemListPropsType = {
  listItems: sidebarItemType[];
};

export const SubItemList: FC<SubItemListPropsType> = ({ listItems }) => {
  const { pathname } = useLocation();
  const selectedMainItem = useMemo(
    () =>
      listItems.find((item) => {
        let result: sidebarItemType | null = null;
        if (pathname === item.link || pathname.includes(item.link)) {
          result = item;
        }
        return result;
      }),
    [listItems, pathname]
  );

  if (!selectedMainItem) {
    return <></>;
  }

  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      sx={{
        transition: "width 0.5s",
        position: "absolute",
        width: sidebarWidth,
        left: 1,
        p: 2,
        paddingLeft: 12,
      }}
    >
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
      >
        <ListItem
          sx={{
            opacity: "100%",
          }}
          disablePadding
        >
          <ListItemIcon sx={{ minWidth: "0", px: 2 }}>
            {<selectedMainItem.Icon mode="selected" />}
          </ListItemIcon>
          <ListItemText
            sx={{
              m: 0,
              whiteSpace: "nowrap",
              height: 32,
            }}
            primaryTypographyProps={{
              fontSize: "14px",
              color: "#3C8AFF",
              fontWeight: 400,
            }}
            secondaryTypographyProps={{
              fontSize: "10px",
              color: "rgba(110, 118, 138, 0.7)",
              fontWeight: 400,
            }}
            primary={selectedMainItem.title}
            secondary={selectedMainItem.text}
          />
        </ListItem>
      </Stack>
      <Divider
        sx={{ width: "100%", py: 1, color: "#6E768A14", marginLeft: "20px" }}
      />
      {selectedMainItem.subList?.map(({ link, title }, index) => {
        const isSelected =
          selectedMainItem.link === link
            ? pathname === link
            : pathname.includes(link);

        return (
          <ListItem disablePadding key={index} sx={{ mt: 2 }}>
            <CustomListItemButton
              to={link}
              sx={{
                p: 0,
                "&:hover": { bgcolor: "transparent" },
                bgcolor: isSelected ? "#3C8AFF14" : "transparent",
                width: 170,
                height: 40,
                borderRadius: "8px",
                paddingLeft: "10px",
              }}
            >
              <ListItemText
                sx={{
                  whiteSpace: "nowrap",
                }}
                primaryTypographyProps={{
                  fontSize: "14px",
                  color: isSelected ? "#3C8AFF" : "#6E768A4D",
                  fontWeight: 400,
                }}
                primary={title}
              />
            </CustomListItemButton>
          </ListItem>
        );
      })}
    </Stack>
  );
};
