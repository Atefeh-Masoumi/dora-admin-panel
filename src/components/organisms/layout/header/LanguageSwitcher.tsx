import { FC, useState } from "react";
import {
  IconButton,
  ListItemText,
  MenuItem,
  Popover,
  Typography,
} from "@mui/material";
import i18n from "src/i18n";
import GlobalSvg from "src/components/atoms/svg/GlobalSvg";

export const LanguageSwitcher: FC = () => {
  const [anchorEl, setAnchorEl] = useState<
    (EventTarget & HTMLButtonElement) | null
  >();

  const closeMenuHandler = () => setAnchorEl(null);
  const openMenuHandler = ({
    currentTarget,
  }: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
    setAnchorEl(currentTarget);

  const open = Boolean(anchorEl);
  const id = open ? "choose language" : undefined;

  const langsArray = [
    {
      txt: "English",
      val: "en",
    },
    {
      txt: "فارسی",
      val: "fa",
    },
  ];

  const languageChangeHandler = (lng: string) => {
    i18n.changeLanguage(lng);
    closeMenuHandler();
  };

  return (
    <>
      <IconButton
        sx={{
          border: 1,
          borderRadius: { xs: 62, lg: 8 },
          borderColor: "rgba(110, 118, 138, 0.16)",
          display: { xs: "none", lg: "inline-flex" },
        }}
        onClick={openMenuHandler}
      >
        <GlobalSvg />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={closeMenuHandler}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        PaperProps={{
          elevation: 1,
          sx: {
            backgroundColor: "customGrey.light",
            borderTopRightRadius: 0,
            py: 2,
            mt: 1,
          },
        }}
      >
        {langsArray.map(({ txt, val }, index) => {
          let isSelected = i18n.language === val;
          return (
            <MenuItem
              key={index}
              selected={isSelected}
              onClick={() => languageChangeHandler(val)}
            >
              <ListItemText>
                <Typography
                  align="center"
                  fontSize={14}
                  color={isSelected ? "primary" : undefined}
                >
                  {txt}
                </Typography>
              </ListItemText>
            </MenuItem>
          );
        })}
      </Popover>
    </>
  );
};
