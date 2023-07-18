import { FC, useEffect, useState, useMemo } from "react";
import {
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { BORDER_RADIUS_1, BORDER_RADIUS_5 } from "src/configs/theme";
import { UserMenu } from "./UserMenu";
import CategorySvg from "src/components/atoms/svg/CategorySvg";
import { useLocation, useNavigate } from "react-router-dom";
import { sidebarItemType } from "src/types/itemsList.type";
import CustomListItemButton from "src/components/atoms/CustomListItemButton";

type ItemListPropsType = {
  listItems: sidebarItemType[];
};

export const ItemList: FC<ItemListPropsType> = ({ listItems }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isCollapsed = useMemo(
    () =>
      pathname !== "/" &&
      pathname !== "/portal/profile" &&
      pathname !== "/portal/setting" &&
      pathname !== "/portal/host-products" &&
      pathname !== "/portal/orders" &&
      pathname !== "/portal/referral" &&
      pathname !== "/portal/notifications",
    [pathname]
  );

  const goToCalculator = () => {
    let a = document.createElement("a");
    a.target = "_blank";
    a.href = "https://dorsacloud.com/calculator";
    a.click();
  };

  const [LocalStorageData, setLocalStorageData] = useState<any>();
  useEffect(() => {
    //logic for getting a value from local storage stored under the key 'key'
    const data = localStorage.getItem("loginInfo");
    setLocalStorageData(JSON.parse(data as string));
  }, []);

  return (
    <Stack sx={{ height: "100vh" }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={isCollapsed ? "center" : "space-between"}
        sx={{
          border: "1px solid rgba(110, 118, 138, 0.16)",
          borderRadius: BORDER_RADIUS_5,
          py: 1,
          px: isCollapsed ? 0 : 1.5,
          width: "100%",
          mb: 3,
        }}
      >
        {!isCollapsed && (
          <Avatar sx={{ bgcolor: "primary.main" }} src="/broken-image.jpg" />
        )}
        <Typography
          sx={{
            whiteSpace: "nowrap",
            width: isCollapsed ? "0" : "unset",
            opacity: isCollapsed ? "0" : "100%",
            transition: isCollapsed ? "" : "all 0.5s ease-in",
          }}
          fontSize="16px"
          color="rgba(110, 118, 138, 0.8)"
        >
          {LocalStorageData && LocalStorageData.userTitle}
        </Typography>
        <UserMenu />
      </Stack>
      <List sx={{ p: 0 }}>
        <ListItem disablePadding sx={{ mb: 3 }}>
          <CustomListItemButton
            to="/"
            sx={{ px: 0, "&:hover": { bgcolor: "transparent" } }}
          >
            <ListItemIcon>
              <Stack
                alignItems="center"
                justifyContent="center"
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: pathname === "/" ? "#0560FD14" : "#6E768A14",
                  borderRadius: BORDER_RADIUS_1,
                }}
              >
                <CategorySvg mode={pathname === "/" ? "selected" : "default"} />
              </Stack>
            </ListItemIcon>
            <ListItemText
              sx={{
                opacity: isCollapsed ? "0" : "100%",
                transition: isCollapsed
                  ? "opacity 0.2s ease-out"
                  : "opacity 0.5s ease-in",
              }}
              primaryTypographyProps={{
                color: pathname === "/" ? "primary" : "#6E768A",
                fontSize: "16px",
                fontWeight: 400,
              }}
              primary="داشبورد"
            />
          </CustomListItemButton>
        </ListItem>
        <Typography
          sx={{
            whiteSpace: "nowrap",
            opacity: isCollapsed ? "0" : "100%",
            transition: isCollapsed
              ? "opacity 0.2s ease-out"
              : "opacity 0.5s ease-in",
          }}
          fontSize="12px"
          color="rgba(110, 118, 138, 0.8)"
        >
          سرویس ها و خدمات
        </Typography>
        {listItems.map(({ title, text, Icon, link }, index) => {
          const isSelected = link === pathname || pathname.includes(link);
          if (text) {
            return (
              <ListItem
                disablePadding
                key={index}
                sx={{ mt: 3 }}
                onClick={() => navigate(link)}
              >
                <CustomListItemButton
                  to={link}
                  sx={{ p: 0, "&:hover": { bgcolor: "transparent" } }}
                >
                  <ListItemIcon>
                    <Stack
                      alignItems="center"
                      justifyContent="center"
                      sx={{
                        width: 40,
                        height: 40,
                        bgcolor: isSelected ? "#0560FD14" : "#6E768A14",
                        borderRadius: BORDER_RADIUS_1,
                      }}
                    >
                      <Icon
                        color={isSelected ? "primary" : "secondary"}
                        mode={isSelected ? "selected" : "default"}
                      />
                    </Stack>
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      m: 0,
                      whiteSpace: "nowrap",
                      opacity: isCollapsed ? "0" : "100%",
                      visibility: isCollapsed ? "hidden" : "visible",
                      transition: isCollapsed
                        ? "all 0.2s ease-out"
                        : "all 0.5s ease-in",
                    }}
                    primaryTypographyProps={{
                      fontSize: "16px",
                      color: isSelected ? "primary" : "rgba(110, 118, 138, 1)",
                      fontWeight: 400,
                    }}
                    secondaryTypographyProps={{
                      fontSize: "12px",
                      color: isSelected
                        ? "primary"
                        : "rgba(110, 118, 138, 0.7)",
                      fontWeight: 400,
                    }}
                    primary={title}
                    secondary={text}
                  />
                </CustomListItemButton>
              </ListItem>
            );
          } else {
            return null;
          }
        })}
      </List>
      {isCollapsed && (
        <List
          sx={{
            mt: 8.5,
            "&>li:last-child": {
              mb: 4,
            },
          }}
        >
          {listItems.map(({ title, text, Icon, link }, index) => {
            const isSelected = link === pathname || pathname.includes(link);
            if (!text && !title) {
              return (
                <ListItem disablePadding key={index} sx={{ mt: 3 }}>
                  {link === "/calculator" ? (
                    <ListItemIcon onClick={goToCalculator}>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        sx={{
                          width: 40,
                          height: 40,
                          bgcolor: isSelected ? "#0560FD14" : "#6E768A14",
                          borderRadius: BORDER_RADIUS_1,
                        }}
                      >
                        <Icon mode={isSelected ? "selected" : "default"} />
                      </Stack>
                    </ListItemIcon>
                  ) : (
                    <CustomListItemButton
                      to={link}
                      sx={{ p: 0, "&:hover": { bgcolor: "transparent" } }}
                    >
                      <ListItemIcon>
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          sx={{
                            width: 40,
                            height: 40,
                            bgcolor: isSelected ? "#0560FD14" : "#6E768A14",
                            borderRadius: BORDER_RADIUS_1,
                          }}
                        >
                          <Icon mode={isSelected ? "selected" : "default"} />
                        </Stack>
                      </ListItemIcon>
                    </CustomListItemButton>
                  )}
                </ListItem>
              );
            } else {
              return null;
            }
          })}
        </List>
      )}
    </Stack>
  );
};
