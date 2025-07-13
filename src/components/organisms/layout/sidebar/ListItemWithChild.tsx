import { FC, Dispatch, SetStateAction, useEffect, useMemo } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { listItem } from "src/types/itemsList.type";

type ListItemWithChildPropsType = {
  listItem: listItem;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
  isAccumulated: boolean;
  setIsAccumulated: Dispatch<SetStateAction<boolean>>;
  expandedItem: listItem | null;
  setExpandedItem: Dispatch<SetStateAction<listItem | null>>;
};

export const ListItemWithChild: FC<ListItemWithChildPropsType> = ({
  listItem,
  setShowSidebar,
  isAccumulated,
  setIsAccumulated,
  expandedItem,
  setExpandedItem,
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAccumulated) return;
    setExpandedItem(null);
  }, [isAccumulated, listItem, listItem.subList, pathname, setExpandedItem]);

  const isSelected = useMemo(() => {
    let result = false;
    pathname.split("/").forEach((subString, index) => {
      if (`/${subString}` === listItem.link && index < 2) {
        result = true;
      }
    });
    return result;
  }, [listItem.link, pathname]);

  const isExpanded = expandedItem?.title === listItem.title;

  const handleClick = () => {
    if (isAccumulated) {
      setIsAccumulated(false);
      return;
    }

    if (listItem.subList && listItem.subList.length > 0) {
      setExpandedItem(isExpanded ? null : listItem);
    } else {
      navigate(listItem.link);
      setShowSidebar(false);
    }
  };

  const handleSubItemClick = (link: string) => {
    navigate(link);
    setShowSidebar(false);
  };

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton
          onClick={handleClick}
          sx={{
            borderRadius: 1,
            mb: 0.5,
            bgcolor: isSelected ? "primary.main" : "transparent",
            color: isSelected ? "white" : "inherit",
            "&:hover": {
              bgcolor: isSelected ? "primary.dark" : "action.hover",
            },
          }}
        >
          <ListItemIcon>
            <listItem.Icon
              sx={{
                color: isSelected ? "white" : "inherit",
              }}
            />
          </ListItemIcon>
          <ListItemText
            primary={listItem.title}
            sx={{
              opacity: isAccumulated ? 0 : 1,
              transition: "opacity 0.2s",
            }}
          />
          {listItem.subList && listItem.subList.length > 0 && (
            <Stack
              sx={{
                opacity: isAccumulated ? 0 : 1,
                transition: "opacity 0.2s",
              }}
            >
              {isExpanded ? <ExpandLess /> : <ExpandMore />}
            </Stack>
          )}
        </ListItemButton>
      </ListItem>

      {listItem.subList && listItem.subList.length > 0 && (
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <Stack pl={4}>
            {listItem.subList.map((subItem: { title: string; link: string }, index: number) => {
              const isSubItemSelected = pathname.includes(subItem.link);
              return (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    onClick={() => handleSubItemClick(subItem.link)}
                    sx={{
                      borderRadius: 1,
                      mb: 0.5,
                      bgcolor: isSubItemSelected ? "rgb(186, 222, 255)" : "transparent",
                      color: isSubItemSelected ? "primary.main" : "inherit",
                      "&:hover": {
                        bgcolor: isSubItemSelected ? "action.hover" : "action.hover",
                      },
                    }}
                  >
                    <ListItemText
                      primary={subItem.title}
                      sx={{
                        opacity: isAccumulated ? 0 : 1,
                        transition: "opacity 0.2s",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </Stack>
        </Collapse>
      )}
    </>
  );
}; 