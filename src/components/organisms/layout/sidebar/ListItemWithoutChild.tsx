import { FC, useEffect, useState } from "react";
import {
  Avatar,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { listItem } from "src/types/itemsList.type";
import { Dispatch, SetStateAction } from "react";
import { BORDER_RADIUS_1 } from "src/configs/theme";
import { CategorySvg } from "src/components/atoms/svg-icons/CategorySvg";
import CustomListItemButton from "src/components/atoms/CustomListItemButton";

type ListItemWithoutChildPropsType = {
  item: listItem;
  isAccumulated: boolean;
  itemOnClick: () => void;
};

export const ListItemWithoutChild: FC<ListItemWithoutChildPropsType> = ({
  item,
  isAccumulated,
  itemOnClick,
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [LocalStorageData, setLocalStorageData] = useState<any>();

  useEffect(() => {
    //logic for getting a value from local storage stored under the key 'key'
    const data = localStorage.getItem("loginInfo");
    setLocalStorageData(JSON.parse(data as string));
  }, []);

  const isSelected = pathname === item.link;

  const handleClick = () => {
    navigate(item.link);
    itemOnClick();
  };

  return (
    <Stack >
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
            primary="پیشخوان"
          />
        </CustomListItemButton>
      </ListItem>
    </Stack>
  );
}; 