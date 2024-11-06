import {
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomListItemButton from "src/components/atoms/CustomListItemButton";
import { CategorySvg } from "src/components/atoms/svg-icons/CategorySvg";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { sidebarItemType } from "src/types/itemsList.type";

type ItemListPropsType = {
  listItems: sidebarItemType[];
};

export const ItemList: FC<ItemListPropsType> = ({ listItems }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

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
        sx={{
          border: "1px solid rgba(110, 118, 138, 0.16)",
          borderRadius: BORDER_RADIUS_1,
          py: 1,
          px: 1,
          width: "100%",
          mb: 3,
        }}
      >
        <Avatar sx={{ bgcolor: "primary.main" }} src="/broken-image.jpg" />
        <Typography
          sx={{
            whiteSpace: "nowrap",
            width: "unset",
            opacity: "100%",
            transition: "all 0.5s ease-in",
            margin: "0 auto",
          }}
          fontSize="16px"
          color="rgba(110, 118, 138, 0.8)"
        >
          {LocalStorageData && LocalStorageData.userTitle}
        </Typography>
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
                opacity: "100%",
                transition: "opacity 0.5s ease-in",
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

        {listItems.map(({ title, text, Icon, link }, index) => {
          const isSelected = link === pathname || pathname.includes(link);
          if (text) {
            return (
              <ListItem
                disablePadding
                key={index}
                sx={{ mt: 2 }}
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
                      opacity: "100%",
                      visibility: "visible",
                      transition: "all 0.5s ease-in",
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
    </Stack>
  );
};
