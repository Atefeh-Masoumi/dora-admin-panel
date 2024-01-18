import { FC, Fragment, useState } from "react";
import {
  createTheme,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  Stack,
  ThemeProvider,
  Typography,
  useTheme,
} from "@mui/material";
import More2Svg from "src/components/atoms/svg/More2Svg";
import { Account } from "src/components/atoms/svg/AccountSvg";
import { Setting } from "src/components/atoms/svg/SettingSvg";
import { Referral } from "src/components/atoms/svg/ReferralSvg";
import { Service } from "src/components/atoms/svg/ServiceSvg";
import { Logout } from "src/components/atoms/svg/LogoutSvg";
import { useNavigate } from "react-router";
import { useAppDispatch } from "src/app/hooks";
import { logoutAction } from "src/app/slice/authSlice";

const items = [
  { title: "حساب کاربری", icon: Account, link: "/portal/profile" },
  { title: "تنظیمات", icon: Setting, link: "/portal/setting" },
  { title: "کد معرف و درآمد", icon: Referral, link: "/portal/referral" },
  { title: "سرویس های من", icon: Service, link: "/portal/customer-products" },
];

export const UserMenu: FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();

  const dispatch = useAppDispatch();
  return (
    <Fragment>
      <IconButton size="small" onClick={handleMenu}>
        <More2Svg />
      </IconButton>
      <ThemeProvider
        theme={createTheme({
          ...theme,
          palette: { mode: "dark", secondary: theme.palette.secondary },
        })}
      >
        <Menu
          anchorEl={anchorEl}
          keepMounted
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuList sx={{ backgroundColor: "rgba(32, 32, 32, 1)" }}>
            <Stack p={1.5} spacing={1}>
              {items.map(({ title, icon: Icon, link }, index) => (
                <MenuItem
                  sx={{ borderRadius: 1 }}
                  key={index}
                  onClick={() => {
                    handleClose();
                    navigate(link);
                  }}
                >
                  <Stack
                    direction="row"
                    alignItems="start"
                    spacing={1}
                    py={0.5}
                  >
                    <Icon />
                    <Typography sx={{ lineHeight: 2 }}>{title}</Typography>
                  </Stack>
                </MenuItem>
              ))}
              <Divider sx={{ borderColor: "secondary.main" }} />
              <MenuItem
                sx={{ borderRadius: 1 }}
                onClick={() => {
                  handleClose();
                  dispatch(logoutAction());
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1} p={0.5}>
                  <Logout />
                  <Typography>خروج</Typography>
                </Stack>
              </MenuItem>
            </Stack>
          </MenuList>
        </Menu>
      </ThemeProvider>
    </Fragment>
  );
};
