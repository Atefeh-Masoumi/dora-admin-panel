import {
  ExpandMore as ExpandMoreIcon,
  FolderOutlined,
  PasswordOutlined,
} from "@mui/icons-material";
import { Divider, MenuList, Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";
import { FC, MouseEvent, useState } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch } from "src/app/hooks";
import { logoutAction } from "src/app/slice/authSlice";
import { AccountSvg } from "src/components/atoms/svg-icons/AccountSvg";
import { Logout } from "src/components/atoms/svg-icons/LogoutSvg";
import { Service } from "src/components/atoms/svg-icons/ServiceSvg";
import { BORDER_RADIUS_1 } from "src/configs/theme";

export const ManageMenu: FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const dispatch = useAppDispatch();
  const handleClose = () => setAnchorEl(null);
  const theme = useTheme();

  const handleLogout = () => {
    dispatch(logoutAction());
    handleClose();
    navigate("/");
  };

  const items = [
    {
      id: 1,
      value: "account",
      label: "سرویس‌های من",
      icon: FolderOutlined,
      link: "/portal/customer-products",
    },
    {
      id: 2,
      value: "account",
      label: "مدیریت اکانت",
      icon: AccountSvg,
      link: "/portal/account",
    },
    {
      id: 3,
      value: "wallet",
      label: "مدیریت مالی",
      icon: Service,
      link: "/portal/financial",
    },
    {
      id: 4,
      value: "password",
      label: "تغییر رمز عبور",
      icon: PasswordOutlined,
      link: "/portal/account?tab=change-password",
    },
    {
      id: 5,
      value: "logout",
      label: "خروج از حساب",
      icon: Logout,
      function: handleLogout,
    },
  ];

  return (
    <Stack>
      <Button
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        disableElevation
        onClick={handleClick}
        endIcon={<ExpandMoreIcon sx={{ fontSize: "1.5em !important" }} />}
        color="secondary"
        sx={{ backgroundColor: "rgba(110, 118, 138, 0.06)", py: 1.3 }}
        fullWidth
      >
        <Stack direction="row">
          <Typography sx={{ direction: "rtl", width: "100px" }}>
            مدیریت سامانه
          </Typography>
        </Stack>
      </Button>
      <ThemeProvider
        theme={createTheme({
          ...theme,
          palette: { mode: "dark", secondary: theme.palette.secondary },
        })}
      >
        <Menu
          keepMounted
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          sx={{ marginRight: { xs: "0", md: "60px" }, marginTop: "10px" }}
        >
          <MenuList sx={{ backgroundColor: "rgba(32, 32, 32, 1)" }}>
            <Stack p={1.5} spacing={1}>
              {items.map((item, index) => (
                <>
                  <MenuItem
                    key={item.id}
                    disableRipple
                    sx={{ borderRadius: BORDER_RADIUS_1, m: 1, py: 2 }}
                    onClick={() => {
                      item.function ? item.function() : handleClose();
                      item.link ? navigate(item.link) : handleClose();
                      handleClose();
                    }}
                  >
                    <Stack
                      direction="row"
                      alignItems="start"
                      spacing={1}
                      py={0.5}
                    >
                      <item.icon />
                      <Typography
                        color={item.value === "logout" ? "#d32f2f" : "unset"}
                      >
                        {item.label}
                      </Typography>
                    </Stack>
                  </MenuItem>
                  {index === items.length - 2 && (
                    <Divider sx={{ bgcolor: "secondary.main" }} />
                  )}
                </>
              ))}
            </Stack>
          </MenuList>
        </Menu>
      </ThemeProvider>
    </Stack>
  );
};
